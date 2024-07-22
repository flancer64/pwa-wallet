/**
 * The web application initializes the Vue app and then mounts it to the given DOM element on the page.
 *
 * @implements TeqFw_Web_Front_Api_App
 */
export default class Wallet_Front_App {
    /**
     * @param {TeqFw_Di_Api_Container} container
     * @param {Wallet_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Logger_Base} loggerBase
     * @param {TeqFw_Core_Shared_Api_Logger_Transport} loggerTransport
     * @param {TeqFw_Web_Front_Mod_Config} modCfg
     * @param {Wallet_Front_Ui_Layout_Main.vueCompTmpl} layoutMain
     * @param {Wallet_Front_Ui_Main.vueCompTmpl} uiMain
     * @param {Wallet_Front_Ui_Lib_Spinner.vueCompTmpl} uiSpinner
     */
    constructor(
        {
            container,
            Wallet_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Logger_Base$: loggerBase,
            TeqFw_Core_Shared_Api_Logger_Transport$: loggerTransport,
            TeqFw_Web_Front_Mod_Config$: modCfg,
            Wallet_Front_Ui_Layout_Main$: layoutMain,
            Wallet_Front_Ui_Main$: uiMain,
            Wallet_Front_Ui_Lib_Spinner$: uiSpinner,
        }
    ) {
        // VARS
        let _app; // root vue component for the application
        let _print; // function to printout logs to UI or console
        const Vue = self.window.Vue;
        const VueRouter = self.window.VueRouter;
        const Quasar = self.window.Quasar;

        // FUNCS
        /**
         * Create a function to load a Vue component to build a UI for a route.
         * @param {string} ns - namespace for the component (Wallet_Front_Ui_Route_Home)
         * @return {function(): Promise<Object>}
         */
        function lazyRoute(ns) {
            return () => container.get(`${ns}$`); // as singleton
        }

        // INSTANCE METHODS

        this.init = async function (fnPrintout) {
            // FUNCS

            /**
             * Create printout function to log application startup events (to page or to console).
             * @param {function(string)} fn
             * @return {function(string)}
             */
            function createPrintout(fn) {
                return (typeof fn === 'function') ? fn : (msg) => console.log(msg);
            }

            function initLogger() {
                loggerBase.setTransport(loggerTransport);
            }

            /**
             * Set up Quasar UI.
             *  - icons: https://quasar.dev/start/umd
             *
             * @param {{use:function, iconSet: Object}} app
             * @param quasar
             */
            function initQuasarUi(app, quasar) {
                app.use(quasar, {config: {}});
                // https://quasar.dev/start/umd
                // noinspection JSUnresolvedVariable
                // quasar.iconSet.set(quasar.iconSet.svgMaterialIcons);
                // const useDark = modAppCfg.getUseThemeDark();
                // QDark.set(useDark);
            }

            /**
             * Add global components to the Vue app.
             * @param {{component:function}} app
             */
            function initUiComponents(app) {
                // ... and add global available components
                app.component('layoutMain', layoutMain);
                app.component('uiSpinner', uiSpinner);
            }

            /**
             * @param {{use:function}} app Vue 3 app
             * @param {Wallet_Front_Defaults} DEF
             */
            function initRouter(app, DEF) {
                /** @type {{addRoute, beforeEach}} */
                const router = VueRouter.createRouter({
                    history: VueRouter.createWebHashHistory(),
                    routes: [],
                });
                // setup application routes (load es6-module on demand using DI-container)
                router.addRoute({
                    path: DEF.ROUTE_CARD_ADD,
                    component: lazyRoute('Wallet_Front_Ui_Route_Card_Add'),
                });
                router.addRoute({
                    path: DEF.ROUTE_CARD_EDIT_X,
                    component: lazyRoute('Wallet_Front_Ui_Route_Card_Edit'),
                    props: true,
                });
                router.addRoute({
                    path: DEF.ROUTE_CARD_USE_X,
                    component: lazyRoute('Wallet_Front_Ui_Route_Card_Use'),
                    props: true,
                });
                router.addRoute({
                    path: DEF.ROUTE_HOME,
                    component: lazyRoute('Wallet_Front_Ui_Route_Home'),
                });
                router.addRoute({
                    path: DEF.ROUTE_SETTINGS,
                    component: lazyRoute('Wallet_Front_Ui_Route_Settings'),
                });
                // Catch-all route for 404
                router.addRoute({
                    path: '/:pathMatch(.*)*',
                    component: lazyRoute('Wallet_Front_Ui_Route_NotFound'),
                });
                //
                app.use(router);
            }

            // MAIN
            let res = false;
            try {
                _print = createPrintout(fnPrintout);
                _print(`Initializing the frontend application...`);
                // create root vue component
                _app = Vue.createApp(uiMain);
                initUiComponents(_app);
                _print(`Global Vue components are added. Initializing Quasar UI...`);
                initQuasarUi(_app, Quasar);
                _print(`Quasar UI is initialized. Loading the front app configuration...`);
                await modCfg.init();
                _print(`The app config is loaded. Initializing the logger...`);
                initLogger();
                _print(`The logger is initialized. Initializing the Vue Router...`);
                initRouter(_app, DEF);
                _print(`The Vue Router is initialized. The front app initialization is complete.`);
                res = true;
            } catch (e) {
                loggerBase.error(this.constructor.name, e);
                _print(e?.message);
            }
            return res;
        };

        /**
         * Mount root vue component of the application to DOM element.
         *
         * @see https://v3.vuejs.org/api/application-api.html#mount
         *
         * @param {Element|string} elRoot
         */
        this.mount = function (elRoot) {
            _app.mount(elRoot);
        };

        /**
         * Launch re-installation app.
         * @param {Element|string} elRoot
         */
        this.reinstall = function (elRoot) {
            _print(`
It is required to reinstall app. Please clean up all data in DevTools 
(F12 / Application / Storage / Clear site data).
Then reload this page.
`);
        };
    }
}
