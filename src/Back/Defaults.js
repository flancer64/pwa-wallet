/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Wallet_Back_Defaults {

    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {Wallet_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Web_Back_Defaults} MOD_WEB
     * @param {Wallet_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Web_Back_Defaults$: MOD_WEB,
            Wallet_Shared_Defaults$: SHARED,
        }
    ) {
        this.MOD_WEB = MOD_WEB;
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
