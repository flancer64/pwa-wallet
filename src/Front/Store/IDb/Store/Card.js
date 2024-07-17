/**
 * The meta-data for the card data store in IDB.
 *
 * @namespace Wallet_Front_Store_IDb_Store_Card
 */
// MODULE'S VARS
/**
 * Object name (unique among all other IDB objects of the app).
 * @type {string}
 */
const NAME = '/card';

/**
 * @memberOf Wallet_Front_Store_IDb_Store_Card
 */
const INDEX = {
    BY_DATE_LAST: 'byDateLast',
};

/**
 * @implements TeqFw_Web_Front_Api_Store_IEntity
 */
export default class Wallet_Front_Store_IDb_Store_Card {
    /**
     * @param {Wallet_Front_Defaults} DEF
     * @param {Wallet_Front_Dto_Card} dto
     */
    constructor(
        {
            Wallet_Front_Defaults$: DEF,
            Wallet_Front_Dto_Card$: dto,
        }
    ) {
        // VARS
        const ATTR = dto.getAttributes();

        // MAIN
        /**
         * @param {Wallet_Front_Dto_Card.Dto} [data]
         * @return {Wallet_Front_Dto_Card.Dto}
         */
        this.createDto = dto.createDto;

        this.getName = () => `${DEF.SHARED.NAME}${NAME}`;

        /**
         * @return {typeof Wallet_Front_Dto_Card.ATTR}
         */
        this.getAttributes = () => ATTR;


        this.getKeysForIndex = function (index) {
            if (index === INDEX.BY_DATE_LAST) return [ATTR.DATE_LAST];
            return this.getPrimaryKey();
        };

        /**
         * @return {typeof Wallet_Front_Store_IDb_Store_Card.INDEX}
         */
        this.getIndexes = () => INDEX;

        this.getPrimaryKey = () => [ATTR.UUID];
    }


}
