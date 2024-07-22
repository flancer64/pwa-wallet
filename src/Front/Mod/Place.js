/**
 * Model to encapsulate functionality related to the places of the cards usages.
 */
export default class Wallet_Front_Mod_Place {
    /**
     * @param {Wallet_Front_Util_Geo} utilGeo
     * @param {TeqFw_Web_Front_App_Store_IDB} idb
     * @param {Wallet_Front_Store_IDb_Store_Place} idbPlace
     * @param {Wallet_Front_Store_IDb_Store_Place_Ref_Card} idbRefCard
     * @param {Wallet_Front_Mod_Notify} modNotify
     * @param {Wallet_Front_Mod_App_Config} modConfig
     */
    constructor(
        {
            Wallet_Front_Util_Geo$: utilGeo,
            Wallet_Front_Store_IDb_Provider$: idb,
            Wallet_Front_Store_IDb_Store_Place$: idbPlace,
            Wallet_Front_Store_IDb_Store_Place_Ref_Card$: idbRefCard,
            Wallet_Front_Mod_Notify$: modNotify,
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
            dto.id = self.crypto.randomUUID();
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
            const res = await idb.deleteOne(trx, idbPlace, dto.id);
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
         * Register new place and card usage.
         * @param {Wallet_Front_Dto_Geo.Dto} geo
         * @param {number} [cardRef]
         * @return {Promise<*[]>}
         */
        this.registerUsage = async function ({geo, cardRef}) {
            // FUNCS
            /**
             * Create new or found existing place for given geo coordinates.
             * @param {IDBTransaction} trx
             * @param {Wallet_Front_Dto_Place.Dto} place
             * @param {number} cardRef
             * @return {Promise<Wallet_Front_Store_IDb_Store_Place_Ref_Card.Dto>}
             */
            async function countCardUsage(trx, place, cardRef) {
                const searchKey = [place.id, cardRef];
                /** @type {Wallet_Front_Store_IDb_Store_Place_Ref_Card.Dto} */
                const found = await idb.readOne(trx, idbRefCard, searchKey);
                if (!found) {
                    const dto = idbRefCard.createDto();
                    dto.cardRef = cardRef;
                    dto.placeRef = place.id;
                    dto.usages = 1;
                    const pk = await idb.create(trx, idbRefCard, dto);
                    return await idb.readOne(trx, idbRefCard, pk);
                } else {
                    found.usages++;
                    await idb.updateOne(trx, idbRefCard, found);
                    return await idb.readOne(trx, idbRefCard, searchKey);
                }
            }

            /**
             * Create new or found existing place for given geo coordinates.
             * @param {IDBTransaction} trx
             * @param {Wallet_Front_Dto_Geo.Dto} geo
             * @return {Promise<Wallet_Front_Dto_Place.Dto>}
             */
            async function findPlace(trx, geo) {
                const key = [geo.lat, geo.lng];
                const found = await idb.readOne(trx, idbPlace, key, INDEX.BY_GEO);
                if (!found) {
                    const dto = idbPlace.createDto();
                    dto.lat = geo.lat;
                    dto.lng = geo.lng;
                    const key = await idb.create(trx, idbPlace, dto);
                    return await idb.readOne(trx, idbPlace, key);
                } else {
                    return found;
                }
            }

            // MAIN
            const trx = await idb.startTransaction([idbPlace, idbRefCard]);
            try {
                const place = await findPlace(trx, geo);
                await countCardUsage(trx, place, cardRef);
                await trx.commit();
            } catch (e) {
                await trx.abort();
                modNotify.negative(e.message);
            }
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
