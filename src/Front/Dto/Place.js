/**
 * Structure the data about a place where card was used.
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Dto_Place';

/**
 * @memberOf Wallet_Front_Dto_Place
 * @type {Object}
 */
const ATTR = {
    LAT: 'lat',
    LNG: 'lng',
    UUID: 'uuid',
};

// MODULE'S CLASSES
/**
 * @memberOf Wallet_Front_Dto_Place
 */
class Dto {
    static namespace = NS;
    /** @type {number} */
    lat;
    /** @type {number} */
    lng;
    /**
     * Universally Unique Identifier.
     * @type {string}
     */
    uuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_Meta
 */
export default class Wallet_Front_Dto_Place {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Wallet_Front_Dto_Place.Dto} [data]
         * @return {Wallet_Front_Dto_Place.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.lat = cast.decimal(data?.lat);
            res.lng = cast.decimal(data?.lng);
            res.uuid = cast.string(data?.uuid);
            return res;
        };

        /**
         * @return {typeof Wallet_Front_Dto_Place.ATTR}
         */
        this.getAttributes = () => ATTR;
    }

}
