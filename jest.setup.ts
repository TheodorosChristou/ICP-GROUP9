import '@testing-library/jest-dom'
import dotenv from 'dotenv'

import { TextEncoder, TextDecoder } from 'util';
dotenv.config({ path: '.env.local' })

Object.assign(global, { TextDecoder, TextEncoder });
import 'jest-fetch-mock'; // If you are using fetch in your code
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();
;