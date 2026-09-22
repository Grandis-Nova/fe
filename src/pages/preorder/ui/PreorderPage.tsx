import { PreorderCard } from '@/entities/preorder'
import placeholderImage from '@/shared/assets/react.svg'
import { Container } from '@/shared/ui'

import * as styles from './PreorderPage.css'

export function PreorderPage() {
  return (
    <Container>
      <div className={styles.title}>사전예약</div>
      <div className={styles.cardGrid}>
        <PreorderCard
          data={{
            id: '1',
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title:
              '아이폰 18프로, 18프로맥스, 울트라 사전예약 프로모션 아이폰 18프로, 18프로맥스, 울트라 사전예약 프로모션 아이폰 18프로, 18프로맥스, 울트라 사전예약 프로모션',
            opens_at: '2026.09.01',
            closes_at: '2026.09.17',
          }}
        />
        <PreorderCard
          data={{
            id: '2',
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            opens_at: '2026.09.01',
            closes_at: '2026.09.17',
          }}
        />
        <PreorderCard
          data={{
            id: '3',
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            opens_at: 'Preorder Opens At',
            closes_at: 'Preorder Closes At',
          }}
        />
        <PreorderCard
          data={{
            id: '4',
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            opens_at: 'Preorder Opens At',
            closes_at: 'Preorder Closes At',
          }}
        />
        <PreorderCard
          data={{
            id: '5',
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            opens_at: 'Preorder Opens At',
            closes_at: 'Preorder Closes At',
          }}
        />
        <PreorderCard
          data={{
            id: '6',
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            opens_at: 'Preorder Opens At',
            closes_at: 'Preorder Closes At',
          }}
        />
        <PreorderCard
          data={{
            id: '7',
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            opens_at: 'Preorder Opens At',
            closes_at: 'Preorder Closes At',
          }}
        />
        <PreorderCard
          data={{
            id: '8',
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            opens_at: 'Preorder Opens At',
            closes_at: 'Preorder Closes At',
          }}
        />
      </div>
    </Container>
  )
}
