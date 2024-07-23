/**
 * The Vue component for 'About' route.
 *
 * @namespace Wallet_Front_Ui_Route_About
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_About';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {Wallet_Front_Ui_Widget_App_Title} wgTitle
 *
 * @returns {Wallet_Front_Ui_Route_About.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        Wallet_Front_Ui_Widget_App_Title$: wgTitle,
    }
) {
    // VARS
    const template = `
<layout-main>
    <div class="q-pa-lg q-gutter-sm">
        <p>Code Wallet is a Progressive Web Application (PWA) designed to store and manage various codes (QR and
            barcodes) directly on your mobile phone. Your data is securely stored in your browser.</p>

        <div class="text-bold">Main Task</div>
        <p>The primary goal of Code Wallet is to showcase the capabilities of web technologies in creating
            mobile applications that rival native apps. It offers features like offline functionality,
            full-screen mode, secure local storage, and effortless code scanning and display.</p>

        <div class="text-bold">Source Code</div>
        <p>The source code for Code Wallet is available on GitHub. You can access it <a
                href="https://github.com/flancer64/pwa-wallet" target="_blank">here</a>.</p>

        <div class="text-bold">Development Offer</div>
        <p>Looking to develop a robust and user-friendly web application like Code Wallet? With extensive
            experience in creating seamless PWAs, I can offer high-quality development services tailored to your
            needs. Whether it's a similar application or a different web solution, I am here to help.</p>
        <p>Contact me to discuss your project requirements and get a quote.</p>

        <div class="text-bold">Contact Information</div>
        <p>Email: <a href="mailto:alex@wiredgeese.com">alex@wiredgeese.com</a></p>
        <p>Telegram: <a href="https://t.me/wiredgeese" target="_blank">@wiredgeese</a></p>
    </div>
</layout-main>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Route_About
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        async mounted() {
            wgTitle.setTitle('About');
        },
    };
}
