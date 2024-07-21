/**
 * Model to encapsulate functionality related to the places of the cards usages.
 */
export default class Wallet_Front_Mod_Place {
    /**
     * @param {Wallet_Front_Util_Geo} utilGeo
     * @param {TeqFw_Web_Front_App_Store_IDB} idb
     * @param {Wallet_Front_Store_IDb_Store_Place} idbPlace
     * @param {Wallet_Front_Mod_App_Config} modConfig
     */
    constructor(
        {
            Wallet_Front_Util_Geo$: utilGeo,
            Wallet_Front_Store_IDb_Provider$: idb,
            Wallet_Front_Store_IDb_Store_Place$: idbPlace,
            Wallet_Front_Mod_App_Config$: modConfig,
        }
    ) {
        // VARS
        const ATTR = idbPlace.getAttributes();
        const INDEX = idbPlace.getIndexes();
        const POS_ACCURACY_METERS = 10;

        // FUNCS

        // INSTANCE METHODS
        /**
         * @type {function(Wallet_Front_Dto_Place.Dto=): Wallet_Front_Dto_Place.Dto}
         */
        this.composeEntity = idbPlace.createDto;

        /**
         * Create a new place in IDB.
         * @param {Wallet_Front_Dto_Place.Dto} dto
         * @returns {Promise<Wallet_Front_Dto_Place.Dto>}
         */
        this.create = async function (dto) {
            const trx = await idb.startTransaction([idbPlace]);
            dto.uuid = self.crypto.randomUUID();
            const key = await idb.create(trx, idbPlace, dto);
            const res = await idb.readOne(trx, idbPlace, key);
            await trx.commit();
            return res;
        };

        /**
         * Delete one place from IDB.
         * @param {Wallet_Front_Dto_Place.Dto} dto
         * @returns {Promise<boolean>}
         */
        this.deleteOne = async function (dto) {
            const trx = await idb.startTransaction([idbPlace]);
            const res = await idb.deleteOne(trx, idbPlace, dto.uuid);
            await trx.commit();
            return res;
        };

        /**
         * @return {Promise<Wallet_Front_Dto_Geo.Dto>}
         */
        this.getCurrentGeo = async function () {
            if (modConfig.getCanUseGeoApi()) {
                const pos = await utilGeo.getCurrentPosition();
                return utilGeo.roundPosition(pos, POS_ACCURACY_METERS);
            }
            return undefined;
        };

        /**
         * Read all places from IDB.
         * @returns {Promise<Wallet_Front_Dto_Place.Dto[]>}
         */
        this.readList = async function () {
            const trx = await idb.startTransaction([idbPlace]);
            const res = await idb.readSet(trx, idbPlace);
            await trx.commit();
            return res;
        };

        /**
         * @param {Wallet_Front_Dto_Geo.Dto} geo
         * @return {Promise<*[]>}
         */
        this.registerUsage = async function ({geo}) {
            const trx = await idb.startTransaction([idbPlace]);
            const key = [geo.lat, geo.lng];
            const found = await idb.readOne(trx, idbPlace, key, INDEX.BY_GEO);
            if (!found) {
                const dto = this.composeEntity();
                dto.lat = geo.lat;
                dto.lng = geo.lng;
                dto.uuid = self.crypto.randomUUID();
                const key = await idb.create(trx, idbPlace, dto);
            } else {
                found.count = found.count ? found.count + 1 : 1;
                await idb.updateOne(trx, idbPlace, found);
            }
            await trx.commit();
        };

        /**
         * Read one card from IDB.
         * @returns {Promise<Wallet_Front_Dto_Place.Dto>}
         */
        this.readOne = async function ({uuid}) {
            const trx = await idb.startTransaction([idbPlace]);
            const res = await idb.readOne(trx, idbPlace, uuid);
            await trx.commit();
            return res;
        };

        /**
         * Update one place in IDB.
         * @param {Wallet_Front_Dto_Place.Dto} dto
         * @returns {Promise<Wallet_Front_Dto_Place.Dto>}
         */
        this.updateOne = async function (dto) {
            const trx = await idb.startTransaction([idbPlace]);
            const pk = await idb.updateOne(trx, idbPlace, dto);
            const res = await idb.readOne(trx, idbPlace, pk);
            await trx.commit();
            return res;
        };

    }
}
