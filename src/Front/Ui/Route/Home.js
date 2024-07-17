/**
 * The base screen for the application's homepage.
 *
 * @namespace Wallet_Front_Ui_Route_Home
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_Home';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {Wallet_Front_Ui_Widget_App_Title} wgTitle
 *
 * @returns {Wallet_Front_Ui_Route_Home.vueCompTmpl}
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
                <div>HOME</div>
            </q-card-section>
        </q-card>
    </div>
    <ui-spinner :loading="ifLoading"/>
</layout-main>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Route_Home
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                ifLoading: false,
            };
        },
        computed: {},
        methods: {},
        async mounted() {
            wgTitle.setTitle('Home');
        },
    };
}
