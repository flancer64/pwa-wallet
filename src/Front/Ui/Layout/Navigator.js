/**
 * The right navigator.
 *
 * @namespace Wallet_Front_Ui_Layout_Navigator
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Layout_Navigator';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {TeqFw_Web_Front_Mod_Version} modVersion
 *
 * @returns {Wallet_Front_Ui_Layout_Navigator.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        TeqFw_Web_Front_Mod_Version$: modVersion,
    }
) {
    // VARS
    const template = `
<q-scroll-area class="fit">

    <q-list>

        <template v-for="(item, index) in items" :key="index">
            <q-item clickable :active="ifActive(item)" v-ripple v-on:click="onClick(item)">
                <q-item-section avatar>
                    <q-icon :name="item.icon"/>
                </q-item-section>
                <q-item-section>
                    {{ item.label }}
                </q-item-section>
            </q-item>
        </template>

    </q-list>
    
    <div class="text-right text-caption q-pr-xs q-pt-xl" style="padding-right: 10px;">
        version: {{uiVersion}}
    </div>
   
</q-scroll-area>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Layout_Navigator
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        computed: {
            items() {
                return [
                    {
                        icon: 'home',
                        label: 'Home',
                        route: DEF.ROUTE_HOME,
                    }, {
                        icon: 'add',
                        label: 'Add',
                        route: DEF.ROUTE_CARD_ADD,
                    }, {
                        icon: 'settings',
                        label: 'Settings',
                        route: DEF.ROUTE_SETTINGS,
                    }, {
                        icon: 'help',
                        label: 'About',
                        route: DEF.ROUTE_ABOUT,
                    },
                ];
            },
            uiVersion() {
                return modVersion.versionInstalled();
            },
        },
        methods: {
            ifActive(item) {
                return (this.$router.currentRoute.value.fullPath === item?.route);
            },
            onClick(item) {
                this.$router.push(item?.route ?? DEF.ROUTE_HOME);
            },
        },
    };
}
