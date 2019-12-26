import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import {
    VApp,
    VCard,
    VTimePicker
    /* other imports ... */
} from "vuetify";
// import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
    components: {
        VApp,
        VCard,
        VTimePicker
       /* other imports */
    },
    /* theme option */
});

export default new Vuetify({
});
