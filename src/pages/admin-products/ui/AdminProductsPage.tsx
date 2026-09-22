import { useState } from 'react'

import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'

import {
  adminProducts,
  adminProductStatusColor as statusColor,
  adminProductStatusLabel as statusLabel,
  adminProductTypeLabel as typeLabel,
  type AdminProduct,
  type AdminProductType,
} from '@/entities/admin-product'
import { Button, Dropdown, Input, SegmentedTabs, Table, Tag } from '@/shared/ui'
import type { TableColumn, TagProps } from '@/shared/ui'

import * as styles from './AdminProductsPage.css'

const typeTagProps: Record<
  AdminProductType,
  Pick<TagProps, 'variant' | 'color'>
> = {
  preorder: { variant: 'subtle', color: 'primary' },
  normal: { variant: 'outline', color: 'primary' },
}

const typeFilters = [
  { value: 'all', label: '전체' },
  { value: 'preorder', label: '사전 예약' },
  { value: 'normal', label: '일반 판매' },
] as const

type TypeFilter = (typeof typeFilters)[number]['value']

const statusOptions = ['전체', '판매 중', '판매 예정', '판매 종료']
const sortOptions = ['오픈 시각순', '상품명순']

export function AdminProductsPage() {
  const navigate = useNavigate()
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [keyword, setKeyword] = useState('')
  const [statusOpen, setStatusOpen] = useState(false)
  const [status, setStatus] = useState<string>()
  const [sortOpen, setSortOpen] = useState(false)
  const [sort, setSort] = useState<string>()

  const openDetail = (product: AdminProduct) =>
    navigate(`/admin/products/${product.id}`)

  const visibleProducts = adminProducts
    .filter((product) => typeFilter === 'all' || product.type === typeFilter)
    .filter(
      (product) =>
        !status || status === '전체' || statusLabel[product.status] === status,
    )
    .filter((product) => product.name.includes(keyword.trim()))
    .toSorted((a, b) => {
      if (sort === '상품명순') return a.name.localeCompare(b.name)
      // 오픈 시각이 없는 상품('해당없음')은 빈 문자열로 치면 맨 위로 올라와서
      // 따로 걸러내 항상 맨 아래로 내린다.
      if (a.openPeriod === null || b.openPeriod === null) {
        return Number(a.openPeriod === null) - Number(b.openPeriod === null)
      }
      return a.openPeriod.localeCompare(b.openPeriod)
    })

  const columns: TableColumn<AdminProduct>[] = [
    {
      key: 'name',
      header: '상품명',
      render: (product) => (
        <span className={styles.productName}>{product.name}</span>
      ),
    },
    {
      key: 'type',
      header: '유형',
      align: 'center',
      render: (product) => (
        <Tag size="medium" rounded={false} {...typeTagProps[product.type]}>
          {typeLabel[product.type]}
        </Tag>
      ),
    },
    {
      key: 'option',
      header: '옵션',
      align: 'center',
      render: (product) => `${product.optionCount}종`,
    },
    {
      key: 'openPeriod',
      header: '오픈 / 마감 시각',
      align: 'center',
      render: (product) => product.openPeriod ?? '해당없음',
    },
    {
      key: 'detail',
      header: '상세 정보',
      align: 'center',
      render: (product) => (
        <Button
          size="small"
          variant="outline"
          color="cancel"
          onClick={() => openDetail(product)}
        >
          수정
        </Button>
      ),
    },
    {
      key: 'status',
      header: '상태',
      align: 'center',
      render: (product) => (
        <Tag
          variant="subtle"
          size="medium"
          rounded={false}
          color={statusColor[product.status]}
        >
          {statusLabel[product.status]}
        </Tag>
      ),
    },
    {
      key: 'manage',
      header: '관리',
      align: 'center',
      width: '80px',
      render: (product) => (
        <button
          type="button"
          className={styles.rowLink}
          aria-label={`${product.name} ${typeLabel[product.type]} 상세 보기`}
          onClick={() => openDetail(product)}
        >
          <ChevronRight className={styles.rowLinkIcon} aria-hidden="true" />
        </button>
      ),
    },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>상품 관리</div>
        <Button icon="plus" size="medium">
          새 상품 등록
        </Button>
      </div>

      <div className={styles.toolbar}>
        <SegmentedTabs
          items={typeFilters}
          value={typeFilter}
          onChange={setTypeFilter}
        />

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <Input
              label="상품명 검색"
              size="small"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <Dropdown
            label="상태"
            size="medium"
            width="120px"
            options={statusOptions}
            open={statusOpen}
            selectedOption={status}
            onToggle={() => setStatusOpen((prev) => !prev)}
            onSelect={(option) => {
              setStatus(option)
              setStatusOpen(false)
            }}
          />
          <Dropdown
            label="오픈 시각순"
            size="medium"
            width="140px"
            options={sortOptions}
            open={sortOpen}
            selectedOption={sort}
            onToggle={() => setSortOpen((prev) => !prev)}
            onSelect={(option) => {
              setSort(option)
              setSortOpen(false)
            }}
          />
        </div>
      </div>

      <Table
        columns={columns}
        rows={visibleProducts}
        rowKey={(product) => product.id}
        pageSize={10}
        onRowClick={openDetail}
        emptyMessage="조건에 맞는 상품이 없습니다."
      />
    </div>
  )
}
