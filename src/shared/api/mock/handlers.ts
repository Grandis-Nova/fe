import { cartHandlers } from './handlers/cart'
import { productHandlers } from './handlers/product'

import type { RequestHandler } from 'msw'

export const handlers: RequestHandler[] = [...productHandlers, ...cartHandlers]
