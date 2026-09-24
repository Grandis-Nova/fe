import { useState } from 'react'

import { useSearchParams } from 'react-router'

import { ProductColorSwatches, ProductOptionSelector } from '@/entities/product'
import macbook1 from '@/shared/assets/macbook_neo_sliver1.png'
import macbook2 from '@/shared/assets/macbook_neo_sliver2.png'
import {
  Container,
  Slider,
  Button,
  QuantityStepper,
  PriceText,
} from '@/shared/ui'
import { ProductPageTab } from '@/widgets/product-page-tab'
import type { ProductPageTabKey } from '@/widgets/product-page-tab'

import * as styles from './ProductDetailPage.css'
import { useProductDetailScroll } from './useProductDetailScroll'

// ponytail: 아직 상품 상세 API가 없어서 목업 옵션 데이터로 대체
const colorSwatches = [
  { hex: '#1A1A1D', label: '미드나이트' },
  { hex: '#F5F5F0', label: '스타라이트' },
  { hex: '#F68C4C', label: '코즈믹 오렌지' },
]
const storageLabels = ['256GB', '512GB']

// ponytail: 실제 탭 콘텐츠 API 전까지 자리표시자 배경색으로 대체
const tabPanelContent: Record<
  ProductPageTabKey,
  { label: string; background: string }
> = {
  benefits: { label: '구매 혜택', background: '#f5f5f5' },
  info: { label: '모델 정보', background: '#c1c1c1' },
  notice: { label: '유의 사항', background: '#6a6a6a' },
  review: { label: '구매 후기', background: '#222222' },
}

// ponytail: 실제 배송 시작일 API 전까지 하드코딩
const SHIPMENT_STARTS_AT = new Date('2026-10-15')
const shipmentLabel = `${SHIPMENT_STARTS_AT.getMonth() + 1}월 ${SHIPMENT_STARTS_AT.getDate()}일 이후 순차배송`

// ponytail: 실제 상품 API 전까지 단가 하드코딩
const UNIT_PRICE = 120000

export function ProductDetailPage() {
  const [searchParams] = useSearchParams()
  const isPreorder = searchParams.get('preorder') === 'true'
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedStorage, setSelectedStorage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const priceLabel = `${(UNIT_PRICE * quantity).toLocaleString()}원`
  const {
    layoutRef,
    orderBarRef,
    isLayoutVisible,
    orderBarHeight,
    activeTab,
    handleTabChange,
    registerPanelRef,
  } = useProductDetailScroll()

  return (
    <Container desktopPaddingX={0}>
      <div className={styles.contentPadding}>
        <div className={styles.title}>IPhone 18 Pro</div>
        <div className={styles.layout} ref={layoutRef}>
          <div>
            <div className={styles.imageFrame}>
              <div className={styles.sliderFill}>
                <Slider>
                  <img
                    src={macbook1}
                    alt="IPhone 18 Pro"
                    className={styles.image}
                  />
                  <img
                    src={macbook2}
                    alt="IPhone 18 Pro"
                    className={styles.image}
                  />
                </Slider>
              </div>
            </div>
          </div>
          <div className={styles.optionPanel}>
            <div className={styles.optionColumn}>
              <ProductColorSwatches
                colorName="색상"
                size="medium"
                colors={colorSwatches.map((swatch, index) => ({
                  ...swatch,
                  selected: index === selectedColor,
                }))}
                onSelect={setSelectedColor}
              />
              <ProductOptionSelector
                label="용량"
                options={storageLabels.map((label, index) => ({
                  label,
                  selected: index === selectedStorage,
                }))}
                onSelect={setSelectedStorage}
              />
            </div>
            <div className={styles.quantityPriceRow}>
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                label="IPhone 18 Pro"
              />
              <span className={styles.price}>
                <PriceText value={priceLabel} />
              </span>
            </div>
            {isPreorder && (
              <div className={styles.shipmentNotice}>{shipmentLabel}</div>
            )}
            <div className={isPreorder ? styles.actionsSingle : styles.actions}>
              {!isPreorder && (
                <Button variant="subtle" icon="handbag">
                  장바구니
                </Button>
              )}
              <Button>{isPreorder ? '사전예약하기' : '결제하기'}</Button>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={orderBarRef}
        className={[styles.orderBar, !isLayoutVisible && styles.orderBarVisible]
          .filter(Boolean)
          .join(' ')}
      >
        <Container
          desktopPaddingX={20}
          desktopPaddingY={16}
          mobilePaddingX={20}
          mobilePaddingY={16}
          className={styles.orderBarContent}
        >
          <div className={styles.orderBarInfo}>
            <div className={styles.productName}>아이폰 18 Pro</div>
            <div className={styles.productOption}>실버 · 512GB · 애플케어</div>
          </div>
          <div className={styles.orderBarButtons}>
            {!isPreorder && (
              <Button
                variant="subtle"
                icon="handbag"
                className={styles.orderBarIconButton}
              />
            )}
            <Button className={styles.orderBarCheckoutButton}>
              {isPreorder ? '사전예약하기' : '122,000,000원 결제하기'}
            </Button>
          </div>
        </Container>
      </div>
      <div
        className={styles.tabBarWrapper}
        style={{ top: isLayoutVisible ? 0 : orderBarHeight }}
      >
        <ProductPageTab
          activeTab={activeTab}
          onTabChange={handleTabChange}
          excludeTabs={isPreorder ? ['review'] : undefined}
        />
      </div>
      {Object.entries(tabPanelContent)
        .filter(([tab]) => !isPreorder || tab !== 'review')
        .map(([tab, { label, background }]) => (
          <div
            key={tab}
            ref={registerPanelRef(tab as ProductPageTabKey)}
            className={styles.tabPanel}
            style={{ background }}
          >
            {label}
          </div>
        ))}
    </Container>
  )
}
