<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-if="routerName !== 'dashboard'"
        :key="routerName"
      >
        <a
          class="home"
          @click.prevent="handleLink('dashboard')"
        >首页</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="`${item}-${index}`"
      >
        <span class="no-redirect">{{ item }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex';
const { body } = document;
const WIDTH = 992;
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      levelList: null,
      menus: [],
      routerName: ''
    };
  },
  computed: {
    ...mapGetters(['sourceMenus'])
  },
  watch: {
    $route (route) {
      this.routerName = route.name;
      this.getBreadcrumb();
    }
  },
  created () {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb () {
      let name = this.$route.name;
      let menu = this.sourceMenus.find(item => item.code === name);
      this.menus = [];
      if (menu) {
        this.findParent(menu);
        this.levelList = this.menus
          .filter(item => item.breadcrumb !== false)
          .map(item => item.name);
      } else {
        this.levelList = this.$route.matched
          .filter(
            item =>
              item.meta && item.meta.title && item.meta.breadcrumb !== false
          )
          .map(item => item.meta.title);
      }
      let length = this.levelList.length;
      if (this.$_isMobile() && length > 2) {
        this.levelList = [this.levelList[0], this.levelList[length - 1]];
      }
    },
    findParent (menu) {
      if (menu) {
        let parent = this.sourceMenus.find(item => item.id === menu.pid);
        this.findParent(parent);
        this.menus.push(menu);
      }
    },
    $_isMobile () {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    handleLink (name) {
      this.$router.push({ name });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .home {
    color: #b9b9b9;
    font-size: 12px;
    &:hover {
      color: #e9e9e9;
    }
  }
  .no-redirect {
    color: #b0b0b0;
    cursor: text;
    font-size: 12px;
  }
}
</style>
