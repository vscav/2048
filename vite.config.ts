import { join } from 'path'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  base: '/2048/',
  assetsDir: 'assets',
  alias: {
    '/@/': join(__dirname, 'src'),
  },
}

export default config
