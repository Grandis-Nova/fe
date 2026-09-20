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
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            period: 'Preorder Period',
          }}
        />
        <PreorderCard
          data={{
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            period: 'Preorder Period',
          }}
        />
        <PreorderCard
          data={{
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            period: 'Preorder Period',
          }}
        />
        <PreorderCard
          data={{
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            period: 'Preorder Period',
          }}
        />
        <PreorderCard
          data={{
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            period: 'Preorder Period',
          }}
        />
        <PreorderCard
          data={{
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            period: 'Preorder Period',
          }}
        />
        <PreorderCard
          data={{
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            period: 'Preorder Period',
          }}
        />
        <PreorderCard
          data={{
            imageSrc: placeholderImage,
            imageAlt: 'Image description',
            title: 'Preorder Title',
            period: 'Preorder Period',
          }}
        />
      </div>
    </Container>
  )
}
