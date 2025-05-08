/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const RotomProtos = $root.RotomProtos = (() => {

    /**
     * Namespace RotomProtos.
     * @exports RotomProtos
     * @namespace
     */
    const RotomProtos = {};

    RotomProtos.MitmRequest = (function() {

        /**
         * Properties of a MitmRequest.
         * @memberof RotomProtos
         * @interface IMitmRequest
         * @property {number|null} [id] MitmRequest id
         * @property {RotomProtos.MitmRequest.Method|null} [method] MitmRequest method
         * @property {RotomProtos.MitmRequest.ILoginRequest|null} [loginRequest] MitmRequest loginRequest
         * @property {RotomProtos.MitmRequest.IRpcRequest|null} [rpcRequest] MitmRequest rpcRequest
         */

        /**
         * Constructs a new MitmRequest.
         * @memberof RotomProtos
         * @classdesc Represents a MitmRequest.
         * @implements IMitmRequest
         * @constructor
         * @param {RotomProtos.IMitmRequest=} [properties] Properties to set
         */
        function MitmRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MitmRequest id.
         * @member {number} id
         * @memberof RotomProtos.MitmRequest
         * @instance
         */
        MitmRequest.prototype.id = 0;

        /**
         * MitmRequest method.
         * @member {RotomProtos.MitmRequest.Method} method
         * @memberof RotomProtos.MitmRequest
         * @instance
         */
        MitmRequest.prototype.method = 0;

        /**
         * MitmRequest loginRequest.
         * @member {RotomProtos.MitmRequest.ILoginRequest|null|undefined} loginRequest
         * @memberof RotomProtos.MitmRequest
         * @instance
         */
        MitmRequest.prototype.loginRequest = null;

        /**
         * MitmRequest rpcRequest.
         * @member {RotomProtos.MitmRequest.IRpcRequest|null|undefined} rpcRequest
         * @memberof RotomProtos.MitmRequest
         * @instance
         */
        MitmRequest.prototype.rpcRequest = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * MitmRequest payload.
         * @member {"loginRequest"|"rpcRequest"|undefined} payload
         * @memberof RotomProtos.MitmRequest
         * @instance
         */
        Object.defineProperty(MitmRequest.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["loginRequest", "rpcRequest"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new MitmRequest instance using the specified properties.
         * @function create
         * @memberof RotomProtos.MitmRequest
         * @static
         * @param {RotomProtos.IMitmRequest=} [properties] Properties to set
         * @returns {RotomProtos.MitmRequest} MitmRequest instance
         */
        MitmRequest.create = function create(properties) {
            return new MitmRequest(properties);
        };

        /**
         * Encodes the specified MitmRequest message. Does not implicitly {@link RotomProtos.MitmRequest.verify|verify} messages.
         * @function encode
         * @memberof RotomProtos.MitmRequest
         * @static
         * @param {RotomProtos.IMitmRequest} message MitmRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MitmRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.method != null && Object.hasOwnProperty.call(message, "method"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.method);
            if (message.loginRequest != null && Object.hasOwnProperty.call(message, "loginRequest"))
                $root.RotomProtos.MitmRequest.LoginRequest.encode(message.loginRequest, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.rpcRequest != null && Object.hasOwnProperty.call(message, "rpcRequest"))
                $root.RotomProtos.MitmRequest.RpcRequest.encode(message.rpcRequest, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MitmRequest message, length delimited. Does not implicitly {@link RotomProtos.MitmRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RotomProtos.MitmRequest
         * @static
         * @param {RotomProtos.IMitmRequest} message MitmRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MitmRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MitmRequest message from the specified reader or buffer.
         * @function decode
         * @memberof RotomProtos.MitmRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RotomProtos.MitmRequest} MitmRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MitmRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RotomProtos.MitmRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint32();
                        break;
                    }
                case 2: {
                        message.method = reader.int32();
                        break;
                    }
                case 3: {
                        message.loginRequest = $root.RotomProtos.MitmRequest.LoginRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.rpcRequest = $root.RotomProtos.MitmRequest.RpcRequest.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MitmRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RotomProtos.MitmRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RotomProtos.MitmRequest} MitmRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MitmRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MitmRequest message.
         * @function verify
         * @memberof RotomProtos.MitmRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MitmRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.method != null && message.hasOwnProperty("method"))
                switch (message.method) {
                default:
                    return "method: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.loginRequest != null && message.hasOwnProperty("loginRequest")) {
                properties.payload = 1;
                {
                    let error = $root.RotomProtos.MitmRequest.LoginRequest.verify(message.loginRequest);
                    if (error)
                        return "loginRequest." + error;
                }
            }
            if (message.rpcRequest != null && message.hasOwnProperty("rpcRequest")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.RotomProtos.MitmRequest.RpcRequest.verify(message.rpcRequest);
                    if (error)
                        return "rpcRequest." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MitmRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RotomProtos.MitmRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RotomProtos.MitmRequest} MitmRequest
         */
        MitmRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.RotomProtos.MitmRequest)
                return object;
            let message = new $root.RotomProtos.MitmRequest();
            if (object.id != null)
                message.id = object.id >>> 0;
            switch (object.method) {
            default:
                if (typeof object.method === "number") {
                    message.method = object.method;
                    break;
                }
                break;
            case "UNSET":
            case 0:
                message.method = 0;
                break;
            case "LOGIN":
            case 1:
                message.method = 1;
                break;
            case "RPC_REQUEST":
            case 2:
                message.method = 2;
                break;
            }
            if (object.loginRequest != null) {
                if (typeof object.loginRequest !== "object")
                    throw TypeError(".RotomProtos.MitmRequest.loginRequest: object expected");
                message.loginRequest = $root.RotomProtos.MitmRequest.LoginRequest.fromObject(object.loginRequest);
            }
            if (object.rpcRequest != null) {
                if (typeof object.rpcRequest !== "object")
                    throw TypeError(".RotomProtos.MitmRequest.rpcRequest: object expected");
                message.rpcRequest = $root.RotomProtos.MitmRequest.RpcRequest.fromObject(object.rpcRequest);
            }
            return message;
        };

        /**
         * Creates a plain object from a MitmRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RotomProtos.MitmRequest
         * @static
         * @param {RotomProtos.MitmRequest} message MitmRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MitmRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.method = options.enums === String ? "UNSET" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.method != null && message.hasOwnProperty("method"))
                object.method = options.enums === String ? $root.RotomProtos.MitmRequest.Method[message.method] === undefined ? message.method : $root.RotomProtos.MitmRequest.Method[message.method] : message.method;
            if (message.loginRequest != null && message.hasOwnProperty("loginRequest")) {
                object.loginRequest = $root.RotomProtos.MitmRequest.LoginRequest.toObject(message.loginRequest, options);
                if (options.oneofs)
                    object.payload = "loginRequest";
            }
            if (message.rpcRequest != null && message.hasOwnProperty("rpcRequest")) {
                object.rpcRequest = $root.RotomProtos.MitmRequest.RpcRequest.toObject(message.rpcRequest, options);
                if (options.oneofs)
                    object.payload = "rpcRequest";
            }
            return object;
        };

        /**
         * Converts this MitmRequest to JSON.
         * @function toJSON
         * @memberof RotomProtos.MitmRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MitmRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MitmRequest
         * @function getTypeUrl
         * @memberof RotomProtos.MitmRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MitmRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RotomProtos.MitmRequest";
        };

        /**
         * Method enum.
         * @name RotomProtos.MitmRequest.Method
         * @enum {number}
         * @property {number} UNSET=0 UNSET value
         * @property {number} LOGIN=1 LOGIN value
         * @property {number} RPC_REQUEST=2 RPC_REQUEST value
         */
        MitmRequest.Method = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNSET"] = 0;
            values[valuesById[1] = "LOGIN"] = 1;
            values[valuesById[2] = "RPC_REQUEST"] = 2;
            return values;
        })();

        MitmRequest.LoginRequest = (function() {

            /**
             * Properties of a LoginRequest.
             * @memberof RotomProtos.MitmRequest
             * @interface ILoginRequest
             * @property {string|null} [username] LoginRequest username
             * @property {RotomProtos.MitmRequest.LoginRequest.LoginSource|null} [source] LoginRequest source
             * @property {Uint8Array|null} [tokenProto] LoginRequest tokenProto
             * @property {string|null} [workerId] LoginRequest workerId
             * @property {boolean|null} [enableCompression] LoginRequest enableCompression
             */

            /**
             * Constructs a new LoginRequest.
             * @memberof RotomProtos.MitmRequest
             * @classdesc Represents a LoginRequest.
             * @implements ILoginRequest
             * @constructor
             * @param {RotomProtos.MitmRequest.ILoginRequest=} [properties] Properties to set
             */
            function LoginRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginRequest username.
             * @member {string} username
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @instance
             */
            LoginRequest.prototype.username = "";

            /**
             * LoginRequest source.
             * @member {RotomProtos.MitmRequest.LoginRequest.LoginSource} source
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @instance
             */
            LoginRequest.prototype.source = 0;

            /**
             * LoginRequest tokenProto.
             * @member {Uint8Array} tokenProto
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @instance
             */
            LoginRequest.prototype.tokenProto = $util.newBuffer([]);

            /**
             * LoginRequest workerId.
             * @member {string} workerId
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @instance
             */
            LoginRequest.prototype.workerId = "";

            /**
             * LoginRequest enableCompression.
             * @member {boolean} enableCompression
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @instance
             */
            LoginRequest.prototype.enableCompression = false;

            /**
             * Creates a new LoginRequest instance using the specified properties.
             * @function create
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @static
             * @param {RotomProtos.MitmRequest.ILoginRequest=} [properties] Properties to set
             * @returns {RotomProtos.MitmRequest.LoginRequest} LoginRequest instance
             */
            LoginRequest.create = function create(properties) {
                return new LoginRequest(properties);
            };

            /**
             * Encodes the specified LoginRequest message. Does not implicitly {@link RotomProtos.MitmRequest.LoginRequest.verify|verify} messages.
             * @function encode
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @static
             * @param {RotomProtos.MitmRequest.ILoginRequest} message LoginRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.source);
                if (message.tokenProto != null && Object.hasOwnProperty.call(message, "tokenProto"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.tokenProto);
                if (message.workerId != null && Object.hasOwnProperty.call(message, "workerId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.workerId);
                if (message.enableCompression != null && Object.hasOwnProperty.call(message, "enableCompression"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.enableCompression);
                return writer;
            };

            /**
             * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link RotomProtos.MitmRequest.LoginRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @static
             * @param {RotomProtos.MitmRequest.ILoginRequest} message LoginRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LoginRequest message from the specified reader or buffer.
             * @function decode
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {RotomProtos.MitmRequest.LoginRequest} LoginRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RotomProtos.MitmRequest.LoginRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.username = reader.string();
                            break;
                        }
                    case 2: {
                            message.source = reader.int32();
                            break;
                        }
                    case 3: {
                            message.tokenProto = reader.bytes();
                            break;
                        }
                    case 4: {
                            message.workerId = reader.string();
                            break;
                        }
                    case 5: {
                            message.enableCompression = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {RotomProtos.MitmRequest.LoginRequest} LoginRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LoginRequest message.
             * @function verify
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoginRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.source != null && message.hasOwnProperty("source"))
                    switch (message.source) {
                    default:
                        return "source: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                if (message.tokenProto != null && message.hasOwnProperty("tokenProto"))
                    if (!(message.tokenProto && typeof message.tokenProto.length === "number" || $util.isString(message.tokenProto)))
                        return "tokenProto: buffer expected";
                if (message.workerId != null && message.hasOwnProperty("workerId"))
                    if (!$util.isString(message.workerId))
                        return "workerId: string expected";
                if (message.enableCompression != null && message.hasOwnProperty("enableCompression"))
                    if (typeof message.enableCompression !== "boolean")
                        return "enableCompression: boolean expected";
                return null;
            };

            /**
             * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {RotomProtos.MitmRequest.LoginRequest} LoginRequest
             */
            LoginRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.RotomProtos.MitmRequest.LoginRequest)
                    return object;
                let message = new $root.RotomProtos.MitmRequest.LoginRequest();
                if (object.username != null)
                    message.username = String(object.username);
                switch (object.source) {
                default:
                    if (typeof object.source === "number") {
                        message.source = object.source;
                        break;
                    }
                    break;
                case "UNSET":
                case 0:
                    message.source = 0;
                    break;
                case "PTC":
                case 1:
                    message.source = 1;
                    break;
                case "PTC_OAUTH":
                case 2:
                    message.source = 2;
                    break;
                case "FB":
                case 3:
                    message.source = 3;
                    break;
                case "GOOGLE":
                case 4:
                    message.source = 4;
                    break;
                case "N_KIDS":
                case 5:
                    message.source = 5;
                    break;
                }
                if (object.tokenProto != null)
                    if (typeof object.tokenProto === "string")
                        $util.base64.decode(object.tokenProto, message.tokenProto = $util.newBuffer($util.base64.length(object.tokenProto)), 0);
                    else if (object.tokenProto.length >= 0)
                        message.tokenProto = object.tokenProto;
                if (object.workerId != null)
                    message.workerId = String(object.workerId);
                if (object.enableCompression != null)
                    message.enableCompression = Boolean(object.enableCompression);
                return message;
            };

            /**
             * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @static
             * @param {RotomProtos.MitmRequest.LoginRequest} message LoginRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.username = "";
                    object.source = options.enums === String ? "UNSET" : 0;
                    if (options.bytes === String)
                        object.tokenProto = "";
                    else {
                        object.tokenProto = [];
                        if (options.bytes !== Array)
                            object.tokenProto = $util.newBuffer(object.tokenProto);
                    }
                    object.workerId = "";
                    object.enableCompression = false;
                }
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.source != null && message.hasOwnProperty("source"))
                    object.source = options.enums === String ? $root.RotomProtos.MitmRequest.LoginRequest.LoginSource[message.source] === undefined ? message.source : $root.RotomProtos.MitmRequest.LoginRequest.LoginSource[message.source] : message.source;
                if (message.tokenProto != null && message.hasOwnProperty("tokenProto"))
                    object.tokenProto = options.bytes === String ? $util.base64.encode(message.tokenProto, 0, message.tokenProto.length) : options.bytes === Array ? Array.prototype.slice.call(message.tokenProto) : message.tokenProto;
                if (message.workerId != null && message.hasOwnProperty("workerId"))
                    object.workerId = message.workerId;
                if (message.enableCompression != null && message.hasOwnProperty("enableCompression"))
                    object.enableCompression = message.enableCompression;
                return object;
            };

            /**
             * Converts this LoginRequest to JSON.
             * @function toJSON
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for LoginRequest
             * @function getTypeUrl
             * @memberof RotomProtos.MitmRequest.LoginRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            LoginRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/RotomProtos.MitmRequest.LoginRequest";
            };

            /**
             * LoginSource enum.
             * @name RotomProtos.MitmRequest.LoginRequest.LoginSource
             * @enum {number}
             * @property {number} UNSET=0 UNSET value
             * @property {number} PTC=1 PTC value
             * @property {number} PTC_OAUTH=2 PTC_OAUTH value
             * @property {number} FB=3 FB value
             * @property {number} GOOGLE=4 GOOGLE value
             * @property {number} N_KIDS=5 N_KIDS value
             */
            LoginRequest.LoginSource = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNSET"] = 0;
                values[valuesById[1] = "PTC"] = 1;
                values[valuesById[2] = "PTC_OAUTH"] = 2;
                values[valuesById[3] = "FB"] = 3;
                values[valuesById[4] = "GOOGLE"] = 4;
                values[valuesById[5] = "N_KIDS"] = 5;
                return values;
            })();

            return LoginRequest;
        })();

        MitmRequest.RpcRequest = (function() {

            /**
             * Properties of a RpcRequest.
             * @memberof RotomProtos.MitmRequest
             * @interface IRpcRequest
             * @property {Array.<RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest>|null} [request] RpcRequest request
             * @property {number|null} [lat] RpcRequest lat
             * @property {number|null} [lon] RpcRequest lon
             */

            /**
             * Constructs a new RpcRequest.
             * @memberof RotomProtos.MitmRequest
             * @classdesc Represents a RpcRequest.
             * @implements IRpcRequest
             * @constructor
             * @param {RotomProtos.MitmRequest.IRpcRequest=} [properties] Properties to set
             */
            function RpcRequest(properties) {
                this.request = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RpcRequest request.
             * @member {Array.<RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest>} request
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @instance
             */
            RpcRequest.prototype.request = $util.emptyArray;

            /**
             * RpcRequest lat.
             * @member {number} lat
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @instance
             */
            RpcRequest.prototype.lat = 0;

            /**
             * RpcRequest lon.
             * @member {number} lon
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @instance
             */
            RpcRequest.prototype.lon = 0;

            /**
             * Creates a new RpcRequest instance using the specified properties.
             * @function create
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @static
             * @param {RotomProtos.MitmRequest.IRpcRequest=} [properties] Properties to set
             * @returns {RotomProtos.MitmRequest.RpcRequest} RpcRequest instance
             */
            RpcRequest.create = function create(properties) {
                return new RpcRequest(properties);
            };

            /**
             * Encodes the specified RpcRequest message. Does not implicitly {@link RotomProtos.MitmRequest.RpcRequest.verify|verify} messages.
             * @function encode
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @static
             * @param {RotomProtos.MitmRequest.IRpcRequest} message RpcRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RpcRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.request != null && message.request.length)
                    for (let i = 0; i < message.request.length; ++i)
                        $root.RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest.encode(message.request[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.lat != null && Object.hasOwnProperty.call(message, "lat"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.lat);
                if (message.lon != null && Object.hasOwnProperty.call(message, "lon"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.lon);
                return writer;
            };

            /**
             * Encodes the specified RpcRequest message, length delimited. Does not implicitly {@link RotomProtos.MitmRequest.RpcRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @static
             * @param {RotomProtos.MitmRequest.IRpcRequest} message RpcRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RpcRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RpcRequest message from the specified reader or buffer.
             * @function decode
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {RotomProtos.MitmRequest.RpcRequest} RpcRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RpcRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RotomProtos.MitmRequest.RpcRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.request && message.request.length))
                                message.request = [];
                            message.request.push($root.RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest.decode(reader, reader.uint32()));
                            break;
                        }
                    case 2: {
                            message.lat = reader.double();
                            break;
                        }
                    case 3: {
                            message.lon = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RpcRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {RotomProtos.MitmRequest.RpcRequest} RpcRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RpcRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RpcRequest message.
             * @function verify
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RpcRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.request != null && message.hasOwnProperty("request")) {
                    if (!Array.isArray(message.request))
                        return "request: array expected";
                    for (let i = 0; i < message.request.length; ++i) {
                        let error = $root.RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest.verify(message.request[i]);
                        if (error)
                            return "request." + error;
                    }
                }
                if (message.lat != null && message.hasOwnProperty("lat"))
                    if (typeof message.lat !== "number")
                        return "lat: number expected";
                if (message.lon != null && message.hasOwnProperty("lon"))
                    if (typeof message.lon !== "number")
                        return "lon: number expected";
                return null;
            };

            /**
             * Creates a RpcRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {RotomProtos.MitmRequest.RpcRequest} RpcRequest
             */
            RpcRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.RotomProtos.MitmRequest.RpcRequest)
                    return object;
                let message = new $root.RotomProtos.MitmRequest.RpcRequest();
                if (object.request) {
                    if (!Array.isArray(object.request))
                        throw TypeError(".RotomProtos.MitmRequest.RpcRequest.request: array expected");
                    message.request = [];
                    for (let i = 0; i < object.request.length; ++i) {
                        if (typeof object.request[i] !== "object")
                            throw TypeError(".RotomProtos.MitmRequest.RpcRequest.request: object expected");
                        message.request[i] = $root.RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest.fromObject(object.request[i]);
                    }
                }
                if (object.lat != null)
                    message.lat = Number(object.lat);
                if (object.lon != null)
                    message.lon = Number(object.lon);
                return message;
            };

            /**
             * Creates a plain object from a RpcRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @static
             * @param {RotomProtos.MitmRequest.RpcRequest} message RpcRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RpcRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.request = [];
                if (options.defaults) {
                    object.lat = 0;
                    object.lon = 0;
                }
                if (message.request && message.request.length) {
                    object.request = [];
                    for (let j = 0; j < message.request.length; ++j)
                        object.request[j] = $root.RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest.toObject(message.request[j], options);
                }
                if (message.lat != null && message.hasOwnProperty("lat"))
                    object.lat = options.json && !isFinite(message.lat) ? String(message.lat) : message.lat;
                if (message.lon != null && message.hasOwnProperty("lon"))
                    object.lon = options.json && !isFinite(message.lon) ? String(message.lon) : message.lon;
                return object;
            };

            /**
             * Converts this RpcRequest to JSON.
             * @function toJSON
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RpcRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RpcRequest
             * @function getTypeUrl
             * @memberof RotomProtos.MitmRequest.RpcRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RpcRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/RotomProtos.MitmRequest.RpcRequest";
            };

            RpcRequest.SingleRpcRequest = (function() {

                /**
                 * Properties of a SingleRpcRequest.
                 * @memberof RotomProtos.MitmRequest.RpcRequest
                 * @interface ISingleRpcRequest
                 * @property {number|null} [method] SingleRpcRequest method
                 * @property {Uint8Array|null} [payload] SingleRpcRequest payload
                 * @property {boolean|null} [isCompressed] SingleRpcRequest isCompressed
                 */

                /**
                 * Constructs a new SingleRpcRequest.
                 * @memberof RotomProtos.MitmRequest.RpcRequest
                 * @classdesc Represents a SingleRpcRequest.
                 * @implements ISingleRpcRequest
                 * @constructor
                 * @param {RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest=} [properties] Properties to set
                 */
                function SingleRpcRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SingleRpcRequest method.
                 * @member {number} method
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @instance
                 */
                SingleRpcRequest.prototype.method = 0;

                /**
                 * SingleRpcRequest payload.
                 * @member {Uint8Array} payload
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @instance
                 */
                SingleRpcRequest.prototype.payload = $util.newBuffer([]);

                /**
                 * SingleRpcRequest isCompressed.
                 * @member {boolean} isCompressed
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @instance
                 */
                SingleRpcRequest.prototype.isCompressed = false;

                /**
                 * Creates a new SingleRpcRequest instance using the specified properties.
                 * @function create
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @static
                 * @param {RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest=} [properties] Properties to set
                 * @returns {RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest} SingleRpcRequest instance
                 */
                SingleRpcRequest.create = function create(properties) {
                    return new SingleRpcRequest(properties);
                };

                /**
                 * Encodes the specified SingleRpcRequest message. Does not implicitly {@link RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest.verify|verify} messages.
                 * @function encode
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @static
                 * @param {RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest} message SingleRpcRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SingleRpcRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.method != null && Object.hasOwnProperty.call(message, "method"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.method);
                    if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.payload);
                    if (message.isCompressed != null && Object.hasOwnProperty.call(message, "isCompressed"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isCompressed);
                    return writer;
                };

                /**
                 * Encodes the specified SingleRpcRequest message, length delimited. Does not implicitly {@link RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @static
                 * @param {RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest} message SingleRpcRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SingleRpcRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SingleRpcRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest} SingleRpcRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SingleRpcRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.method = reader.int32();
                                break;
                            }
                        case 2: {
                                message.payload = reader.bytes();
                                break;
                            }
                        case 3: {
                                message.isCompressed = reader.bool();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SingleRpcRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest} SingleRpcRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SingleRpcRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SingleRpcRequest message.
                 * @function verify
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SingleRpcRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.method != null && message.hasOwnProperty("method"))
                        if (!$util.isInteger(message.method))
                            return "method: integer expected";
                    if (message.payload != null && message.hasOwnProperty("payload"))
                        if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                            return "payload: buffer expected";
                    if (message.isCompressed != null && message.hasOwnProperty("isCompressed"))
                        if (typeof message.isCompressed !== "boolean")
                            return "isCompressed: boolean expected";
                    return null;
                };

                /**
                 * Creates a SingleRpcRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest} SingleRpcRequest
                 */
                SingleRpcRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest)
                        return object;
                    let message = new $root.RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest();
                    if (object.method != null)
                        message.method = object.method | 0;
                    if (object.payload != null)
                        if (typeof object.payload === "string")
                            $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                        else if (object.payload.length >= 0)
                            message.payload = object.payload;
                    if (object.isCompressed != null)
                        message.isCompressed = Boolean(object.isCompressed);
                    return message;
                };

                /**
                 * Creates a plain object from a SingleRpcRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @static
                 * @param {RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest} message SingleRpcRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SingleRpcRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.method = 0;
                        if (options.bytes === String)
                            object.payload = "";
                        else {
                            object.payload = [];
                            if (options.bytes !== Array)
                                object.payload = $util.newBuffer(object.payload);
                        }
                        object.isCompressed = false;
                    }
                    if (message.method != null && message.hasOwnProperty("method"))
                        object.method = message.method;
                    if (message.payload != null && message.hasOwnProperty("payload"))
                        object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                    if (message.isCompressed != null && message.hasOwnProperty("isCompressed"))
                        object.isCompressed = message.isCompressed;
                    return object;
                };

                /**
                 * Converts this SingleRpcRequest to JSON.
                 * @function toJSON
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SingleRpcRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for SingleRpcRequest
                 * @function getTypeUrl
                 * @memberof RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                SingleRpcRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest";
                };

                return SingleRpcRequest;
            })();

            return RpcRequest;
        })();

        return MitmRequest;
    })();

    RotomProtos.MitmResponse = (function() {

        /**
         * Properties of a MitmResponse.
         * @memberof RotomProtos
         * @interface IMitmResponse
         * @property {number|null} [id] MitmResponse id
         * @property {RotomProtos.MitmResponse.Status|null} [status] MitmResponse status
         * @property {RotomProtos.MitmResponse.ILoginResponse|null} [loginResponse] MitmResponse loginResponse
         * @property {RotomProtos.MitmResponse.IRpcResponse|null} [rpcResponse] MitmResponse rpcResponse
         * @property {string|null} [mitmError] MitmResponse mitmError
         */

        /**
         * Constructs a new MitmResponse.
         * @memberof RotomProtos
         * @classdesc Represents a MitmResponse.
         * @implements IMitmResponse
         * @constructor
         * @param {RotomProtos.IMitmResponse=} [properties] Properties to set
         */
        function MitmResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MitmResponse id.
         * @member {number} id
         * @memberof RotomProtos.MitmResponse
         * @instance
         */
        MitmResponse.prototype.id = 0;

        /**
         * MitmResponse status.
         * @member {RotomProtos.MitmResponse.Status} status
         * @memberof RotomProtos.MitmResponse
         * @instance
         */
        MitmResponse.prototype.status = 0;

        /**
         * MitmResponse loginResponse.
         * @member {RotomProtos.MitmResponse.ILoginResponse|null|undefined} loginResponse
         * @memberof RotomProtos.MitmResponse
         * @instance
         */
        MitmResponse.prototype.loginResponse = null;

        /**
         * MitmResponse rpcResponse.
         * @member {RotomProtos.MitmResponse.IRpcResponse|null|undefined} rpcResponse
         * @memberof RotomProtos.MitmResponse
         * @instance
         */
        MitmResponse.prototype.rpcResponse = null;

        /**
         * MitmResponse mitmError.
         * @member {string} mitmError
         * @memberof RotomProtos.MitmResponse
         * @instance
         */
        MitmResponse.prototype.mitmError = "";

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * MitmResponse payload.
         * @member {"loginResponse"|"rpcResponse"|undefined} payload
         * @memberof RotomProtos.MitmResponse
         * @instance
         */
        Object.defineProperty(MitmResponse.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["loginResponse", "rpcResponse"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new MitmResponse instance using the specified properties.
         * @function create
         * @memberof RotomProtos.MitmResponse
         * @static
         * @param {RotomProtos.IMitmResponse=} [properties] Properties to set
         * @returns {RotomProtos.MitmResponse} MitmResponse instance
         */
        MitmResponse.create = function create(properties) {
            return new MitmResponse(properties);
        };

        /**
         * Encodes the specified MitmResponse message. Does not implicitly {@link RotomProtos.MitmResponse.verify|verify} messages.
         * @function encode
         * @memberof RotomProtos.MitmResponse
         * @static
         * @param {RotomProtos.IMitmResponse} message MitmResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MitmResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            if (message.loginResponse != null && Object.hasOwnProperty.call(message, "loginResponse"))
                $root.RotomProtos.MitmResponse.LoginResponse.encode(message.loginResponse, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.rpcResponse != null && Object.hasOwnProperty.call(message, "rpcResponse"))
                $root.RotomProtos.MitmResponse.RpcResponse.encode(message.rpcResponse, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.mitmError != null && Object.hasOwnProperty.call(message, "mitmError"))
                writer.uint32(/* id 100, wireType 2 =*/802).string(message.mitmError);
            return writer;
        };

        /**
         * Encodes the specified MitmResponse message, length delimited. Does not implicitly {@link RotomProtos.MitmResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RotomProtos.MitmResponse
         * @static
         * @param {RotomProtos.IMitmResponse} message MitmResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MitmResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MitmResponse message from the specified reader or buffer.
         * @function decode
         * @memberof RotomProtos.MitmResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RotomProtos.MitmResponse} MitmResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MitmResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RotomProtos.MitmResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint32();
                        break;
                    }
                case 2: {
                        message.status = reader.int32();
                        break;
                    }
                case 3: {
                        message.loginResponse = $root.RotomProtos.MitmResponse.LoginResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.rpcResponse = $root.RotomProtos.MitmResponse.RpcResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 100: {
                        message.mitmError = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MitmResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RotomProtos.MitmResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RotomProtos.MitmResponse} MitmResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MitmResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MitmResponse message.
         * @function verify
         * @memberof RotomProtos.MitmResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MitmResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 200:
                case 500:
                case 501:
                case 502:
                case 503:
                    break;
                }
            if (message.loginResponse != null && message.hasOwnProperty("loginResponse")) {
                properties.payload = 1;
                {
                    let error = $root.RotomProtos.MitmResponse.LoginResponse.verify(message.loginResponse);
                    if (error)
                        return "loginResponse." + error;
                }
            }
            if (message.rpcResponse != null && message.hasOwnProperty("rpcResponse")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.RotomProtos.MitmResponse.RpcResponse.verify(message.rpcResponse);
                    if (error)
                        return "rpcResponse." + error;
                }
            }
            if (message.mitmError != null && message.hasOwnProperty("mitmError"))
                if (!$util.isString(message.mitmError))
                    return "mitmError: string expected";
            return null;
        };

        /**
         * Creates a MitmResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RotomProtos.MitmResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RotomProtos.MitmResponse} MitmResponse
         */
        MitmResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.RotomProtos.MitmResponse)
                return object;
            let message = new $root.RotomProtos.MitmResponse();
            if (object.id != null)
                message.id = object.id >>> 0;
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "UNSET":
            case 0:
                message.status = 0;
                break;
            case "SUCCESS":
            case 200:
                message.status = 200;
                break;
            case "ERROR_UNKNOWN":
            case 500:
                message.status = 500;
                break;
            case "ERROR_RETRY_LATER":
            case 501:
                message.status = 501;
                break;
            case "ERROR_WORKER_STOPPED":
            case 502:
                message.status = 502;
                break;
            case "ERROR_RECONNECT":
            case 503:
                message.status = 503;
                break;
            }
            if (object.loginResponse != null) {
                if (typeof object.loginResponse !== "object")
                    throw TypeError(".RotomProtos.MitmResponse.loginResponse: object expected");
                message.loginResponse = $root.RotomProtos.MitmResponse.LoginResponse.fromObject(object.loginResponse);
            }
            if (object.rpcResponse != null) {
                if (typeof object.rpcResponse !== "object")
                    throw TypeError(".RotomProtos.MitmResponse.rpcResponse: object expected");
                message.rpcResponse = $root.RotomProtos.MitmResponse.RpcResponse.fromObject(object.rpcResponse);
            }
            if (object.mitmError != null)
                message.mitmError = String(object.mitmError);
            return message;
        };

        /**
         * Creates a plain object from a MitmResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RotomProtos.MitmResponse
         * @static
         * @param {RotomProtos.MitmResponse} message MitmResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MitmResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.status = options.enums === String ? "UNSET" : 0;
                object.mitmError = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.RotomProtos.MitmResponse.Status[message.status] === undefined ? message.status : $root.RotomProtos.MitmResponse.Status[message.status] : message.status;
            if (message.loginResponse != null && message.hasOwnProperty("loginResponse")) {
                object.loginResponse = $root.RotomProtos.MitmResponse.LoginResponse.toObject(message.loginResponse, options);
                if (options.oneofs)
                    object.payload = "loginResponse";
            }
            if (message.rpcResponse != null && message.hasOwnProperty("rpcResponse")) {
                object.rpcResponse = $root.RotomProtos.MitmResponse.RpcResponse.toObject(message.rpcResponse, options);
                if (options.oneofs)
                    object.payload = "rpcResponse";
            }
            if (message.mitmError != null && message.hasOwnProperty("mitmError"))
                object.mitmError = message.mitmError;
            return object;
        };

        /**
         * Converts this MitmResponse to JSON.
         * @function toJSON
         * @memberof RotomProtos.MitmResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MitmResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MitmResponse
         * @function getTypeUrl
         * @memberof RotomProtos.MitmResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MitmResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RotomProtos.MitmResponse";
        };

        /**
         * Status enum.
         * @name RotomProtos.MitmResponse.Status
         * @enum {number}
         * @property {number} UNSET=0 UNSET value
         * @property {number} SUCCESS=200 SUCCESS value
         * @property {number} ERROR_UNKNOWN=500 ERROR_UNKNOWN value
         * @property {number} ERROR_RETRY_LATER=501 ERROR_RETRY_LATER value
         * @property {number} ERROR_WORKER_STOPPED=502 ERROR_WORKER_STOPPED value
         * @property {number} ERROR_RECONNECT=503 ERROR_RECONNECT value
         */
        MitmResponse.Status = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNSET"] = 0;
            values[valuesById[200] = "SUCCESS"] = 200;
            values[valuesById[500] = "ERROR_UNKNOWN"] = 500;
            values[valuesById[501] = "ERROR_RETRY_LATER"] = 501;
            values[valuesById[502] = "ERROR_WORKER_STOPPED"] = 502;
            values[valuesById[503] = "ERROR_RECONNECT"] = 503;
            return values;
        })();

        MitmResponse.LoginResponse = (function() {

            /**
             * Properties of a LoginResponse.
             * @memberof RotomProtos.MitmResponse
             * @interface ILoginResponse
             * @property {string|null} [workerId] LoginResponse workerId
             * @property {RotomProtos.AuthStatus|null} [status] LoginResponse status
             * @property {boolean|null} [supportsCompression] LoginResponse supportsCompression
             * @property {string|null} [useragent] LoginResponse useragent
             */

            /**
             * Constructs a new LoginResponse.
             * @memberof RotomProtos.MitmResponse
             * @classdesc Represents a LoginResponse.
             * @implements ILoginResponse
             * @constructor
             * @param {RotomProtos.MitmResponse.ILoginResponse=} [properties] Properties to set
             */
            function LoginResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginResponse workerId.
             * @member {string} workerId
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @instance
             */
            LoginResponse.prototype.workerId = "";

            /**
             * LoginResponse status.
             * @member {RotomProtos.AuthStatus} status
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @instance
             */
            LoginResponse.prototype.status = 0;

            /**
             * LoginResponse supportsCompression.
             * @member {boolean} supportsCompression
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @instance
             */
            LoginResponse.prototype.supportsCompression = false;

            /**
             * LoginResponse useragent.
             * @member {string} useragent
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @instance
             */
            LoginResponse.prototype.useragent = "";

            /**
             * Creates a new LoginResponse instance using the specified properties.
             * @function create
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @static
             * @param {RotomProtos.MitmResponse.ILoginResponse=} [properties] Properties to set
             * @returns {RotomProtos.MitmResponse.LoginResponse} LoginResponse instance
             */
            LoginResponse.create = function create(properties) {
                return new LoginResponse(properties);
            };

            /**
             * Encodes the specified LoginResponse message. Does not implicitly {@link RotomProtos.MitmResponse.LoginResponse.verify|verify} messages.
             * @function encode
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @static
             * @param {RotomProtos.MitmResponse.ILoginResponse} message LoginResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.workerId != null && Object.hasOwnProperty.call(message, "workerId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.workerId);
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
                if (message.supportsCompression != null && Object.hasOwnProperty.call(message, "supportsCompression"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.supportsCompression);
                if (message.useragent != null && Object.hasOwnProperty.call(message, "useragent"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.useragent);
                return writer;
            };

            /**
             * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link RotomProtos.MitmResponse.LoginResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @static
             * @param {RotomProtos.MitmResponse.ILoginResponse} message LoginResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LoginResponse message from the specified reader or buffer.
             * @function decode
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {RotomProtos.MitmResponse.LoginResponse} LoginResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RotomProtos.MitmResponse.LoginResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.workerId = reader.string();
                            break;
                        }
                    case 2: {
                            message.status = reader.int32();
                            break;
                        }
                    case 3: {
                            message.supportsCompression = reader.bool();
                            break;
                        }
                    case 4: {
                            message.useragent = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {RotomProtos.MitmResponse.LoginResponse} LoginResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LoginResponse message.
             * @function verify
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoginResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.workerId != null && message.hasOwnProperty("workerId"))
                    if (!$util.isString(message.workerId))
                        return "workerId: string expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    switch (message.status) {
                    default:
                        return "status: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 20:
                        break;
                    }
                if (message.supportsCompression != null && message.hasOwnProperty("supportsCompression"))
                    if (typeof message.supportsCompression !== "boolean")
                        return "supportsCompression: boolean expected";
                if (message.useragent != null && message.hasOwnProperty("useragent"))
                    if (!$util.isString(message.useragent))
                        return "useragent: string expected";
                return null;
            };

            /**
             * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {RotomProtos.MitmResponse.LoginResponse} LoginResponse
             */
            LoginResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.RotomProtos.MitmResponse.LoginResponse)
                    return object;
                let message = new $root.RotomProtos.MitmResponse.LoginResponse();
                if (object.workerId != null)
                    message.workerId = String(object.workerId);
                switch (object.status) {
                default:
                    if (typeof object.status === "number") {
                        message.status = object.status;
                        break;
                    }
                    break;
                case "AUTH_STATUS_UNSET":
                case 0:
                    message.status = 0;
                    break;
                case "AUTH_STATUS_AUTH_TOKEN_REQUEST_FAILED":
                case 1:
                    message.status = 1;
                    break;
                case "AUTH_STATUS_AUTH_TOKEN_REQUESTED":
                case 2:
                    message.status = 2;
                    break;
                case "AUTH_STATUS_GOT_AUTH_TOKEN":
                case 3:
                    message.status = 3;
                    break;
                case "AUTH_STATUS_DEVICE_INCOMPATIBLE":
                case 4:
                    message.status = 4;
                    break;
                case "AUTH_STATUS_USER_NOT_FOUND":
                case 5:
                    message.status = 5;
                    break;
                case "AUTH_STATUS_ACCESS_DENIED":
                case 6:
                    message.status = 6;
                    break;
                case "AUTH_STATUS_ACCESS_SUSPENDED":
                case 7:
                    message.status = 7;
                    break;
                case "AUTH_STATUS_ACCESS_RATE_LIMITED":
                case 8:
                    message.status = 8;
                    break;
                case "AUTH_STATUS_SESSION_TERMINATED":
                case 9:
                    message.status = 9;
                    break;
                case "AUTH_STATUS_SESSION_FAILED":
                case 10:
                    message.status = 10;
                    break;
                case "AUTH_STATUS_LOGIN_TIMEOUT":
                case 20:
                    message.status = 20;
                    break;
                }
                if (object.supportsCompression != null)
                    message.supportsCompression = Boolean(object.supportsCompression);
                if (object.useragent != null)
                    message.useragent = String(object.useragent);
                return message;
            };

            /**
             * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @static
             * @param {RotomProtos.MitmResponse.LoginResponse} message LoginResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.workerId = "";
                    object.status = options.enums === String ? "AUTH_STATUS_UNSET" : 0;
                    object.supportsCompression = false;
                    object.useragent = "";
                }
                if (message.workerId != null && message.hasOwnProperty("workerId"))
                    object.workerId = message.workerId;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.RotomProtos.AuthStatus[message.status] === undefined ? message.status : $root.RotomProtos.AuthStatus[message.status] : message.status;
                if (message.supportsCompression != null && message.hasOwnProperty("supportsCompression"))
                    object.supportsCompression = message.supportsCompression;
                if (message.useragent != null && message.hasOwnProperty("useragent"))
                    object.useragent = message.useragent;
                return object;
            };

            /**
             * Converts this LoginResponse to JSON.
             * @function toJSON
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for LoginResponse
             * @function getTypeUrl
             * @memberof RotomProtos.MitmResponse.LoginResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            LoginResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/RotomProtos.MitmResponse.LoginResponse";
            };

            return LoginResponse;
        })();

        MitmResponse.RpcResponse = (function() {

            /**
             * Properties of a RpcResponse.
             * @memberof RotomProtos.MitmResponse
             * @interface IRpcResponse
             * @property {RotomProtos.RpcStatus|null} [rpcStatus] RpcResponse rpcStatus
             * @property {Array.<RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse>|null} [response] RpcResponse response
             */

            /**
             * Constructs a new RpcResponse.
             * @memberof RotomProtos.MitmResponse
             * @classdesc Represents a RpcResponse.
             * @implements IRpcResponse
             * @constructor
             * @param {RotomProtos.MitmResponse.IRpcResponse=} [properties] Properties to set
             */
            function RpcResponse(properties) {
                this.response = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RpcResponse rpcStatus.
             * @member {RotomProtos.RpcStatus} rpcStatus
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @instance
             */
            RpcResponse.prototype.rpcStatus = 0;

            /**
             * RpcResponse response.
             * @member {Array.<RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse>} response
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @instance
             */
            RpcResponse.prototype.response = $util.emptyArray;

            /**
             * Creates a new RpcResponse instance using the specified properties.
             * @function create
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @static
             * @param {RotomProtos.MitmResponse.IRpcResponse=} [properties] Properties to set
             * @returns {RotomProtos.MitmResponse.RpcResponse} RpcResponse instance
             */
            RpcResponse.create = function create(properties) {
                return new RpcResponse(properties);
            };

            /**
             * Encodes the specified RpcResponse message. Does not implicitly {@link RotomProtos.MitmResponse.RpcResponse.verify|verify} messages.
             * @function encode
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @static
             * @param {RotomProtos.MitmResponse.IRpcResponse} message RpcResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RpcResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.rpcStatus != null && Object.hasOwnProperty.call(message, "rpcStatus"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.rpcStatus);
                if (message.response != null && message.response.length)
                    for (let i = 0; i < message.response.length; ++i)
                        $root.RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse.encode(message.response[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RpcResponse message, length delimited. Does not implicitly {@link RotomProtos.MitmResponse.RpcResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @static
             * @param {RotomProtos.MitmResponse.IRpcResponse} message RpcResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RpcResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RpcResponse message from the specified reader or buffer.
             * @function decode
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {RotomProtos.MitmResponse.RpcResponse} RpcResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RpcResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RotomProtos.MitmResponse.RpcResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.rpcStatus = reader.int32();
                            break;
                        }
                    case 2: {
                            if (!(message.response && message.response.length))
                                message.response = [];
                            message.response.push($root.RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RpcResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {RotomProtos.MitmResponse.RpcResponse} RpcResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RpcResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RpcResponse message.
             * @function verify
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RpcResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.rpcStatus != null && message.hasOwnProperty("rpcStatus"))
                    switch (message.rpcStatus) {
                    default:
                        return "rpcStatus: enum value expected";
                    case 0:
                    case 1:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 99:
                        break;
                    }
                if (message.response != null && message.hasOwnProperty("response")) {
                    if (!Array.isArray(message.response))
                        return "response: array expected";
                    for (let i = 0; i < message.response.length; ++i) {
                        let error = $root.RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse.verify(message.response[i]);
                        if (error)
                            return "response." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a RpcResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {RotomProtos.MitmResponse.RpcResponse} RpcResponse
             */
            RpcResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.RotomProtos.MitmResponse.RpcResponse)
                    return object;
                let message = new $root.RotomProtos.MitmResponse.RpcResponse();
                switch (object.rpcStatus) {
                default:
                    if (typeof object.rpcStatus === "number") {
                        message.rpcStatus = object.rpcStatus;
                        break;
                    }
                    break;
                case "RPC_STATUS_UNDEFINED":
                case 0:
                    message.rpcStatus = 0;
                    break;
                case "RPC_STATUS_SUCCESS":
                case 1:
                    message.rpcStatus = 1;
                    break;
                case "RPC_STATUS_BAD_RESPONSE":
                case 3:
                    message.rpcStatus = 3;
                    break;
                case "RPC_STATUS_ACTION_ERROR":
                case 4:
                    message.rpcStatus = 4;
                    break;
                case "RPC_STATUS_DISPATCH_ERROR":
                case 5:
                    message.rpcStatus = 5;
                    break;
                case "RPC_STATUS_SERVER_ERROR":
                case 6:
                    message.rpcStatus = 6;
                    break;
                case "RPC_STATUS_ASSIGNMENT_ERROR":
                case 7:
                    message.rpcStatus = 7;
                    break;
                case "RPC_STATUS_PROTOCOL_ERROR":
                case 8:
                    message.rpcStatus = 8;
                    break;
                case "RPC_STATUS_AUTHENTICATION_ERROR":
                case 9:
                    message.rpcStatus = 9;
                    break;
                case "RPC_STATUS_CANCELLED_REQUEST":
                case 10:
                    message.rpcStatus = 10;
                    break;
                case "RPC_STATUS_UNKNOWN_ERROR":
                case 11:
                    message.rpcStatus = 11;
                    break;
                case "RPC_STATUS_NO_RETRIES_ERROR":
                case 12:
                    message.rpcStatus = 12;
                    break;
                case "RPC_STATUS_UNAUTHORIZED_ERROR":
                case 13:
                    message.rpcStatus = 13;
                    break;
                case "RPC_STATUS_PARSING_ERROR":
                case 14:
                    message.rpcStatus = 14;
                    break;
                case "RPC_STATUS_ACCESS_DENIED":
                case 15:
                    message.rpcStatus = 15;
                    break;
                case "RPC_STATUS_ACCESS_SUSPENDED":
                case 16:
                    message.rpcStatus = 16;
                    break;
                case "RPC_STATUS_DEVICE_INCOMPATIBLE":
                case 17:
                    message.rpcStatus = 17;
                    break;
                case "RPC_STATUS_ACCESS_RATE_LIMITED":
                case 18:
                    message.rpcStatus = 18;
                    break;
                case "RPC_STATUS_GOOGLE_PLAY_NOT_READY":
                case 19:
                    message.rpcStatus = 19;
                    break;
                case "RPC_STATUS_LOGIN_ERROR_BAIL":
                case 20:
                    message.rpcStatus = 20;
                    break;
                case "RPC_STATUS_MITM_DISALLOWED_REQUEST":
                case 99:
                    message.rpcStatus = 99;
                    break;
                }
                if (object.response) {
                    if (!Array.isArray(object.response))
                        throw TypeError(".RotomProtos.MitmResponse.RpcResponse.response: array expected");
                    message.response = [];
                    for (let i = 0; i < object.response.length; ++i) {
                        if (typeof object.response[i] !== "object")
                            throw TypeError(".RotomProtos.MitmResponse.RpcResponse.response: object expected");
                        message.response[i] = $root.RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse.fromObject(object.response[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a RpcResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @static
             * @param {RotomProtos.MitmResponse.RpcResponse} message RpcResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RpcResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.response = [];
                if (options.defaults)
                    object.rpcStatus = options.enums === String ? "RPC_STATUS_UNDEFINED" : 0;
                if (message.rpcStatus != null && message.hasOwnProperty("rpcStatus"))
                    object.rpcStatus = options.enums === String ? $root.RotomProtos.RpcStatus[message.rpcStatus] === undefined ? message.rpcStatus : $root.RotomProtos.RpcStatus[message.rpcStatus] : message.rpcStatus;
                if (message.response && message.response.length) {
                    object.response = [];
                    for (let j = 0; j < message.response.length; ++j)
                        object.response[j] = $root.RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse.toObject(message.response[j], options);
                }
                return object;
            };

            /**
             * Converts this RpcResponse to JSON.
             * @function toJSON
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RpcResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RpcResponse
             * @function getTypeUrl
             * @memberof RotomProtos.MitmResponse.RpcResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RpcResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/RotomProtos.MitmResponse.RpcResponse";
            };

            RpcResponse.SingleRpcResponse = (function() {

                /**
                 * Properties of a SingleRpcResponse.
                 * @memberof RotomProtos.MitmResponse.RpcResponse
                 * @interface ISingleRpcResponse
                 * @property {number|null} [method] SingleRpcResponse method
                 * @property {Uint8Array|null} [payload] SingleRpcResponse payload
                 * @property {boolean|null} [isCompressed] SingleRpcResponse isCompressed
                 */

                /**
                 * Constructs a new SingleRpcResponse.
                 * @memberof RotomProtos.MitmResponse.RpcResponse
                 * @classdesc Represents a SingleRpcResponse.
                 * @implements ISingleRpcResponse
                 * @constructor
                 * @param {RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse=} [properties] Properties to set
                 */
                function SingleRpcResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SingleRpcResponse method.
                 * @member {number} method
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @instance
                 */
                SingleRpcResponse.prototype.method = 0;

                /**
                 * SingleRpcResponse payload.
                 * @member {Uint8Array} payload
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @instance
                 */
                SingleRpcResponse.prototype.payload = $util.newBuffer([]);

                /**
                 * SingleRpcResponse isCompressed.
                 * @member {boolean} isCompressed
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @instance
                 */
                SingleRpcResponse.prototype.isCompressed = false;

                /**
                 * Creates a new SingleRpcResponse instance using the specified properties.
                 * @function create
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @static
                 * @param {RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse=} [properties] Properties to set
                 * @returns {RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse} SingleRpcResponse instance
                 */
                SingleRpcResponse.create = function create(properties) {
                    return new SingleRpcResponse(properties);
                };

                /**
                 * Encodes the specified SingleRpcResponse message. Does not implicitly {@link RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse.verify|verify} messages.
                 * @function encode
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @static
                 * @param {RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse} message SingleRpcResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SingleRpcResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.method != null && Object.hasOwnProperty.call(message, "method"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.method);
                    if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.payload);
                    if (message.isCompressed != null && Object.hasOwnProperty.call(message, "isCompressed"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isCompressed);
                    return writer;
                };

                /**
                 * Encodes the specified SingleRpcResponse message, length delimited. Does not implicitly {@link RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @static
                 * @param {RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse} message SingleRpcResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SingleRpcResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SingleRpcResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse} SingleRpcResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SingleRpcResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.method = reader.int32();
                                break;
                            }
                        case 2: {
                                message.payload = reader.bytes();
                                break;
                            }
                        case 3: {
                                message.isCompressed = reader.bool();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SingleRpcResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse} SingleRpcResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SingleRpcResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SingleRpcResponse message.
                 * @function verify
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SingleRpcResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.method != null && message.hasOwnProperty("method"))
                        if (!$util.isInteger(message.method))
                            return "method: integer expected";
                    if (message.payload != null && message.hasOwnProperty("payload"))
                        if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                            return "payload: buffer expected";
                    if (message.isCompressed != null && message.hasOwnProperty("isCompressed"))
                        if (typeof message.isCompressed !== "boolean")
                            return "isCompressed: boolean expected";
                    return null;
                };

                /**
                 * Creates a SingleRpcResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse} SingleRpcResponse
                 */
                SingleRpcResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse)
                        return object;
                    let message = new $root.RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse();
                    if (object.method != null)
                        message.method = object.method | 0;
                    if (object.payload != null)
                        if (typeof object.payload === "string")
                            $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                        else if (object.payload.length >= 0)
                            message.payload = object.payload;
                    if (object.isCompressed != null)
                        message.isCompressed = Boolean(object.isCompressed);
                    return message;
                };

                /**
                 * Creates a plain object from a SingleRpcResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @static
                 * @param {RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse} message SingleRpcResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SingleRpcResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.method = 0;
                        if (options.bytes === String)
                            object.payload = "";
                        else {
                            object.payload = [];
                            if (options.bytes !== Array)
                                object.payload = $util.newBuffer(object.payload);
                        }
                        object.isCompressed = false;
                    }
                    if (message.method != null && message.hasOwnProperty("method"))
                        object.method = message.method;
                    if (message.payload != null && message.hasOwnProperty("payload"))
                        object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                    if (message.isCompressed != null && message.hasOwnProperty("isCompressed"))
                        object.isCompressed = message.isCompressed;
                    return object;
                };

                /**
                 * Converts this SingleRpcResponse to JSON.
                 * @function toJSON
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SingleRpcResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for SingleRpcResponse
                 * @function getTypeUrl
                 * @memberof RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                SingleRpcResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse";
                };

                return SingleRpcResponse;
            })();

            return RpcResponse;
        })();

        return MitmResponse;
    })();

    RotomProtos.WelcomeMessage = (function() {

        /**
         * Properties of a WelcomeMessage.
         * @memberof RotomProtos
         * @interface IWelcomeMessage
         * @property {string|null} [workerId] WelcomeMessage workerId
         * @property {string|null} [origin] WelcomeMessage origin
         * @property {number|null} [versionCode] WelcomeMessage versionCode
         * @property {string|null} [versionName] WelcomeMessage versionName
         * @property {string|null} [useragent] WelcomeMessage useragent
         * @property {string|null} [deviceId] WelcomeMessage deviceId
         */

        /**
         * Constructs a new WelcomeMessage.
         * @memberof RotomProtos
         * @classdesc Represents a WelcomeMessage.
         * @implements IWelcomeMessage
         * @constructor
         * @param {RotomProtos.IWelcomeMessage=} [properties] Properties to set
         */
        function WelcomeMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WelcomeMessage workerId.
         * @member {string} workerId
         * @memberof RotomProtos.WelcomeMessage
         * @instance
         */
        WelcomeMessage.prototype.workerId = "";

        /**
         * WelcomeMessage origin.
         * @member {string} origin
         * @memberof RotomProtos.WelcomeMessage
         * @instance
         */
        WelcomeMessage.prototype.origin = "";

        /**
         * WelcomeMessage versionCode.
         * @member {number} versionCode
         * @memberof RotomProtos.WelcomeMessage
         * @instance
         */
        WelcomeMessage.prototype.versionCode = 0;

        /**
         * WelcomeMessage versionName.
         * @member {string} versionName
         * @memberof RotomProtos.WelcomeMessage
         * @instance
         */
        WelcomeMessage.prototype.versionName = "";

        /**
         * WelcomeMessage useragent.
         * @member {string} useragent
         * @memberof RotomProtos.WelcomeMessage
         * @instance
         */
        WelcomeMessage.prototype.useragent = "";

        /**
         * WelcomeMessage deviceId.
         * @member {string} deviceId
         * @memberof RotomProtos.WelcomeMessage
         * @instance
         */
        WelcomeMessage.prototype.deviceId = "";

        /**
         * Creates a new WelcomeMessage instance using the specified properties.
         * @function create
         * @memberof RotomProtos.WelcomeMessage
         * @static
         * @param {RotomProtos.IWelcomeMessage=} [properties] Properties to set
         * @returns {RotomProtos.WelcomeMessage} WelcomeMessage instance
         */
        WelcomeMessage.create = function create(properties) {
            return new WelcomeMessage(properties);
        };

        /**
         * Encodes the specified WelcomeMessage message. Does not implicitly {@link RotomProtos.WelcomeMessage.verify|verify} messages.
         * @function encode
         * @memberof RotomProtos.WelcomeMessage
         * @static
         * @param {RotomProtos.IWelcomeMessage} message WelcomeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WelcomeMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.workerId != null && Object.hasOwnProperty.call(message, "workerId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.workerId);
            if (message.origin != null && Object.hasOwnProperty.call(message, "origin"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.origin);
            if (message.versionCode != null && Object.hasOwnProperty.call(message, "versionCode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.versionCode);
            if (message.versionName != null && Object.hasOwnProperty.call(message, "versionName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.versionName);
            if (message.useragent != null && Object.hasOwnProperty.call(message, "useragent"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.useragent);
            if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.deviceId);
            return writer;
        };

        /**
         * Encodes the specified WelcomeMessage message, length delimited. Does not implicitly {@link RotomProtos.WelcomeMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RotomProtos.WelcomeMessage
         * @static
         * @param {RotomProtos.IWelcomeMessage} message WelcomeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WelcomeMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a WelcomeMessage message from the specified reader or buffer.
         * @function decode
         * @memberof RotomProtos.WelcomeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RotomProtos.WelcomeMessage} WelcomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WelcomeMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RotomProtos.WelcomeMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.workerId = reader.string();
                        break;
                    }
                case 2: {
                        message.origin = reader.string();
                        break;
                    }
                case 3: {
                        message.versionCode = reader.int32();
                        break;
                    }
                case 4: {
                        message.versionName = reader.string();
                        break;
                    }
                case 5: {
                        message.useragent = reader.string();
                        break;
                    }
                case 6: {
                        message.deviceId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a WelcomeMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RotomProtos.WelcomeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RotomProtos.WelcomeMessage} WelcomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WelcomeMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WelcomeMessage message.
         * @function verify
         * @memberof RotomProtos.WelcomeMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WelcomeMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.workerId != null && message.hasOwnProperty("workerId"))
                if (!$util.isString(message.workerId))
                    return "workerId: string expected";
            if (message.origin != null && message.hasOwnProperty("origin"))
                if (!$util.isString(message.origin))
                    return "origin: string expected";
            if (message.versionCode != null && message.hasOwnProperty("versionCode"))
                if (!$util.isInteger(message.versionCode))
                    return "versionCode: integer expected";
            if (message.versionName != null && message.hasOwnProperty("versionName"))
                if (!$util.isString(message.versionName))
                    return "versionName: string expected";
            if (message.useragent != null && message.hasOwnProperty("useragent"))
                if (!$util.isString(message.useragent))
                    return "useragent: string expected";
            if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                if (!$util.isString(message.deviceId))
                    return "deviceId: string expected";
            return null;
        };

        /**
         * Creates a WelcomeMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RotomProtos.WelcomeMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RotomProtos.WelcomeMessage} WelcomeMessage
         */
        WelcomeMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.RotomProtos.WelcomeMessage)
                return object;
            let message = new $root.RotomProtos.WelcomeMessage();
            if (object.workerId != null)
                message.workerId = String(object.workerId);
            if (object.origin != null)
                message.origin = String(object.origin);
            if (object.versionCode != null)
                message.versionCode = object.versionCode | 0;
            if (object.versionName != null)
                message.versionName = String(object.versionName);
            if (object.useragent != null)
                message.useragent = String(object.useragent);
            if (object.deviceId != null)
                message.deviceId = String(object.deviceId);
            return message;
        };

        /**
         * Creates a plain object from a WelcomeMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RotomProtos.WelcomeMessage
         * @static
         * @param {RotomProtos.WelcomeMessage} message WelcomeMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WelcomeMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.workerId = "";
                object.origin = "";
                object.versionCode = 0;
                object.versionName = "";
                object.useragent = "";
                object.deviceId = "";
            }
            if (message.workerId != null && message.hasOwnProperty("workerId"))
                object.workerId = message.workerId;
            if (message.origin != null && message.hasOwnProperty("origin"))
                object.origin = message.origin;
            if (message.versionCode != null && message.hasOwnProperty("versionCode"))
                object.versionCode = message.versionCode;
            if (message.versionName != null && message.hasOwnProperty("versionName"))
                object.versionName = message.versionName;
            if (message.useragent != null && message.hasOwnProperty("useragent"))
                object.useragent = message.useragent;
            if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                object.deviceId = message.deviceId;
            return object;
        };

        /**
         * Converts this WelcomeMessage to JSON.
         * @function toJSON
         * @memberof RotomProtos.WelcomeMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WelcomeMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WelcomeMessage
         * @function getTypeUrl
         * @memberof RotomProtos.WelcomeMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WelcomeMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RotomProtos.WelcomeMessage";
        };

        return WelcomeMessage;
    })();

    /**
     * AuthStatus enum.
     * @name RotomProtos.AuthStatus
     * @enum {number}
     * @property {number} AUTH_STATUS_UNSET=0 AUTH_STATUS_UNSET value
     * @property {number} AUTH_STATUS_AUTH_TOKEN_REQUEST_FAILED=1 AUTH_STATUS_AUTH_TOKEN_REQUEST_FAILED value
     * @property {number} AUTH_STATUS_AUTH_TOKEN_REQUESTED=2 AUTH_STATUS_AUTH_TOKEN_REQUESTED value
     * @property {number} AUTH_STATUS_GOT_AUTH_TOKEN=3 AUTH_STATUS_GOT_AUTH_TOKEN value
     * @property {number} AUTH_STATUS_DEVICE_INCOMPATIBLE=4 AUTH_STATUS_DEVICE_INCOMPATIBLE value
     * @property {number} AUTH_STATUS_USER_NOT_FOUND=5 AUTH_STATUS_USER_NOT_FOUND value
     * @property {number} AUTH_STATUS_ACCESS_DENIED=6 AUTH_STATUS_ACCESS_DENIED value
     * @property {number} AUTH_STATUS_ACCESS_SUSPENDED=7 AUTH_STATUS_ACCESS_SUSPENDED value
     * @property {number} AUTH_STATUS_ACCESS_RATE_LIMITED=8 AUTH_STATUS_ACCESS_RATE_LIMITED value
     * @property {number} AUTH_STATUS_SESSION_TERMINATED=9 AUTH_STATUS_SESSION_TERMINATED value
     * @property {number} AUTH_STATUS_SESSION_FAILED=10 AUTH_STATUS_SESSION_FAILED value
     * @property {number} AUTH_STATUS_LOGIN_TIMEOUT=20 AUTH_STATUS_LOGIN_TIMEOUT value
     */
    RotomProtos.AuthStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "AUTH_STATUS_UNSET"] = 0;
        values[valuesById[1] = "AUTH_STATUS_AUTH_TOKEN_REQUEST_FAILED"] = 1;
        values[valuesById[2] = "AUTH_STATUS_AUTH_TOKEN_REQUESTED"] = 2;
        values[valuesById[3] = "AUTH_STATUS_GOT_AUTH_TOKEN"] = 3;
        values[valuesById[4] = "AUTH_STATUS_DEVICE_INCOMPATIBLE"] = 4;
        values[valuesById[5] = "AUTH_STATUS_USER_NOT_FOUND"] = 5;
        values[valuesById[6] = "AUTH_STATUS_ACCESS_DENIED"] = 6;
        values[valuesById[7] = "AUTH_STATUS_ACCESS_SUSPENDED"] = 7;
        values[valuesById[8] = "AUTH_STATUS_ACCESS_RATE_LIMITED"] = 8;
        values[valuesById[9] = "AUTH_STATUS_SESSION_TERMINATED"] = 9;
        values[valuesById[10] = "AUTH_STATUS_SESSION_FAILED"] = 10;
        values[valuesById[20] = "AUTH_STATUS_LOGIN_TIMEOUT"] = 20;
        return values;
    })();

    /**
     * RpcStatus enum.
     * @name RotomProtos.RpcStatus
     * @enum {number}
     * @property {number} RPC_STATUS_UNDEFINED=0 RPC_STATUS_UNDEFINED value
     * @property {number} RPC_STATUS_SUCCESS=1 RPC_STATUS_SUCCESS value
     * @property {number} RPC_STATUS_BAD_RESPONSE=3 RPC_STATUS_BAD_RESPONSE value
     * @property {number} RPC_STATUS_ACTION_ERROR=4 RPC_STATUS_ACTION_ERROR value
     * @property {number} RPC_STATUS_DISPATCH_ERROR=5 RPC_STATUS_DISPATCH_ERROR value
     * @property {number} RPC_STATUS_SERVER_ERROR=6 RPC_STATUS_SERVER_ERROR value
     * @property {number} RPC_STATUS_ASSIGNMENT_ERROR=7 RPC_STATUS_ASSIGNMENT_ERROR value
     * @property {number} RPC_STATUS_PROTOCOL_ERROR=8 RPC_STATUS_PROTOCOL_ERROR value
     * @property {number} RPC_STATUS_AUTHENTICATION_ERROR=9 RPC_STATUS_AUTHENTICATION_ERROR value
     * @property {number} RPC_STATUS_CANCELLED_REQUEST=10 RPC_STATUS_CANCELLED_REQUEST value
     * @property {number} RPC_STATUS_UNKNOWN_ERROR=11 RPC_STATUS_UNKNOWN_ERROR value
     * @property {number} RPC_STATUS_NO_RETRIES_ERROR=12 RPC_STATUS_NO_RETRIES_ERROR value
     * @property {number} RPC_STATUS_UNAUTHORIZED_ERROR=13 RPC_STATUS_UNAUTHORIZED_ERROR value
     * @property {number} RPC_STATUS_PARSING_ERROR=14 RPC_STATUS_PARSING_ERROR value
     * @property {number} RPC_STATUS_ACCESS_DENIED=15 RPC_STATUS_ACCESS_DENIED value
     * @property {number} RPC_STATUS_ACCESS_SUSPENDED=16 RPC_STATUS_ACCESS_SUSPENDED value
     * @property {number} RPC_STATUS_DEVICE_INCOMPATIBLE=17 RPC_STATUS_DEVICE_INCOMPATIBLE value
     * @property {number} RPC_STATUS_ACCESS_RATE_LIMITED=18 RPC_STATUS_ACCESS_RATE_LIMITED value
     * @property {number} RPC_STATUS_GOOGLE_PLAY_NOT_READY=19 RPC_STATUS_GOOGLE_PLAY_NOT_READY value
     * @property {number} RPC_STATUS_LOGIN_ERROR_BAIL=20 RPC_STATUS_LOGIN_ERROR_BAIL value
     * @property {number} RPC_STATUS_MITM_DISALLOWED_REQUEST=99 RPC_STATUS_MITM_DISALLOWED_REQUEST value
     */
    RotomProtos.RpcStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RPC_STATUS_UNDEFINED"] = 0;
        values[valuesById[1] = "RPC_STATUS_SUCCESS"] = 1;
        values[valuesById[3] = "RPC_STATUS_BAD_RESPONSE"] = 3;
        values[valuesById[4] = "RPC_STATUS_ACTION_ERROR"] = 4;
        values[valuesById[5] = "RPC_STATUS_DISPATCH_ERROR"] = 5;
        values[valuesById[6] = "RPC_STATUS_SERVER_ERROR"] = 6;
        values[valuesById[7] = "RPC_STATUS_ASSIGNMENT_ERROR"] = 7;
        values[valuesById[8] = "RPC_STATUS_PROTOCOL_ERROR"] = 8;
        values[valuesById[9] = "RPC_STATUS_AUTHENTICATION_ERROR"] = 9;
        values[valuesById[10] = "RPC_STATUS_CANCELLED_REQUEST"] = 10;
        values[valuesById[11] = "RPC_STATUS_UNKNOWN_ERROR"] = 11;
        values[valuesById[12] = "RPC_STATUS_NO_RETRIES_ERROR"] = 12;
        values[valuesById[13] = "RPC_STATUS_UNAUTHORIZED_ERROR"] = 13;
        values[valuesById[14] = "RPC_STATUS_PARSING_ERROR"] = 14;
        values[valuesById[15] = "RPC_STATUS_ACCESS_DENIED"] = 15;
        values[valuesById[16] = "RPC_STATUS_ACCESS_SUSPENDED"] = 16;
        values[valuesById[17] = "RPC_STATUS_DEVICE_INCOMPATIBLE"] = 17;
        values[valuesById[18] = "RPC_STATUS_ACCESS_RATE_LIMITED"] = 18;
        values[valuesById[19] = "RPC_STATUS_GOOGLE_PLAY_NOT_READY"] = 19;
        values[valuesById[20] = "RPC_STATUS_LOGIN_ERROR_BAIL"] = 20;
        values[valuesById[99] = "RPC_STATUS_MITM_DISALLOWED_REQUEST"] = 99;
        return values;
    })();

    return RotomProtos;
})();

module.exports = $root;
