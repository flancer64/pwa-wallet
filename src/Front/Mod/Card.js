/**
 * Model to encapsulate functionality related to the card.
 */
export default class Wallet_Front_Mod_Card {
    /**
     * @param {Wallet_Front_Util_Geo} utilGeo
     * @param {TeqFw_Web_Front_App_Store_IDB} idb
     * @param {Wallet_Front_Store_IDb_Store_Card} idbCard
     * @param {Wallet_Front_Store_IDb_Store_Place} idbPlace
     * @param {Wallet_Front_Store_IDb_Store_Place_Ref_Card} idbRefCard
     * @param {Wallet_Front_Mod_App_Config} modConfig
     * @param {Wallet_Front_Mod_Notify} modNotify
     */
    constructor(
        {
            Wallet_Front_Util_Geo$: utilGeo,
            Wallet_Front_Store_IDb_Provider$: idb,
            Wallet_Front_Store_IDb_Store_Card$: idbCard,
            Wallet_Front_Store_IDb_Store_Place$: idbPlace,
            Wallet_Front_Store_IDb_Store_Place_Ref_Card$: idbRefCard,
            Wallet_Front_Mod_App_Config$: modConfig,
            Wallet_Front_Mod_Notify$: modNotify,
        }
    ) {
        // VARS
        const INDEX = idbCard.getIndexes();

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
            const res = await idb.deleteOne(trx, idbCard, dto.id);
            await trx.commit();
            return res;
        };

        /**
         * Read all cards from IDB and order the list (by geo position or by the last date).
         * @returns {Promise<Wallet_Front_Dto_Card.Dto[]>}
         */
        this.readList = async function () {
            // FUNCS
            /**
             * Read all cards from IDB.
             * @return {Promise<Wallet_Front_Dto_Card.Dto[]>}
             */
            async function readCards() {
                const trx = await idb.startTransaction([idbCard]);
                const res = await idb.readSet(trx, idbCard);
                trx.commit();
                return res;
            }

            /**
             * Read all places from IDB.
             * @return {Promise<Wallet_Front_Dto_Place.Dto[]>}
             */
            async function readPlaces() {
                const trx = await idb.startTransaction([idbPlace]);
                /** @type {Wallet_Front_Dto_Place.Dto[]} */
                const res = await idb.readSet(trx, idbPlace);
                trx.commit();
                return res;
            }

            /**
             * Read all places-to-cards references from IDB and compose 'byPlaceId' map.
             * @return {Promise<Object<number, Wallet_Front_Store_IDb_Store_Place_Ref_Card.Dto[]>>}
             */
            async function readRefs() {
                const trx = await idb.startTransaction([idbRefCard]);
                /** @type {Wallet_Front_Store_IDb_Store_Place_Ref_Card.Dto[]} */
                const refs = await idb.readSet(trx, idbRefCard);
                trx.commit();
                /** @type {Object<number, Wallet_Front_Store_IDb_Store_Place_Ref_Card.Dto[]>} */
                const res = {};
                for (const ref of refs) {
                    const placeRef = ref.placeRef;
                    if (!res[placeRef]) res[placeRef] = [];
                    res[placeRef].push(ref);
                }
                return res;
            }

            // MAIN
            const res = [];
            try {
                // read all cards in a separate transaction because there is asynchronous nested call (getCurrentPosition)
                const cards = await readCards();
                if (modConfig.getCanUseGeoApi()) {
                    const curPos = await utilGeo.getCurrentPosition();
                    /** @type {Wallet_Front_Dto_Place.Dto[]} */
                    const places = await readPlaces();
                    if (places.length) {
                        /** @type {Object<number, Wallet_Front_Store_IDb_Store_Place_Ref_Card.Dto[]>} */
                        const mapPlace = await readRefs();
                        const distances = [];
                        for (const place of places) {
                            const placeRef = place.id;
                            const dist = utilGeo.calcDistance(curPos.lat, curPos.lng, place.lat, place.lng);
                            const refs = mapPlace[placeRef];
                            const entry = {placeRef, dist, refs};
                            distances.push(entry);
                        }
                        // map used cards by distance
                        const MAX = 999999;
                        const mapCardsUsed = {};
                        for (const item of distances) {
                            const dist = item.dist;
                            /** @type {Wallet_Front_Store_IDb_Store_Place_Ref_Card.Dto[]} */
                            const refs = item.refs;
                            for (const one of refs) {
                                const cardRef = one.cardRef;
                                if (!mapCardsUsed[cardRef]) mapCardsUsed[cardRef] = MAX;
                                if (dist < mapCardsUsed[cardRef]) mapCardsUsed[cardRef] = dist;
                            }
                        }
                        // sort the cards by the distance of usage
                        cards.sort((a, b) => {
                            const distA = (mapCardsUsed[a.id]) ?? MAX;
                            const distB = (mapCardsUsed[b.id]) ?? MAX;
                            return (distA < distB) ? -1 : (distA === distB) ? 0 : 1;
                        });
                    } else {
                        // just sort the cards by the last date (desc)
                        cards.sort((a, b) => {
                            return (a?.dateLast > b?.dateLast) ? -1 : 1;
                        });
                    }
                } else {
                    // just sort the cards by the last date (desc)
                    cards.sort((a, b) => {
                        return (a?.dateLast > b?.dateLast) ? -1 : 1;
                    });
                }
                res.push(...cards);
            } catch (e) {
                modNotify.negative(e.message);
            }
            return res;
        };

        /**
         * Read one card from IDB.
         * @param {number} id
         * @returns {Promise<Wallet_Front_Dto_Card.Dto>}
         */
        this.readOne = async function ({id}) {
            const trx = await idb.startTransaction([idbCard]);
            const res = await idb.readOne(trx, idbCard, id);
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
