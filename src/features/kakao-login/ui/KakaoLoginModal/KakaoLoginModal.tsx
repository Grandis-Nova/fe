import { typography } from '@/shared/config/theme'

import { getKakaoAuthorizeUrl } from '../../lib/getKakaoAuthorizeUrl'

import * as styles from './KakaoLoginModal.css'

// 모달 껍데기(backdrop·X·애니메이션)는 shared/ui/Modal이 갖고 있다 —
// 여기선 내용만 만들고, 여는 쪽이 useModalStore.open(<KakaoLoginModal />)로 띄운다.
export function KakaoLoginModal() {
  return (
    <div className={styles.content}>
      <div className={[typography.title.lgSemibold, styles.title].join(' ')}>
        로그인
      </div>
      <div className={[typography.body.sub, styles.description].join(' ')}>
        카카오 계정으로 간편하게 시작하세요
      </div>
      <button
        type="button"
        className={[typography.button.mdBold, styles.kakaoButton].join(' ')}
        onClick={() => {
          window.location.href = getKakaoAuthorizeUrl()
        }}
      >
        카카오로 로그인
      </button>
    </div>
  )
}
