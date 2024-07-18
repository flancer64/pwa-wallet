/**
 * The Vue component to display dialog to scan barcode from image or camera.
 *
 * @namespace Wallet_Front_Ui_Route_Card_Add_A_Scan
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_Card_Add_A_Scan';
const EVT_OK = 'onOk';
const REF_SELF = 'self';

// MODULE'S INTERFACES
// noinspection JSUnusedLocalSymbols
/**
 * These the methods are available to call for the components.
 * @interface
 * @mixin
 * @memberOf Wallet_Front_Ui_Route_Card_Add_A_Scan
 */
class IUi {
    /**
     * Hide the dialog.
     */
    hide() { }

    /**
     * Display the dialog.
     */
    show() { }
}

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
 * @param {Wallet_Front_Util_CodeType} codeType
 *
 * @returns {Wallet_Front_Ui_Route_Card_Add_A_Scan.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        TeqFw_Core_Shared_Api_Logger$$: logger,
        Wallet_Front_Util_CodeType$: codeType,
    }
) {
    // VARS
    const Html5QrcodeScanner = self.window.Html5QrcodeScanner;

    const template = `
<q-dialog ref="${REF_SELF}" @hide="onHideDialog">
    <q-card>
        <q-bar>
            <div>Scan a Code</div>
            <q-space/>
            <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section class="row justify-between q-gutter-xs" v-if="ifHasCode">
            <div>{{code}} ({{codeType}})</div>
            <q-btn outline label="OK" @click="onOk"/>
        </q-card-section>

        <q-card-section class="column justify-center items-center q-gutter-xs">
            <div id="reader" style="width:80vw; border: 1px solid black;"></div>      
        </q-card-section>

    </q-card>
</q-dialog>
`;

    // FUNCS

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Route_Card_Add_A_Scan
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
                code: undefined,
                codeType: undefined,
            };
        },
        props: {},
        computed: {
            ifHasCode() {
                return Boolean(this.code) && Boolean(this.codeType);
            },
        },
        methods: {
            hide() {
                const ui = this.$refs[REF_SELF];
                ui.hide();
            },
            onHideDialog() {
                if (this.$options.teq.scanner?.clear) {
                    this.$options.teq.scanner.clear();
                }
                this.code = undefined;
                this.codeType = undefined;
            },
            onOk() {
                // remove reactivity and emit the event
                const code = String(this.code);
                const codeType = String(this.codeType);
                this.$emit(EVT_OK, code, codeType);
                this.hide();
            },
            async show() {
                // FUNCS
                const onScanFailure = (error) => {
                    // handle scan failure, usually better to ignore and keep scanning.
                };
                const onScanSuccess = (text, decoded) => {
                    logger.info(`code: ${text}, result: ${JSON.stringify(decoded)}`);
                    this.code = text;
                    this.codeType = codeType.fromHtml5Qrcode(decoded?.result?.format?.formatName);
                };

                // MAIN
                const ui = this.$refs[REF_SELF];
                ui.show();
                setTimeout(() => {
                    this.$options.teq.scanner = new Html5QrcodeScanner(
                        'reader',
                        {
                            fps: 4, // scan rate is 4 frames per second
                            qrbox: {width: 250, height: 250}
                        },
                        /* verbose= */ false);
                    this.$options.teq.scanner.render(onScanSuccess, onScanFailure);
                }, 1);


            },
        },
        emits: [EVT_OK],
    };
}
