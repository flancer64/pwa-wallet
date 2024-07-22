/**
 * The Vue component for route to edit an existing card.
 *
 * @namespace Wallet_Front_Ui_Route_Card_Edit
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_Card_Edit';
const REF_YES_NO = 'yesNo';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {Wallet_Front_Util_Format} format
 * @param {Wallet_Front_Mod_Notify} modNotify
 * @param {Wallet_Front_Mod_Card} modCard
 * @param {Wallet_Front_Ui_Widget_App_Title} wgTitle
 * @param {Wallet_Front_Ui_Lib_Dlg_YesNo.vueCompTmpl} uiDlgYesNo
 *
 * @returns {Wallet_Front_Ui_Route_Card_Edit.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        Wallet_Front_Util_Format$: format,
        Wallet_Front_Mod_Notify$: modNotify,
        Wallet_Front_Mod_Card$: modCard,
        Wallet_Front_Ui_Widget_App_Title$: wgTitle,
        Wallet_Front_Ui_Lib_Dlg_YesNo$: uiDlgYesNo,
    }
) {
    // VARS
    const template = `
<layout-main>
    <div class="q-pa-lg q-gutter-sm">
        <q-card :style="cssColor">
            <q-card-section class="q-gutter-sm">
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
                <q-input v-model="fldCode"
                         dense
                         label="Code"
                         outlined
                         readonly
                />
                <q-input v-model="fldCodeType"
                         dense
                         label="Code Type"
                         outlined
                         readonly
                />
                <q-input v-model="uiDateCreated"
                         dense
                         label="Created:"
                         outlined
                         readonly
                />
                <q-input v-model="uiDateUsed"
                         dense
                         label="Last Used:"
                         outlined
                         readonly
                />
            </q-card-section>

            <q-card-actions align="center">
                <q-btn outline label="Save" @click="onSave"/>
                <q-btn outline label="Delete" @click="onDelete"/>
            </q-card-actions>
        </q-card>
    </div>
    <ui-dlg-yes-no ref="${REF_YES_NO}" @onYes="doDeleteYes"/>
    <ui-spinner :loading="ifLoading"/>
</layout-main>
`;
    // FUNCS

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Route_Card_Edit
     */
    return {
        teq: {
            package: DEF.SHARED.NAME,
            scanner: undefined,
        },
        name: NS,
        template,
        components: {uiDlgYesNo},
        data() {
            return {
                fldCode: undefined,
                fldCodeType: undefined,
                fldColor: undefined,
                fldDesc: undefined,
                fldName: undefined,
                ifLoading: false,
                /** @type {Wallet_Front_Dto_Card.Dto} */
                origin: undefined,
            };
        },
        props: {
            id: String,
        },
        computed: {
            cssColor() {
                const color = this.fldColor ?? '#FFFFFF';
                return `background-color: ${color};`;
            },
            uiDateCreated() {
                return format.dateTime(this.origin?.dateCreated);
            },
            uiDateUsed() {
                return format.dateTime(this.origin?.dateLast);
            },
        },
        methods: {
            async doDeleteYes() {
                const deleted = await modCard.deleteOne(this.origin);
                if (deleted) {
                    modNotify.positive(`The card has been deleted.`);
                    this.$router.push(DEF.ROUTE_CARD_LIST);
                } else {
                    modNotify.negative(`Failed to delete the card from IDB.`);
                }
            },
            async loadItem() {
                this.ifLoading = true;
                const found = await modCard.readOne({id: Number.parseInt(this.id)});
                if (found?.id) {
                    this.ifNotFound = false;
                    this.reset(found);
                } else {
                    this.ifNotFound = true;
                }
                this.ifLoading = false;
            },
            async onDelete() {
                /** @type {Wallet_Front_Ui_Lib_Dlg_YesNo.IUi} */
                const dlg = this.$refs[REF_YES_NO];
                dlg.show('Confirm delete', 'Do you want to delete this card?');
            },
            async onSave() {
                const dto = modCard.composeEntity(this.origin);
                dto.name = String(this.fldName);
                if (this.fldDesc) dto.desc = String(this.fldDesc);
                if (this.fldColor) dto.color = String(this.fldColor);
                const updated = await modCard.updateOne(dto);
                if (updated.id) {
                    modNotify.positive(`The card has been saved to IDB.`);
                    this.$router.push(DEF.ROUTE_CARD_LIST);
                } else {
                    modNotify.negative(`Failed to save the card to IDB.`);
                }
            },
            /**
             * @param {Wallet_Front_Dto_Card.Dto} [dto]
             */
            reset(dto) {
                this.fldCode = dto?.code;
                this.fldCodeType = dto?.codeType;
                this.fldColor = dto?.color;
                this.fldDesc = dto?.desc;
                this.fldName = dto?.name;
                this.ifLoading = false;
                this.origin = dto;
            },
        },
        async mounted() {
            wgTitle.setTitle('Edit card');
            await this.loadItem();
        },
        unmounted() {},
    };
}
