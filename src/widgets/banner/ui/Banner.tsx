import * as styles from './Banner.css'

export function Banner() {
  return (
    <div className={styles.root}>
      <img
        src="/images/banner1.png"
        alt="New iPhone Pro&Max and Duo — 아이폰 예약은 속도가 생명, 더 빠른 사전예약 시작"
        className={styles.image}
      />
    </div>
  )
}
