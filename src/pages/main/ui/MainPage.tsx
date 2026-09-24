import { useState } from 'react'

import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'

import { ProductCard } from '@/entities/product'
import macbook1 from '@/shared/assets/macbook_neo_sliver1.png'
import macbook2 from '@/shared/assets/macbook_neo_sliver2.png'
import { typography } from '@/shared/config/theme'
import { Container, SwirlBackground } from '@/shared/ui'
import { Banner } from '@/widgets/banner'

import * as styles from './MainPage.css'

const storageLabels = ['256GB', '512GB']
// ponytail: 아직 상품 목록 API가 없어서 목업 상품 1종을 캐러셀 채우기용으로 반복 렌더링
const PRODUCT_COUNT = 6
const RECOMMENDED_COUNT = 11

export function MainPage() {
  const colorSwatches = [
    { hex: '#1A1A1D', label: '미드나이트' },
    { hex: '#F5F5F0', label: '스타라이트' },
    { hex: '#F68C4C', label: '코즈믹 오렌지' },
  ]
  const [selectedStorage, setSelectedStorage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [recommendedStorageSelections, setRecommendedStorageSelections] =
    useState(() => Array.from({ length: RECOMMENDED_COUNT }, () => 0))
  const [recommendedColorSelections, setRecommendedColorSelections] = useState(
    () => Array.from({ length: RECOMMENDED_COUNT }, () => 0),
  )
  // dragFree: 스냅포인트 없이 자유롭게 흐르도록 — 없으면 오토스크롤이 슬라이드 경계마다 멈칫하며 들러붙는다.
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: 'start' },
    [AutoScroll({ speed: 1, stopOnInteraction: false })],
  )

  return (
    <>
      {/* 헤더가 이 구간 위에 떠 있는 동안만 이미지에 녹아든 모습(투명 + blend)을 유지한다.
          Header가 이 표시를 보고 판단한다. 히어로까지 넓히면 캐러셀의 흰 상품 카드가
          투명 헤더 밑으로 지나가면서 로고/메뉴가 읽히지 않는다. */}
      <div data-header-overlay-region>
        <Banner />
      </div>

      <div className={styles.hero}>
        <SwirlBackground />
        <div className={styles.bestTitle}>베스트 상품을 만나보세요</div>
        <div className={styles.carouselViewport} ref={emblaRef}>
          <div className={styles.carouselContainer}>
            {/* Embla loop는 콘텐츠 총 너비가 부족하면 이음매에서 "loop fallback"으로 점프한다 —
                뷰포트의 2배 남짓으로는 여전히 빠듯해서 그 지점에서 튀어 보이므로, 세트를 네 번
                렌더링해 여유 있게 버퍼를 키운다. */}
            {Array.from({ length: PRODUCT_COUNT * 4 }, (_, index) => (
              <div key={index} className={styles.carouselSlide}>
                <ProductCard
                  product={{
                    imageSrcs: [macbook1, macbook2],
                    name: `NOVA Phone ${index + 1}`,
                    modelNumber: 'NV-2026',
                    colorName: '미드나이트',
                    colorSwatches: colorSwatches.map((swatch, i) => ({
                      ...swatch,
                      selected: i === selectedColor,
                    })),
                    storageOptions: storageLabels.map((label, i) => ({
                      label,
                      selected: i === selectedStorage,
                    })),
                    priceAmount: '1,290,000',
                  }}
                  onColorSelect={setSelectedColor}
                  onStorageSelect={setSelectedStorage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div
          className={[
            typography.title.xlSemibold,
            styles.recommendedTitle,
          ].join(' ')}
        >
          추천 상품
        </div>
        <div className={styles.recommendedSection}>
          {Array.from({ length: RECOMMENDED_COUNT }, (_, index) => (
            <ProductCard
              key={index}
              product={{
                imageSrcs: [macbook1, macbook2],
                name: `NOVA Phone ${index + 1}`,
                modelNumber: 'NV-2026',
                colorName: '미드나이트',
                colorSwatches: colorSwatches.map((swatch, i) => ({
                  ...swatch,
                  selected: i === recommendedColorSelections[index],
                })),
                storageOptions: storageLabels.map((label, i) => ({
                  label,
                  selected: i === recommendedStorageSelections[index],
                })),
                priceAmount: '1,290,000',
              }}
              onColorSelect={(i) =>
                setRecommendedColorSelections((prev) =>
                  prev.map((value, idx) => (idx === index ? i : value)),
                )
              }
              onStorageSelect={(i) =>
                setRecommendedStorageSelections((prev) =>
                  prev.map((value, idx) => (idx === index ? i : value)),
                )
              }
            />
          ))}
        </div>
      </Container>
    </>
  )
}
