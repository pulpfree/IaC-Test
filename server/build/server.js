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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contact = __webpack_require__(13);

var _contact2 = _interopRequireDefault(_contact);

var _connector = __webpack_require__(3);

var _connector2 = _interopRequireDefault(_connector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _connector2.default(_contact2.default);
// import graphql_types from './graphql_types';
// import './debug';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var combine = function combine(features, extractor) {
  return (0, _lodash.without)(_lodash.union.apply(undefined, _toConsumableArray((0, _lodash.map)(features, function (res) {
    return (0, _lodash.castArray)(extractor(res));
  }))), undefined);
};

var _class = function () {
  // eslint-disable-next-line no-unused-vars
  function _class(_ref) {
    for (var _len = arguments.length, features = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      features[_key - 1] = arguments[_key];
    }

    var schema = _ref.schema,
        createResolversFunc = _ref.createResolversFunc,
        createContextFunc = _ref.createContextFunc;

    _classCallCheck(this, _class);

    this.schema = combine(arguments, function (arg) {
      return arg.schema;
    });
    this.createResolversFunc = combine(arguments, function (arg) {
      return arg.createResolversFunc;
    });
    this.createContextFunc = combine(arguments, function (arg) {
      return arg.createContextFunc;
    });
  }

  _createClass(_class, [{
    key: 'createContext',
    value: function createContext() {
      return _lodash.merge.apply(undefined, [{}].concat(_toConsumableArray(this.createContextFunc.map(function (createContext) {
        return createContext();
      }))));
    }
  }, {
    key: 'createResolvers',
    value: function createResolvers() {
      return _lodash.merge.apply(undefined, [{}].concat(_toConsumableArray(this.createResolversFunc.map(function (createResolvers) {
        return createResolvers();
      }))));
    }
  }, {
    key: 'schemas',
    get: function get() {
      return this.schema;
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
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

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = __webpack_require__(0);

var _schema = __webpack_require__(10);

var _schema2 = _interopRequireDefault(_schema);

var _log = __webpack_require__(4);

var _log2 = _interopRequireDefault(_log);

var _modules = __webpack_require__(2);

var _modules2 = _interopRequireDefault(_modules);

var _extracted_queries = __webpack_require__(21);

var _extracted_queries2 = _interopRequireDefault(_extracted_queries);

var _settings = __webpack_require__(5);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*class Foo {
  constructor() { this.bar() }
  bar() { throw new Error('this is a demo') }
}
// new Foo()*/

// Initiate Mongoose
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_settings2.default.DBURI, _settings2.default.DBOptions).then().catch(function (err) {
  //note: this is likely redundant, need to test which is better
  console.error('err:', err); // eslint-disable-line
  _log2.default.error(err);
});

var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'Connection error:')); // eslint-disable-line no-console
db.once('open', function () {
  return console.log('mongodb is connected...');
}); // eslint-disable-line no-console

var server = new _hapi2.default.Server();
server.connection({
  host: _settings2.default.appHost,
  port: _settings2.default.appPort,
  routes: { 'cors': true }
});

server.ext('onPreHandler', function (req, reply) {
  if (req.url.path.indexOf('/graphql') >= 0 && req.payload.id) {
    var invertedMap = (0, _lodash.invert)(_extracted_queries2.default);
    req.payload.query = invertedMap[req.payload.id];
    _log2.default.info({ query: req.payload.query });
  }
  return reply.continue();
});

server.ext('onPreResponse', function (req, reply) {
  req.response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  return reply.continue();
});

server.register({
  register: _apolloServerHapi.graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: function graphqlOptions() {
      return {
        schema: _schema2.default,
        context: _modules2.default.createContext(),
        formatError: function formatError(error) {
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

process.on('uncaughtException', function (ex) {
  _log2.default.error(ex);
  process.exit(1);
});

process.on('unhandledRejection', function (reason) {
  _log2.default.error(reason);
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = __webpack_require__(11);

var _rootSchema = __webpack_require__(12);

var _rootSchema2 = _interopRequireDefault(_rootSchema);

var _modules = __webpack_require__(2);

var _modules2 = _interopRequireDefault(_modules);

var _log2 = __webpack_require__(4);

var _log3 = _interopRequireDefault(_log2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import settings from '../../config/settings'


var executableSchema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [_rootSchema2.default].concat(_modules2.default.schemas),
  resolvers: _modules2.default.createResolvers()
});
// import { addApolloLogging } from 'apollo-logger'

(0, _graphqlTools.addErrorLoggingToSchema)(executableSchema, { log: function log(e) {
    return _log3.default.error(e);
  } });

exports.default = executableSchema;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 12 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"dummy"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"dummy"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Subscription"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"dummy"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"SchemaDefinition","directives":[],"operationTypes":[{"kind":"OperationTypeDefinition","operation":"query","type":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}}},{"kind":"OperationTypeDefinition","operation":"mutation","type":{"kind":"NamedType","name":{"kind":"Name","value":"Mutation"}}},{"kind":"OperationTypeDefinition","operation":"subscription","type":{"kind":"NamedType","name":{"kind":"Name","value":"Subscription"}}}]}],"loc":{"start":0,"end":173}};
    doc.loc.source = {"body":"type Query {\n  dummy: Int\n}\n\ntype Mutation {\n  dummy: Int\n}\n\ntype Subscription {\n  dummy: Int\n}\n\nschema {\n  query: Query\n  mutation: Mutation\n  subscription: Subscription\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = __webpack_require__(14);

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = __webpack_require__(15);

var _resolvers2 = _interopRequireDefault(_resolvers);

var _context = __webpack_require__(16);

var _context2 = _interopRequireDefault(_context);

var _connector = __webpack_require__(3);

var _connector2 = _interopRequireDefault(_connector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _connector2.default({ schema: _schema2.default, createResolversFunc: _resolvers2.default,
  createContextFunc: function createContextFunc() {

    var contact = new _context2.default();
    // console.log('contact in createContextFunc:', contact)
    return {
      Contact: contact
      /*const post = new Post();
       return {
        Post: post,
        loaders: {
          getCommentsForPostIds: new DataLoader(post.getCommentsForPostIds),
        }
      };*/
    };
  }
});

/***/ }),
/* 14 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Contact"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"_id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"active"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"email"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactName"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"phones"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactPhone"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"createdAt"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"ContactName"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"first"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"last"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"prefix"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"ContactPhone"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"countryCode"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"extension"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"number"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"ContactInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"_id"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"active"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactNameInput"}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"phones"},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactPhoneInput"}}},"defaultValue":null,"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"ContactNameInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"first"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"last"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"prefix"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":null,"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"ContactPhoneInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"countryCode"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"extension"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"number"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"defaultValue":null,"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"ContactSearchInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"active"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"defaultValue":null,"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"RemoveResult"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"ok"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"n"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UpdateResult"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"_id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"ok"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"n"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"nModified"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"TypeExtensionDefinition","definition":{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"fetchContacts"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"active"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":null,"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"fetchById"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"_id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"defaultValue":null,"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"fetchByEmail"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"defaultValue":null,"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"searchByEmail"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"active"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":null,"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"defaultValue":null,"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}}},"directives":[]}]}},{"kind":"TypeExtensionDefinition","definition":{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"createContact"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactInput"}},"defaultValue":null,"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updateContact"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactInput"}},"defaultValue":null,"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"removeContact"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"_id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"defaultValue":null,"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveResult"}},"directives":[]}]}}],"loc":{"start":0,"end":1256}};
    doc.loc.source = {"body":"# Contact\ntype Contact {\n  _id: ID\n  active: Boolean\n  email: String\n  name: ContactName\n  phones: [ContactPhone]\n  updatedAt: String\n  createdAt: String\n}\n\n# ContactName\ntype ContactName {\n  first: String\n  last: String\n  prefix: String\n}\n\n# ContactPhone\ntype ContactPhone {\n  id: String\n  countryCode: String\n  extension: Int\n  number: String\n}\n\ninput ContactInput {\n  _id: ID\n  active: Boolean\n  email: String\n  name: ContactNameInput\n  phones: [ContactPhoneInput]\n}\n\ninput ContactNameInput {\n  first: String\n  last: String\n  prefix: String\n}\n\ninput ContactPhoneInput {\n  id: String!\n  countryCode: String\n  extension: Int\n  number: String!\n}\n\ninput ContactSearchInput {\n  active: Boolean\n  email: String!\n}\n\ntype RemoveResult {\n  ok: Int\n  n: Int\n}\n\ntype UpdateResult {\n  _id: ID\n  ok: Int\n  n: Int\n  nModified: Int\n}\n\n# Queries ===============================\n\nextend type Query {\n  fetchContacts(active:Boolean): [Contact]\n  fetchById(_id:ID!): Contact\n  fetchByEmail(email:String!): Contact\n  searchByEmail(active:Boolean, email:String!): [Contact]\n}\n\n# Mutations =============================\n\nextend type Mutation {\n  createContact(input:ContactInput): Contact\n  updateContact(input:ContactInput): Contact\n  removeContact(_id:ID!): RemoveResult\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (pubsub) {
  return {
    Query: {
      fetchContacts: function fetchContacts(_, _ref, ctx) {
        var active = _ref.active;

        return ctx.Contact.fetchByActive(true);
      }
    },
    Mutation: {
      createContact: function createContact(_, _ref2, ctx) {
        var _this = this;

        var input = _ref2.input;
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return ctx.Contact.create({ contact: input });

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }))();
      }
    }

  };
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contact = __webpack_require__(17);

var _contact2 = _interopRequireDefault(_contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contact = function () {
  function Contact() {
    _classCallCheck(this, Contact);
  }

  _createClass(Contact, [{
    key: 'fetchByActive',
    value: function fetchByActive(active) {
      // console.log('fetchByActive in Contact context:')
      return _contact2.default.find({ active: active }).exec();
    }
  }]);

  return Contact;
}();

exports.default = Contact;

/***/ }),
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
        console.error('ERROR in Logger:', err.message); // eslint-disable-line no-console
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

module.exports = {"query getContacts($active: Boolean) {\n  fetchContacts(active: $active) {\n    _id\n    email\n    name {\n      first\n      last\n      prefix\n      __typename\n    }\n    __typename\n  }\n}\n":1}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzA3ODhjYjViYjVlNWM4ZTU2YjAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9jb25uZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFwaVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItaGFwaVwiIiwid2VicGFjazovLy8uL3NyYy9hcGkvc2NoZW1hLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdyYXBocWwtdG9vbHNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL3Jvb3Qtc2NoZW1hLmdyYXBocWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvY29udGFjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9jb250YWN0L3NjaGVtYS5ncmFwaHFsIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2NvbnRhY3QvcmVzb2x2ZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2NvbnRhY3QvY29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvY29udGFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZXF1ZXN0LXByb21pc2VcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2FwcC5qc29uIiwid2VicGFjazovLy8uLi9jbGllbnQvZXh0cmFjdGVkX3F1ZXJpZXMuanNvbiJdLCJuYW1lcyI6WyJjb21iaW5lIiwiZmVhdHVyZXMiLCJleHRyYWN0b3IiLCJyZXMiLCJ1bmRlZmluZWQiLCJzY2hlbWEiLCJjcmVhdGVSZXNvbHZlcnNGdW5jIiwiY3JlYXRlQ29udGV4dEZ1bmMiLCJhcmd1bWVudHMiLCJhcmciLCJtYXAiLCJjcmVhdGVDb250ZXh0IiwiY3JlYXRlUmVzb2x2ZXJzIiwibG9nIiwidXJsIiwibG9nZ2VyQWRkcmVzcyIsImJhdGNoU2l6ZSIsImxldmVsIiwiSU5GTyIsImFwcElEIiwiYXBwVHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJlbnZTZXR0aW5ncyIsIk9iamVjdCIsImFzc2lnbiIsInBpY2tCeSIsInYiLCJrIiwiZ2V0IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJEQlVSSSIsIkRCT3B0aW9ucyIsInRoZW4iLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsImVyciIsImRiIiwiY29ubmVjdGlvbiIsIm9uIiwiYmluZCIsIm9uY2UiLCJzZXJ2ZXIiLCJTZXJ2ZXIiLCJob3N0IiwiYXBwSG9zdCIsInBvcnQiLCJhcHBQb3J0Iiwicm91dGVzIiwiZXh0IiwicmVxIiwicmVwbHkiLCJwYXRoIiwiaW5kZXhPZiIsInBheWxvYWQiLCJpZCIsImludmVydGVkTWFwIiwicXVlcnkiLCJpbmZvIiwiY29udGludWUiLCJyZXNwb25zZSIsImhlYWRlciIsInJlZ2lzdGVyIiwib3B0aW9ucyIsImdyYXBocWxPcHRpb25zIiwiY29udGV4dCIsImZvcm1hdEVycm9yIiwic3RhY2siLCJncmFwaGlxbE9wdGlvbnMiLCJlbmRwb2ludFVSTCIsInN0YXJ0IiwidXJpIiwiZXgiLCJleGl0IiwicmVhc29uIiwiZXhlY3V0YWJsZVNjaGVtYSIsInR5cGVEZWZzIiwiY29uY2F0Iiwic2NoZW1hcyIsInJlc29sdmVycyIsImUiLCJjb250YWN0IiwiQ29udGFjdCIsIlF1ZXJ5IiwiZmV0Y2hDb250YWN0cyIsIl8iLCJjdHgiLCJhY3RpdmUiLCJmZXRjaEJ5QWN0aXZlIiwiTXV0YXRpb24iLCJjcmVhdGVDb250YWN0IiwiaW5wdXQiLCJjcmVhdGUiLCJmaW5kIiwiZXhlYyIsIk1vbmdvb3NlIiwicmVxdWlyZSIsIlBob25lU2NoZW1hIiwiU2NoZW1hIiwiY291bnRyeUNvZGUiLCJ0eXBlIiwiU3RyaW5nIiwidHJpbSIsImRlZmF1bHQiLCJleHRlbnNpb24iLCJOdW1iZXIiLCJudW1iZXIiLCJDb250YWN0U2NoZW1hIiwiQm9vbGVhbiIsImVtYWlsIiwiaW5kZXgiLCJ1bmlxdWUiLCJtYXRjaCIsIm5hbWUiLCJmaXJzdCIsImxhc3QiLCJwcmVmaXgiLCJwaG9uZXMiLCJ0aW1lc3RhbXBzIiwibW9kZWwiLCJyZXF1ZXN0IiwiTG9nZ2VyIiwiRXJyb3IiLCJoZWFkZXJzIiwiRVJST1IiLCJtZXNzYWdlcyIsIm1ldGhvZCIsImJvZHkiLCJzZW50QXQiLCJEYXRlIiwianNvbiIsIm1lc3NhZ2UiLCJtc2ciLCJKU09OIiwic3RyaW5naWZ5IiwicHVzaCIsImxlbmd0aCIsInNlbmQiLCJzcGxpY2UiLCJXQVJOIiwiREVCVUciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxtQzs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUlBOzs7Ozs7a0JBRWUsMEM7QUFMZjtBQUNBLG9COzs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxTQUFWQSxPQUFVLENBQUNDLFFBQUQsRUFBV0MsU0FBWDtBQUFBLFNBQ2QscUJBQVEsa0RBQVMsaUJBQUlELFFBQUosRUFBYztBQUFBLFdBQU8sdUJBQVVDLFVBQVVDLEdBQVYsQ0FBVixDQUFQO0FBQUEsR0FBZCxDQUFULEVBQVIsRUFBbUVDLFNBQW5FLENBRGM7QUFBQSxDQUFoQjs7O0FBSUU7QUFDQSx3QkFBMkU7QUFBQSxzQ0FBVkgsUUFBVTtBQUFWQSxjQUFVO0FBQUE7O0FBQUEsUUFBOURJLE1BQThELFFBQTlEQSxNQUE4RDtBQUFBLFFBQXREQyxtQkFBc0QsUUFBdERBLG1CQUFzRDtBQUFBLFFBQWpDQyxpQkFBaUMsUUFBakNBLGlCQUFpQzs7QUFBQTs7QUFDekUsU0FBS0YsTUFBTCxHQUFjTCxRQUFRUSxTQUFSLEVBQW1CO0FBQUEsYUFBT0MsSUFBSUosTUFBWDtBQUFBLEtBQW5CLENBQWQ7QUFDQSxTQUFLQyxtQkFBTCxHQUEyQk4sUUFBUVEsU0FBUixFQUFtQjtBQUFBLGFBQU9DLElBQUlILG1CQUFYO0FBQUEsS0FBbkIsQ0FBM0I7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QlAsUUFBUVEsU0FBUixFQUFtQjtBQUFBLGFBQU9DLElBQUlGLGlCQUFYO0FBQUEsS0FBbkIsQ0FBekI7QUFDRDs7OztvQ0FNZTtBQUNkLGFBQU8sZ0NBQU0sRUFBTiw0QkFBYSxLQUFLQSxpQkFBTCxDQUF1QkcsR0FBdkIsQ0FBMkI7QUFBQSxlQUFpQkMsZUFBakI7QUFBQSxPQUEzQixDQUFiLEdBQVA7QUFDRDs7O3NDQUVrQjtBQUNqQixhQUFPLGdDQUFNLEVBQU4sNEJBQWEsS0FBS0wsbUJBQUwsQ0FBeUJJLEdBQXpCLENBQTZCO0FBQUEsZUFBbUJFLGlCQUFuQjtBQUFBLE9BQTdCLENBQWIsR0FBUDtBQUNEOzs7d0JBVmE7QUFDWixhQUFPLEtBQUtQLE1BQVo7QUFDRDs7Ozs7Ozs7Ozs7Ozs7O0FDZkg7Ozs7QUFFQTs7Ozs7O0FBRUEsSUFBTVEsTUFBTSxxQkFBVztBQUNyQkMsT0FBWSxtQkFBU0MsYUFEQTtBQUVyQkMsYUFBWSxDQUZTO0FBR3JCQyxTQUFZLGlCQUFPQyxJQUhFO0FBSXJCQyxTQUFZLG1CQUFTQSxLQUpBO0FBS3JCQyxXQUFZLG1CQUFTQTtBQUxBLENBQVgsQ0FBWjs7QUFRQUMsT0FBT0MsT0FBUCxHQUFpQlQsR0FBakIsQzs7Ozs7Ozs7Ozs7OztBQ1pBOztBQUNBOzs7Ozs7QUFFQSxJQUFNVSxjQUFjQyxPQUFPQyxNQUFQLENBQ2xCLEVBRGtCLEVBRWxCLGlCQUFFQyxNQUFGLFdBQW1CLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFNBQVVBLE1BQU0sS0FBaEI7QUFBQSxDQUFuQixDQUZrQixFQUdsQixpQkFBRUMsR0FBRixvQkFBdUJDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBbkMsQ0FIa0IsQ0FBcEI7O2tCQU1lVCxXOzs7Ozs7Ozs7Ozs7Ozs7O0FDVGY7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdBOzs7Ozs7QUFNQTtBQUNBLG1CQUFTVSxPQUFULEdBQW1CQyxPQUFPRCxPQUExQjtBQUNBLG1CQUFTRSxPQUFULENBQWlCLG1CQUFTQyxLQUExQixFQUFpQyxtQkFBU0MsU0FBMUMsRUFDR0MsSUFESCxHQUVHQyxLQUZILENBRVMsZUFBTztBQUNaO0FBQ0FDLFVBQVFDLEtBQVIsQ0FBYyxNQUFkLEVBQXNCQyxHQUF0QixFQUZZLENBRWU7QUFDM0IsZ0JBQUlELEtBQUosQ0FBVUMsR0FBVjtBQUNELENBTkg7O0FBU0EsSUFBTUMsS0FBSyxtQkFBU0MsVUFBcEI7QUFDQUQsR0FBR0UsRUFBSCxDQUFNLE9BQU4sRUFBZUwsUUFBUUMsS0FBUixDQUFjSyxJQUFkLENBQW1CTixPQUFuQixFQUE0QixtQkFBNUIsQ0FBZixFLENBQWlFO0FBQ2pFRyxHQUFHSSxJQUFILENBQVEsTUFBUixFQUFnQjtBQUFBLFNBQU1QLFFBQVEzQixHQUFSLENBQVkseUJBQVosQ0FBTjtBQUFBLENBQWhCLEUsQ0FBOEQ7O0FBRTlELElBQU1tQyxTQUFTLElBQUksZUFBS0MsTUFBVCxFQUFmO0FBQ0FELE9BQU9KLFVBQVAsQ0FBa0I7QUFDaEJNLFFBQU0sbUJBQVNDLE9BREM7QUFFaEJDLFFBQU0sbUJBQVNDLE9BRkM7QUFHaEJDLFVBQVEsRUFBQyxRQUFRLElBQVQ7QUFIUSxDQUFsQjs7QUFNQU4sT0FBT08sR0FBUCxDQUFXLGNBQVgsRUFBMkIsVUFBQ0MsR0FBRCxFQUFNQyxLQUFOLEVBQWdCO0FBQ3pDLE1BQUlELElBQUkxQyxHQUFKLENBQVE0QyxJQUFSLENBQWFDLE9BQWIsQ0FBcUIsVUFBckIsS0FBb0MsQ0FBcEMsSUFBeUNILElBQUlJLE9BQUosQ0FBWUMsRUFBekQsRUFBNkQ7QUFDM0QsUUFBTUMsY0FBYyxnREFBcEI7QUFDQU4sUUFBSUksT0FBSixDQUFZRyxLQUFaLEdBQW9CRCxZQUFZTixJQUFJSSxPQUFKLENBQVlDLEVBQXhCLENBQXBCO0FBQ0Esa0JBQUlHLElBQUosQ0FBUyxFQUFDRCxPQUFPUCxJQUFJSSxPQUFKLENBQVlHLEtBQXBCLEVBQVQ7QUFDRDtBQUNELFNBQU9OLE1BQU1RLFFBQU4sRUFBUDtBQUNELENBUEQ7O0FBU0FqQixPQUFPTyxHQUFQLENBQVcsZUFBWCxFQUE0QixVQUFTQyxHQUFULEVBQWNDLEtBQWQsRUFBcUI7QUFDL0NELE1BQUlVLFFBQUosQ0FBYUMsTUFBYixDQUFvQiw4QkFBcEIsRUFBb0Qsb0JBQXBEO0FBQ0EsU0FBT1YsTUFBTVEsUUFBTixFQUFQO0FBQ0QsQ0FIRDs7QUFLQWpCLE9BQU9vQixRQUFQLENBQWdCO0FBQ2RBLHlDQURjO0FBRWRDLFdBQVM7QUFDUFgsVUFBTSxVQURDO0FBRVBZLG9CQUFnQiwwQkFBTTtBQUNwQixhQUFPO0FBQ0xqRSxnQ0FESztBQUVMa0UsaUJBQVMsa0JBQVE1RCxhQUFSLEVBRko7QUFHTDZELG1CQUhLLHVCQUdPL0IsS0FIUCxFQUdjO0FBQ2pCLHdCQUFJQSxLQUFKLENBQVVBLE1BQU1nQyxLQUFoQjtBQUNBLGlCQUFPaEMsS0FBUDtBQUNEO0FBTkksT0FBUDtBQVFEO0FBWE07QUFGSyxDQUFoQjs7QUFpQkFPLE9BQU9vQixRQUFQLENBQWdCO0FBQ2RBLDBDQURjO0FBRWRDLFdBQVM7QUFDUFgsVUFBTSxXQURDO0FBRVBnQixxQkFBaUI7QUFDZkMsbUJBQWE7QUFERTtBQUZWO0FBRkssQ0FBaEIsRUFRRyxVQUFVakMsR0FBVixFQUFlO0FBQ2hCLE1BQUlBLEdBQUosRUFBUztBQUFFLFVBQU1BLEdBQU47QUFBVzs7QUFFdEJNLFNBQU80QixLQUFQLENBQWEsWUFBWTtBQUN2QjVCLFdBQU9uQyxHQUFQLENBQVcsTUFBWCx5QkFBd0NtQyxPQUFPZ0IsSUFBUCxDQUFZYSxHQUFwRDtBQUNBLGtCQUFJYixJQUFKLHdCQUE4QmhCLE9BQU9nQixJQUFQLENBQVlhLEdBQTFDO0FBQ0QsR0FIRDtBQUlELENBZkQ7O0FBaUJBL0MsUUFBUWUsRUFBUixDQUFXLG1CQUFYLEVBQWdDLFVBQUNpQyxFQUFELEVBQVE7QUFDdEMsZ0JBQUlyQyxLQUFKLENBQVVxQyxFQUFWO0FBQ0FoRCxVQUFRaUQsSUFBUixDQUFhLENBQWI7QUFDRCxDQUhEOztBQUtBakQsUUFBUWUsRUFBUixDQUFXLG9CQUFYLEVBQWlDLGtCQUFVO0FBQ3pDLGdCQUFJSixLQUFKLENBQVV1QyxNQUFWO0FBQ0QsQ0FGRCxFOzs7Ozs7QUM5RkEsaUM7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7Ozs7O0FDQUE7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQTs7O0FBR0EsSUFBTUMsbUJBQW1CLHdDQUFxQjtBQUM1Q0MsWUFBVSx1QkFBZ0JDLE1BQWhCLENBQXVCLGtCQUFRQyxPQUEvQixDQURrQztBQUU1Q0MsYUFBVyxrQkFBUXpFLGVBQVI7QUFGaUMsQ0FBckIsQ0FBekI7QUFSQTs7QUFhQSwyQ0FBd0JxRSxnQkFBeEIsRUFBMEMsRUFBRXBFLEtBQUssYUFBQ3lFLENBQUQ7QUFBQSxXQUFPLGNBQUk3QyxLQUFKLENBQVU2QyxDQUFWLENBQVA7QUFBQSxHQUFQLEVBQTFDOztrQkFFZUwsZ0I7Ozs7OztBQ2hCZiwwQzs7Ozs7OztBQ0NBLGVBQWUsa0NBQWtDLHNDQUFzQyw4QkFBOEIsNENBQTRDLGlDQUFpQyw4QkFBOEIsd0JBQXdCLDJCQUEyQiw2QkFBNkIsaUJBQWlCLEVBQUUsRUFBRSxzQ0FBc0MsaUNBQWlDLDRDQUE0QyxpQ0FBaUMsOEJBQThCLHdCQUF3QiwyQkFBMkIsNkJBQTZCLGlCQUFpQixFQUFFLEVBQUUsc0NBQXNDLHFDQUFxQyw0Q0FBNEMsaUNBQWlDLDhCQUE4Qix3QkFBd0IsMkJBQTJCLDZCQUE2QixpQkFBaUIsRUFBRSxFQUFFLDZEQUE2RCw2REFBNkQsMkJBQTJCLGdDQUFnQyxFQUFFLGdFQUFnRSwyQkFBMkIsbUNBQW1DLEVBQUUsb0VBQW9FLDJCQUEyQix1Q0FBdUMsRUFBRSxTQUFTO0FBQy96QyxzQkFBc0Isb0JBQW9CLGlCQUFpQixtQkFBbUIsaUJBQWlCLHVCQUF1QixpQkFBaUIsWUFBWSx1RUFBdUUsK0NBQStDOzs7QUFHelE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUI7Ozs7Ozs7Ozs7Ozs7QUNyQkE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztrQkFFZSx3QkFBWSxFQUFDNUUsd0JBQUQsRUFBU0Msd0NBQVQ7QUFDekJDLHFCQUFtQiw2QkFBTTs7QUFFdkIsUUFBTWdGLFVBQVUsdUJBQWhCO0FBQ0E7QUFDQSxXQUFPO0FBQ0xDLGVBQVNEO0FBRVg7Ozs7Ozs7QUFITyxLQUFQO0FBV0Q7QUFoQndCLENBQVosQzs7Ozs7OztBQ0xmLGVBQWUsa0NBQWtDLHNDQUFzQyxnQ0FBZ0MsNENBQTRDLGlDQUFpQyw0QkFBNEIsd0JBQXdCLDJCQUEyQiw0QkFBNEIsaUJBQWlCLEVBQUUsaUNBQWlDLCtCQUErQix3QkFBd0IsMkJBQTJCLGlDQUFpQyxpQkFBaUIsRUFBRSxpQ0FBaUMsOEJBQThCLHdCQUF3QiwyQkFBMkIsZ0NBQWdDLGlCQUFpQixFQUFFLGlDQUFpQyw2QkFBNkIsd0JBQXdCLDJCQUEyQixxQ0FBcUMsaUJBQWlCLEVBQUUsaUNBQWlDLCtCQUErQix3QkFBd0IsMEJBQTBCLDJCQUEyQix1Q0FBdUMsaUJBQWlCLEVBQUUsaUNBQWlDLGtDQUFrQyx3QkFBd0IsMkJBQTJCLGdDQUFnQyxpQkFBaUIsRUFBRSxpQ0FBaUMsa0NBQWtDLHdCQUF3QiwyQkFBMkIsZ0NBQWdDLGlCQUFpQixFQUFFLEVBQUUsc0NBQXNDLG9DQUFvQyw0Q0FBNEMsaUNBQWlDLDhCQUE4Qix3QkFBd0IsMkJBQTJCLGdDQUFnQyxpQkFBaUIsRUFBRSxpQ0FBaUMsNkJBQTZCLHdCQUF3QiwyQkFBMkIsZ0NBQWdDLGlCQUFpQixFQUFFLGlDQUFpQywrQkFBK0Isd0JBQXdCLDJCQUEyQixnQ0FBZ0MsaUJBQWlCLEVBQUUsRUFBRSxzQ0FBc0MscUNBQXFDLDRDQUE0QyxpQ0FBaUMsMkJBQTJCLHdCQUF3QiwyQkFBMkIsZ0NBQWdDLGlCQUFpQixFQUFFLGlDQUFpQyxvQ0FBb0Msd0JBQXdCLDJCQUEyQixnQ0FBZ0MsaUJBQWlCLEVBQUUsaUNBQWlDLGtDQUFrQyx3QkFBd0IsMkJBQTJCLDZCQUE2QixpQkFBaUIsRUFBRSxpQ0FBaUMsK0JBQStCLHdCQUF3QiwyQkFBMkIsZ0NBQWdDLGlCQUFpQixFQUFFLEVBQUUsMkNBQTJDLHFDQUFxQyw0QkFBNEIsc0NBQXNDLDRCQUE0QixTQUFTLDJCQUEyQiw0QkFBNEIscUNBQXFDLEVBQUUsc0NBQXNDLCtCQUErQixTQUFTLDJCQUEyQixpQ0FBaUMscUNBQXFDLEVBQUUsc0NBQXNDLDhCQUE4QixTQUFTLDJCQUEyQixnQ0FBZ0MscUNBQXFDLEVBQUUsc0NBQXNDLDZCQUE2QixTQUFTLDJCQUEyQiwwQ0FBMEMscUNBQXFDLEVBQUUsc0NBQXNDLCtCQUErQixTQUFTLDBCQUEwQiwyQkFBMkIsNENBQTRDLHFDQUFxQyxFQUFFLEVBQUUsMkNBQTJDLHlDQUF5Qyw0QkFBNEIsc0NBQXNDLDhCQUE4QixTQUFTLDJCQUEyQixnQ0FBZ0MscUNBQXFDLEVBQUUsc0NBQXNDLDZCQUE2QixTQUFTLDJCQUEyQixnQ0FBZ0MscUNBQXFDLEVBQUUsc0NBQXNDLCtCQUErQixTQUFTLDJCQUEyQixnQ0FBZ0MscUNBQXFDLEVBQUUsRUFBRSwyQ0FBMkMsMENBQTBDLDRCQUE0QixzQ0FBc0MsMkJBQTJCLFNBQVMsNkJBQTZCLDJCQUEyQixpQ0FBaUMscUNBQXFDLEVBQUUsc0NBQXNDLG9DQUFvQyxTQUFTLDJCQUEyQixnQ0FBZ0MscUNBQXFDLEVBQUUsc0NBQXNDLGtDQUFrQyxTQUFTLDJCQUEyQiw2QkFBNkIscUNBQXFDLEVBQUUsc0NBQXNDLCtCQUErQixTQUFTLDZCQUE2QiwyQkFBMkIsaUNBQWlDLHFDQUFxQyxFQUFFLEVBQUUsMkNBQTJDLDJDQUEyQyw0QkFBNEIsc0NBQXNDLCtCQUErQixTQUFTLDJCQUEyQixpQ0FBaUMscUNBQXFDLEVBQUUsc0NBQXNDLDhCQUE4QixTQUFTLDZCQUE2QiwyQkFBMkIsaUNBQWlDLHFDQUFxQyxFQUFFLEVBQUUsc0NBQXNDLHFDQUFxQyw0Q0FBNEMsaUNBQWlDLDJCQUEyQix3QkFBd0IsMkJBQTJCLDZCQUE2QixpQkFBaUIsRUFBRSxpQ0FBaUMsMEJBQTBCLHdCQUF3QiwyQkFBMkIsNkJBQTZCLGlCQUFpQixFQUFFLEVBQUUsc0NBQXNDLHFDQUFxQyw0Q0FBNEMsaUNBQWlDLDRCQUE0Qix3QkFBd0IsMkJBQTJCLDRCQUE0QixpQkFBaUIsRUFBRSxpQ0FBaUMsMkJBQTJCLHdCQUF3QiwyQkFBMkIsNkJBQTZCLGlCQUFpQixFQUFFLGlDQUFpQywwQkFBMEIsd0JBQXdCLDJCQUEyQiw2QkFBNkIsaUJBQWlCLEVBQUUsaUNBQWlDLGtDQUFrQyx3QkFBd0IsMkJBQTJCLDZCQUE2QixpQkFBaUIsRUFBRSxFQUFFLCtDQUErQyxzQ0FBc0MsOEJBQThCLDRDQUE0QyxpQ0FBaUMsc0NBQXNDLGVBQWUsc0NBQXNDLCtCQUErQixTQUFTLDJCQUEyQixpQ0FBaUMscUNBQXFDLFVBQVUsMEJBQTBCLDJCQUEyQixrQ0FBa0MsaUJBQWlCLEVBQUUsaUNBQWlDLGtDQUFrQyxlQUFlLHNDQUFzQyw0QkFBNEIsU0FBUyw2QkFBNkIsMkJBQTJCLDZCQUE2QixxQ0FBcUMsVUFBVSwyQkFBMkIsaUNBQWlDLGlCQUFpQixFQUFFLGlDQUFpQyxxQ0FBcUMsZUFBZSxzQ0FBc0MsOEJBQThCLFNBQVMsNkJBQTZCLDJCQUEyQixpQ0FBaUMscUNBQXFDLFVBQVUsMkJBQTJCLGlDQUFpQyxpQkFBaUIsRUFBRSxpQ0FBaUMsc0NBQXNDLGVBQWUsc0NBQXNDLCtCQUErQixTQUFTLDJCQUEyQixpQ0FBaUMscUNBQXFDLEVBQUUsc0NBQXNDLDhCQUE4QixTQUFTLDZCQUE2QiwyQkFBMkIsaUNBQWlDLHFDQUFxQyxVQUFVLDBCQUEwQiwyQkFBMkIsa0NBQWtDLGlCQUFpQixHQUFHLEVBQUUsK0NBQStDLHNDQUFzQyxpQ0FBaUMsNENBQTRDLGlDQUFpQyxzQ0FBc0MsZUFBZSxzQ0FBc0MsOEJBQThCLFNBQVMsMkJBQTJCLHNDQUFzQyxxQ0FBcUMsVUFBVSwyQkFBMkIsaUNBQWlDLGlCQUFpQixFQUFFLGlDQUFpQyxzQ0FBc0MsZUFBZSxzQ0FBc0MsOEJBQThCLFNBQVMsMkJBQTJCLHNDQUFzQyxxQ0FBcUMsVUFBVSwyQkFBMkIsaUNBQWlDLGlCQUFpQixFQUFFLGlDQUFpQyxzQ0FBc0MsZUFBZSxzQ0FBc0MsNEJBQTRCLFNBQVMsNkJBQTZCLDJCQUEyQiw2QkFBNkIscUNBQXFDLFVBQVUsMkJBQTJCLHNDQUFzQyxpQkFBaUIsR0FBRyxTQUFTO0FBQ3I1VCxzQkFBc0IsaUNBQWlDLDJJQUEySSxxQ0FBcUMsc0RBQXNELHVDQUF1Qyw0RUFBNEUsd0JBQXdCLDJHQUEyRyw0QkFBNEIsc0RBQXNELDZCQUE2Qiw4RUFBOEUsOEJBQThCLHdDQUF3Qyx1QkFBdUIsd0JBQXdCLHVCQUF1QixxREFBcUQsb0VBQW9FLGlMQUFpTCx1RUFBdUUsdUlBQXVJLCtDQUErQzs7O0FBR240QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQjs7Ozs7Ozs7Ozs7Ozs7O2tCQ3BCZTtBQUFBLFNBQVc7QUFDeEJFLFdBQU87QUFDTEMsbUJBREsseUJBQ1NDLENBRFQsUUFDd0JDLEdBRHhCLEVBQzZCO0FBQUEsWUFBZkMsTUFBZSxRQUFmQSxNQUFlOztBQUNoQyxlQUFPRCxJQUFJSixPQUFKLENBQVlNLGFBQVosQ0FBMEIsSUFBMUIsQ0FBUDtBQUNEO0FBSEksS0FEaUI7QUFNeEJDLGNBQVU7QUFDRkMsbUJBREUseUJBQ1lMLENBRFosU0FDMEJDLEdBRDFCLEVBQytCO0FBQUE7O0FBQUEsWUFBZEssS0FBYyxTQUFkQSxLQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQ3hCTCxJQUFJSixPQUFKLENBQVlVLE1BQVosQ0FBbUIsRUFBQ1gsU0FBU1UsS0FBVixFQUFuQixDQUR3Qjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRXRDO0FBSE87O0FBTmMsR0FBWDtBQUFBLEM7Ozs7Ozs7Ozs7Ozs7OztBQ0RmOzs7Ozs7OztJQUVxQlQsTzs7Ozs7OztrQ0FFTEssTSxFQUFRO0FBQ3BCO0FBQ0EsYUFBTyxrQkFBYU0sSUFBYixDQUFrQixFQUFDTixjQUFELEVBQWxCLEVBQTRCTyxJQUE1QixFQUFQO0FBQ0Q7Ozs7OztrQkFMa0JaLE87Ozs7Ozs7OztBQ0ZyQixJQUFNYSxXQUFXLG1CQUFBQyxDQUFRLENBQVIsQ0FBakI7O0FBRUEsSUFBTUMsY0FBY0YsU0FBU0csTUFBVCxDQUFnQjtBQUNsQ0MsZUFBYztBQUNaQyxVQUFNQyxNQURNO0FBRVpDLFVBQU0sSUFGTTtBQUdaQyxhQUFTO0FBSEcsR0FEb0I7QUFNbENoRCxNQUFhOEMsTUFOcUI7QUFPbENHLGFBQWNDLE1BUG9CO0FBUWxDQyxVQUFjTDtBQVJvQixDQUFoQixDQUFwQjs7QUFXQSxJQUFNTSxnQkFBZ0JaLFNBQVNHLE1BQVQsQ0FBZ0I7QUFDcENYLFVBQVE7QUFDTmEsVUFBTVEsT0FEQTtBQUVOTCxhQUFTO0FBRkgsR0FENEI7QUFLcENNLFNBQU87QUFDTFQsVUFBTUMsTUFERDtBQUVMUyxXQUFVLElBRkw7QUFHTFIsVUFBVSxJQUhMO0FBSUxTLFlBQVUsSUFKTDtBQUtMQyxXQUFVLENBQUMsK0NBQUQsRUFBa0Qsc0NBQWxEO0FBTEwsR0FMNkI7QUFZcENDLFFBQU07QUFDSkMsV0FBUWIsTUFESjtBQUVKYyxVQUFRZCxNQUZKO0FBR0plLFlBQVFmO0FBSEosR0FaOEI7QUFpQnBDZ0IsVUFBUSxDQUFDcEIsV0FBRDtBQWpCNEIsQ0FBaEIsRUFrQnBCO0FBQ0FxQixjQUFZO0FBRFosQ0FsQm9CLENBQXRCOztBQXNCQSxJQUFNcEMsVUFBVWEsU0FBU3dCLEtBQVQsQ0FBZSxTQUFmLEVBQTBCWixhQUExQixDQUFoQjtBQUNBNUYsT0FBT0MsT0FBUCxHQUFpQmtFLE9BQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1zQyxVQUFVLG1CQUFBeEIsQ0FBUSxFQUFSLENBQWhCOztJQUdNeUIsTTs7Ozs7QUFFSjt3QkFDb0I7QUFBRSxhQUFPLENBQVA7QUFBVTs7O3dCQUNaO0FBQUUsYUFBTyxDQUFQO0FBQVU7Ozt3QkFDWjtBQUFFLGFBQU8sQ0FBUDtBQUFVOzs7d0JBQ1o7QUFBRSxhQUFPLENBQVA7QUFBVTs7O0FBRWhDLGtCQUFZMUQsT0FBWixFQUFxQjtBQUFBOztBQUNuQixRQUFLLENBQUNBLE9BQUQsSUFBWSxRQUFPQSxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQXBDLEVBQStDO0FBQzdDLFlBQU0sSUFBSTJELEtBQUosQ0FBVSw2Q0FBVixDQUFOO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDM0QsUUFBUXZELEdBQWIsRUFBa0I7QUFDaEIsWUFBTSxJQUFJa0gsS0FBSixDQUFVLHFDQUFWLENBQU47QUFDRDs7QUFFRCxTQUFLQyxPQUFMLEdBQWUsQ0FDYixFQUFDLGdCQUFnQixpQ0FBakIsRUFEYSxDQUFmO0FBR0EsU0FBSzlHLEtBQUwsR0FBbUJrRCxRQUFRbEQsS0FBM0I7QUFDQSxTQUFLQyxPQUFMLEdBQW1CaUQsUUFBUWpELE9BQTNCO0FBQ0EsU0FBS04sR0FBTCxHQUFtQnVELFFBQVF2RCxHQUEzQjtBQUNBLFNBQUtHLEtBQUwsR0FBbUJvRCxRQUFRcEQsS0FBUixJQUFpQjhHLE9BQU9HLEtBQTNDO0FBQ0EsU0FBS2xILFNBQUwsR0FBbUJxRCxRQUFRckQsU0FBUixJQUFxQixFQUF4QztBQUNBLFNBQUttSCxRQUFMLEdBQW1CLEVBQW5CO0FBQ0Q7Ozs7eUJBRUlBLFEsRUFBVTtBQUNiLFVBQU05RCxVQUFVO0FBQ2QrRCxnQkFBUSxNQURNO0FBRWR2RCxhQUFLLEtBQUsvRCxHQUZJO0FBR2R1SCxjQUFNO0FBQ0psSCxpQkFBVSxLQUFLQSxLQURYO0FBRUpDLG1CQUFVLEtBQUtBLE9BRlg7QUFHSm1ELG1CQUFTLFlBSEw7QUFJSjRELDRCQUpJO0FBS0pHLGtCQUFVLElBQUlDLElBQUo7QUFMTixTQUhRO0FBVWRDLGNBQU0sSUFWUTtBQVdkUCxpQkFBUyxFQUFDLGdCQUFnQixpQ0FBakI7QUFYSyxPQUFoQjtBQWFBSCxjQUFRekQsT0FBUixFQUNHOUIsS0FESCxDQUNTLFVBQVVHLEdBQVYsRUFBZTtBQUNwQkYsZ0JBQVFDLEtBQVIsQ0FBYyxrQkFBZCxFQUFrQ0MsSUFBSStGLE9BQXRDLEVBRG9CLENBQzJCO0FBQ2hELE9BSEg7QUFJRDs7O3dCQUVHeEgsSyxFQUFPd0gsTyxFQUFTO0FBQ2xCLFVBQU1DLE1BQU1DLEtBQUtDLFNBQUwsQ0FBZUgsT0FBZixDQUFaO0FBQ0EsVUFBSXhILFNBQVMsS0FBS0EsS0FBbEIsRUFBeUI7QUFDdkIsYUFBS2tILFFBQUwsQ0FBY1UsSUFBZCxDQUFtQjtBQUNqQjVILHNCQURpQjtBQUVqQndILG1CQUFTQztBQUZRLFNBQW5CO0FBSUEsWUFBSSxLQUFLUCxRQUFMLENBQWNXLE1BQWQsSUFBd0IsS0FBSzlILFNBQWpDLEVBQTRDO0FBQzFDLGVBQUsrSCxJQUFMLENBQVUsS0FBS1osUUFBTCxDQUFjYSxNQUFkLENBQXFCLENBQXJCLEVBQXdCLEtBQUtoSSxTQUE3QixDQUFWO0FBQ0Q7QUFDRjtBQUNGOzs7MEJBRUt5SCxPLEVBQVM7QUFDYixXQUFLNUgsR0FBTCxDQUFTa0gsT0FBT0csS0FBaEIsRUFBdUJPLE9BQXZCO0FBQ0Q7Ozt5QkFFSUEsTyxFQUFTO0FBQ1osV0FBSzVILEdBQUwsQ0FBU2tILE9BQU9rQixJQUFoQixFQUFzQlIsT0FBdEI7QUFDRDs7O3lCQUVJQSxPLEVBQVM7QUFDWixXQUFLNUgsR0FBTCxDQUFTa0gsT0FBTzdHLElBQWhCLEVBQXNCdUgsT0FBdEI7QUFDRDs7OzBCQUVLQSxPLEVBQVM7QUFDYixXQUFLNUgsR0FBTCxDQUFTa0gsT0FBT21CLEtBQWhCLEVBQXVCVCxPQUF2QjtBQUNBakcsY0FBUXdCLElBQVIsQ0FBYSxRQUFiLEVBQXVCeUUsT0FBdkIsRUFGYSxDQUVtQjtBQUNqQzs7Ozs7O2tCQUlZVixNOzs7Ozs7QUN2RmYsNEM7Ozs7OztBQ0FBLGtCQUFrQixPQUFPLDJIQUEySCxzQkFBc0IsZ0tBQWdLLGNBQWMseUI7Ozs7OztBQ0F4VixrQkFBa0Isc0NBQXNDLG9DQUFvQyxnQ0FBZ0MsZ0VBQWdFLHFCQUFxQixHQUFHLE0iLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzA3ODhjYjViYjVlNWM4ZTU2YjAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJsb2Rhc2hcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm1vbmdvb3NlXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGNvbnRhY3QgZnJvbSAnLi9jb250YWN0J1xuLy8gaW1wb3J0IGdyYXBocWxfdHlwZXMgZnJvbSAnLi9ncmFwaHFsX3R5cGVzJztcbi8vIGltcG9ydCAnLi9kZWJ1Zyc7XG5cbmltcG9ydCBGZWF0dXJlIGZyb20gJy4vY29ubmVjdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCBuZXcgRmVhdHVyZShjb250YWN0KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL2luZGV4LmpzIiwiaW1wb3J0IHsgbWVyZ2UsIG1hcCwgdW5pb24sIHdpdGhvdXQsIGNhc3RBcnJheSB9IGZyb20gJ2xvZGFzaCdcblxuY29uc3QgY29tYmluZSA9IChmZWF0dXJlcywgZXh0cmFjdG9yKSA9PlxuICB3aXRob3V0KHVuaW9uKC4uLm1hcChmZWF0dXJlcywgcmVzID0+IGNhc3RBcnJheShleHRyYWN0b3IocmVzKSkpKSwgdW5kZWZpbmVkKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBjb25zdHJ1Y3Rvcih7c2NoZW1hLCBjcmVhdGVSZXNvbHZlcnNGdW5jLCBjcmVhdGVDb250ZXh0RnVuY30sIC4uLmZlYXR1cmVzKSB7XG4gICAgdGhpcy5zY2hlbWEgPSBjb21iaW5lKGFyZ3VtZW50cywgYXJnID0+IGFyZy5zY2hlbWEpXG4gICAgdGhpcy5jcmVhdGVSZXNvbHZlcnNGdW5jID0gY29tYmluZShhcmd1bWVudHMsIGFyZyA9PiBhcmcuY3JlYXRlUmVzb2x2ZXJzRnVuYylcbiAgICB0aGlzLmNyZWF0ZUNvbnRleHRGdW5jID0gY29tYmluZShhcmd1bWVudHMsIGFyZyA9PiBhcmcuY3JlYXRlQ29udGV4dEZ1bmMpXG4gIH1cblxuICBnZXQgc2NoZW1hcygpIHtcbiAgICByZXR1cm4gdGhpcy5zY2hlbWFcbiAgfVxuXG4gIGNyZWF0ZUNvbnRleHQoKSB7XG4gICAgcmV0dXJuIG1lcmdlKHt9LCAuLi50aGlzLmNyZWF0ZUNvbnRleHRGdW5jLm1hcChjcmVhdGVDb250ZXh0ID0+IGNyZWF0ZUNvbnRleHQoKSkpXG4gIH1cblxuICBjcmVhdGVSZXNvbHZlcnMoKSAge1xuICAgIHJldHVybiBtZXJnZSh7fSwgLi4udGhpcy5jcmVhdGVSZXNvbHZlcnNGdW5jLm1hcChjcmVhdGVSZXNvbHZlcnMgPT4gY3JlYXRlUmVzb2x2ZXJzKCkpKVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvY29ubmVjdG9yLmpzIiwiaW1wb3J0IExvZ2dlciBmcm9tICcuL2xpYi9sb2dnZXInXG5cbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuL2NvbmZpZy9zZXR0aW5ncydcblxuY29uc3QgbG9nID0gbmV3IExvZ2dlcih7XG4gIHVybDogICAgICAgIHNldHRpbmdzLmxvZ2dlckFkZHJlc3MsXG4gIGJhdGNoU2l6ZTogIDIsXG4gIGxldmVsOiAgICAgIExvZ2dlci5JTkZPLFxuICBhcHBJRDogICAgICBzZXR0aW5ncy5hcHBJRCxcbiAgYXBwVHlwZTogICAgc2V0dGluZ3MuYXBwVHlwZSxcbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gbG9nXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbG9nLmpzIiwiaW1wb3J0IHsgYXBwIGFzIHNldHRpbmdzIH0gZnJvbSAnLi9hcHAuanNvbidcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuY29uc3QgZW52U2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKFxuICB7fSxcbiAgXy5waWNrQnkoc2V0dGluZ3MsICh2LCBrKSA9PiBrICE9PSAnZW52JyksXG4gIF8uZ2V0KHNldHRpbmdzLCBgZW52LiR7cHJvY2Vzcy5lbnYuTk9ERV9FTlZ9YClcbilcblxuZXhwb3J0IGRlZmF1bHQgZW52U2V0dGluZ3NcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uZmlnL3NldHRpbmdzLmpzIiwiaW1wb3J0IGhhcGkgZnJvbSAnaGFwaSdcbmltcG9ydCB7IGdyYXBoaXFsSGFwaSwgZ3JhcGhxbEhhcGkgfSBmcm9tICdhcG9sbG8tc2VydmVyLWhhcGknXG5pbXBvcnQgTW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnXG5cbmltcG9ydCB7IGludmVydCB9IGZyb20gJ2xvZGFzaCdcblxuaW1wb3J0IGV4ZWN1dGFibGVTY2hlbWEgZnJvbSAnLi9hcGkvc2NoZW1hJ1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZydcbmltcG9ydCBtb2R1bGVzIGZyb20gJy4vbW9kdWxlcydcbmltcG9ydCBxdWVyeU1hcCBmcm9tICcuL2V4dHJhY3RlZF9xdWVyaWVzLmpzb24nXG5pbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi9jb25maWcvc2V0dGluZ3MnXG5cblxuLypjbGFzcyBGb28ge1xuICBjb25zdHJ1Y3RvcigpIHsgdGhpcy5iYXIoKSB9XG4gIGJhcigpIHsgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGlzIGEgZGVtbycpIH1cbn1cbi8vIG5ldyBGb28oKSovXG5cbi8vIEluaXRpYXRlIE1vbmdvb3NlXG5Nb25nb29zZS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2Vcbk1vbmdvb3NlLmNvbm5lY3Qoc2V0dGluZ3MuREJVUkksIHNldHRpbmdzLkRCT3B0aW9ucylcbiAgLnRoZW4oKVxuICAuY2F0Y2goZXJyID0+IHtcbiAgICAvL25vdGU6IHRoaXMgaXMgbGlrZWx5IHJlZHVuZGFudCwgbmVlZCB0byB0ZXN0IHdoaWNoIGlzIGJldHRlclxuICAgIGNvbnNvbGUuZXJyb3IoJ2VycjonLCBlcnIpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBsb2cuZXJyb3IoZXJyKVxuICB9XG4pXG5cbmNvbnN0IGRiID0gTW9uZ29vc2UuY29ubmVjdGlvblxuZGIub24oJ2Vycm9yJywgY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUsICdDb25uZWN0aW9uIGVycm9yOicpKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbmRiLm9uY2UoJ29wZW4nLCAoKSA9PiBjb25zb2xlLmxvZygnbW9uZ29kYiBpcyBjb25uZWN0ZWQuLi4nKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbmNvbnN0IHNlcnZlciA9IG5ldyBoYXBpLlNlcnZlcigpXG5zZXJ2ZXIuY29ubmVjdGlvbih7XG4gIGhvc3Q6IHNldHRpbmdzLmFwcEhvc3QsXG4gIHBvcnQ6IHNldHRpbmdzLmFwcFBvcnQsXG4gIHJvdXRlczogeydjb3JzJzogdHJ1ZX0sXG59KVxuXG5zZXJ2ZXIuZXh0KCdvblByZUhhbmRsZXInLCAocmVxLCByZXBseSkgPT4ge1xuICBpZiAocmVxLnVybC5wYXRoLmluZGV4T2YoJy9ncmFwaHFsJykgPj0gMCAmJiByZXEucGF5bG9hZC5pZCkge1xuICAgIGNvbnN0IGludmVydGVkTWFwID0gaW52ZXJ0KHF1ZXJ5TWFwKVxuICAgIHJlcS5wYXlsb2FkLnF1ZXJ5ID0gaW52ZXJ0ZWRNYXBbcmVxLnBheWxvYWQuaWRdXG4gICAgbG9nLmluZm8oe3F1ZXJ5OiByZXEucGF5bG9hZC5xdWVyeX0pXG4gIH1cbiAgcmV0dXJuIHJlcGx5LmNvbnRpbnVlKClcbn0pXG5cbnNlcnZlci5leHQoJ29uUHJlUmVzcG9uc2UnLCBmdW5jdGlvbihyZXEsIHJlcGx5KSB7XG4gIHJlcS5yZXNwb25zZS5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAnR0VULCBQT1NULCBPUFRJT05TJylcbiAgcmV0dXJuIHJlcGx5LmNvbnRpbnVlKClcbn0pXG5cbnNlcnZlci5yZWdpc3Rlcih7XG4gIHJlZ2lzdGVyOiBncmFwaHFsSGFwaSxcbiAgb3B0aW9uczoge1xuICAgIHBhdGg6ICcvZ3JhcGhxbCcsXG4gICAgZ3JhcGhxbE9wdGlvbnM6ICgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjaGVtYTogZXhlY3V0YWJsZVNjaGVtYSxcbiAgICAgICAgY29udGV4dDogbW9kdWxlcy5jcmVhdGVDb250ZXh0KCksXG4gICAgICAgIGZvcm1hdEVycm9yKGVycm9yKSB7XG4gICAgICAgICAgbG9nLmVycm9yKGVycm9yLnN0YWNrKVxuICAgICAgICAgIHJldHVybiBlcnJvclxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KVxuXG5zZXJ2ZXIucmVnaXN0ZXIoe1xuICByZWdpc3RlcjogZ3JhcGhpcWxIYXBpLFxuICBvcHRpb25zOiB7XG4gICAgcGF0aDogJy9ncmFwaGlxbCcsXG4gICAgZ3JhcGhpcWxPcHRpb25zOiB7XG4gICAgICBlbmRwb2ludFVSTDogJy9ncmFwaHFsJyxcbiAgICB9LFxuICB9LFxufSwgZnVuY3Rpb24gKGVycikge1xuICBpZiAoZXJyKSB7IHRocm93IGVyciB9XG5cbiAgc2VydmVyLnN0YXJ0KGZ1bmN0aW9uICgpIHtcbiAgICBzZXJ2ZXIubG9nKCdpbmZvJywgYFNlcnZlciBydW5uaW5nIGF0ICR7c2VydmVyLmluZm8udXJpfWApXG4gICAgbG9nLmluZm8oYFNlcnZlciBydW5uaW5nIGF0ICR7c2VydmVyLmluZm8udXJpfWApXG4gIH0pXG59KVxuXG5wcm9jZXNzLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIChleCkgPT4ge1xuICBsb2cuZXJyb3IoZXgpXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgcmVhc29uID0+IHtcbiAgbG9nLmVycm9yKHJlYXNvbilcbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGFwaVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhhcGlcIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWhhcGlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhcG9sbG8tc2VydmVyLWhhcGlcIlxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBtYWtlRXhlY3V0YWJsZVNjaGVtYSwgYWRkRXJyb3JMb2dnaW5nVG9TY2hlbWEgfSBmcm9tICdncmFwaHFsLXRvb2xzJ1xuLy8gaW1wb3J0IHsgYWRkQXBvbGxvTG9nZ2luZyB9IGZyb20gJ2Fwb2xsby1sb2dnZXInXG5cbmltcG9ydCByb290U2NoZW1hRGVmIGZyb20gJy4vcm9vdC1zY2hlbWEuZ3JhcGhxbCdcbmltcG9ydCBtb2R1bGVzIGZyb20gJy4uL21vZHVsZXMnXG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZydcbi8vIGltcG9ydCBzZXR0aW5ncyBmcm9tICcuLi8uLi9jb25maWcvc2V0dGluZ3MnXG5cblxuY29uc3QgZXhlY3V0YWJsZVNjaGVtYSA9IG1ha2VFeGVjdXRhYmxlU2NoZW1hKHtcbiAgdHlwZURlZnM6IFtyb290U2NoZW1hRGVmXS5jb25jYXQobW9kdWxlcy5zY2hlbWFzKSxcbiAgcmVzb2x2ZXJzOiBtb2R1bGVzLmNyZWF0ZVJlc29sdmVycygpLFxufSlcblxuYWRkRXJyb3JMb2dnaW5nVG9TY2hlbWEoZXhlY3V0YWJsZVNjaGVtYSwgeyBsb2c6IChlKSA9PiBsb2cuZXJyb3IoZSkgfSlcblxuZXhwb3J0IGRlZmF1bHQgZXhlY3V0YWJsZVNjaGVtYVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwaS9zY2hlbWEuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsLXRvb2xzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZ3JhcGhxbC10b29sc1wiXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgZG9jID0ge1wia2luZFwiOlwiRG9jdW1lbnRcIixcImRlZmluaXRpb25zXCI6W3tcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlF1ZXJ5XCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJkdW1teVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbnRcIn19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk11dGF0aW9uXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJkdW1teVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbnRcIn19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN1YnNjcmlwdGlvblwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZHVtbXlcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSW50XCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJTY2hlbWFEZWZpbml0aW9uXCIsXCJkaXJlY3RpdmVzXCI6W10sXCJvcGVyYXRpb25UeXBlc1wiOlt7XCJraW5kXCI6XCJPcGVyYXRpb25UeXBlRGVmaW5pdGlvblwiLFwib3BlcmF0aW9uXCI6XCJxdWVyeVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJRdWVyeVwifX19LHtcImtpbmRcIjpcIk9wZXJhdGlvblR5cGVEZWZpbml0aW9uXCIsXCJvcGVyYXRpb25cIjpcIm11dGF0aW9uXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk11dGF0aW9uXCJ9fX0se1wia2luZFwiOlwiT3BlcmF0aW9uVHlwZURlZmluaXRpb25cIixcIm9wZXJhdGlvblwiOlwic3Vic2NyaXB0aW9uXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN1YnNjcmlwdGlvblwifX19XX1dLFwibG9jXCI6e1wic3RhcnRcIjowLFwiZW5kXCI6MTczfX07XG4gICAgZG9jLmxvYy5zb3VyY2UgPSB7XCJib2R5XCI6XCJ0eXBlIFF1ZXJ5IHtcXG4gIGR1bW15OiBJbnRcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBkdW1teTogSW50XFxufVxcblxcbnR5cGUgU3Vic2NyaXB0aW9uIHtcXG4gIGR1bW15OiBJbnRcXG59XFxuXFxuc2NoZW1hIHtcXG4gIHF1ZXJ5OiBRdWVyeVxcbiAgbXV0YXRpb246IE11dGF0aW9uXFxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvblxcbn1cXG5cIixcIm5hbWVcIjpcIkdyYXBoUUwgcmVxdWVzdFwiLFwibG9jYXRpb25PZmZzZXRcIjp7XCJsaW5lXCI6MSxcImNvbHVtblwiOjF9fTtcbiAgXG5cbiAgICB2YXIgbmFtZXMgPSB7fTtcbiAgICBmdW5jdGlvbiB1bmlxdWUoZGVmcykge1xuICAgICAgcmV0dXJuIGRlZnMuZmlsdGVyKFxuICAgICAgICBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBpZiAoZGVmLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGRlZi5uYW1lLnZhbHVlXG4gICAgICAgICAgaWYgKG5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgXG5tb2R1bGUuZXhwb3J0cyA9IGRvYztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hcGkvcm9vdC1zY2hlbWEuZ3JhcGhxbFxuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHNjaGVtYSBmcm9tICcuL3NjaGVtYS5ncmFwaHFsJ1xuaW1wb3J0IGNyZWF0ZVJlc29sdmVycyBmcm9tICcuL3Jlc29sdmVycydcblxuaW1wb3J0IENvbnRhY3QgZnJvbSAnLi9jb250ZXh0J1xuaW1wb3J0IEZlYXR1cmUgZnJvbSAnLi4vY29ubmVjdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCBuZXcgRmVhdHVyZSh7c2NoZW1hLCBjcmVhdGVSZXNvbHZlcnNGdW5jOiBjcmVhdGVSZXNvbHZlcnMsXG4gIGNyZWF0ZUNvbnRleHRGdW5jOiAoKSA9PiB7XG5cbiAgICBjb25zdCBjb250YWN0ID0gbmV3IENvbnRhY3QoKVxuICAgIC8vIGNvbnNvbGUubG9nKCdjb250YWN0IGluIGNyZWF0ZUNvbnRleHRGdW5jOicsIGNvbnRhY3QpXG4gICAgcmV0dXJuIHtcbiAgICAgIENvbnRhY3Q6IGNvbnRhY3QsXG4gICAgfVxuICAgIC8qY29uc3QgcG9zdCA9IG5ldyBQb3N0KCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgUG9zdDogcG9zdCxcbiAgICAgIGxvYWRlcnM6IHtcbiAgICAgICAgZ2V0Q29tbWVudHNGb3JQb3N0SWRzOiBuZXcgRGF0YUxvYWRlcihwb3N0LmdldENvbW1lbnRzRm9yUG9zdElkcyksXG4gICAgICB9XG4gICAgfTsqL1xuICB9LFxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9jb250YWN0L2luZGV4LmpzIiwiXG4gICAgdmFyIGRvYyA9IHtcImtpbmRcIjpcIkRvY3VtZW50XCIsXCJkZWZpbml0aW9uc1wiOlt7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDb250YWN0XCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJfaWRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSURcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiYWN0aXZlXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2xlYW5cIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZW1haWxcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIm5hbWVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ29udGFjdE5hbWVcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicGhvbmVzXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTGlzdFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ29udGFjdFBob25lXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ1cGRhdGVkQXRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNyZWF0ZWRBdFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNvbnRhY3ROYW1lXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJmaXJzdFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwibGFzdFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicHJlZml4XCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ29udGFjdFBob25lXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpZFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY291bnRyeUNvZGVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImV4dGVuc2lvblwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbnRcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwibnVtYmVyXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDb250YWN0SW5wdXRcIn0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiX2lkXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJRFwifX0sXCJkZWZhdWx0VmFsdWVcIjpudWxsLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJhY3RpdmVcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2xlYW5cIn19LFwiZGVmYXVsdFZhbHVlXCI6bnVsbCxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZW1haWxcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkZWZhdWx0VmFsdWVcIjpudWxsLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJuYW1lXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDb250YWN0TmFtZUlucHV0XCJ9fSxcImRlZmF1bHRWYWx1ZVwiOm51bGwsXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInBob25lc1wifSxcInR5cGVcIjp7XCJraW5kXCI6XCJMaXN0VHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDb250YWN0UGhvbmVJbnB1dFwifX19LFwiZGVmYXVsdFZhbHVlXCI6bnVsbCxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNvbnRhY3ROYW1lSW5wdXRcIn0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZmlyc3RcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkZWZhdWx0VmFsdWVcIjpudWxsLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJsYXN0XCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19LFwiZGVmYXVsdFZhbHVlXCI6bnVsbCxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicHJlZml4XCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19LFwiZGVmYXVsdFZhbHVlXCI6bnVsbCxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNvbnRhY3RQaG9uZUlucHV0XCJ9LFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlkXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGVmYXVsdFZhbHVlXCI6bnVsbCxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY291bnRyeUNvZGVcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkZWZhdWx0VmFsdWVcIjpudWxsLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJleHRlbnNpb25cIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkludFwifX0sXCJkZWZhdWx0VmFsdWVcIjpudWxsLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJudW1iZXJcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkZWZhdWx0VmFsdWVcIjpudWxsLFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIklucHV0T2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ29udGFjdFNlYXJjaElucHV0XCJ9LFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImFjdGl2ZVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX0sXCJkZWZhdWx0VmFsdWVcIjpudWxsLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJlbWFpbFwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRlZmF1bHRWYWx1ZVwiOm51bGwsXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUmVtb3ZlUmVzdWx0XCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJva1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbnRcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiblwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbnRcIn19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlVwZGF0ZVJlc3VsdFwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiX2lkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIklEXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIm9rXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkludFwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJuXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkludFwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJuTW9kaWZpZWRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSW50XCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJUeXBlRXh0ZW5zaW9uRGVmaW5pdGlvblwiLFwiZGVmaW5pdGlvblwiOntcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlF1ZXJ5XCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJmZXRjaENvbnRhY3RzXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImFjdGl2ZVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX0sXCJkZWZhdWx0VmFsdWVcIjpudWxsLFwiZGlyZWN0aXZlc1wiOltdfV0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTGlzdFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ29udGFjdFwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZmV0Y2hCeUlkXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIl9pZFwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJRFwifX19LFwiZGVmYXVsdFZhbHVlXCI6bnVsbCxcImRpcmVjdGl2ZXNcIjpbXX1dLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDb250YWN0XCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImZldGNoQnlFbWFpbFwifSxcImFyZ3VtZW50c1wiOlt7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJlbWFpbFwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRlZmF1bHRWYWx1ZVwiOm51bGwsXCJkaXJlY3RpdmVzXCI6W119XSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ29udGFjdFwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJzZWFyY2hCeUVtYWlsXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImFjdGl2ZVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX0sXCJkZWZhdWx0VmFsdWVcIjpudWxsLFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJlbWFpbFwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRlZmF1bHRWYWx1ZVwiOm51bGwsXCJkaXJlY3RpdmVzXCI6W119XSxcInR5cGVcIjp7XCJraW5kXCI6XCJMaXN0VHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDb250YWN0XCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XX19LHtcImtpbmRcIjpcIlR5cGVFeHRlbnNpb25EZWZpbml0aW9uXCIsXCJkZWZpbml0aW9uXCI6e1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTXV0YXRpb25cIn0sXCJpbnRlcmZhY2VzXCI6W10sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNyZWF0ZUNvbnRhY3RcIn0sXCJhcmd1bWVudHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiaW5wdXRcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNvbnRhY3RJbnB1dFwifX0sXCJkZWZhdWx0VmFsdWVcIjpudWxsLFwiZGlyZWN0aXZlc1wiOltdfV0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNvbnRhY3RcIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXBkYXRlQ29udGFjdFwifSxcImFyZ3VtZW50c1wiOlt7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpbnB1dFwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ29udGFjdElucHV0XCJ9fSxcImRlZmF1bHRWYWx1ZVwiOm51bGwsXCJkaXJlY3RpdmVzXCI6W119XSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ29udGFjdFwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJyZW1vdmVDb250YWN0XCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIl9pZFwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJRFwifX19LFwiZGVmYXVsdFZhbHVlXCI6bnVsbCxcImRpcmVjdGl2ZXNcIjpbXX1dLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJSZW1vdmVSZXN1bHRcIn19LFwiZGlyZWN0aXZlc1wiOltdfV19fV0sXCJsb2NcIjp7XCJzdGFydFwiOjAsXCJlbmRcIjoxMjU2fX07XG4gICAgZG9jLmxvYy5zb3VyY2UgPSB7XCJib2R5XCI6XCIjIENvbnRhY3RcXG50eXBlIENvbnRhY3Qge1xcbiAgX2lkOiBJRFxcbiAgYWN0aXZlOiBCb29sZWFuXFxuICBlbWFpbDogU3RyaW5nXFxuICBuYW1lOiBDb250YWN0TmFtZVxcbiAgcGhvbmVzOiBbQ29udGFjdFBob25lXVxcbiAgdXBkYXRlZEF0OiBTdHJpbmdcXG4gIGNyZWF0ZWRBdDogU3RyaW5nXFxufVxcblxcbiMgQ29udGFjdE5hbWVcXG50eXBlIENvbnRhY3ROYW1lIHtcXG4gIGZpcnN0OiBTdHJpbmdcXG4gIGxhc3Q6IFN0cmluZ1xcbiAgcHJlZml4OiBTdHJpbmdcXG59XFxuXFxuIyBDb250YWN0UGhvbmVcXG50eXBlIENvbnRhY3RQaG9uZSB7XFxuICBpZDogU3RyaW5nXFxuICBjb3VudHJ5Q29kZTogU3RyaW5nXFxuICBleHRlbnNpb246IEludFxcbiAgbnVtYmVyOiBTdHJpbmdcXG59XFxuXFxuaW5wdXQgQ29udGFjdElucHV0IHtcXG4gIF9pZDogSURcXG4gIGFjdGl2ZTogQm9vbGVhblxcbiAgZW1haWw6IFN0cmluZ1xcbiAgbmFtZTogQ29udGFjdE5hbWVJbnB1dFxcbiAgcGhvbmVzOiBbQ29udGFjdFBob25lSW5wdXRdXFxufVxcblxcbmlucHV0IENvbnRhY3ROYW1lSW5wdXQge1xcbiAgZmlyc3Q6IFN0cmluZ1xcbiAgbGFzdDogU3RyaW5nXFxuICBwcmVmaXg6IFN0cmluZ1xcbn1cXG5cXG5pbnB1dCBDb250YWN0UGhvbmVJbnB1dCB7XFxuICBpZDogU3RyaW5nIVxcbiAgY291bnRyeUNvZGU6IFN0cmluZ1xcbiAgZXh0ZW5zaW9uOiBJbnRcXG4gIG51bWJlcjogU3RyaW5nIVxcbn1cXG5cXG5pbnB1dCBDb250YWN0U2VhcmNoSW5wdXQge1xcbiAgYWN0aXZlOiBCb29sZWFuXFxuICBlbWFpbDogU3RyaW5nIVxcbn1cXG5cXG50eXBlIFJlbW92ZVJlc3VsdCB7XFxuICBvazogSW50XFxuICBuOiBJbnRcXG59XFxuXFxudHlwZSBVcGRhdGVSZXN1bHQge1xcbiAgX2lkOiBJRFxcbiAgb2s6IEludFxcbiAgbjogSW50XFxuICBuTW9kaWZpZWQ6IEludFxcbn1cXG5cXG4jIFF1ZXJpZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcblxcbmV4dGVuZCB0eXBlIFF1ZXJ5IHtcXG4gIGZldGNoQ29udGFjdHMoYWN0aXZlOkJvb2xlYW4pOiBbQ29udGFjdF1cXG4gIGZldGNoQnlJZChfaWQ6SUQhKTogQ29udGFjdFxcbiAgZmV0Y2hCeUVtYWlsKGVtYWlsOlN0cmluZyEpOiBDb250YWN0XFxuICBzZWFyY2hCeUVtYWlsKGFjdGl2ZTpCb29sZWFuLCBlbWFpbDpTdHJpbmchKTogW0NvbnRhY3RdXFxufVxcblxcbiMgTXV0YXRpb25zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxuXFxuZXh0ZW5kIHR5cGUgTXV0YXRpb24ge1xcbiAgY3JlYXRlQ29udGFjdChpbnB1dDpDb250YWN0SW5wdXQpOiBDb250YWN0XFxuICB1cGRhdGVDb250YWN0KGlucHV0OkNvbnRhY3RJbnB1dCk6IENvbnRhY3RcXG4gIHJlbW92ZUNvbnRhY3QoX2lkOklEISk6IFJlbW92ZVJlc3VsdFxcbn1cXG5cIixcIm5hbWVcIjpcIkdyYXBoUUwgcmVxdWVzdFwiLFwibG9jYXRpb25PZmZzZXRcIjp7XCJsaW5lXCI6MSxcImNvbHVtblwiOjF9fTtcbiAgXG5cbiAgICB2YXIgbmFtZXMgPSB7fTtcbiAgICBmdW5jdGlvbiB1bmlxdWUoZGVmcykge1xuICAgICAgcmV0dXJuIGRlZnMuZmlsdGVyKFxuICAgICAgICBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBpZiAoZGVmLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGRlZi5uYW1lLnZhbHVlXG4gICAgICAgICAgaWYgKG5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgXG5tb2R1bGUuZXhwb3J0cyA9IGRvYztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R1bGVzL2NvbnRhY3Qvc2NoZW1hLmdyYXBocWxcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuZXhwb3J0IGRlZmF1bHQgcHVic3ViID0+ICh7XG4gIFF1ZXJ5OiB7XG4gICAgZmV0Y2hDb250YWN0cyhfLCB7IGFjdGl2ZSB9LCBjdHgpIHtcbiAgICAgIHJldHVybiBjdHguQ29udGFjdC5mZXRjaEJ5QWN0aXZlKHRydWUpXG4gICAgfSxcbiAgfSxcbiAgTXV0YXRpb246IHtcbiAgICBhc3luYyBjcmVhdGVDb250YWN0KF8sIHsgaW5wdXQgfSwgY3R4KSB7XG4gICAgICByZXR1cm4gYXdhaXQgY3R4LkNvbnRhY3QuY3JlYXRlKHtjb250YWN0OiBpbnB1dH0pXG4gICAgfSxcbiAgfSxcblxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9jb250YWN0L3Jlc29sdmVycy5qcyIsImltcG9ydCBDb250YWN0TW9kZWwgZnJvbSAnLi4vLi4vbW9kZWwvY29udGFjdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFjdCB7XG5cbiAgZmV0Y2hCeUFjdGl2ZShhY3RpdmUpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnZmV0Y2hCeUFjdGl2ZSBpbiBDb250YWN0IGNvbnRleHQ6JylcbiAgICByZXR1cm4gQ29udGFjdE1vZGVsLmZpbmQoe2FjdGl2ZX0pLmV4ZWMoKVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvY29udGFjdC9jb250ZXh0LmpzIiwiY29uc3QgTW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpXG5cbmNvbnN0IFBob25lU2NoZW1hID0gTW9uZ29vc2UuU2NoZW1hKHtcbiAgY291bnRyeUNvZGU6ICB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogJzEnLFxuICB9LFxuICBpZDogICAgICAgICAgU3RyaW5nLFxuICBleHRlbnNpb246ICAgIE51bWJlcixcbiAgbnVtYmVyOiAgICAgICBTdHJpbmcsXG59KVxuXG5jb25zdCBDb250YWN0U2NoZW1hID0gTW9uZ29vc2UuU2NoZW1hKHtcbiAgYWN0aXZlOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiB0cnVlLFxuICB9LFxuICBlbWFpbDoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBpbmRleDogICAgdHJ1ZSxcbiAgICB0cmltOiAgICAgdHJ1ZSxcbiAgICB1bmlxdWU6ICAgdHJ1ZSxcbiAgICBtYXRjaDogICAgWy9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7MiwzfSkrJC8sICdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnXSxcbiAgfSxcbiAgbmFtZToge1xuICAgIGZpcnN0OiAgU3RyaW5nLFxuICAgIGxhc3Q6ICAgU3RyaW5nLFxuICAgIHByZWZpeDogU3RyaW5nLFxuICB9LFxuICBwaG9uZXM6IFtQaG9uZVNjaGVtYV0sXG59LHtcbiAgdGltZXN0YW1wczogdHJ1ZSxcbn0pXG5cbmNvbnN0IENvbnRhY3QgPSBNb25nb29zZS5tb2RlbCgnQ29udGFjdCcsIENvbnRhY3RTY2hlbWEpXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhY3RcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWwvY29udGFjdC5qcyIsIi8vIElucGlyYXRpb24gZm9yIHRoaXMgY2xhc3MgY2FtZSBmcm9tOlxuLy8gIGh0dHBzOi8vd3d3LnNpdGVwb2ludC5jb20vbG9nZ2luZy1lcnJvcnMtY2xpZW50LXNpZGUtYXBwcy8jcm9sbGluZ3lvdXJvd25zZXJ2ZXJzaWRlbG9nZ2VyXG4vLyAgaHR0cHM6Ly93d3cuYXRhdHVzLmNvbS9ibG9nL2ZldGNoLWFwaS9cblxuY29uc3QgcmVxdWVzdCA9IHJlcXVpcmUoJ3JlcXVlc3QtcHJvbWlzZScpXG5cblxuY2xhc3MgTG9nZ2VyIHtcblxuICAvLyBMb2cgbGV2ZWxzIGFzIHBlciBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTQyNFxuICBzdGF0aWMgZ2V0IEVSUk9SKCkgIHsgcmV0dXJuIDMgfVxuICBzdGF0aWMgZ2V0IFdBUk4oKSAgIHsgcmV0dXJuIDQgfVxuICBzdGF0aWMgZ2V0IElORk8oKSAgIHsgcmV0dXJuIDYgfVxuICBzdGF0aWMgZ2V0IERFQlVHKCkgIHsgcmV0dXJuIDcgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBpZiAoICFvcHRpb25zIHx8IHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb3B0aW9ucyBhcmUgcmVxdWlyZWQsIGFuZCBtdXN0IGJlIGFuIG9iamVjdCcpXG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLnVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zIG11c3QgaW5jbHVkZSBhIHVybCBwcm9wZXJ0eScpXG4gICAgfVxuXG4gICAgdGhpcy5oZWFkZXJzID0gW1xuICAgICAgeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCd9LFxuICAgIF1cbiAgICB0aGlzLmFwcElEICAgICAgPSAgb3B0aW9ucy5hcHBJRFxuICAgIHRoaXMuYXBwVHlwZSAgICA9ICBvcHRpb25zLmFwcFR5cGVcbiAgICB0aGlzLnVybCAgICAgICAgPSAgb3B0aW9ucy51cmxcbiAgICB0aGlzLmxldmVsICAgICAgPSAgb3B0aW9ucy5sZXZlbCB8fCBMb2dnZXIuRVJST1JcbiAgICB0aGlzLmJhdGNoU2l6ZSAgPSAgb3B0aW9ucy5iYXRjaFNpemUgfHwgMTBcbiAgICB0aGlzLm1lc3NhZ2VzICAgPSAgW11cbiAgfVxuXG4gIHNlbmQobWVzc2FnZXMpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmk6IHRoaXMudXJsLFxuICAgICAgYm9keToge1xuICAgICAgICBhcHBJRDogICAgdGhpcy5hcHBJRCxcbiAgICAgICAgYXBwVHlwZTogIHRoaXMuYXBwVHlwZSxcbiAgICAgICAgY29udGV4dDogJ2FwaSBzZXJ2ZXInLFxuICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgc2VudEF0OiAgIG5ldyBEYXRlKCksXG4gICAgICB9LFxuICAgICAganNvbjogdHJ1ZSxcbiAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnfSxcbiAgICB9XG4gICAgcmVxdWVzdChvcHRpb25zKVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRVJST1IgaW4gTG9nZ2VyOicsIGVyci5tZXNzYWdlKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgIH0pXG4gIH1cblxuICBsb2cobGV2ZWwsIG1lc3NhZ2UpIHtcbiAgICBjb25zdCBtc2cgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKVxuICAgIGlmIChsZXZlbCA8PSB0aGlzLmxldmVsKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBsZXZlbCxcbiAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgfSlcbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VzLmxlbmd0aCA+PSB0aGlzLmJhdGNoU2l6ZSkge1xuICAgICAgICB0aGlzLnNlbmQodGhpcy5tZXNzYWdlcy5zcGxpY2UoMCwgdGhpcy5iYXRjaFNpemUpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLmxvZyhMb2dnZXIuRVJST1IsIG1lc3NhZ2UpXG4gIH1cblxuICB3YXJuKG1lc3NhZ2UpIHtcbiAgICB0aGlzLmxvZyhMb2dnZXIuV0FSTiwgbWVzc2FnZSlcbiAgfVxuXG4gIGluZm8obWVzc2FnZSkge1xuICAgIHRoaXMubG9nKExvZ2dlci5JTkZPLCBtZXNzYWdlKVxuICB9XG5cbiAgZGVidWcobWVzc2FnZSkge1xuICAgIHRoaXMubG9nKExvZ2dlci5ERUJVRywgbWVzc2FnZSlcbiAgICBjb25zb2xlLmluZm8oJ2RlYnVnOicsIG1lc3NhZ2UpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGliL2xvZ2dlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlcXVlc3QtcHJvbWlzZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlcXVlc3QtcHJvbWlzZVwiXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcImFwcFwiOntcImFwb2xsb0xvZ2dpbmdcIjp0cnVlLFwiYXBwSG9zdFwiOlwiMC4wLjAuMFwiLFwiYXBwSURcIjpcIjU5OWY1OWJmNDkzOTUzNDYyOGMwMWI5ZFwiLFwiYXBwUG9ydFwiOjMzMDAsXCJhcHBUeXBlXCI6XCJzZXJ2ZXJcIixcIkRCT3B0aW9uc1wiOntcInVzZU1vbmdvQ2xpZW50XCI6dHJ1ZX0sXCJEQlVSSVwiOlwibW9uZ29kYjovLzEwLjAuMS45OjI3MDE3L2lhdC10ZXN0XCIsXCJsb2NhbGhvc3RJUFwiOlwiMTAuMC4xLjlcIixcImxvZ2dlckFkZHJlc3NcIjpcImh0dHA6Ly9sb2NhbGhvc3Q6MzAyMVwiLFwicGVyc2lzdEdyYXBoUUxcIjp0cnVlLFwicmVtb3RlTG9nZ2luZ1wiOnRydWUsXCJlbnZcIjp7XCJwcm9kdWN0aW9uXCI6e1wiYXBvbGxvTG9nZ2luZ1wiOmZhbHNlfX19fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbmZpZy9hcHAuanNvblxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJxdWVyeSBnZXRDb250YWN0cygkYWN0aXZlOiBCb29sZWFuKSB7XFxuICBmZXRjaENvbnRhY3RzKGFjdGl2ZTogJGFjdGl2ZSkge1xcbiAgICBfaWRcXG4gICAgZW1haWxcXG4gICAgbmFtZSB7XFxuICAgICAgZmlyc3RcXG4gICAgICBsYXN0XFxuICAgICAgcHJlZml4XFxuICAgICAgX190eXBlbmFtZVxcbiAgICB9XFxuICAgIF9fdHlwZW5hbWVcXG4gIH1cXG59XFxuXCI6MX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9jbGllbnQvZXh0cmFjdGVkX3F1ZXJpZXMuanNvblxuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==