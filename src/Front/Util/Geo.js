/**
 * This is a set of pure functions to handle geo data.
 */
export default class Wallet_Front_Util_Geo {
    /**
     * @param {Wallet_Front_Dto_Geo} dtoGeo
     */
    constructor(
        {
            Wallet_Front_Dto_Geo$: dtoGeo,
        }
    ) {
        /**
         * Round the geolocation position up to 'meters'.
         * @param {GeolocationPosition} position
         * @param {number} meters accuracy in meters
         * @return {Wallet_Front_Dto_Geo.Dto}
         */
        this.roundPosition = function (position, meters) {
            // Calculate the number of decimal places needed
            const metersPerDegree = 111000; // Approximate meters per degree at the equator
            const decimalPlaces = Math.log10(metersPerDegree / meters);
            const factor = Math.pow(10, Math.floor(decimalPlaces));
            const res = dtoGeo.createDto();
            res.lat = Math.round(position.coords.latitude * factor) / factor;
            res.lng = Math.round(position.coords.longitude * factor) / factor;
            return res;
        };
    }

    /**
     * Wrapper for Geolocation API to use options in the calls.
     * @return {Promise<GeolocationPosition>}
     */
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {});
        });

    }
}
