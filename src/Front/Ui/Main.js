/**
 * The main UI component to use with `createApp`.
 *
 * @namespace Wallet_Front_Ui_Main
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Main';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
 * @param {TeqFw_Web_Front_Mod_Version} modVersion
 *
 * @returns {Wallet_Front_Ui_Main.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        TeqFw_Core_Shared_Api_Logger$$: logger,
        TeqFw_Web_Front_Mod_Version$: modVersion,
    }
) {
    // VARS
    const template = `<router-view/>`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Main
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        async created() {
            if (modVersion.needUpgrade()) {
                debugger; // TODO: remove after the fix
                logger.info(`The front app needs upgrade.`);
                const router = this.$router;
                router.push(DEF.ROUTE_APP_UPGRADE);
            }
        },
    };
}
