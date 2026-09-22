import { MemoryRouter } from 'react-router'

import type { Preview } from '@storybook/react-vite'
import '../src/app/styles/index.css'
import '../src/shared/config/theme'

const preview: Preview = {
  decorators: [
    // react-router는 <Router>를 중첩하면 에러를 던지므로, 특정 경로를 활성 상태로
    // 보고 싶은 story는 story 안에서 새 MemoryRouter로 감싸지 말고
    // parameters.initialEntries로 경로만 넘긴다.
    (Story, context) => (
      <MemoryRouter initialEntries={context.parameters.initialEntries ?? ['/']}>
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
