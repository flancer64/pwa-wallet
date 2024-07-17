/**
 * UI component for loading spinner.
 *
 * @namespace Wallet_Front_Ui_Lib_Spinner
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Lib_Spinner';

// MODULE'S FUNCTIONS
/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @returns {Wallet_Front_Ui_Lib_Spinner.vueCompTmpl}
 */
export default function () {
    // VARS
    const template = `
<q-inner-loading :showing="loading">
    <q-spinner-gears size="50px" color="primary"/>
</q-inner-loading>    
    `;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Lib_Spinner
     */
    return {
        name: NS,
        template,
        props: {
            loading: Boolean,
        },
    };
}
