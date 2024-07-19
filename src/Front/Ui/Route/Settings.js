/**
 * The Vue component for settings.
 *
 * @namespace Wallet_Front_Ui_Route_Settings
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Ui_Route_Settings';
const DOM_ID_UPLOAD = 'uploadFile';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Wallet_Front_Defaults} DEF
 * @param {Wallet_Front_Mod_Data} modData
 * @param {Wallet_Front_Mod_Notify} modNotify
 * @param {Wallet_Front_Ui_Widget_App_Title} wgTitle
 *
 * @returns {Wallet_Front_Ui_Route_Settings.vueCompTmpl}
 */
export default function (
    {
        Wallet_Front_Defaults$: DEF,
        Wallet_Front_Mod_Data$: modData,
        Wallet_Front_Mod_Notify$: modNotify,
        Wallet_Front_Ui_Widget_App_Title$: wgTitle,
    }
) {
    // VARS
    const template = `
<layout-main>
    <div class="q-pa-sm q-gutter-sm">
        <q-list bordered class="rounded-borders">
            <q-expansion-item
                    header-class="bg-primary text-white rounded-borders"
                    expand-separator
                    icon="dataset"
                    label="Export / Import" 
            >
                <q-card>
                    <q-card-section class="q-gutter-xs">
                        <div class="row justify-between items-center q-gutter-xs">
                            <div>Data export</div>
                            <div>
                                <q-btn label="OK" color="primary" v-on:click="onDataExport"/>
                            </div>
                        </div>
                        <div class="row justify-between items-center q-gutter-xs">
                            <div>Data import</div>
                            <div>
                                <input id="${DOM_ID_UPLOAD}" type="file" tabindex="-1" hidden v-on:change="onUploadSelected" />
                                <q-btn label="OK" color="primary" v-on:click="onDataImport"/>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
    </div>
    <ui-spinner :loading="ifLoading"/>
</layout-main>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Wallet_Front_Ui_Route_Settings
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                bufferB64: null,
                ifLoading: false,
            };
        },
        computed: {},
        methods: {
            async onDataExport() {
                const json = await modData.export();
                const txt = JSON.stringify(json);
                const blob = new Blob([txt], {type: 'application/json'});
                const elLink = document.createElement('a');
                elLink.href = URL.createObjectURL(blob);
                elLink.download = 'wallet.json';
                document.body.appendChild(elLink);
                elLink.click();
                URL.revokeObjectURL(elLink.href);
                document.body.removeChild(elLink);
            },
            onDataImport() {
                this.bufferB64 = null;
                const elUpload = document.getElementById(DOM_ID_UPLOAD);
                elUpload?.click();
            },
            /**
             * Read uploaded file contents as Base64.
             * @param {Event} evt
             */
            onUploadSelected(evt) {
                /** @type {File} */
                const file = evt.target.files[0];
                const reader = new FileReader();
                reader.readAsText(file, 'utf-8');
                reader.onload = (evt) => {
                    this.bufferB64 = evt.target.result;
                };
            },
        },
        watch: {
            async bufferB64(cur) {
                if (typeof cur === 'string') {
                    const json = JSON.parse(cur);
                    await modData.import(json);
                    modNotify.positive(`All data is imported.`);
                }
            },
        },
        async mounted() {
            wgTitle.setTitle('Settings');
        },
    };
}
