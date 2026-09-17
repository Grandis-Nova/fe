import { sprinkles } from '@/shared/config/theme'
import { Banner } from '@/widgets/banner'

export function MainPage() {
  return (
    <>
      <Banner />
      <div
        className={sprinkles({
          display: 'flex',
          flexDirection: { mobile: 'column', desktop: 'row' },
          gap: { mobile: 12, desktop: 24 },
          padding: { mobile: 16, desktop: 40 },
        })}
      >
        <div>카드 1</div>
        <div>카드 2</div>
        <div>카드 3</div>
      </div>
    </>
  )
}
