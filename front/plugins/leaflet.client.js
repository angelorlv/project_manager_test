import { LMap, LTileLayer, LMarker, LIcon,LPopup,LCircle,LGeoJson,LPolyline  } from '@vue-leaflet/vue-leaflet'

//'@vue-leaflet/vue-leaflet'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('l-map', LMap);
    nuxtApp.vueApp.component('l-tile-layer', LTileLayer);
    nuxtApp.vueApp.component('l-marker', LMarker);
    nuxtApp.vueApp.component('l-icon', LIcon);
    nuxtApp.vueApp.component('l-popup', LPopup);
    nuxtApp.vueApp.component('l-circle', LCircle);
    nuxtApp.vueApp.component('LGeoJson', LGeoJson)
    nuxtApp.vueApp.component('LPolyline', LPolyline)
})