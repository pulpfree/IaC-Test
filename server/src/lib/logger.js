// Inpiration for this class came from:
//  https://www.sitepoint.com/logging-errors-client-side-apps/#rollingyourownserversidelogger
//  https://www.atatus.com/blog/fetch-api/

const request = require('request-promise')


class Logger {

  // Log levels as per https://tools.ietf.org/html/rfc5424
  static get ERROR()  { return 3 }
  static get WARN()   { return 4 }
  static get INFO()   { return 6 }
  static get DEBUG()  { return 7 }

  constructor(options) {
    if ( !options || typeof options !== 'object' ) {
      throw new Error('options are required, and must be an object')
    }

    if (!options.url) {
      throw new Error('options must include a url property')
    }

    this.headers = [
      {'Content-Type': 'application/json; charset=UTF-8'},
    ]
    this.appID      =  options.appID
    this.appType    =  options.appType
    this.url        =  options.url
    this.level      =  options.level || Logger.ERROR
    this.batchSize  =  options.batchSize || 10
    this.messages   =  []
  }

  send(messages) {
    const options = {
      method: 'POST',
      uri: this.url,
      body: {
        appID:    this.appID,
        appType:  this.appType,
        context: 'api server',
        messages,
        sentAt:   new Date(),
      },
      json: true,
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    }
    request(options)
      .catch(function (err) {
        console.error('err:', err) // eslint-disable-line no-console
      })
  }

  log(level, message) {
    const msg = JSON.stringify(message)
    if (level <= this.level) {
      this.messages.push({
        level,
        message: msg,
      })
      if (this.messages.length >= this.batchSize) {
        this.send(this.messages.splice(0, this.batchSize))
      }
    }
  }

  error(message) {
    this.log(Logger.ERROR, message)
  }

  warn(message) {
    this.log(Logger.WARN, message)
  }

  info(message) {
    this.log(Logger.INFO, message)
  }

  debug(message) {
    this.log(Logger.DEBUG, message)
    console.info('debug:', message) // eslint-disable-line no-console
  }

}

export default Logger
