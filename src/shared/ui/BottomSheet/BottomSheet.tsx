import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { Drawer as VaulDrawer } from 'vaul'

import * as styles from './BottomSheet.css'


export const Root = VaulDrawer.Root
export const Trigger = VaulDrawer.Trigger
export const Close = VaulDrawer.Close
export const Title = VaulDrawer.Title
export const Description = VaulDrawer.Description

export type BottomSheetContentProps = ComponentPropsWithoutRef<
  typeof VaulDrawer.Content
>

export const Content = forwardRef<HTMLDivElement, BottomSheetContentProps>(
  function Content({ className, children, ...rest }, ref) {
    return (
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className={styles.overlay} />
        <VaulDrawer.Content
          ref={ref}
          className={[styles.content, className].filter(Boolean).join(' ')}
          {...rest}
        >
          <div className={styles.handle} />
          {children}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    )
  },
)
