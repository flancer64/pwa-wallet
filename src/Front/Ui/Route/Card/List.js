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
 * @param {Wallet_Front_Mod_Card} modCard
 * @param {Wallet_Front_Ui_Widget_App_Title} wgTitle
 * @param {Wallet_Front_Ui_Route_Card_List_A_Item.vueCompTmpl} uiItem
 *
 *
 * @returns {Wallet_Front_Ui_Route_Card_List.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        Wallet_Front_Mod_Card$: modCard,
        Wallet_Front_Ui_Widget_App_Title$: wgTitle,
        Wallet_Front_Ui_Route_Card_List_A_Item$: uiItem,
    }
) {
    // VARS
    const template = `
<layout-main>
    <div class="q-pa-sm q-gutter-sm">
        <ui-item v-for="one of items" :item="one"/> 
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
                ifLoading: false,
                items: [],
            };
        },
        computed: {},
        methods: {},
        async mounted() {
            wgTitle.setTitle('My Cards');
            this.ifLoading = true;
            const res = await modCard.readList();
            this.items.length = 0;
            if (res.length) {
                res.sort((a, b) => {
                    return (a?.dateCreated > b?.dateCreated) ? -1 : 1;
                });
                this.items.push(...res);
            }
            this.ifLoading = false;
        },
    };
}
