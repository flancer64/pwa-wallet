/**
 * Web server handler to proxy GET requests for JS sources to unpkg.com.
 * It is required for offline working of the browser app.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';

// MODULE'S VARS
const {
    HTTP2_HEADER_CACHE_CONTROL,
    HTTP2_HEADER_CONTENT_TYPE,
    HTTP2_METHOD_GET,
    HTTP_STATUS_OK,
} = H2;

// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class Wallet_Back_Web_Handler_ServerEvents {
    /**
     * @param {Wallet_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     */
    constructor(
        {
            Wallet_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
        }
    ) {

        // FUNCS

        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest}req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf Wallet_Back_Web_Handler_ServerEvents
         */
        async function process(req, res) {
            // FUNCS

            // MAIN
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {

            }
        }

        Object.defineProperty(process, 'namespace', {value: this.constructor.name});

        // INSTANCE METHODS

        // noinspection JSUnusedGlobalSymbols
        this.getProcessor = () => process;

        this.init = async function () {
            const space = DEF.SHARED.SPACE_PROXY;
            logger.info(`Initialize handler for JS sources proxy (space: '${space}').`);
        };

        // noinspection JSUnusedGlobalSymbols
        this.canProcess = function ({method, address} = {}) {
            return (
                (method === HTTP2_METHOD_GET)
                && (address?.space === DEF.SHARED.SPACE_PROXY)
            );
        };

    }
}
