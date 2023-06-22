<template>
  <div class="main">
    <div>
      <router-view />
    </div>
    <van-tabbar v-model="active"  active-color="#0C34BA">
      <van-tabbar-item v-for="(item, index) in tabBarArr" :key="index" :to="item.path">
        <span>{{ item.name }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
    data() {
      return {
        active: 0
      }
    },
    created() {
    },
    computed: {
        tabBarArr(){
            return [
                {
                    name: '首页',
                    icon : {
                        active: require("../assets/images/home_active.png"),
                        inactive: require("../assets/images/home.png"),
                    },
                    path: '/home'
                },
                {
                    name: '菜单',
                    icon : {
                        active: require("../assets/images/menu_active.png"),
                        inactive: require("../assets/images/menu.png"),
                    },
                    path: '/menu'
                },
                {
                    name: '购物袋',
                    icon : {
                        active: require("../assets/images/shopbag_active.png"),
                        inactive: require("../assets/images/shopbag.png"),
                    },
                    path: '/shopbag'
                },
                {
                    name: '我的',
                    icon : {
                        active: require("../assets/images/my_active.png"),
                        inactive: require("../assets/images/my.png"),
                    },
                    path: '/user'
                },
            ]
        }
    }
}
</script>
<style lang="" scoped>

</style>
