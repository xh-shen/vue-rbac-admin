import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);
const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    // scrollBehavior (to, from, savedPosition) {
    //   if (savedPosition && to.name !== from.name) {
    //     return new Promise(resolve => {
    //       this.app.$root.$once('restoreSavedScroll', () => {
    //         this.app.$root.$nextTick(() => resolve(savedPosition));
    //       });
    //     });
    //   }
    // },
    routes
  });

export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

const router = createRouter();

export default router;
