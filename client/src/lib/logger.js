// Inpiration for this class came from:
//  https://www.sitepoint.com/logging-errors-client-side-apps/#rollingyourownserversidelogger
//  https://www.atatus.com/blog/fetch-api/

const Request = require('request')


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
    this.url        =  options.url
    this.level      =  options.level || Logger.ERROR
    this.batchSize  =  options.batchSize || 10
    this.messages   =  []
  }

  send(messages) {
    const req = new Request(this.url, {
      body:     JSON.stringify({
        appID:    this.appID,
        context:  navigator.userAgent, // eslint-disable-line no-undef
        messages,
        sentAt:   new Date(),
      }),
      method:   'POST',
      redirect: 'follow',
    })

    this.headers.forEach(hdr => req.setHeader(Object.keys(hdr)[0], hdr[Object.keys(hdr)[0]]))

    fetch(req).then(ret => { // eslint-disable-line no-undef
      if (!ret.ok) {
        console.log('ret:', ret) // eslint-disable-line no-console
      }
    })
  }

  log(level, message) {
    // console.log('typeof:', typeof message)
    // console.log('message:', message)
    const msg = JSON.stringify(message)
    // console.log('msg:', msg)
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
