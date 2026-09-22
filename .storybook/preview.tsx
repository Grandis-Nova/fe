import { MemoryRouter } from 'react-router'

import type { Preview } from '@storybook/react-vite'
import '../src/app/styles/index.css'
import '../src/shared/config/theme'

const preview: Preview = {
  decorators: [
    // 경로에 따라 화면이 달라지는 컴포넌트(Header 등)는 스토리에서
    // parameters: { initialEntries: ['/admin'] } 으로 진입 경로를 지정한다.
    (Story, { parameters }) => (
      <MemoryRouter initialEntries={parameters.initialEntries ?? ['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
