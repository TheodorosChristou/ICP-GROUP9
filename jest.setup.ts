import '@testing-library/jest-dom'
import dotenv from 'dotenv'

import { TextEncoder, TextDecoder } from 'util';
dotenv.config({ path: '.env.local' })

Object.assign(global, { TextDecoder, TextEncoder });

;