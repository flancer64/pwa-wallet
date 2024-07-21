/**
 * The frontend storage for the frontend application identity.
 * Don't use the store directly, use it from `Wallet_Front_Mod_Auth_Front`.
 */
export default class Wallet_Front_Store_Local_App_Config {
    /**
     * @param {Wallet_Front_Defaults} DEF
     * @param {Wallet_Front_Dto_App_Config} dtoConfig
     */
    constructor(
        {
            Wallet_Front_Defaults$: DEF,
            Wallet_Front_Dto_App_Config$: dtoConfig,
        }
    ) {
        // VARS
        const KEY = `${DEF.SHARED.NAME}/app/config`;

        // INSTANCE METHODS

        this.clear = function () {
            self.window.localStorage.removeItem(KEY);
        };

        /**
         * Get current configuration from the local storage.
         * @return {Wallet_Front_Dto_App_Config.Dto}
         */
        this.get = function () {
            const stored = self.window.localStorage.getItem(KEY);
            const obj = JSON.parse(stored);
            return dtoConfig.createDto(obj);
        };

        /**
         * Get the key for the `localStorage`.
         * @return {string}
         */
        this.key = () => KEY;

        /**
         * Save current configuration into the local storage.
         * @param {Wallet_Front_Dto_App_Config.Dto} data
         */
        this.set = function (data) {
            self.window.localStorage.setItem(KEY, JSON.stringify(data));
        };

    }
}
