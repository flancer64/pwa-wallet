/**
 * The dialog to select 'yes' or 'no'.
 *
 * @namespace Wallet_Front_Ui_Lib_Dlg_YesNo
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Lib_Dlg_YesNo';
const EVT_NO = 'onNo';
const EVT_YES = 'onYes';
const REF_SELF = 'self';

// MODULE'S INTERFACES
// noinspection JSUnusedLocalSymbols
/**
 * @interface
 * @memberOf Wallet_Front_Ui_Lib_Dlg_YesNo
 */
class IUi {
    /**
     * Hide the dialog.
     */
    hide() { }

    /**
     * Set the information data and display the dialog.
     * @param {string} title
     * @param {string} msg
     * @param {boolean} [hideNo]
     */
    show(title, msg, hideNo = false) { }
}

// MODULE'S FUNCTIONS
/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 *
 * @returns {Wallet_Front_Ui_Lib_Dlg_YesNo.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
    }
) {
    // VARS
    const template = `
<q-dialog ref="${REF_SELF}">
    <q-card>
        <q-bar>
            <div>{{title}}</div>
            <q-space/>
            <q-btn dense flat icon="mdi-close" v-close-popup/>
        </q-bar>
        
        <q-card-section class="column justify-center items-center">
            {{message}}
        </q-card-section>
        
        <q-card-actions align="center">
            <q-btn outline label="Yes"  @click="onYes"/>
            <q-btn outline label="No"  @click="onNo" v-if="!ifHideNo"/>
        </q-card-actions>
        
    </q-card>
</q-dialog>
`;

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Lib_Dlg_YesNo
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        data() {
            return {
                ifHideNo: false,
                message: null,
                title: null,
            };
        },
        methods: {
            hide() {
                this.message = null;
                const ui = this.$refs[REF_SELF];
                ui.hide();
            },
            onNo() {
                this.hide();
                this.$emit(EVT_NO);
            },
            onYes() {
                this.hide();
                this.$emit(EVT_YES);
            },
            show(title, msg, hideNo = false) {
                this.ifHideNo = hideNo;
                this.message = msg;
                this.title = title;
                const ui = this.$refs[REF_SELF];
                ui.show();
            },
        },
        emits: [EVT_NO, EVT_YES],
    };
}
