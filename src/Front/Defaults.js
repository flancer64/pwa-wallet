/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Wallet_Front_Defaults {

    ROUTE_ABOUT = '/about';
    ROUTE_APP_UPGRADE = '/app/upgrade';
    ROUTE_HOME = '/';
    ROUTE_SETTINGS = '/settings';

    /** @type {Wallet_Shared_Defaults} */
    SHARED;

    /**
     * @param {Wallet_Shared_Defaults} SHARED
     */
    constructor(
        {
            Wallet_Shared_Defaults$: SHARED,
        }
    ) {
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
