/**
 * The Vue component for route to add a new card.
 *
 * @namespace Wallet_Front_Ui_Route_Card_Add
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_Card_Add';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {Wallet_Front_Ui_Widget_App_Title} wgTitle
 *
 * @returns {Wallet_Front_Ui_Route_Card_Add.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        Wallet_Front_Ui_Widget_App_Title$: wgTitle,
    }
) {
    // VARS
    const Html5QrcodeScanner = self.window.Html5QrcodeScanner;

    const template = `
<layout-main>
    <div class="q-pa-lg q-gutter-sm">
        <q-card>
            <q-card-section>
                <div>Text: {{text}}</div>
                <div>Result: {{result}}</div>
                <div id="reader" style="width:80vw; border: 1px solid black;"></div>
            </q-card-section>
        </q-card>
    </div> 
</layout-main>
`;
    // FUNCS

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Route_Card_Add
     */
    return {
        teq: {
            package: DEF.SHARED.NAME,
            scanner: undefined,
        },
        name: NS,
        template,
        components: {},
        data() {
            return {
                result: undefined,
                text: undefined,
            };
        },
        computed: {},
        methods: {},
        async mounted() {
            // FUNCS
            const onScanFailure = (error) => {
                // handle scan failure, usually better to ignore and keep scanning.
                // for example:
                console.warn(`Code scan error = ${error}`);
            };
            const onScanSuccess = (decodedText, decodedResult) => {
                // handle the scanned code as you like, for example:
                console.log(`Code matched = ${decodedText}`, decodedResult);
                this.text = decodedText;
                this.result = decodedResult;
            };
            // MAIN
            wgTitle.setTitle('Add');

            this.$options.teq.scanner = new Html5QrcodeScanner(
                'reader',
                {
                    fps: 4, // scan rate is 4 frames per second
                    qrbox: {width: 250, height: 250}
                },
                /* verbose= */ false);
            this.$options.teq.scanner.render(onScanSuccess, onScanFailure);
        },
        unmounted() {
            if (this.$options.teq.scanner?.clear) {
                this.$options.teq.scanner.clear();
            }
        },
    };
}
