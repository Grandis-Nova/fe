import { Children } from 'react'
import type { ReactNode } from 'react'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import * as styles from './Slider.css'

export type SliderProps = {
  children: ReactNode
  loop?: boolean
  className?: string
}

export function Slider({ children, loop = true, className }: SliderProps) {
  const slides = Children.toArray(children)
  const hasMultipleSlides = slides.length > 1

  return (
    <Swiper
      modules={[Pagination]}
      loop={loop && hasMultipleSlides}
      pagination={hasMultipleSlides ? { clickable: true } : false}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  )
}
