/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Wallet_Front_Defaults {

    ROUTE_ABOUT = '/about';
    ROUTE_APP_EXPORT = '/app/export';
    ROUTE_APP_IMPORT = '/app/import';
    ROUTE_APP_UPGRADE = '/app/upgrade';
    ROUTE_CARD_ADD = '/card/add';
    ROUTE_CARD_EDIT_X = '/card/edit/:uuid';
    ROUTE_CARD_LIST = '/card/list';
    ROUTE_CARD_USE_X = '/card/use/:uuid';
    ROUTE_HOME = '/';
    ROUTE_PLACE_LIST = '/place/list';
    ROUTE_SETTINGS = '/settings';
    ROUTE_TAG_LIST = '/tag/list';

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
