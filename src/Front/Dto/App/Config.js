/**
 * Structure the app configuration data.
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Dto_App_Config';


// MODULE'S CLASSES
/**
 * @memberOf Wallet_Front_Dto_App_Config
 */
class Dto {
    static namespace = NS;
    /**
     * Can we use Geo Location API in this app?
     * @type {boolean}
     */
    canUseGeoApi;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Wallet_Front_Dto_App_Config {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Wallet_Front_Dto_App_Config.Dto} [data]
         * @return {Wallet_Front_Dto_App_Config.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.canUseGeoApi = cast.boolean(data?.canUseGeoApi);
            return res;
        };
    }

}
