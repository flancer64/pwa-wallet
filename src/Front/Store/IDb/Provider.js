/**
 * IDB for the application.
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Store_IDb_Provider';
const IDB_VERSION = 3;

/**
 * Factory to create connector to application level IDB.
 *
 * @param {TeqFw_Web_Front_App_Store_IDB} idb -  new instance
 * @param {Wallet_Front_Store_IDb_Store_Card} idbCard
 * @param {Wallet_Front_Store_IDb_Store_Place} idbPlace
 * @param {typeof Wallet_Front_Enum_Code_Type} TYPE
 *
 * @return {TeqFw_Web_Front_App_Store_IDB}
 */
export default function (
    {
        TeqFw_Web_Front_App_Store_IDB$$: idb,
        Wallet_Front_Store_IDb_Store_Card$: idbCard,
        Wallet_Front_Store_IDb_Store_Place$: idbPlace,
        Wallet_Front_Enum_Code_Type$: TYPE,
    }
) {
    // VARS
    const CARD_ATTRS = idbCard.getAttributes();
    const CARD_INDEX = idbCard.getIndexes();
    const CARD_NAME = idbCard.getName();
    const CARD_PK = idbCard.getPrimaryKey();
    const PLACE_ATTRS = idbPlace.getAttributes();
    const PLACE_INDEX = idbPlace.getIndexes();
    const PLACE_NAME = idbPlace.getName();
    const PLACE_PK = idbPlace.getPrimaryKey();

    // FUNCS
    /**
     * Factory to pin 'db' in the scope and create function to upgrade DB structure on opening.
     * @param {IDBDatabase} db
     * @return {Promise<void>}
     */
    async function fnUpgradeDb(db) {
        // VARS
        const autoIncrement = true;
        const multiEntry = true;
        const unique = true;

        // MAIN
        // /card
        {
            if (db.objectStoreNames.contains(CARD_NAME)) {
                // TODO: we need none-destructive method to re-create structure of the store
                db.deleteObjectStore(CARD_NAME);
            }
            const store = db.createObjectStore(CARD_NAME, {keyPath: CARD_PK[0]});
            store.createIndex(CARD_INDEX.BY_DATE_LAST, CARD_ATTRS.DATE_LAST, {unique: false});
        }
        // /place
        {
            if (db.objectStoreNames.contains(PLACE_NAME)) {
                // TODO: we need none-destructive method to re-create structure of the store
                db.deleteObjectStore(PLACE_NAME);
            }
            const store = db.createObjectStore(PLACE_NAME, {keyPath: PLACE_PK[0]});
            const byGeo = PLACE_INDEX.BY_GEO;
            store.createIndex(byGeo, idbPlace.getKeysForIndex(byGeo), {unique});
        }
    }

    // MAIN
    const dbName = NS.replace('_IDb_Provider', '');
    idb.setStores([idbCard]);
    idb.init(dbName, IDB_VERSION, fnUpgradeDb);

    return idb;
}
