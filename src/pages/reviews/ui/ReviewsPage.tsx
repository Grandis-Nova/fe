import { mockReviews, ReviewCard } from '@/entities/review'
import { Container } from '@/shared/ui'

import * as styles from './ReviewsPage.css'

export function ReviewsPage() {
  return (
    <Container>
      <div className={styles.title}>구매후기</div>
      <div className={styles.list}>
        {mockReviews.map(({ id, ...review }) => (
          <ReviewCard key={id} {...review} />
        ))}
      </div>
    </Container>
  )
}
