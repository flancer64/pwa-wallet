/**
 * The meta-data for the references between places and cards.
 *
 * @namespace Wallet_Front_Store_IDb_Store_Place_Ref_Card
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Store_IDb_Store_Place_Ref_Card';
/**
 * Object name (unique among all other IDB objects of the app).
 * @type {string}
 */
const NAME = '/place/ref/card';

/**
 * @memberOf Wallet_Front_Store_IDb_Store_Place_Ref_Card
 * @type {Object}
 */
const ATTR = {
    CARD_REF: 'cardRef',
    PLACE_REF: 'placeRef',
    USAGES: 'usages',
};

/**
 * @memberOf Wallet_Front_Store_IDb_Store_Place_Ref_Card
 */
const INDEX = {};

/**
 * @memberOf Wallet_Front_Store_IDb_Store_Place_Ref_Card
 */
class Dto {
    static namespace = NS;
    /**
     * The reference to the related card.
     * @type {number}
     */
    cardRef;
    /**
     * The reference to the related place.
     * @type {number}
     */
    placeRef;
    /**
     * The number of the card usages in the place.
     * @type {number}
     */
    usages;
}

/**
 * @implements TeqFw_Web_Front_Api_Store_IEntity
 */
export default class Wallet_Front_Store_IDb_Store_Place_Ref_Card {
    /**
     * @param {Wallet_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            Wallet_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // VARS

        // MAIN
        /**
         * @param {Wallet_Front_Store_IDb_Store_Place_Ref_Card.Dto} [data]
         * @return {Wallet_Front_Store_IDb_Store_Place_Ref_Card.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            res.cardRef = cast.int(data?.cardRef);
            res.placeRef = cast.int(data?.placeRef);
            res.usages = cast.int(data?.usages);
            return res;
        };

        this.getName = () => `${DEF.SHARED.NAME}${NAME}`;

        /**
         * @return {typeof Wallet_Front_Store_IDb_Store_Place_Ref_Card.ATTR}
         */
        this.getAttributes = () => ATTR;


        this.getKeysForIndex = function (index) {
            // if (index === INDEX.BY_REFS) return [ATTR.PLACE_REF, ATTR.CARD_REF];
            return this.getPrimaryKey();
        };

        /**
         * @return {typeof Wallet_Front_Store_IDb_Store_Place_Ref_Card.INDEX}
         */
        this.getIndexes = () => INDEX;

        this.getPrimaryKey = () => [ATTR.PLACE_REF, ATTR.CARD_REF];
    }


}
