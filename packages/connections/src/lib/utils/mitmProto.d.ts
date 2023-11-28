import * as $protobuf from "protobufjs";
/** Namespace RotomProtos. */
export namespace RotomProtos {

    /** Properties of a MitmRequest. */
    interface IMitmRequest {

        /** MitmRequest id */
        id?: (number|null);

        /** MitmRequest method */
        method?: (RotomProtos.MitmRequest.Method|null);

        /** MitmRequest loginRequest */
        loginRequest?: (RotomProtos.MitmRequest.ILoginRequest|null);

        /** MitmRequest rpcRequest */
        rpcRequest?: (RotomProtos.MitmRequest.IRpcRequest|null);
    }

    /** Represents a MitmRequest. */
    class MitmRequest implements IMitmRequest {

        /**
         * Constructs a new MitmRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: RotomProtos.IMitmRequest);

        /** MitmRequest id. */
        public id: number;

        /** MitmRequest method. */
        public method: RotomProtos.MitmRequest.Method;

        /** MitmRequest loginRequest. */
        public loginRequest?: (RotomProtos.MitmRequest.ILoginRequest|null);

        /** MitmRequest rpcRequest. */
        public rpcRequest?: (RotomProtos.MitmRequest.IRpcRequest|null);

        /** MitmRequest payload. */
        public payload?: ("loginRequest"|"rpcRequest");

        /**
         * Creates a new MitmRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MitmRequest instance
         */
        public static create(properties?: RotomProtos.IMitmRequest): RotomProtos.MitmRequest;

        /**
         * Encodes the specified MitmRequest message. Does not implicitly {@link RotomProtos.MitmRequest.verify|verify} messages.
         * @param message MitmRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RotomProtos.IMitmRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MitmRequest message, length delimited. Does not implicitly {@link RotomProtos.MitmRequest.verify|verify} messages.
         * @param message MitmRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RotomProtos.IMitmRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MitmRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MitmRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RotomProtos.MitmRequest;

        /**
         * Decodes a MitmRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MitmRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RotomProtos.MitmRequest;

        /**
         * Verifies a MitmRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MitmRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MitmRequest
         */
        public static fromObject(object: { [k: string]: any }): RotomProtos.MitmRequest;

        /**
         * Creates a plain object from a MitmRequest message. Also converts values to other types if specified.
         * @param message MitmRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RotomProtos.MitmRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MitmRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MitmRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace MitmRequest {

        /** Method enum. */
        enum Method {
            UNSET = 0,
            LOGIN = 1,
            RPC_REQUEST = 2
        }

        /** Properties of a LoginRequest. */
        interface ILoginRequest {

            /** LoginRequest username */
            username?: (string|null);

            /** LoginRequest source */
            source?: (RotomProtos.MitmRequest.LoginRequest.LoginSource|null);

            /** LoginRequest tokenProto */
            tokenProto?: (Uint8Array|null);

            /** LoginRequest workerId */
            workerId?: (string|null);

            /** LoginRequest enableCompression */
            enableCompression?: (boolean|null);
        }

        /** Represents a LoginRequest. */
        class LoginRequest implements ILoginRequest {

            /**
             * Constructs a new LoginRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: RotomProtos.MitmRequest.ILoginRequest);

            /** LoginRequest username. */
            public username: string;

            /** LoginRequest source. */
            public source: RotomProtos.MitmRequest.LoginRequest.LoginSource;

            /** LoginRequest tokenProto. */
            public tokenProto: Uint8Array;

            /** LoginRequest workerId. */
            public workerId: string;

            /** LoginRequest enableCompression. */
            public enableCompression: boolean;

            /**
             * Creates a new LoginRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LoginRequest instance
             */
            public static create(properties?: RotomProtos.MitmRequest.ILoginRequest): RotomProtos.MitmRequest.LoginRequest;

            /**
             * Encodes the specified LoginRequest message. Does not implicitly {@link RotomProtos.MitmRequest.LoginRequest.verify|verify} messages.
             * @param message LoginRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: RotomProtos.MitmRequest.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link RotomProtos.MitmRequest.LoginRequest.verify|verify} messages.
             * @param message LoginRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: RotomProtos.MitmRequest.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LoginRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LoginRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RotomProtos.MitmRequest.LoginRequest;

            /**
             * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LoginRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RotomProtos.MitmRequest.LoginRequest;

            /**
             * Verifies a LoginRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoginRequest
             */
            public static fromObject(object: { [k: string]: any }): RotomProtos.MitmRequest.LoginRequest;

            /**
             * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
             * @param message LoginRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: RotomProtos.MitmRequest.LoginRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoginRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LoginRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace LoginRequest {

            /** LoginSource enum. */
            enum LoginSource {
                UNSET = 0,
                PTC = 1
            }
        }

        /** Properties of a RpcRequest. */
        interface IRpcRequest {

            /** RpcRequest request */
            request?: (RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest[]|null);

            /** RpcRequest lat */
            lat?: (number|null);

            /** RpcRequest lon */
            lon?: (number|null);
        }

        /** Represents a RpcRequest. */
        class RpcRequest implements IRpcRequest {

            /**
             * Constructs a new RpcRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: RotomProtos.MitmRequest.IRpcRequest);

            /** RpcRequest request. */
            public request: RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest[];

            /** RpcRequest lat. */
            public lat: number;

            /** RpcRequest lon. */
            public lon: number;

            /**
             * Creates a new RpcRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RpcRequest instance
             */
            public static create(properties?: RotomProtos.MitmRequest.IRpcRequest): RotomProtos.MitmRequest.RpcRequest;

            /**
             * Encodes the specified RpcRequest message. Does not implicitly {@link RotomProtos.MitmRequest.RpcRequest.verify|verify} messages.
             * @param message RpcRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: RotomProtos.MitmRequest.IRpcRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RpcRequest message, length delimited. Does not implicitly {@link RotomProtos.MitmRequest.RpcRequest.verify|verify} messages.
             * @param message RpcRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: RotomProtos.MitmRequest.IRpcRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RpcRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RpcRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RotomProtos.MitmRequest.RpcRequest;

            /**
             * Decodes a RpcRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RpcRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RotomProtos.MitmRequest.RpcRequest;

            /**
             * Verifies a RpcRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RpcRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RpcRequest
             */
            public static fromObject(object: { [k: string]: any }): RotomProtos.MitmRequest.RpcRequest;

            /**
             * Creates a plain object from a RpcRequest message. Also converts values to other types if specified.
             * @param message RpcRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: RotomProtos.MitmRequest.RpcRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RpcRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RpcRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace RpcRequest {

            /** Properties of a SingleRpcRequest. */
            interface ISingleRpcRequest {

                /** SingleRpcRequest method */
                method?: (number|null);

                /** SingleRpcRequest payload */
                payload?: (Uint8Array|null);

                /** SingleRpcRequest isCompressed */
                isCompressed?: (boolean|null);
            }

            /** Represents a SingleRpcRequest. */
            class SingleRpcRequest implements ISingleRpcRequest {

                /**
                 * Constructs a new SingleRpcRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest);

                /** SingleRpcRequest method. */
                public method: number;

                /** SingleRpcRequest payload. */
                public payload: Uint8Array;

                /** SingleRpcRequest isCompressed. */
                public isCompressed: boolean;

                /**
                 * Creates a new SingleRpcRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SingleRpcRequest instance
                 */
                public static create(properties?: RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest): RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest;

                /**
                 * Encodes the specified SingleRpcRequest message. Does not implicitly {@link RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest.verify|verify} messages.
                 * @param message SingleRpcRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SingleRpcRequest message, length delimited. Does not implicitly {@link RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest.verify|verify} messages.
                 * @param message SingleRpcRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: RotomProtos.MitmRequest.RpcRequest.ISingleRpcRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SingleRpcRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SingleRpcRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest;

                /**
                 * Decodes a SingleRpcRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SingleRpcRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest;

                /**
                 * Verifies a SingleRpcRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SingleRpcRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SingleRpcRequest
                 */
                public static fromObject(object: { [k: string]: any }): RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest;

                /**
                 * Creates a plain object from a SingleRpcRequest message. Also converts values to other types if specified.
                 * @param message SingleRpcRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: RotomProtos.MitmRequest.RpcRequest.SingleRpcRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SingleRpcRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SingleRpcRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }

    /** Properties of a MitmResponse. */
    interface IMitmResponse {

        /** MitmResponse id */
        id?: (number|null);

        /** MitmResponse status */
        status?: (RotomProtos.MitmResponse.Status|null);

        /** MitmResponse loginResponse */
        loginResponse?: (RotomProtos.MitmResponse.ILoginResponse|null);

        /** MitmResponse rpcResponse */
        rpcResponse?: (RotomProtos.MitmResponse.IRpcResponse|null);
    }

    /** Represents a MitmResponse. */
    class MitmResponse implements IMitmResponse {

        /**
         * Constructs a new MitmResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: RotomProtos.IMitmResponse);

        /** MitmResponse id. */
        public id: number;

        /** MitmResponse status. */
        public status: RotomProtos.MitmResponse.Status;

        /** MitmResponse loginResponse. */
        public loginResponse?: (RotomProtos.MitmResponse.ILoginResponse|null);

        /** MitmResponse rpcResponse. */
        public rpcResponse?: (RotomProtos.MitmResponse.IRpcResponse|null);

        /** MitmResponse payload. */
        public payload?: ("loginResponse"|"rpcResponse");

        /**
         * Creates a new MitmResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MitmResponse instance
         */
        public static create(properties?: RotomProtos.IMitmResponse): RotomProtos.MitmResponse;

        /**
         * Encodes the specified MitmResponse message. Does not implicitly {@link RotomProtos.MitmResponse.verify|verify} messages.
         * @param message MitmResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RotomProtos.IMitmResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MitmResponse message, length delimited. Does not implicitly {@link RotomProtos.MitmResponse.verify|verify} messages.
         * @param message MitmResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RotomProtos.IMitmResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MitmResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MitmResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RotomProtos.MitmResponse;

        /**
         * Decodes a MitmResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MitmResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RotomProtos.MitmResponse;

        /**
         * Verifies a MitmResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MitmResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MitmResponse
         */
        public static fromObject(object: { [k: string]: any }): RotomProtos.MitmResponse;

        /**
         * Creates a plain object from a MitmResponse message. Also converts values to other types if specified.
         * @param message MitmResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RotomProtos.MitmResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MitmResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MitmResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace MitmResponse {

        /** Status enum. */
        enum Status {
            UNSET = 0,
            SUCCESS = 200,
            ERROR_UNKNOWN = 500,
            ERROR_GAME_NOT_READY = 501,
            ERROR_LOGIN_IN_PROGRESS = 502,
            ERROR_TOKEN_REJECTED = 503,
            ERROR_NOT_LOGGED_IN = 504
        }

        /** Properties of a LoginResponse. */
        interface ILoginResponse {

            /** LoginResponse workerId */
            workerId?: (string|null);

            /** LoginResponse status */
            status?: (RotomProtos.AuthStatus|null);

            /** LoginResponse supportsCompression */
            supportsCompression?: (boolean|null);
        }

        /** Represents a LoginResponse. */
        class LoginResponse implements ILoginResponse {

            /**
             * Constructs a new LoginResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: RotomProtos.MitmResponse.ILoginResponse);

            /** LoginResponse workerId. */
            public workerId: string;

            /** LoginResponse status. */
            public status: RotomProtos.AuthStatus;

            /** LoginResponse supportsCompression. */
            public supportsCompression: boolean;

            /**
             * Creates a new LoginResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LoginResponse instance
             */
            public static create(properties?: RotomProtos.MitmResponse.ILoginResponse): RotomProtos.MitmResponse.LoginResponse;

            /**
             * Encodes the specified LoginResponse message. Does not implicitly {@link RotomProtos.MitmResponse.LoginResponse.verify|verify} messages.
             * @param message LoginResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: RotomProtos.MitmResponse.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link RotomProtos.MitmResponse.LoginResponse.verify|verify} messages.
             * @param message LoginResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: RotomProtos.MitmResponse.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LoginResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LoginResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RotomProtos.MitmResponse.LoginResponse;

            /**
             * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LoginResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RotomProtos.MitmResponse.LoginResponse;

            /**
             * Verifies a LoginResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoginResponse
             */
            public static fromObject(object: { [k: string]: any }): RotomProtos.MitmResponse.LoginResponse;

            /**
             * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
             * @param message LoginResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: RotomProtos.MitmResponse.LoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoginResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LoginResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RpcResponse. */
        interface IRpcResponse {

            /** RpcResponse rpcStatus */
            rpcStatus?: (RotomProtos.RpcStatus|null);

            /** RpcResponse response */
            response?: (RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse[]|null);
        }

        /** Represents a RpcResponse. */
        class RpcResponse implements IRpcResponse {

            /**
             * Constructs a new RpcResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: RotomProtos.MitmResponse.IRpcResponse);

            /** RpcResponse rpcStatus. */
            public rpcStatus: RotomProtos.RpcStatus;

            /** RpcResponse response. */
            public response: RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse[];

            /**
             * Creates a new RpcResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RpcResponse instance
             */
            public static create(properties?: RotomProtos.MitmResponse.IRpcResponse): RotomProtos.MitmResponse.RpcResponse;

            /**
             * Encodes the specified RpcResponse message. Does not implicitly {@link RotomProtos.MitmResponse.RpcResponse.verify|verify} messages.
             * @param message RpcResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: RotomProtos.MitmResponse.IRpcResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RpcResponse message, length delimited. Does not implicitly {@link RotomProtos.MitmResponse.RpcResponse.verify|verify} messages.
             * @param message RpcResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: RotomProtos.MitmResponse.IRpcResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RpcResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RpcResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RotomProtos.MitmResponse.RpcResponse;

            /**
             * Decodes a RpcResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RpcResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RotomProtos.MitmResponse.RpcResponse;

            /**
             * Verifies a RpcResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RpcResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RpcResponse
             */
            public static fromObject(object: { [k: string]: any }): RotomProtos.MitmResponse.RpcResponse;

            /**
             * Creates a plain object from a RpcResponse message. Also converts values to other types if specified.
             * @param message RpcResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: RotomProtos.MitmResponse.RpcResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RpcResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RpcResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace RpcResponse {

            /** Properties of a SingleRpcResponse. */
            interface ISingleRpcResponse {

                /** SingleRpcResponse method */
                method?: (number|null);

                /** SingleRpcResponse payload */
                payload?: (Uint8Array|null);

                /** SingleRpcResponse isCompressed */
                isCompressed?: (boolean|null);
            }

            /** Represents a SingleRpcResponse. */
            class SingleRpcResponse implements ISingleRpcResponse {

                /**
                 * Constructs a new SingleRpcResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse);

                /** SingleRpcResponse method. */
                public method: number;

                /** SingleRpcResponse payload. */
                public payload: Uint8Array;

                /** SingleRpcResponse isCompressed. */
                public isCompressed: boolean;

                /**
                 * Creates a new SingleRpcResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SingleRpcResponse instance
                 */
                public static create(properties?: RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse): RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse;

                /**
                 * Encodes the specified SingleRpcResponse message. Does not implicitly {@link RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse.verify|verify} messages.
                 * @param message SingleRpcResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SingleRpcResponse message, length delimited. Does not implicitly {@link RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse.verify|verify} messages.
                 * @param message SingleRpcResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: RotomProtos.MitmResponse.RpcResponse.ISingleRpcResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SingleRpcResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SingleRpcResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse;

                /**
                 * Decodes a SingleRpcResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SingleRpcResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse;

                /**
                 * Verifies a SingleRpcResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SingleRpcResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SingleRpcResponse
                 */
                public static fromObject(object: { [k: string]: any }): RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse;

                /**
                 * Creates a plain object from a SingleRpcResponse message. Also converts values to other types if specified.
                 * @param message SingleRpcResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: RotomProtos.MitmResponse.RpcResponse.SingleRpcResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SingleRpcResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SingleRpcResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }

    /** Properties of a WelcomeMessage. */
    interface IWelcomeMessage {

        /** WelcomeMessage workerId */
        workerId?: (string|null);

        /** WelcomeMessage origin */
        origin?: (string|null);

        /** WelcomeMessage versionCode */
        versionCode?: (number|null);

        /** WelcomeMessage versionName */
        versionName?: (string|null);

        /** WelcomeMessage useragent */
        useragent?: (string|null);

        /** WelcomeMessage deviceId */
        deviceId?: (string|null);
    }

    /** Represents a WelcomeMessage. */
    class WelcomeMessage implements IWelcomeMessage {

        /**
         * Constructs a new WelcomeMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: RotomProtos.IWelcomeMessage);

        /** WelcomeMessage workerId. */
        public workerId: string;

        /** WelcomeMessage origin. */
        public origin: string;

        /** WelcomeMessage versionCode. */
        public versionCode: number;

        /** WelcomeMessage versionName. */
        public versionName: string;

        /** WelcomeMessage useragent. */
        public useragent: string;

        /** WelcomeMessage deviceId. */
        public deviceId: string;

        /**
         * Creates a new WelcomeMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WelcomeMessage instance
         */
        public static create(properties?: RotomProtos.IWelcomeMessage): RotomProtos.WelcomeMessage;

        /**
         * Encodes the specified WelcomeMessage message. Does not implicitly {@link RotomProtos.WelcomeMessage.verify|verify} messages.
         * @param message WelcomeMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RotomProtos.IWelcomeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WelcomeMessage message, length delimited. Does not implicitly {@link RotomProtos.WelcomeMessage.verify|verify} messages.
         * @param message WelcomeMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RotomProtos.IWelcomeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WelcomeMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WelcomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RotomProtos.WelcomeMessage;

        /**
         * Decodes a WelcomeMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WelcomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RotomProtos.WelcomeMessage;

        /**
         * Verifies a WelcomeMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WelcomeMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WelcomeMessage
         */
        public static fromObject(object: { [k: string]: any }): RotomProtos.WelcomeMessage;

        /**
         * Creates a plain object from a WelcomeMessage message. Also converts values to other types if specified.
         * @param message WelcomeMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RotomProtos.WelcomeMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WelcomeMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for WelcomeMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** AuthStatus enum. */
    enum AuthStatus {
        AUTH_STATUS_UNSET = 0,
        AUTH_STATUS_AUTH_TOKEN_REQUEST_FAILED = 1,
        AUTH_STATUS_AUTH_TOKEN_REQUESTED = 2,
        AUTH_STATUS_GOT_AUTH_TOKEN = 3,
        AUTH_STATUS_DEVICE_INCOMPATIBLE = 4,
        AUTH_STATUS_USER_NOT_FOUND = 5,
        AUTH_STATUS_ACCESS_DENIED = 6,
        AUTH_STATUS_ACCESS_SUSPENDED = 7,
        AUTH_STATUS_ACCESS_RATE_LIMITED = 8,
        AUTH_STATUS_SESSION_TERMINATED = 9,
        AUTH_STATUS_SESSION_FAILED = 10,
        AUTH_STATUS_LOGIN_TIMEOUT = 20
    }

    /** RpcStatus enum. */
    enum RpcStatus {
        RPC_STATUS_UNDEFINED = 0,
        RPC_STATUS_SUCCESS = 1,
        RPC_STATUS_BAD_RESPONSE = 3,
        RPC_STATUS_ACTION_ERROR = 4,
        RPC_STATUS_DISPATCH_ERROR = 5,
        RPC_STATUS_SERVER_ERROR = 6,
        RPC_STATUS_ASSIGNMENT_ERROR = 7,
        RPC_STATUS_PROTOCOL_ERROR = 8,
        RPC_STATUS_AUTHENTICATION_ERROR = 9,
        RPC_STATUS_CANCELLED_REQUEST = 10,
        RPC_STATUS_UNKNOWN_ERROR = 11,
        RPC_STATUS_NO_RETRIES_ERROR = 12,
        RPC_STATUS_UNAUTHORIZED_ERROR = 13,
        RPC_STATUS_PARSING_ERROR = 14,
        RPC_STATUS_ACCESS_DENIED = 15,
        RPC_STATUS_ACCESS_SUSPENDED = 16,
        RPC_STATUS_DEVICE_INCOMPATIBLE = 17,
        RPC_STATUS_ACCESS_RATE_LIMITED = 18,
        RPC_STATUS_MITM_DISALLOWED_REQUEST = 99
    }
}
