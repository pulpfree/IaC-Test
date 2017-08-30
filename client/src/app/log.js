import Logger from '../lib/logger'

import settings from '../config/settings'
// console.log('settings:', settings)

const log = new Logger({
  url:        'http://localhost:3021',
  batchSize:  2,
  level:      Logger.INFO,
  appID:      settings.appID,
})

export default log
