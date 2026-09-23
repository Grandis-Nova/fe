import { useState, type ChangeEvent } from 'react'

import { ChevronDown } from 'lucide-react'

import { OrderSummary } from '@/entities/order'
import { ProductPaymentCard } from '@/entities/product'
import { Button, Checkbox, Container, Input } from '@/shared/ui'

import * as styles from './PaymentPage.css'

const won = (value: number) => `${value.toLocaleString('ko-KR')}원`

// ponytail: 아직 주문서 API가 없어서 목업 데이터로 대체.
const orderProduct = {
  name: '아이폰 18 Pro',
  modelNumber: 'A3714',
  optionSummary: '실버 · 512GB · Apple care+',
  quantityLabel: '1개',
  priceLabel: won(2278100),
}

const orderAmount = 2278100
const preorderBenefit = 278100
const totalAmount = orderAmount - preorderBenefit

type TermDetail = { heading: string; body: string }

type Term = {
  id: string
  label: string
  /** 체크하지 않으면 결제를 막는 항목 */
  required: boolean
  detail?: TermDetail[]
}

const terms: Term[] = [
  {
    id: 'finance',
    label: '전자금융거래 이용약관에 동의 (필수)',
    required: true,
    detail: [
      {
        heading: '전자금융거래 이용약관 (제1조 목적)',
        body: '이 약관은 회사가 제공하는 전자금융거래 서비스를 이용함에 있어 회사와 이용자 사이의 권리·의무 및 책임 사항을 정함을 목적으로 합니다.',
      },
      {
        heading: '제2조 용어의 정의',
        body: '"전자금융거래"란 회사가 전자적 장치를 통하여 서비스를 제공하고, 이용자가 회사의 종사자와 직접 대면하지 아니하고 자동화된 방식으로 이를 이용하는 거래를 말합니다.',
      },
    ],
  },
  {
    id: 'third-party',
    label: '주문 배송을 위한 개인정보 제3자 제공 동의 (필수)',
    required: true,
    detail: [
      {
        heading: '개인정보 제3자 제공 동의 (주문 및 배송 목적)',
        body: '회사는 고객님의 주문 상품 배송 및 원활한 고객 서비스를 위해 개인정보 보호법 제17조 및 제22조에 따라 아래와 같이 개인정보를 제3자에게 제공하고자 합니다.',
      },
      {
        heading: '제공하는 개인정보 항목',
        body: '수령인 성명, 수령인 연락처(휴대전화번호), 배송지 주소',
      },
      {
        heading: '제공받는 자',
        body: 'CJ대한통운, 한진택배, 우체국택배 등',
      },
      {
        heading: '제공 목적',
        body: '주문 상품의 배송 및 배송 관련 고객 응대',
      },
    ],
  },
  {
    id: 'delay',
    label:
      '예약 상품의 특성상 상품 준비 및 제작 상황에 따라 안내된 예상 배송일보다 배송이 늦어질 수 있습니다. 예상 배송일은 확정된 일정이 아니며, 배송이 지연될 수 있음을 확인하고 이에 동의합니다.',
    required: true,
  },
]

type TermsAgreementProps = {
  agreedIds: Set<string>
  onToggle: (id: string, checked: boolean) => void
  onToggleAll: (checked: boolean) => void
}

// 약관보기 펼침 상태는 바깥에서 쓸 일이 없어서 여기서만 들고 있는다.
function TermsAgreement({
  agreedIds,
  onToggle,
  onToggleAll,
}: TermsAgreementProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggleDetail = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className={styles.terms}>
      <div className={styles.termsTitle}>약관 동의</div>

      <label className={styles.agreeAll}>
        <Checkbox
          className={styles.checkbox}
          checked={agreedIds.size === terms.length}
          onChange={(event) => onToggleAll(event.target.checked)}
        />
        아래 내용에 모두 동의합니다.
      </label>

      <div className={styles.termList}>
        {terms.map((term) => {
          const open = openIds.has(term.id)

          return (
            <div key={term.id}>
              <div className={styles.termRow}>
                <label className={styles.termMain}>
                  <Checkbox
                    className={styles.checkbox}
                    checked={agreedIds.has(term.id)}
                    onChange={(event) =>
                      onToggle(term.id, event.target.checked)
                    }
                  />
                  <span className={styles.termLabel}>{term.label}</span>
                </label>
                {term.detail && (
                  <button
                    type="button"
                    className={styles.detailToggle}
                    aria-expanded={open}
                    onClick={() => toggleDetail(term.id)}
                  >
                    약관보기
                    <ChevronDown
                      aria-hidden="true"
                      className={[
                        styles.detailIcon,
                        open && styles.detailIconOpen,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    />
                  </button>
                )}
              </div>

              {term.detail && open && (
                <div className={styles.detailPanel}>
                  {term.detail.map((section) => (
                    <div key={section.heading} className={styles.detailGroup}>
                      <div className={styles.detailHeading}>
                        {section.heading}
                      </div>
                      <div className={styles.detailBody}>{section.body}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ponytail: 로그인 API가 없어서 수령인 이름만 목업 유저로 미리 채워 둔다.
const initialForm = {
  name: '기매진',
  phone: '',
  email: '',
  addressLabel: '',
  postcode: '',
  address: '',
  addressDetail: '',
}

type FormKey = keyof typeof initialForm

export function PaymentPage() {
  const [form, setForm] = useState(initialForm)
  const [agreedIds, setAgreedIds] = useState<Set<string>>(new Set())
  const [submitted, setSubmitted] = useState(false)

  const requiredAgreed = terms.every(
    (term) => !term.required || agreedIds.has(term.id),
  )

  // 필수 입력은 결제를 한 번 눌러 본 뒤에만 빨갛게 표시한다 — 처음부터 빨간 화면을 보여주지 않는다.
  const field = (key: FormKey, label: string, requiredMessage?: string) => ({
    label,
    value: form[key],
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value })),
    error:
      requiredMessage && submitted && !form[key].trim()
        ? requiredMessage
        : undefined,
  })

  const toggleAgree = (id: string, checked: boolean) =>
    setAgreedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })

  const toggleAllAgree = (checked: boolean) =>
    setAgreedIds(checked ? new Set(terms.map((term) => term.id)) : new Set())

  return (
    <Container>
      <div className={styles.title}>주문 / 결제</div>

      <div className={styles.layout}>
        <div className={styles.form}>
          <section className={styles.section}>
            <div className={styles.sectionTitle}>주문 상품</div>
            <ProductPaymentCard product={orderProduct} />
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>수령인</div>
            <div className={styles.fieldRow}>
              <Input
                {...field('name', '이름*', '이름을 필수로 작성해주세요.')}
              />
              <Input
                {...field(
                  'phone',
                  "휴대폰 ('-'을 제외한 숫자만)*",
                  '휴대폰 번호를 필수로 작성해주세요.',
                )}
                inputMode="numeric"
              />
            </div>
            <Input {...field('email', '이메일')} inputMode="email" />
          </section>

          <section className={styles.section}>
            <div className={styles.sectionIntro}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>배송지</div>
                <Button size="small">주소록 보기</Button>
              </div>
              <div className={styles.note}>
                ※ 기본 배송지로 자동 설정되었습니다. 주문 전 주소를 확인해
                주세요.
              </div>
            </div>

            <Input
              {...field(
                'addressLabel',
                '배송지명*',
                '배송지명을 필수로 작성해주세요.',
              )}
            />
            <div className={styles.postcodeRow}>
              <Input
                {...field(
                  'postcode',
                  '우편 번호*',
                  '우편 번호를 필수로 작성해주세요.',
                )}
                inputMode="numeric"
              />
              <Button className={styles.postcodeAction}>주소 찾기</Button>
            </div>
            <Input
              {...field(
                'address',
                '기본 주소*',
                '기본 주소를 필수로 작성해주세요.',
              )}
            />
            <Input
              {...field(
                'addressDetail',
                '상세 주소*',
                '상세 주소를 필수로 작성해주세요.',
              )}
            />
          </section>
        </div>

        <OrderSummary
          rows={[
            { label: '상품 수', value: '1개' },
            { label: '주문 금액', value: won(orderAmount) },
            {
              label: '사전예약 혜택',
              value: `-${won(preorderBenefit)}`,
              highlight: true,
            },
          ]}
          totalLabel="결제 예정 금액"
          totalValue={won(totalAmount)}
          actionLabel={`${won(totalAmount)} 결제 하기`}
          actionDisabled={!requiredAgreed}
          onAction={() => setSubmitted(true)}
        >
          <TermsAgreement
            agreedIds={agreedIds}
            onToggle={toggleAgree}
            onToggleAll={toggleAllAgree}
          />
        </OrderSummary>
      </div>
    </Container>
  )
}
