/**
 * Model to encapsulate functionality related to the data export/import.
 */
export default class Wallet_Front_Mod_Data {
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
        /**
         * Read all data from IDB and export it as a JS object.
         * @returns {Promise<Object>}
         */
        this.export = async function () {
            const res = {};
            const trx = await idb.startTransaction([idbCard]);
            res[idbCard.getName()] = await idb.readSet(trx, idbCard);
            await trx.commit();
            return res;
        };

        /**
         * Delete all data from IDB and import new one.
         * @param {Object} data
         * @return {Promise<*>}
         */
        this.import = async function (data) {
            const trx = await idb.startTransaction([idbCard]);
            await idb.deleteAll(trx, idbCard);
            const itemsCard = data[idbCard.getName()];
            if (Array.isArray(itemsCard))
                for (const one of itemsCard) {
                    const dto = idbCard.createDto(one);
                    await idb.create(trx, idbCard, dto);
                }
            await trx.commit();
        };
    }
}
