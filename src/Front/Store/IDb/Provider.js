/**
 * IDB for the application.
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Store_IDb_Provider';
const IDB_VERSION = 1;

/**
 * Factory to create connector to application level IDB.
 *
 * @param {TeqFw_Web_Front_App_Store_IDB} idb -  new instance
 * @param {Wallet_Front_Store_IDb_Store_Card} idbCard
 * @param {typeof Wallet_Front_Enum_Code_Type} TYPE
 *
 * @return {TeqFw_Web_Front_App_Store_IDB}
 */
export default function (
    {
        TeqFw_Web_Front_App_Store_IDB$$: idb,
        Wallet_Front_Store_IDb_Store_Card$: idbCard,
        Wallet_Front_Enum_Code_Type$: TYPE,
    }
) {
    // VARS
    const CARD_ATTRS = idbCard.getAttributes();
    const CARD_INDEX = idbCard.getIndexes();
    const CARD_NAME = idbCard.getName();
    const CARD_PK = idbCard.getPrimaryKey();
    const TEST_ITEMS = [
        {code: 'D01665588618060', codeType: TYPE.CODE_128, name: 'Maxima'},
        {code: 'D01665588618060', codeType: TYPE.CODE_39, name: 'Code 39'},
        {code: 'D01665588618060', codeType: TYPE.CODE_93, name: 'Code 93'},
    ];

    // FUNCS
    /**
     * Factory to pin 'db' in the scope and create function to upgrade DB structure on opening.
     * @param {IDBDatabase} db
     * @return {(function(*): void)|*}
     */
    function fnUpgradeDb(db) {
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
            // insert test data
            for (const one of TEST_ITEMS) {
                /** @type {Wallet_Front_Dto_Card.Dto} */
                const dto = idbCard.createDto(one);
                dto.dateCreated = new Date();
                dto.uuid = self.crypto.randomUUID();
                store.add(dto);
            }

        }
    }

    // MAIN
    const dbName = NS.replace('_IDb_Provider', '');
    idb.setStores([idbCard]);
    idb.init(dbName, IDB_VERSION, fnUpgradeDb);

    return idb;
}
