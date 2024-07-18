/**
 * The Vue component to display one card in the cards list.
 *
 * @namespace Wallet_Front_Ui_Route_Card_List_A_Item
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_Card_List_A_Item';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {Wallet_Front_Util_Format} format
 * @param {Wallet_Front_Dto_Card} dtoCard
 * @param {typeof Wallet_Front_Enum_Code_Type} TYPE
 *
 * @returns {Wallet_Front_Ui_Route_Card_List_A_Item.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        Wallet_Front_Util_Format$: format,
        Wallet_Front_Dto_Card$: dtoCard,
        Wallet_Front_Enum_Code_Type$: TYPE,
    }
) {
    // VARS
    const template = `
<q-card @click="onClick">
    <q-card-section class="row q-gutter-xs" :style="uiStyle">
        <div style="width: 18%">
             <q-avatar color="primary" text-color="white">{{uiAvatarLetter}}</q-avatar>
         </div>
         <div class="column q-gutter-xs"  style="width: 78%">
             <div class="row q-gutter-xs justify-between">
                <div class="text-h6">{{item?.name}}</div>
                <div>{{uiDateLast}}</div>     
            </div>
            <div>{{item?.desc}}</div>
        </div>
    </q-card-section>
</q-card>
`;

    // FUNCS

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Route_Card_List_A_Item
     */
    return {
        teq: {
            package: DEF.SHARED.NAME,
        },
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        props: {
            /** @type {Wallet_Front_Dto_Card.Dto} */
            item: null,
        },
        computed: {
            uiAvatarLetter() {
                return this.item?.name?.[0]?.toUpperCase() ?? '?';
            },
            uiDateLast() {
                return (this.item?.dateLast) ? format.date(this.item.dateLast) : '';
            },
            uiStyle() {
                const color = this.item?.color ?? 'FFFFFF';
                return `background: #${color}`;
            },
        },
        methods: {
            onClick() {
                const path = DEF.ROUTE_CARD_USE_X
                    .replace(':uuid', this.item.uuid);
                this.$router.push(path);
            },
        },
        async mounted() { },
    };
}
