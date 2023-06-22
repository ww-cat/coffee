import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import axiosVue from 'vue-axios'
import { Icon, Swipe, SwipeItem, Tabbar, TabbarItem, Search,GoodsAction, GoodsActionIcon, GoodsActionButton, Stepper,
  SubmitBar, Field, ActionSheet, Button, AddressList, AddressEdit, Toast, Checkbox, CheckboxGroup , Dialog, Popup, Card,
  NavBar, Tab, Tabs, Empty, Uploader } from 'vant'

Vue.use(Icon).use(Swipe).use(SwipeItem).use(Tabbar).use(TabbarItem).use(Search).use(GoodsAction)
    .use(GoodsActionIcon).use(GoodsActionButton).use(Stepper).use(SubmitBar).use(Field).use(ActionSheet)
    .use(Button).use(AddressList).use(AddressEdit).use(Toast).use(Checkbox).use(CheckboxGroup).use(Dialog).use(Popup)
    .use(Card).use(NavBar).use(Tab).use(Tabs).use(Empty).use(Uploader);
Vue.use(axiosVue, axios)
Vue.config.productionTip = false
Vue.prototype.$appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
