/**
 * The Vue component for route to use a card.
 *
 * @namespace Wallet_Front_Ui_Route_Card_Use
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_Card_Use';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {Wallet_Front_Util_Format} format
 * @param {Wallet_Front_Util_CodeType} codeType
 * @param {Wallet_Front_Mod_Card} modCard
 * @param {Wallet_Front_Ui_Widget_App_Title} wgTitle
 *
 * @returns {Wallet_Front_Ui_Route_Card_Use.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        Wallet_Front_Util_Format$: format,
        Wallet_Front_Util_CodeType$: codeType,
        Wallet_Front_Mod_Card$: modCard,
        Wallet_Front_Ui_Widget_App_Title$: wgTitle,
    }
) {
    // VARS
    const bwipjs = self.window.bwipjs;
    const template = `
<layout-main>
    <div class="q-pa-lg q-gutter-sm">
        <q-card v-if="ifNotFound">
            <q-card-section style="background-color: var(--q-negative);">
                <div class="text-center">The card is not found.</div>
            </q-card-section>
        </q-card>
        <q-card v-if="!ifNotFound">
            <q-card-section>
                <div class="row justify-between">
                    <div class="text-caption">{{item?.codeType}}</div>
                    <div>{{uiDateCreated}}</div>
                </div> 
                <div class="text-h6">{{item?.name}}</div>
                <span v-html="svg"></span>
            </q-card-section>
        </q-card>
    </div> 
    <ui-spinner :loading="ifLoading"/>
</layout-main>
`;
    // FUNCS

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Route_Card_Use
     */
    return {
        teq: {
            package: DEF.SHARED.NAME,
        },
        name: NS,
        template,
        components: {},
        data() {
            return {
                ifLoading: false,
                ifNotFound: false,
                /** @type {Wallet_Front_Dto_Card.Dto} */
                item: undefined,
                svg: undefined,
            };
        },
        props: {
            uuid: String,
        },
        computed: {
            uiDateCreated() {
                return format.date(this.item.dateCreated);
            },
        },
        methods: {
            generateBarcode() {
                const code = this.item.code;
                const type = codeType.toBwipjs(this.item.codeType);
                if (!code || !type) return;

                this.svg = bwipjs.toSVG({
                    bcid: type,       // Barcode type
                    text: code,       // Text to encode
                    scale: 2,         // 3x scaling factor
                    height: 10,       // Bar height, in mm
                    includetext: true, // Show human-readable text
                    textxalign: 'center', // Always good to set this
                }, (err) => {
                    if (err) {
                        console.error('Error generating barcode:', err);
                    }
                });
            },
            async loadItem() {
                this.ifLoading = true;
                const found = await modCard.readOne({uuid: this.uuid});
                if (found?.uuid) {
                    this.ifNotFound = false;
                    this.item = found;
                    this.generateBarcode();
                } else {
                    this.ifNotFound = true;
                }
                this.ifLoading = false;
            },
            async updateDateLast() {
                const dto = modCard.composeEntity(this.item);
                dto.dateLast = new Date();
                await modCard.updateOne(dto);

            },
        },
        async mounted() {
            wgTitle.setTitle('Use');
            await this.loadItem();
            await this.updateDateLast();
        },
        unmounted() {},
    };
}
