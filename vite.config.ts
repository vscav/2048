import { join } from 'path'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  base: process.env.NODE_ENV === 'production' ? '/2048/' : '/',
  alias: {
    '/@/': join(__dirname, 'src'),
  },
}

export default config
