import Logger from './lib/logger'

import settings from './config/settings'

const log = new Logger({
  url:        settings.loggerAddress,
  batchSize:  2,
  level:      Logger.INFO,
  appID:      settings.appID,
  appType:    settings.appType,
})

module.exports = log
