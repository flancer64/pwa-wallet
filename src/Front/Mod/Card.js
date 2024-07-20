/**
 * Model to encapsulate functionality related to the card.
 */
export default class Wallet_Front_Mod_Card {
    /**
     * @param {TeqFw_Web_Front_App_Store_IDB} idb
     * @param {Wallet_Front_Store_IDb_Store_Card} idbCard
     */
    constructor(
        {
            Wallet_Front_Store_IDb_Provider$: idb,
            Wallet_Front_Store_IDb_Store_Card$: idbCard,
        }
    ) {
        // VARS
        const CARD_INDEX = idbCard.getIndexes();

        // FUNCS

        // INSTANCE METHODS
        /**
         * @type {function(Wallet_Front_Dto_Card.Dto=): Wallet_Front_Dto_Card.Dto}
         */
        this.composeEntity = idbCard.createDto;

        /**
         * Create a new card in IDB.
         * @param {Wallet_Front_Dto_Card.Dto} dto
         * @returns {Promise<Wallet_Front_Dto_Card.Dto>}
         */
        this.create = async function (dto) {
            const trx = await idb.startTransaction([idbCard]);
            dto.dateCreated = new Date();
            dto.uuid = self.crypto.randomUUID();
            const key = await idb.create(trx, idbCard, dto);
            const res = await idb.readOne(trx, idbCard, key);
            await trx.commit();
            return res;
        };

        /**
         * Delete one card from IDB.
         * @param {Wallet_Front_Dto_Card.Dto} dto
         * @returns {Promise<boolean>}
         */
        this.deleteOne = async function (dto) {
            const trx = await idb.startTransaction([idbCard]);
            const res = await idb.deleteOne(trx, idbCard, dto.uuid);
            await trx.commit();
            return res;
        };

        /**
         * Read all cards from IDB.
         * @returns {Promise<Wallet_Front_Dto_Card.Dto[]>}
         */
        this.readList = async function () {
            const trx = await idb.startTransaction([idbCard]);
            const res = await idb.readSet(trx, idbCard);
            await trx.commit();
            return res;
        };

        /**
         * Read one card from IDB.
         * @returns {Promise<Wallet_Front_Dto_Card.Dto>}
         */
        this.readOne = async function ({uuid}) {
            const trx = await idb.startTransaction([idbCard]);
            const res = await idb.readOne(trx, idbCard, uuid);
            await trx.commit();
            return res;
        };

        /**
         * Update one card in IDB.
         * @param {Wallet_Front_Dto_Card.Dto} dto
         * @returns {Promise<Wallet_Front_Dto_Card.Dto>}
         */
        this.updateOne = async function (dto) {
            const trx = await idb.startTransaction([idbCard]);
            const pk = await idb.updateOne(trx, idbCard, dto);
            const res = await idb.readOne(trx, idbCard, pk);
            await trx.commit();
            return res;
        };

    }
}
