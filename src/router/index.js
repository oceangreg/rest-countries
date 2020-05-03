import Vue from 'vue'
import Router from 'vue-router'
import Page1 from '../components/rest-countries'
import Page2 from '../components/single-data'
import VueClazyLoad from 'vue-clazy-load';

Vue.use(Router)
Vue.use(VueClazyLoad);



export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "Index"
            }
        },
        {
            path: '/index',
            name: 'Index',
            component: Page1,
        },
        {
            path: '/single/:countryname',
            name: 'Single',
            component: Page2,
            props:  true 
        },

    ]
})


