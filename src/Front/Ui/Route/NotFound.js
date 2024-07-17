/**
 * The Vue component for 'Not Found' route.
 *
 * @namespace Wallet_Front_Ui_Route_NotFound
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_NotFound';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {Wallet_Front_Ui_Widget_App_Title} wgTitle
 *
 * @returns {Wallet_Front_Ui_Route_NotFound.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        Wallet_Front_Ui_Widget_App_Title$: wgTitle,
    }
) {
    // VARS
    const template = `
<layout-main>
    <div class="q-pa-lg q-gutter-sm">
        <q-card>
            <q-card-section>
                <div>The requested route is not found.</div>
            </q-card-section>
        </q-card>
    </div>
</layout-main>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Route_NotFound
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        async mounted() {
            wgTitle.setTitle('Not Found');
        },
    };
}
