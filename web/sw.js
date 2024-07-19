/**
 * Service worker to provide minimal PWA capabilities (installation only).
 */
'use strict';
// MODULE'S IMPORT
import {bypassCache as bypassWeb, getFromCacheOrFetchAndCache} from './web/@teqfw/web/js/sw/fetch.mjs';

// VARS
// Cache store name to save static resources
const CACHE_STATIC = 'static-cache-v1';
const UUID = `sw-${self.crypto.randomUUID()}`; // UUID for every runtime instance

// FUNCS
/**
 * The log function for this Service Worker.
 * @param msg
 */
const log = function (msg) {
    console.log(`${UUID}: ${msg}`);
};

/**
 * Return static resource from cache (if exists) or fetch from network.
 * @param {FetchEvent} event
 */
function onFetch(event) {
    // don't cache if any bypasses exist.
    const request = event.request;
    const bypass = bypassWeb(request);
    if (bypass === false) {
        const useCache = async () => {
            const cache = await self.caches.open(CACHE_STATIC);
            return await getFromCacheOrFetchAndCache(request, cache);
        };
        event.respondWith(useCache());
    } else log(`SW bypass: ${request.url}`);
}

/**
 * Load and store required static resources on installation (./web/, ./src/Front/, ./src/Shared/).
 * @see TeqFw_Web_Back_App_Server_Handler_Config_A_SwCache
 *
 * @param {ExtendableEvent} evt
 */
function onInstall(evt) {
    const cacheStaticFiles = async function () {
        const [firstWindow] = await self.clients.matchAll({includeUncontrolled: true});
        // await loadZipToCache(CACHE_STATIC, firstWindow, log);
    };
    evt.waitUntil(cacheStaticFiles());
}

// MAIN
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', onFetch);
// self.addEventListener('install', onInstall);
