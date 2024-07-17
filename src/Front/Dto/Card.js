/**
 * Structure the data about a loyalty card.
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Dto_Card';

/**
 * @memberOf Wallet_Front_Dto_Card
 * @type {Object}
 */
const ATTR = {
    CODE: 'code',
    CODE_TYPE: 'codeType',
    COLOR: 'color',
    DATE_CREATED: 'dateCreated',
    DESC: 'desc',
    NAME: 'name',
    UUID: 'uuid',
};

// MODULE'S CLASSES
/**
 * @memberOf Wallet_Front_Dto_Card
 */
class Dto {
    static namespace = NS;
    /**
     * The string representation of the coded data.
     * @type {string}
     */
    code;
    /**
     * The type of the code.
     * @type {string}
     * @see Wallet_Front_Enum_Code_Type
     */
    codeType;
    /**
     * The web code for color in the 'FFFFFF' form.
     * @type {string}
     */
    color;
    /**
     * Date-time when the card was created.
     * @type {Date}
     */
    dateCreated;
    /**
     * Date-time when the card was used at the last time.
     * @type {Date}
     */
    dateLast;
    /**
     * The description for the card.
     * @type {string}
     */
    desc;
    /**
     * The name of the card.
     * @type {string}
     */
    name;
    /**
     * Universally Unique Identifier.
     * @type {string}
     */
    uuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_Meta
 */
export default class Wallet_Front_Dto_Card {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {typeof Wallet_Front_Enum_Code_Type} TYPE
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Wallet_Front_Enum_Code_Type$: TYPE,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Wallet_Front_Dto_Card.Dto} [data]
         * @return {Wallet_Front_Dto_Card.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.code = cast.string(data?.code);
            res.codeType = cast.enum(data?.codeType, TYPE);
            res.color = cast.string(data?.color);
            res.dateCreated = cast.date(data?.dateCreated);
            res.dateLast = cast.date(data?.dateLast);
            res.desc = cast.string(data?.desc);
            res.name = cast.string(data?.name);
            res.uuid = cast.string(data?.uuid);
            return res;
        };

        this.getAttributes = () => ATTR;
    }

}
