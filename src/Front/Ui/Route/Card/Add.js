/**
 * The Vue component for route to add a new card.
 *
 * We can use `html5-qrcode` or `@ericblade/quagga2` package. The first one is more simple but does not support i18n.
 * So, for the moment the `html5-qrcode` is used.
 *
 * @namespace Wallet_Front_Ui_Route_Card_Add
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_Card_Add';
const REF_SCAN = 'scan';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {Wallet_Front_Mod_Notify} modNotify
 * @param {Wallet_Front_Mod_Card} modCard
 * @param {Wallet_Front_Ui_Route_Card_Add_A_Scan.vueCompTmpl} uiScan
 * @param {Wallet_Front_Ui_Widget_App_Title} wgTitle
 *
 * @returns {Wallet_Front_Ui_Route_Card_Add.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        Wallet_Front_Mod_Notify$: modNotify,
        Wallet_Front_Mod_Card$: modCard,
        Wallet_Front_Ui_Route_Card_Add_A_Scan$: uiScan,
        Wallet_Front_Ui_Widget_App_Title$: wgTitle,
    }
) {
    // VARS
    const template = `
<layout-main>
    <div class="q-pa-lg q-gutter-sm">
        <q-card :style="cssColor">
            <q-card-section class="q-gutter-sm">
                <div>General</div>
                <q-input v-model="fldName"
                         dense
                         label="Name"
                         outlined
                />
                <q-input v-model="fldDesc"
                         autogrow
                         dense
                         label="Description"
                         outlined
                />
                <q-input v-model="fldColor"
                         dense
                         label="Color"
                         outlined
                >
                    <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-color v-model="fldColor" default-view="palette"/>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>                
            </q-card-section>
            
            <q-card-section class="q-gutter-sm">
                <div>Code</div>
                <div class="row justify-between items-center">
                    <q-input v-model="fldCode"
                             dense
                             label="Code"
                             outlined
                             readonly
                    />
                    <q-btn outline label="Scan" @click="onScan"/>
                </div>
                <q-input v-model="fldCodeType"
                         dense
                         label="Code Type"
                         outlined
                         readonly
                />
            </q-card-section>
            <q-card-actions align="center">
                <q-btn outline label="Add" @click="onAdd"/>
            </q-card-actions>
        </q-card>
    </div>
    <ui-scan ref="${REF_SCAN}" @onOk="doScanOk"/>
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
        components: {uiScan},
        data() {
            return {
                fldCode: undefined,
                fldCodeType: undefined,
                fldColor: undefined,
                fldDesc: undefined,
                fldName: undefined,
            };
        },
        computed: {
            cssColor() {
                const color = this.fldColor ?? '#FFFFFF';
                return `background-color: ${color};`;
            },
        },
        methods: {
            doScanOk(code, codeType) {
                this.fldCode = code;
                this.fldCodeType = codeType;
            },
            async onAdd() {
                const dto = modCard.composeEntity();
                dto.code = String(this.fldCode);
                dto.codeType = String(this.fldCodeType);
                dto.name = String(this.fldName);
                if (this.fldColor) dto.color = String(this.fldColor);
                if(this.fldDesc) dto.desc = String(this.fldDesc);
                const created = await modCard.create(dto);
                if (created.id) {
                    modNotify.positive(`New card is added to IDB.`);
                    this.$router.push(DEF.ROUTE_CARD_LIST);
                } else {
                    modNotify.negative(`Cannot add new card to IDB.`);
                }
            },
            onScan() {
                /** @type {Wallet_Front_Ui_Route_Card_Add_A_Scan.IUi} */
                const dlg = this.$refs[REF_SCAN];
                dlg.show();
            },
        },
        async mounted() {
            wgTitle.setTitle('Add a new card');
        },
        unmounted() {},
    };
}
