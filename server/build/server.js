/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _logger = __webpack_require__(18);

var _logger2 = _interopRequireDefault(_logger);

var _settings = __webpack_require__(5);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = new _logger2.default({
  url: _settings2.default.loggerAddress,
  batchSize: 2,
  level: _logger2.default.INFO,
  appID: _settings2.default.appID,
  appType: _settings2.default.appType
});

module.exports = log;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = __webpack_require__(20);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var envSettings = Object.assign({}, _lodash2.default.pickBy(_app.app, function (v, k) {
  return k !== 'env';
}), _lodash2.default.get(_app.app, 'env.' + process.env.NODE_ENV));

exports.default = envSettings;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hapi = __webpack_require__(8);

var _hapi2 = _interopRequireDefault(_hapi);

var _apolloServerHapi = __webpack_require__(9);

var _graphqlTools = __webpack_require__(11);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _connectors = __webpack_require__(22);

var _connectors2 = _interopRequireDefault(_connectors);

var _resolvers = __webpack_require__(24);

var _resolvers2 = _interopRequireDefault(_resolvers);

var _schema = __webpack_require__(29);

var _lodash = __webpack_require__(0);

var _extracted_queries = __webpack_require__(21);

var _extracted_queries2 = _interopRequireDefault(_extracted_queries);

var _settings = __webpack_require__(5);

var _settings2 = _interopRequireDefault(_settings);

var _log = __webpack_require__(4);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initiate Mongoose

// import constants from './config/constants'
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_settings2.default.DBURI, _settings2.default.DBOptions).then().catch(function (err) {
  //note: this is likely redundant, need to test which is better
  console.error('err:', err); // eslint-disable-line
  _log2.default.error(err);
});

var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'Connection error:')); // eslint-disable-line no-console
db.once('open', function () {
  return console.log('mongodb is connected');
}); // eslint-disable-line no-console

var server = new _hapi2.default.Server();
server.connection({
  host: _settings2.default.appHost,
  port: _settings2.default.appPort,
  routes: { cors: true }
});

var executableSchema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _schema.typeDefs,
  resolvers: _resolvers2.default,
  resolverValidationOptions: {
    // requireResolversForAllFields: false,
    // requireResolversForArgs: false,
    requireResolversForNonScalar: false
  },
  // allowUndefinedInResolve: true,
  printErrors: true
});

server.ext('onPreHandler', function (req, reply) {
  if (req.url.path.indexOf('/graphql') >= 0 && req.payload.id) {
    var invertedMap = (0, _lodash.invert)(_extracted_queries2.default);
    req.payload.query = invertedMap[req.payload.id];
    _log2.default.info({ query: req.payload.query });
  }
  return reply.continue();
});

server.register({
  register: _apolloServerHapi.graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: function graphqlOptions() {
      return {
        schema: executableSchema,
        context: { constructor: _connectors2.default },
        formatError: function formatError(error) {
          // console.error('error stack:', error.stack) // eslint-disable-line no-console
          _log2.default.error(error.stack);
          return error;
        }
      };
    }
  }
});

server.register({
  register: _apolloServerHapi.graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql'
    }
  }
}, function (err) {
  if (err) {
    throw err;
  }

  server.start(function () {
    server.log('info', 'Server running at ' + server.info.uri);
    _log2.default.info('Server running at ' + server.info.uri);
  });
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("hapi");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-hapi");

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mongoose = __webpack_require__(1);

var PhoneSchema = Mongoose.Schema({
  countryCode: {
    type: String,
    trim: true,
    default: '1'
  },
  id: String,
  extension: Number,
  number: String
});

var ContactSchema = Mongoose.Schema({
  active: {
    type: Boolean,
    default: true
  },
  email: {
    type: String,
    index: true,
    trim: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  name: {
    first: String,
    last: String,
    prefix: String
  },
  phones: [PhoneSchema]
}, {
  timestamps: true
});

var Contact = Mongoose.model('Contact', ContactSchema);
module.exports = Contact;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Inpiration for this class came from:
//  https://www.sitepoint.com/logging-errors-client-side-apps/#rollingyourownserversidelogger
//  https://www.atatus.com/blog/fetch-api/

var request = __webpack_require__(19);

var Logger = function () {
  _createClass(Logger, null, [{
    key: 'ERROR',


    // Log levels as per https://tools.ietf.org/html/rfc5424
    get: function get() {
      return 3;
    }
  }, {
    key: 'WARN',
    get: function get() {
      return 4;
    }
  }, {
    key: 'INFO',
    get: function get() {
      return 6;
    }
  }, {
    key: 'DEBUG',
    get: function get() {
      return 7;
    }
  }]);

  function Logger(options) {
    _classCallCheck(this, Logger);

    if (!options || (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
      throw new Error('options are required, and must be an object');
    }

    if (!options.url) {
      throw new Error('options must include a url property');
    }

    this.headers = [{ 'Content-Type': 'application/json; charset=UTF-8' }];
    this.appID = options.appID;
    this.appType = options.appType;
    this.url = options.url;
    this.level = options.level || Logger.ERROR;
    this.batchSize = options.batchSize || 10;
    this.messages = [];
  }

  _createClass(Logger, [{
    key: 'send',
    value: function send(messages) {
      var options = {
        method: 'POST',
        uri: this.url,
        body: {
          appID: this.appID,
          appType: this.appType,
          context: 'api server',
          messages: messages,
          sentAt: new Date()
        },
        json: true,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
      };
      request(options).catch(function (err) {
        console.error('err:', err); // eslint-disable-line no-console
      });
    }
  }, {
    key: 'log',
    value: function log(level, message) {
      var msg = JSON.stringify(message);
      if (level <= this.level) {
        this.messages.push({
          level: level,
          message: msg
        });
        if (this.messages.length >= this.batchSize) {
          this.send(this.messages.splice(0, this.batchSize));
        }
      }
    }
  }, {
    key: 'error',
    value: function error(message) {
      this.log(Logger.ERROR, message);
    }
  }, {
    key: 'warn',
    value: function warn(message) {
      this.log(Logger.WARN, message);
    }
  }, {
    key: 'info',
    value: function info(message) {
      this.log(Logger.INFO, message);
    }
  }, {
    key: 'debug',
    value: function debug(message) {
      this.log(Logger.DEBUG, message);
      console.info('debug:', message); // eslint-disable-line no-console
    }
  }]);

  return Logger;
}();

exports.default = Logger;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {"app":{"apolloLogging":true,"appHost":"0.0.0.0","appID":"599f59bf4939534628c01b9d","appPort":3300,"appType":"server","DBOptions":{"useMongoClient":true},"DBURI":"mongodb://10.0.1.9:27017/iat-test","localhostIP":"10.0.1.9","loggerAddress":"http://localhost:3021","persistGraphQL":true,"remoteLogging":true,"env":{"production":{"apolloLogging":false}}}}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/rondyck/Projects/IaC-Test/client/extracted_queries.json'");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contact = __webpack_require__(23);

var _contact2 = _interopRequireDefault(_contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Contact: _contact2.default
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contact = __webpack_require__(17);

var _contact2 = _interopRequireDefault(_contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contact = function Contact() {
  _classCallCheck(this, Contact);

  this.create = function (fields) {
    var contact = fields.contact;

    return new _contact2.default(contact).save();
  };

  this.update = function (input) {
    var contact = input.contact;

    return _contact2.default.findByIdAndUpdate(contact._id, contact, { new: true }).exec();
  };

  this.remove = function (_id) {
    return _contact2.default.remove({ _id: _id }).exec().then(function (res) {
      return res.result;
    });
  };

  this.fetchById = function (_ref) {
    var _id = _ref._id;

    return _contact2.default.findOne({ _id: _id }).exec();
  };

  this.fetchByEmail = function (_ref2) {
    var email = _ref2.email;

    return _contact2.default.findOne({ email: email }).exec();
  };

  this.fetchByActive = function (_ref3) {
    var active = _ref3.active;

    return _contact2.default.find({ active: active }).exec();
  };

  this.searchByEmail = function (fields) {
    var active = fields.active,
        email = fields.email;

    var q = {
      active: active,
      email: new RegExp('^' + email, 'i')
    };
    return _contact2.default.find(q).exec();
  };
};

exports.default = Contact;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _queries = __webpack_require__(25);

var _queries2 = _interopRequireDefault(_queries);

var _mutations = __webpack_require__(27);

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveFunctions = {
  Query: _extends({}, _queries2.default),
  Mutation: _extends({}, _mutations2.default)
};

module.exports = resolveFunctions;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _contact = __webpack_require__(26);

var contact = _interopRequireWildcard(_contact);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = _extends({}, contact);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchById = exports.fetchById = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref2, ctx) {
    var _id = _ref2._id;
    var contact;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contact = new ctx.constructor.Contact();
            _context.next = 3;
            return contact.fetchById({ _id: _id });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchById(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var fetchByEmail = exports.fetchByEmail = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref4, ctx) {
    var email = _ref4.email;
    var contact;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            contact = new ctx.constructor.Contact();
            _context2.next = 3;
            return contact.fetchByEmail({ email: email });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function fetchByEmail(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var fetchContacts = exports.fetchContacts = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref6, ctx) {
    var _ref6$active = _ref6.active,
        active = _ref6$active === undefined ? true : _ref6$active;
    var contact;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            contact = new ctx.constructor.Contact();
            _context3.next = 3;
            return contact.fetchByActive({ active: active });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function fetchContacts(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var searchByEmail = exports.searchByEmail = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref8, ctx) {
    var active = _ref8.active,
        email = _ref8.email;
    var contact;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            contact = new ctx.constructor.Contact();
            _context4.next = 3;
            return contact.searchByEmail({ active: active, email: email });

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function searchByEmail(_x10, _x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _contact = __webpack_require__(28);

var contact = _interopRequireWildcard(_contact);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = _extends({}, contact);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createContact = exports.createContact = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref2, ctx) {
    var input = _ref2.input;
    var contact;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contact = new ctx.constructor.Contact();
            _context.next = 3;
            return contact.create({ contact: input });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createContact(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var updateContact = exports.updateContact = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref4, ctx) {
    var input = _ref4.input;
    var contact;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            contact = new ctx.constructor.Contact();
            _context2.next = 3;
            return contact.update({ contact: input });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function updateContact(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var removeContact = exports.removeContact = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref6, ctx) {
    var _id = _ref6._id;
    var contact;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            contact = new ctx.constructor.Contact();
            _context3.next = 3;
            return contact.remove({ _id: _id });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function removeContact(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeDefs = exports.typeDefs = "\n\n# Contact ===============================\n\ntype Contact {\n  _id: ID\n  active: Boolean\n  email: String\n  name: ContactName\n  phones: [ContactPhone]\n  updatedAt: String\n  createdAt: String\n}\n\ntype ContactName {\n  first: String\n  last: String\n  prefix: String\n}\n\ntype ContactPhone {\n  id: String\n  countryCode: String\n  extension: Int\n  number: String\n}\n\ninput ContactInput {\n  _id: ID\n  active: Boolean\n  email: String\n  name: ContactNameInput\n  phones: [ContactPhoneInput]\n}\n\ninput ContactNameInput {\n  first: String\n  last: String\n  prefix: String\n}\n\ninput ContactPhoneInput {\n  id: String!\n  countryCode: String\n  extension: Int\n  number: String!\n}\n\ninput ContactSearchInput {\n  active: Boolean\n  email: String!\n}\n\n# Generic types =========================\n\ntype RemoveResult {\n  ok: Int\n  n: Int\n}\n\ntype UpdateResult {\n  _id: ID\n  ok: Int\n  n: Int\n  nModified: Int\n}\n\n\n# Queries ===============================\n\ntype Query {\n\n  fetchContacts(active:Boolean): [Contact]\n  fetchById(_id:ID!): Contact\n  fetchByEmail(email:String!): Contact\n  searchByEmail(active:Boolean, email:String!): [Contact]\n}\n\n# Mutations =============================\n\ntype Mutation {\n\n  createContact(input:ContactInput): Contact\n  updateContact(input:ContactInput): Contact\n  removeContact(_id:ID!): RemoveResult\n}\n";

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzc4YWYwOTcyMjRmY2I1ZmZmMGIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcvc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoYXBpXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1oYXBpXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ3JhcGhxbC10b29sc1wiIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9jb250YWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvbG9nZ2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlcXVlc3QtcHJvbWlzZVwiIiwid2VicGFjazovLy8uL3NyYy9jb25maWcvYXBwLmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nvbm5lY3RvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nvbm5lY3RvcnMvY29udGFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzb2x2ZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9yZXNvbHZlcnMvcXVlcmllcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzb2x2ZXJzL3F1ZXJpZXMvY29udGFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzb2x2ZXJzL211dGF0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzb2x2ZXJzL211dGF0aW9ucy9jb250YWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEuanMiXSwibmFtZXMiOlsibG9nIiwidXJsIiwibG9nZ2VyQWRkcmVzcyIsImJhdGNoU2l6ZSIsImxldmVsIiwiSU5GTyIsImFwcElEIiwiYXBwVHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJlbnZTZXR0aW5ncyIsIk9iamVjdCIsImFzc2lnbiIsInBpY2tCeSIsInYiLCJrIiwiZ2V0IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJEQlVSSSIsIkRCT3B0aW9ucyIsInRoZW4iLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsImVyciIsImRiIiwiY29ubmVjdGlvbiIsIm9uIiwiYmluZCIsIm9uY2UiLCJzZXJ2ZXIiLCJTZXJ2ZXIiLCJob3N0IiwiYXBwSG9zdCIsInBvcnQiLCJhcHBQb3J0Iiwicm91dGVzIiwiY29ycyIsImV4ZWN1dGFibGVTY2hlbWEiLCJ0eXBlRGVmcyIsInJlc29sdmVycyIsInJlc29sdmVyVmFsaWRhdGlvbk9wdGlvbnMiLCJyZXF1aXJlUmVzb2x2ZXJzRm9yTm9uU2NhbGFyIiwicHJpbnRFcnJvcnMiLCJleHQiLCJyZXEiLCJyZXBseSIsInBhdGgiLCJpbmRleE9mIiwicGF5bG9hZCIsImlkIiwiaW52ZXJ0ZWRNYXAiLCJxdWVyeSIsImluZm8iLCJjb250aW51ZSIsInJlZ2lzdGVyIiwib3B0aW9ucyIsImdyYXBocWxPcHRpb25zIiwic2NoZW1hIiwiY29udGV4dCIsImNvbnN0cnVjdG9yIiwiZm9ybWF0RXJyb3IiLCJzdGFjayIsImdyYXBoaXFsT3B0aW9ucyIsImVuZHBvaW50VVJMIiwic3RhcnQiLCJ1cmkiLCJNb25nb29zZSIsInJlcXVpcmUiLCJQaG9uZVNjaGVtYSIsIlNjaGVtYSIsImNvdW50cnlDb2RlIiwidHlwZSIsIlN0cmluZyIsInRyaW0iLCJkZWZhdWx0IiwiZXh0ZW5zaW9uIiwiTnVtYmVyIiwibnVtYmVyIiwiQ29udGFjdFNjaGVtYSIsImFjdGl2ZSIsIkJvb2xlYW4iLCJlbWFpbCIsImluZGV4IiwidW5pcXVlIiwibWF0Y2giLCJuYW1lIiwiZmlyc3QiLCJsYXN0IiwicHJlZml4IiwicGhvbmVzIiwidGltZXN0YW1wcyIsIkNvbnRhY3QiLCJtb2RlbCIsInJlcXVlc3QiLCJMb2dnZXIiLCJFcnJvciIsImhlYWRlcnMiLCJFUlJPUiIsIm1lc3NhZ2VzIiwibWV0aG9kIiwiYm9keSIsInNlbnRBdCIsIkRhdGUiLCJqc29uIiwibWVzc2FnZSIsIm1zZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdXNoIiwibGVuZ3RoIiwic2VuZCIsInNwbGljZSIsIldBUk4iLCJERUJVRyIsImNyZWF0ZSIsImNvbnRhY3QiLCJmaWVsZHMiLCJzYXZlIiwidXBkYXRlIiwiaW5wdXQiLCJmaW5kQnlJZEFuZFVwZGF0ZSIsIl9pZCIsIm5ldyIsImV4ZWMiLCJyZW1vdmUiLCJyZXMiLCJyZXN1bHQiLCJmZXRjaEJ5SWQiLCJmaW5kT25lIiwiZmV0Y2hCeUVtYWlsIiwiZmV0Y2hCeUFjdGl2ZSIsImZpbmQiLCJzZWFyY2hCeUVtYWlsIiwicSIsIlJlZ0V4cCIsInJlc29sdmVGdW5jdGlvbnMiLCJRdWVyeSIsIk11dGF0aW9uIiwiXyIsImN0eCIsImZldGNoQ29udGFjdHMiLCJjcmVhdGVDb250YWN0IiwidXBkYXRlQ29udGFjdCIsInJlbW92ZUNvbnRhY3QiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxtQzs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFFQTs7Ozs7O0FBRUEsSUFB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QUE7QUFBQSxHQUFOOztBQUtBLElBQU13QjtBQUFBLHNFQUFnQixrQkFBT0wsQ0FBUCxTQUFtQkMsR0FBbkI7QUFBQSxRQUFZbEIsR0FBWixTQUFZQSxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNyQk4sbUJBRHFCLEdBQ1gsSUFBSXdCLElBQUloRixXQUFKLENBQWdCZ0MsT0FBcEIsRUFEVztBQUFBO0FBQUEsbUJBRWR3QixRQUFRUyxNQUFSLENBQWUsRUFBQ0gsUUFBRCxFQUFmLENBRmM7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFoQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOLEM7Ozs7Ozs7Ozs7OztBQ1hBLElBQU1uRixvNENBQU4sQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNzhhZjA5NzIyNGZjYjVmZmYwYiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImxvZGFzaFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9uZ29vc2VcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgTG9nZ2VyIGZyb20gJy4vbGliL2xvZ2dlcidcblxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vY29uZmlnL3NldHRpbmdzJ1xuXG5jb25zdCBsb2cgPSBuZXcgTG9nZ2VyKHtcbiAgdXJsOiAgICAgICAgc2V0dGluZ3MubG9nZ2VyQWRkcmVzcyxcbiAgYmF0Y2hTaXplOiAgMixcbiAgbGV2ZWw6ICAgICAgTG9nZ2VyLklORk8sXG4gIGFwcElEOiAgICAgIHNldHRpbmdzLmFwcElELFxuICBhcHBUeXBlOiAgICBzZXR0aW5ncy5hcHBUeXBlLFxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBsb2dcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sb2cuanMiLCJpbXBvcnQgeyBhcHAgYXMgc2V0dGluZ3MgfSBmcm9tICcuL2FwcC5qc29uJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBlbnZTZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oXG4gIHt9LFxuICBfLnBpY2tCeShzZXR0aW5ncywgKHYsIGspID0+IGsgIT09ICdlbnYnKSxcbiAgXy5nZXQoc2V0dGluZ3MsIGBlbnYuJHtwcm9jZXNzLmVudi5OT0RFX0VOVn1gKVxuKVxuXG5leHBvcnQgZGVmYXVsdCBlbnZTZXR0aW5nc1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25maWcvc2V0dGluZ3MuanMiLCJpbXBvcnQgaGFwaSBmcm9tICdoYXBpJ1xuaW1wb3J0IHsgZ3JhcGhpcWxIYXBpLCBncmFwaHFsSGFwaSB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItaGFwaSdcbmltcG9ydCB7IG1ha2VFeGVjdXRhYmxlU2NoZW1hIH0gZnJvbSAnZ3JhcGhxbC10b29scydcbmltcG9ydCBNb25nb29zZSBmcm9tICdtb25nb29zZSdcblxuaW1wb3J0IGNvbm5lY3RvcnMgZnJvbSAnLi9jb25uZWN0b3JzJ1xuLy8gaW1wb3J0IGNvbnN0YW50cyBmcm9tICcuL2NvbmZpZy9jb25zdGFudHMnXG5pbXBvcnQgcmVzb2x2ZXJzIGZyb20gJy4vcmVzb2x2ZXJzJ1xuaW1wb3J0IHsgdHlwZURlZnMgfSBmcm9tICcuL3NjaGVtYSdcblxuaW1wb3J0IHsgaW52ZXJ0IH0gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHF1ZXJ5TWFwIGZyb20gJy4vZXh0cmFjdGVkX3F1ZXJpZXMuanNvbidcblxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vY29uZmlnL3NldHRpbmdzJ1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZydcblxuXG4vLyBJbml0aWF0ZSBNb25nb29zZVxuTW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlXG5Nb25nb29zZS5jb25uZWN0KHNldHRpbmdzLkRCVVJJLCBzZXR0aW5ncy5EQk9wdGlvbnMpXG4gIC50aGVuKClcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgLy9ub3RlOiB0aGlzIGlzIGxpa2VseSByZWR1bmRhbnQsIG5lZWQgdG8gdGVzdCB3aGljaCBpcyBiZXR0ZXJcbiAgICBjb25zb2xlLmVycm9yKCdlcnI6JywgZXJyKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgbG9nLmVycm9yKGVycilcbiAgfVxuKVxuXG5jb25zdCBkYiA9IE1vbmdvb3NlLmNvbm5lY3Rpb25cbmRiLm9uKCdlcnJvcicsIGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlLCAnQ29ubmVjdGlvbiBlcnJvcjonKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5kYi5vbmNlKCdvcGVuJywgKCkgPT4gY29uc29sZS5sb2coJ21vbmdvZGIgaXMgY29ubmVjdGVkJykpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG5jb25zdCBzZXJ2ZXIgPSBuZXcgaGFwaS5TZXJ2ZXIoKVxuc2VydmVyLmNvbm5lY3Rpb24oe1xuICBob3N0OiBzZXR0aW5ncy5hcHBIb3N0LFxuICBwb3J0OiBzZXR0aW5ncy5hcHBQb3J0LFxuICByb3V0ZXM6IHtjb3JzOiB0cnVlfSxcbn0pXG5cbmNvbnN0IGV4ZWN1dGFibGVTY2hlbWEgPSBtYWtlRXhlY3V0YWJsZVNjaGVtYSh7XG4gIHR5cGVEZWZzLFxuICByZXNvbHZlcnMsXG4gIHJlc29sdmVyVmFsaWRhdGlvbk9wdGlvbnM6IHtcbiAgICAvLyByZXF1aXJlUmVzb2x2ZXJzRm9yQWxsRmllbGRzOiBmYWxzZSxcbiAgICAvLyByZXF1aXJlUmVzb2x2ZXJzRm9yQXJnczogZmFsc2UsXG4gICAgcmVxdWlyZVJlc29sdmVyc0Zvck5vblNjYWxhcjogZmFsc2UsXG4gIH0sXG4gIC8vIGFsbG93VW5kZWZpbmVkSW5SZXNvbHZlOiB0cnVlLFxuICBwcmludEVycm9yczogdHJ1ZSxcbn0pXG5cbnNlcnZlci5leHQoJ29uUHJlSGFuZGxlcicsIChyZXEsIHJlcGx5KSA9PiB7XG4gIGlmIChyZXEudXJsLnBhdGguaW5kZXhPZignL2dyYXBocWwnKSA+PSAwICYmIHJlcS5wYXlsb2FkLmlkKSB7XG4gICAgY29uc3QgaW52ZXJ0ZWRNYXAgPSBpbnZlcnQocXVlcnlNYXApXG4gICAgcmVxLnBheWxvYWQucXVlcnkgPSBpbnZlcnRlZE1hcFtyZXEucGF5bG9hZC5pZF1cbiAgICBsb2cuaW5mbyh7cXVlcnk6IHJlcS5wYXlsb2FkLnF1ZXJ5fSlcbiAgfVxuICByZXR1cm4gcmVwbHkuY29udGludWUoKVxufSlcblxuc2VydmVyLnJlZ2lzdGVyKHtcbiAgcmVnaXN0ZXI6IGdyYXBocWxIYXBpLFxuICBvcHRpb25zOiB7XG4gICAgcGF0aDogJy9ncmFwaHFsJyxcbiAgICBncmFwaHFsT3B0aW9uczogKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NoZW1hOiBleGVjdXRhYmxlU2NoZW1hLFxuICAgICAgICBjb250ZXh0OiB7IGNvbnN0cnVjdG9yOiBjb25uZWN0b3JzIH0sXG4gICAgICAgIGZvcm1hdEVycm9yKGVycm9yKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcignZXJyb3Igc3RhY2s6JywgZXJyb3Iuc3RhY2spIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGxvZy5lcnJvcihlcnJvci5zdGFjaylcbiAgICAgICAgICByZXR1cm4gZXJyb3JcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufSlcblxuc2VydmVyLnJlZ2lzdGVyKHtcbiAgcmVnaXN0ZXI6IGdyYXBoaXFsSGFwaSxcbiAgb3B0aW9uczoge1xuICAgIHBhdGg6ICcvZ3JhcGhpcWwnLFxuICAgIGdyYXBoaXFsT3B0aW9uczoge1xuICAgICAgZW5kcG9pbnRVUkw6ICcvZ3JhcGhxbCcsXG4gICAgfSxcbiAgfSxcbn0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgaWYgKGVycikgeyB0aHJvdyBlcnIgfVxuXG4gIHNlcnZlci5zdGFydChmdW5jdGlvbiAoKSB7XG4gICAgc2VydmVyLmxvZygnaW5mbycsIGBTZXJ2ZXIgcnVubmluZyBhdCAke3NlcnZlci5pbmZvLnVyaX1gKVxuICAgIGxvZy5pbmZvKGBTZXJ2ZXIgcnVubmluZyBhdCAke3NlcnZlci5pbmZvLnVyaX1gKVxuICB9KVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoYXBpXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGFwaVwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItaGFwaVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItaGFwaVwiXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdyYXBocWwtdG9vbHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJncmFwaHFsLXRvb2xzXCJcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IE1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKVxuXG5jb25zdCBQaG9uZVNjaGVtYSA9IE1vbmdvb3NlLlNjaGVtYSh7XG4gIGNvdW50cnlDb2RlOiAge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICB0cmltOiB0cnVlLFxuICAgIGRlZmF1bHQ6ICcxJyxcbiAgfSxcbiAgaWQ6ICAgICAgICAgIFN0cmluZyxcbiAgZXh0ZW5zaW9uOiAgICBOdW1iZXIsXG4gIG51bWJlcjogICAgICAgU3RyaW5nLFxufSlcblxuY29uc3QgQ29udGFjdFNjaGVtYSA9IE1vbmdvb3NlLlNjaGVtYSh7XG4gIGFjdGl2ZToge1xuICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgfSxcbiAgZW1haWw6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgaW5kZXg6ICAgIHRydWUsXG4gICAgdHJpbTogICAgIHRydWUsXG4gICAgdW5pcXVlOiAgIHRydWUsXG4gICAgbWF0Y2g6ICAgIFsvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsM30pKyQvLCAnUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJ10sXG4gIH0sXG4gIG5hbWU6IHtcbiAgICBmaXJzdDogIFN0cmluZyxcbiAgICBsYXN0OiAgIFN0cmluZyxcbiAgICBwcmVmaXg6IFN0cmluZyxcbiAgfSxcbiAgcGhvbmVzOiBbUGhvbmVTY2hlbWFdLFxufSx7XG4gIHRpbWVzdGFtcHM6IHRydWUsXG59KVxuXG5jb25zdCBDb250YWN0ID0gTW9uZ29vc2UubW9kZWwoJ0NvbnRhY3QnLCBDb250YWN0U2NoZW1hKVxubW9kdWxlLmV4cG9ydHMgPSBDb250YWN0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZGVsL2NvbnRhY3QuanMiLCIvLyBJbnBpcmF0aW9uIGZvciB0aGlzIGNsYXNzIGNhbWUgZnJvbTpcbi8vICBodHRwczovL3d3dy5zaXRlcG9pbnQuY29tL2xvZ2dpbmctZXJyb3JzLWNsaWVudC1zaWRlLWFwcHMvI3JvbGxpbmd5b3Vyb3duc2VydmVyc2lkZWxvZ2dlclxuLy8gIGh0dHBzOi8vd3d3LmF0YXR1cy5jb20vYmxvZy9mZXRjaC1hcGkvXG5cbmNvbnN0IHJlcXVlc3QgPSByZXF1aXJlKCdyZXF1ZXN0LXByb21pc2UnKVxuXG5cbmNsYXNzIExvZ2dlciB7XG5cbiAgLy8gTG9nIGxldmVscyBhcyBwZXIgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzU0MjRcbiAgc3RhdGljIGdldCBFUlJPUigpICB7IHJldHVybiAzIH1cbiAgc3RhdGljIGdldCBXQVJOKCkgICB7IHJldHVybiA0IH1cbiAgc3RhdGljIGdldCBJTkZPKCkgICB7IHJldHVybiA2IH1cbiAgc3RhdGljIGdldCBERUJVRygpICB7IHJldHVybiA3IH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgaWYgKCAhb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMgYXJlIHJlcXVpcmVkLCBhbmQgbXVzdCBiZSBhbiBvYmplY3QnKVxuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy51cmwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb3B0aW9ucyBtdXN0IGluY2x1ZGUgYSB1cmwgcHJvcGVydHknKVxuICAgIH1cblxuICAgIHRoaXMuaGVhZGVycyA9IFtcbiAgICAgIHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnfSxcbiAgICBdXG4gICAgdGhpcy5hcHBJRCAgICAgID0gIG9wdGlvbnMuYXBwSURcbiAgICB0aGlzLmFwcFR5cGUgICAgPSAgb3B0aW9ucy5hcHBUeXBlXG4gICAgdGhpcy51cmwgICAgICAgID0gIG9wdGlvbnMudXJsXG4gICAgdGhpcy5sZXZlbCAgICAgID0gIG9wdGlvbnMubGV2ZWwgfHwgTG9nZ2VyLkVSUk9SXG4gICAgdGhpcy5iYXRjaFNpemUgID0gIG9wdGlvbnMuYmF0Y2hTaXplIHx8IDEwXG4gICAgdGhpcy5tZXNzYWdlcyAgID0gIFtdXG4gIH1cblxuICBzZW5kKG1lc3NhZ2VzKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJpOiB0aGlzLnVybCxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgYXBwSUQ6ICAgIHRoaXMuYXBwSUQsXG4gICAgICAgIGFwcFR5cGU6ICB0aGlzLmFwcFR5cGUsXG4gICAgICAgIGNvbnRleHQ6ICdhcGkgc2VydmVyJyxcbiAgICAgICAgbWVzc2FnZXMsXG4gICAgICAgIHNlbnRBdDogICBuZXcgRGF0ZSgpLFxuICAgICAgfSxcbiAgICAgIGpzb246IHRydWUsXG4gICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04J30sXG4gICAgfVxuICAgIHJlcXVlc3Qob3B0aW9ucylcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2VycjonLCBlcnIpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgfSlcbiAgfVxuXG4gIGxvZyhsZXZlbCwgbWVzc2FnZSkge1xuICAgIGNvbnN0IG1zZyA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpXG4gICAgaWYgKGxldmVsIDw9IHRoaXMubGV2ZWwpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIGxldmVsLFxuICAgICAgICBtZXNzYWdlOiBtc2csXG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMubWVzc2FnZXMubGVuZ3RoID49IHRoaXMuYmF0Y2hTaXplKSB7XG4gICAgICAgIHRoaXMuc2VuZCh0aGlzLm1lc3NhZ2VzLnNwbGljZSgwLCB0aGlzLmJhdGNoU2l6ZSkpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubG9nKExvZ2dlci5FUlJPUiwgbWVzc2FnZSlcbiAgfVxuXG4gIHdhcm4obWVzc2FnZSkge1xuICAgIHRoaXMubG9nKExvZ2dlci5XQVJOLCBtZXNzYWdlKVxuICB9XG5cbiAgaW5mbyhtZXNzYWdlKSB7XG4gICAgdGhpcy5sb2coTG9nZ2VyLklORk8sIG1lc3NhZ2UpXG4gIH1cblxuICBkZWJ1ZyhtZXNzYWdlKSB7XG4gICAgdGhpcy5sb2coTG9nZ2VyLkRFQlVHLCBtZXNzYWdlKVxuICAgIGNvbnNvbGUuaW5mbygnZGVidWc6JywgbWVzc2FnZSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvbG9nZ2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVxdWVzdC1wcm9taXNlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVxdWVzdC1wcm9taXNlXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wiYXBwXCI6e1wiYXBvbGxvTG9nZ2luZ1wiOnRydWUsXCJhcHBIb3N0XCI6XCIwLjAuMC4wXCIsXCJhcHBJRFwiOlwiNTk5ZjU5YmY0OTM5NTM0NjI4YzAxYjlkXCIsXCJhcHBQb3J0XCI6MzMwMCxcImFwcFR5cGVcIjpcInNlcnZlclwiLFwiREJPcHRpb25zXCI6e1widXNlTW9uZ29DbGllbnRcIjp0cnVlfSxcIkRCVVJJXCI6XCJtb25nb2RiOi8vMTAuMC4xLjk6MjcwMTcvaWF0LXRlc3RcIixcImxvY2FsaG9zdElQXCI6XCIxMC4wLjEuOVwiLFwibG9nZ2VyQWRkcmVzc1wiOlwiaHR0cDovL2xvY2FsaG9zdDozMDIxXCIsXCJwZXJzaXN0R3JhcGhRTFwiOnRydWUsXCJyZW1vdGVMb2dnaW5nXCI6dHJ1ZSxcImVudlwiOntcInByb2R1Y3Rpb25cIjp7XCJhcG9sbG9Mb2dnaW5nXCI6ZmFsc2V9fX19XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29uZmlnL2FwcC5qc29uXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQ29udGFjdCBmcm9tICcuL2NvbnRhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQ29udGFjdCxcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29ubmVjdG9ycy9pbmRleC5qcyIsImltcG9ydCBDb250YWN0TW9kZWwgZnJvbSAnLi4vbW9kZWwvY29udGFjdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFjdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5jcmVhdGUgPSBmaWVsZHMgPT4ge1xuICAgICAgY29uc3QgeyBjb250YWN0IH0gPSBmaWVsZHNcbiAgICAgIHJldHVybiBuZXcgQ29udGFjdE1vZGVsKGNvbnRhY3QpLnNhdmUoKVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlID0gaW5wdXQgPT4ge1xuICAgICAgY29uc3QgeyBjb250YWN0IH0gPSBpbnB1dFxuICAgICAgcmV0dXJuIENvbnRhY3RNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZShjb250YWN0Ll9pZCwgY29udGFjdCwge25ldzogdHJ1ZX0pLmV4ZWMoKVxuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlID0gX2lkID0+IHtcbiAgICAgIHJldHVybiBDb250YWN0TW9kZWwucmVtb3ZlKHtfaWR9KS5leGVjKCkudGhlbihyZXMgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnJlc3VsdFxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmZldGNoQnlJZCA9ICh7IF9pZCB9KSA9PiB7XG4gICAgICByZXR1cm4gQ29udGFjdE1vZGVsLmZpbmRPbmUoe19pZH0pLmV4ZWMoKVxuICAgIH1cblxuICAgIHRoaXMuZmV0Y2hCeUVtYWlsID0gKHsgZW1haWwgfSkgPT4ge1xuICAgICAgcmV0dXJuIENvbnRhY3RNb2RlbC5maW5kT25lKHtlbWFpbH0pLmV4ZWMoKVxuICAgIH1cblxuICAgIHRoaXMuZmV0Y2hCeUFjdGl2ZSA9ICh7IGFjdGl2ZSB9KSA9PiB7XG4gICAgICByZXR1cm4gQ29udGFjdE1vZGVsLmZpbmQoe2FjdGl2ZX0pLmV4ZWMoKVxuICAgIH1cblxuICAgIHRoaXMuc2VhcmNoQnlFbWFpbCA9IGZpZWxkcyA9PiB7XG4gICAgICBjb25zdCB7IGFjdGl2ZSwgZW1haWwgfSA9IGZpZWxkc1xuICAgICAgY29uc3QgcSA9IHtcbiAgICAgICAgYWN0aXZlLFxuICAgICAgICBlbWFpbDogbmV3IFJlZ0V4cChgXiR7ZW1haWx9YCwgJ2knKSxcbiAgICAgIH1cbiAgICAgIHJldHVybiBDb250YWN0TW9kZWwuZmluZChxKS5leGVjKClcbiAgICB9XG5cbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25uZWN0b3JzL2NvbnRhY3QuanMiLCJpbXBvcnQgcXVlcmllcyBmcm9tICcuL3F1ZXJpZXMnXG5pbXBvcnQgbXV0YXRpb25zIGZyb20gJy4vbXV0YXRpb25zJ1xuXG5jb25zdCByZXNvbHZlRnVuY3Rpb25zID0ge1xuICBRdWVyeToge1xuICAgIC4uLnF1ZXJpZXMsXG4gIH0sXG4gIE11dGF0aW9uOiB7XG4gICAgLi4ubXV0YXRpb25zLFxuICB9LFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc29sdmVGdW5jdGlvbnNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVzb2x2ZXJzL2luZGV4LmpzIiwiaW1wb3J0ICogYXMgY29udGFjdCBmcm9tICcuL2NvbnRhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4uY29udGFjdCxcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVzb2x2ZXJzL3F1ZXJpZXMvaW5kZXguanMiLCJcbmV4cG9ydCBjb25zdCBmZXRjaEJ5SWQgPSAgYXN5bmMgKF8sIHsgX2lkIH0sIGN0eCkgPT4ge1xuICBjb25zdCBjb250YWN0ID0gbmV3IGN0eC5jb25zdHJ1Y3Rvci5Db250YWN0KClcbiAgcmV0dXJuIGF3YWl0IGNvbnRhY3QuZmV0Y2hCeUlkKHtfaWR9KVxufVxuXG5leHBvcnQgY29uc3QgZmV0Y2hCeUVtYWlsID0gIGFzeW5jIChfLCB7IGVtYWlsIH0sIGN0eCkgPT4ge1xuICBjb25zdCBjb250YWN0ID0gbmV3IGN0eC5jb25zdHJ1Y3Rvci5Db250YWN0KClcbiAgcmV0dXJuIGF3YWl0IGNvbnRhY3QuZmV0Y2hCeUVtYWlsKHtlbWFpbH0pXG59XG5cbmV4cG9ydCBjb25zdCBmZXRjaENvbnRhY3RzID0gIGFzeW5jIChfLCB7IGFjdGl2ZSA9IHRydWUgfSwgY3R4KSA9PiB7XG4gIGNvbnN0IGNvbnRhY3QgPSBuZXcgY3R4LmNvbnN0cnVjdG9yLkNvbnRhY3QoKVxuICByZXR1cm4gYXdhaXQgY29udGFjdC5mZXRjaEJ5QWN0aXZlKHthY3RpdmV9KVxufVxuXG5leHBvcnQgY29uc3Qgc2VhcmNoQnlFbWFpbCA9ICBhc3luYyAoXywgeyBhY3RpdmUsIGVtYWlsIH0sIGN0eCkgPT4ge1xuICBjb25zdCBjb250YWN0ID0gbmV3IGN0eC5jb25zdHJ1Y3Rvci5Db250YWN0KClcbiAgcmV0dXJuIGF3YWl0IGNvbnRhY3Quc2VhcmNoQnlFbWFpbCh7YWN0aXZlLCBlbWFpbH0pXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZXNvbHZlcnMvcXVlcmllcy9jb250YWN0LmpzIiwiaW1wb3J0ICogYXMgY29udGFjdCBmcm9tICcuL2NvbnRhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4uY29udGFjdCxcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVzb2x2ZXJzL211dGF0aW9ucy9pbmRleC5qcyIsIlxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnRhY3QgPSBhc3luYyAoXywgeyBpbnB1dCB9LCBjdHgpID0+IHtcbiAgY29uc3QgY29udGFjdCA9IG5ldyBjdHguY29uc3RydWN0b3IuQ29udGFjdCgpXG4gIHJldHVybiBhd2FpdCBjb250YWN0LmNyZWF0ZSh7Y29udGFjdDogaW5wdXR9KVxufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlQ29udGFjdCA9IGFzeW5jIChfLCB7IGlucHV0IH0sIGN0eCkgPT4ge1xuICBjb25zdCBjb250YWN0ID0gbmV3IGN0eC5jb25zdHJ1Y3Rvci5Db250YWN0KClcbiAgcmV0dXJuIGF3YWl0IGNvbnRhY3QudXBkYXRlKHtjb250YWN0OiBpbnB1dH0pXG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVDb250YWN0ID0gYXN5bmMgKF8sIHsgX2lkIH0sIGN0eCkgPT4ge1xuICBjb25zdCBjb250YWN0ID0gbmV3IGN0eC5jb25zdHJ1Y3Rvci5Db250YWN0KClcbiAgcmV0dXJuIGF3YWl0IGNvbnRhY3QucmVtb3ZlKHtfaWR9KVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZXNvbHZlcnMvbXV0YXRpb25zL2NvbnRhY3QuanMiLCJleHBvcnQgY29uc3QgdHlwZURlZnMgPSBgXG5cbiMgQ29udGFjdCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnR5cGUgQ29udGFjdCB7XG4gIF9pZDogSURcbiAgYWN0aXZlOiBCb29sZWFuXG4gIGVtYWlsOiBTdHJpbmdcbiAgbmFtZTogQ29udGFjdE5hbWVcbiAgcGhvbmVzOiBbQ29udGFjdFBob25lXVxuICB1cGRhdGVkQXQ6IFN0cmluZ1xuICBjcmVhdGVkQXQ6IFN0cmluZ1xufVxuXG50eXBlIENvbnRhY3ROYW1lIHtcbiAgZmlyc3Q6IFN0cmluZ1xuICBsYXN0OiBTdHJpbmdcbiAgcHJlZml4OiBTdHJpbmdcbn1cblxudHlwZSBDb250YWN0UGhvbmUge1xuICBpZDogU3RyaW5nXG4gIGNvdW50cnlDb2RlOiBTdHJpbmdcbiAgZXh0ZW5zaW9uOiBJbnRcbiAgbnVtYmVyOiBTdHJpbmdcbn1cblxuaW5wdXQgQ29udGFjdElucHV0IHtcbiAgX2lkOiBJRFxuICBhY3RpdmU6IEJvb2xlYW5cbiAgZW1haWw6IFN0cmluZ1xuICBuYW1lOiBDb250YWN0TmFtZUlucHV0XG4gIHBob25lczogW0NvbnRhY3RQaG9uZUlucHV0XVxufVxuXG5pbnB1dCBDb250YWN0TmFtZUlucHV0IHtcbiAgZmlyc3Q6IFN0cmluZ1xuICBsYXN0OiBTdHJpbmdcbiAgcHJlZml4OiBTdHJpbmdcbn1cblxuaW5wdXQgQ29udGFjdFBob25lSW5wdXQge1xuICBpZDogU3RyaW5nIVxuICBjb3VudHJ5Q29kZTogU3RyaW5nXG4gIGV4dGVuc2lvbjogSW50XG4gIG51bWJlcjogU3RyaW5nIVxufVxuXG5pbnB1dCBDb250YWN0U2VhcmNoSW5wdXQge1xuICBhY3RpdmU6IEJvb2xlYW5cbiAgZW1haWw6IFN0cmluZyFcbn1cblxuIyBHZW5lcmljIHR5cGVzID09PT09PT09PT09PT09PT09PT09PT09PT1cblxudHlwZSBSZW1vdmVSZXN1bHQge1xuICBvazogSW50XG4gIG46IEludFxufVxuXG50eXBlIFVwZGF0ZVJlc3VsdCB7XG4gIF9pZDogSURcbiAgb2s6IEludFxuICBuOiBJbnRcbiAgbk1vZGlmaWVkOiBJbnRcbn1cblxuXG4jIFF1ZXJpZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG50eXBlIFF1ZXJ5IHtcblxuICBmZXRjaENvbnRhY3RzKGFjdGl2ZTpCb29sZWFuKTogW0NvbnRhY3RdXG4gIGZldGNoQnlJZChfaWQ6SUQhKTogQ29udGFjdFxuICBmZXRjaEJ5RW1haWwoZW1haWw6U3RyaW5nISk6IENvbnRhY3RcbiAgc2VhcmNoQnlFbWFpbChhY3RpdmU6Qm9vbGVhbiwgZW1haWw6U3RyaW5nISk6IFtDb250YWN0XVxufVxuXG4jIE11dGF0aW9ucyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG50eXBlIE11dGF0aW9uIHtcblxuICBjcmVhdGVDb250YWN0KGlucHV0OkNvbnRhY3RJbnB1dCk6IENvbnRhY3RcbiAgdXBkYXRlQ29udGFjdChpbnB1dDpDb250YWN0SW5wdXQpOiBDb250YWN0XG4gIHJlbW92ZUNvbnRhY3QoX2lkOklEISk6IFJlbW92ZVJlc3VsdFxufVxuYFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY2hlbWEuanMiXSwic291cmNlUm9vdCI6IiJ9