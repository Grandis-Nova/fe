import { useEffect, useRef, useState } from 'react'

import type { ProductPageTabKey } from '@/widgets/product-page-tab'

// 스티키 주문바/탭바가 스크롤 위치에 따라 나타나고, 탭 패널의 스크롤 위치로
// 활성 탭을 동기화하는 로직을 모아둔 훅. ProductDetailPage 전용이라 여기 colocate.
export function useProductDetailScroll() {
  const panelRefs = useRef<Partial<Record<ProductPageTabKey, HTMLDivElement>>>(
    {},
  )
  const layoutRef = useRef<HTMLDivElement>(null)
  const [isLayoutVisible, setIsLayoutVisible] = useState(true)
  const orderBarRef = useRef<HTMLDivElement>(null)
  const [orderBarHeight, setOrderBarHeight] = useState(0)
  const [activeTab, setActiveTab] = useState<ProductPageTabKey>('benefits')

  useEffect(() => {
    const el = layoutRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) =>
      setIsLayoutVisible(entry.isIntersecting),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (orderBarRef.current) setOrderBarHeight(orderBarRef.current.offsetHeight)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.intersectionRatio >= 0.7)
        if (!visible) return
        const tab = Object.entries(panelRefs.current).find(
          ([, el]) => el === visible.target,
        )?.[0] as ProductPageTabKey | undefined
        if (tab) setActiveTab(tab)
      },
      { threshold: 0.7 },
    )
    Object.values(panelRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleTabChange = (tab: ProductPageTabKey) => {
    setActiveTab(tab)
    panelRefs.current[tab]?.scrollIntoView({ behavior: 'smooth' })
  }

  const registerPanelRef = (tab: ProductPageTabKey) => (el: HTMLDivElement | null) => {
    panelRefs.current[tab] = el ?? undefined
  }

  return {
    layoutRef,
    orderBarRef,
    isLayoutVisible,
    orderBarHeight,
    activeTab,
    handleTabChange,
    registerPanelRef,
  }
}
