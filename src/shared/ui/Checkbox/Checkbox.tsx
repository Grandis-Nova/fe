import type { InputHTMLAttributes } from 'react'

import { Check } from 'lucide-react'

import * as styles from './Checkbox.css'

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
>

// checked를 가로채지 않고 그대로 흘려보낸다 — 여기서 기본값을 주면 defaultChecked로
// 비제어로 쓰려는 쪽까지 제어 컴포넌트가 돼서 React 경고가 난다.
// 체크 표시는 JS 값이 아니라 input:checked CSS로 토글하므로 두 방식 모두 동작한다.
export function Checkbox({ className, ...rest }: CheckboxProps) {
  return (
    <span className={[styles.root, className].filter(Boolean).join(' ')}>
      <input type="checkbox" className={styles.input} {...rest} />
      <span className={styles.box}>
        {checked && <Check className={styles.icon} aria-hidden="true" />}
      </span>
    </span>
  )
}
