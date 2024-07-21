/**
 * The geo coordinates data.
 */
// MODULE'S VARS
const NS = 'Wallet_Front_Dto_Geo';

// MODULE'S CLASSES
/**
 * @memberOf Wallet_Front_Dto_Geo
 */
class Dto {
    static namespace = NS;
    /** @type {number} */
    lat;
    /** @type {number} */
    lng;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Wallet_Front_Dto_Geo {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Wallet_Front_Dto_Geo.Dto} [data]
         * @return {Wallet_Front_Dto_Geo.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.lat = cast.decimal(data?.lat);
            res.lng = cast.decimal(data?.lng);
            return res;
        };
    }
}
