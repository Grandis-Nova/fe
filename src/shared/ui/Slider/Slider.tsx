import { Children, useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import useEmblaCarousel from 'embla-carousel-react'

import * as styles from './Slider.css'

export type SliderProps = {
  children: ReactNode
  loop?: boolean
  className?: string
}

export function Slider({ children, loop = true, className }: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [snapCount, setSnapCount] = useState(0)
  const slides = Children.toArray(children)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSnapCount(emblaApi.scrollSnapList().length)
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  )

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((slide, index) => (
            <div key={index} className={styles.slide}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {snapCount > 1 && (
        <div className={styles.indicators}>
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`${index + 1}번째 슬라이드로 이동`}
              className={styles.indicator}
              data-active={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
