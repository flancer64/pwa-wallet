/**
 * Model to encapsulate functionality related to the places of the cards usages.
 */
export default class Wallet_Front_Mod_Card {
    /**
     * @param {TeqFw_Web_Front_App_Store_IDB} idb
     * @param {Wallet_Front_Store_IDb_Store_Place} idbPlace
     */
    constructor(
        {
            Wallet_Front_Store_IDb_Provider$: idb,
            Wallet_Front_Store_IDb_Store_Place$: idbPlace,
        }
    ) {
        // VARS
        const PLACE_INDEX = idbPlace.getIndexes();

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
