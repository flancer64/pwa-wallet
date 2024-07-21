/**
 * Model to encapsulate functionality related to the application config.
 */
export default class Wallet_Front_Mod_App_Config {
    /**
     * @param {Wallet_Front_Store_Local_App_Config} storeConfig
     */
    constructor(
        {
            Wallet_Front_Store_Local_App_Config$: storeConfig,
        }
    ) {
        /**
         * @return {boolean}
         */
        this.getCanUseGeoApi = function () {
            return storeConfig.get()?.canUseGeoApi;
        };

        /**
         * @param {boolean} data
         */
        this.setCanUseGeoApi = function (data) {
            const stored = storeConfig.get();
            stored.canUseGeoApi = Boolean(data);
            storeConfig.set(stored);
        };

    }
}
