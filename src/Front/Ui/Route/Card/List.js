/**
 * The Vue component for route to view all card.
 *
 * @namespace Wallet_Front_Ui_Route_Card_List
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_Card_List';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {Wallet_Front_Ui_Widget_App_Title} wgTitle
 * @param {Wallet_Front_Ui_Route_Card_List_A_Item.vueCompTmpl} uiItem
 * @param {Wallet_Front_Dto_Card} dtoCard
 * @param {typeof Wallet_Front_Enum_Code_Type} TYPE
 *
 * @returns {Wallet_Front_Ui_Route_Card_List.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        Wallet_Front_Ui_Widget_App_Title$: wgTitle,
        Wallet_Front_Ui_Route_Card_List_A_Item$: uiItem,
        Wallet_Front_Dto_Card$: dtoCard,
        Wallet_Front_Enum_Code_Type$: TYPE,
    }
) {
    // VARS
    const template = `
<layout-main>
    <div class="q-pa-lg q-gutter-sm">
        <ui-item v-for="one of items" :item="one"/> 
    </div> 
</layout-main>
`;
    const items = [
        {
            code: 'D01665588618060',
            codeType: TYPE.CODE_128,
            color: 'FF0000',
            name: 'Maxima',
            uuid: '123456-12312312312-1'
        },
        {code: '23456', codeType: TYPE.CODE_128, color: 'FFFF00', name: 'second', uuid: '123456-12312312312-2'},
        {code: '6346346', codeType: TYPE.CODE_128, color: '00FF00', name: 'third', uuid: '123456-12312312312-3'},
        {code: '12368888', codeType: TYPE.CODE_128, color: '00FFFF', name: 'forth', uuid: '123456-12312312312-4'},
        {code: '97567573', codeType: TYPE.CODE_128, color: '0000FF', name: 'fifth', uuid: '123456-12312312312-5'},
    ];

    // FUNCS

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Route_Card_List
     */
    return {
        teq: {
            package: DEF.SHARED.NAME,
        },
        name: NS,
        template,
        components: {uiItem},
        data() {
            return {
                items,
            };
        },
        computed: {},
        methods: {},
        async mounted() {
            wgTitle.setTitle('My Cards');
        },
    };
}
