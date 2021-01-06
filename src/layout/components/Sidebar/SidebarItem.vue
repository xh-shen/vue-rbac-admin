<template>
  <div
    v-if="!item.hidden"
    class="menu-wrapper"
  >
    <template v-if="hasOneShowingChild(item.children,item)">
      <app-link :to="onlyOneChild.path">
        <el-menu-item
          :index="onlyOneChild.path"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            :icon="onlyOneChild.icon||item.icon"
            :title="onlyOneChild.name"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="itemPath"
      popper-append-to-body
    >
      <template slot="title">
        <item
          :icon="item.icon"
          :title="item.name"
        />
      </template>
      <sidebar-item
        v-for="(child, index) in item.children"
        :key="index"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import Item from './Item';
import AppLink from './Link';
import FixiOSBug from './FixiOSBug';

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemPath () {
      return this.item.path === '/'
        ? this.item.path + this.item.code
        : this.item.path;
    }
  },
  data () {
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter((item, index) => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          if (item.path === '/' && item.code) {
            this.onlyOneChild.path = item.path + item.code;
          }
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = parent;
        if (parent.path === '/' && parent.code) {
          this.onlyOneChild.path = parent.path + parent.code;
        }
        return true;
      }
      return false;
    }
  }
};
</script>
