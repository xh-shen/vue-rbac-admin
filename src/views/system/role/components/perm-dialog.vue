<template>
  <el-dialog
    :title="`${name}-授权`"
    :width="mobile ? '90%' : width"
    :top="mobile ? '5vh' : '15vh'"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="dialogVisible"
  >
    <el-row :gutter="20">
      <el-col :span="mobile ? 24 : 8">
        <el-card
          class="box-card"
          :style="{ marginBottom: mobile ? '10px' : '0px' }"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>菜单权限</span>
          </div>
          <div class="box-card-body">
            <el-tree
              v-loading="detailLoading"
              ref="menuTree"
              :data="menuList"
              node-key="gasPermissionId"
              show-checkbox
              default-expand-all
              @check="handleMenuChange"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="mobile ? 24 : 8">
        <el-card
          class="box-card"
          :style="{ marginBottom: mobile ? '10px' : '0px' }"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>元素权限</span>
          </div>
          <div class="box-card-body">
            <el-tree
              v-loading="detailLoading"
              ref="elementTree"
              :data="elementList"
              node-key="gasPermissionId"
              show-checkbox
              default-expand-all
              @check="handleElemetChange"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="mobile ? 24 : 8">
        <el-card
          class="box-card"
          :style="{ marginBottom: mobile ? '10px' : '0px' }"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>接口权限</span>
          </div>
          <div class="box-card-body">
            <el-tree
              v-loading="detailLoading"
              ref="apiTree"
              :data="apiList"
              node-key="gasPermissionId"
              show-checkbox
              default-expand-all
              @check="handleApiChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div slot="footer">
      <el-button
        :disabled="isSubmiting"
        @click="handleClose"
      >取 消</el-button>
      <el-button
        type="primary"
        :loading="isSubmiting"
        @click="submitForm"
      >{{ isSubmiting ? '提交中...' : '提交' }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { setPermission } from '@/api/role';
import { toSelectTree, arrayGroup } from '@/utils/common';
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailLoading: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '1000px'
    },
    treeInfo: {
      type: Object,
      default () {
        return {};
      }
    },
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isSubmiting: false,
      permissionIds: [],
      menuSelectIds: [],
      menuSelect: [],
      elementSelect: [],
      apiSelect: []
    };
  },
  watch: {
    treeInfo (newList) {
      if (newList.menus) {
        this.$nextTick(() => {
          this.$refs.menuTree.setCheckedKeys(newList.menus.selected);
          this.$refs.elementTree.setCheckedKeys(newList.elements.selected);
          this.$refs.apiTree.setCheckedKeys(newList.apis.selected);
          this.menuSelect = newList.menus.selected;
          this.menuSelectIds = this.treeInfo.menus.list
            .filter(item => this.menuSelect.includes(item.gasPermissionId))
            .map(item => item.id);
          this.elementSelect = newList.elements.selected;
          this.apiSelect = newList.apis.selected;
        });
      }
    },
    visible (newVal) {
      if (!newVal) {
        this.$refs.menuTree.setCheckedKeys([]);
        this.$refs.elementTree.setCheckedKeys([]);
        this.$refs.apiTree.setCheckedKeys([]);
      }
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.visible;
      },
      set (val) {
        this.$emit('update:visible', val);
      }
    },
    menuList () {
      let list = this.treeInfo.menus
        ? toSelectTree(this.treeInfo.menus.list)
        : [];
      return [
        {
          gasPermissionId: 0,
          label: '全部',
          children: [...list]
        }
      ];
    },
    elementList () {
      let list = this.treeInfo.elements
        ? this.treeInfo.elements.list.filter(item =>
          this.menuSelectIds.includes(item.gasMenuId)
        )
        : [];
      return [
        {
          gasPermissionId: 0,
          label: '全部',
          children: [...arrayGroup(list, 'gasMenuId')]
        }
      ];
    },
    apiList () {
      let list = this.treeInfo.apis
        ? this.treeInfo.apis.list.filter(
          item =>
            this.menuSelectIds.includes(item.gasMenuId) ||
              item.gasMenuId === 0
        )
        : [];
      return [
        {
          gasPermissionId: 0,
          label: '全部',
          children: [...arrayGroup(list, 'gasMenuId')]
        }
      ];
    }
  },
  methods: {
    async submitForm () {
      // this.isSubmiting = true
      this.permissionIds = [
        ...this.$refs.menuTree.getCheckedKeys(),
        ...this.$refs.menuTree.getHalfCheckedKeys(),
        ...this.$refs.elementTree.getCheckedKeys(),
        ...this.$refs.apiTree.getCheckedKeys()
      ];
      this.permissionIds = this.permissionIds.filter(item => !!item);
      try {
        const { msg } = await setPermission(this.id, {
          permissionIds: this.permissionIds
        });
        this.$message.success(msg);
        this.isSubmiting = false;
        this.handleClose();
      } catch (error) {
        this.isSubmiting = false;
      }
    },
    handleClose () {
      this.dialogVisible = false;
    },
    handleMenuChange (data, { checkedKeys, halfCheckedKeys }) {
      this.menuSelect = [...checkedKeys, ...halfCheckedKeys];
      this.menuSelectIds = this.treeInfo.menus.list
        .filter(item => this.menuSelect.includes(item.gasPermissionId))
        .map(item => item.id);
      this.$refs.elementTree.setCheckedKeys(
        this.elementSelect.filter(item => !!item)
      );
      this.$refs.apiTree.setCheckedKeys(this.apiSelect.filter(item => !!item));
    },
    handleElemetChange (data, { checkedKeys }) {
      this.elementSelect = checkedKeys;
    },
    handleApiChange (data, { checkedKeys }) {
      this.apiSelect = checkedKeys;
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  display: flex;
  flex: 1;
  .txt {
    flex: 1;
    span {
      color: #ccc;
    }
  }
  .tip {
    flex: 0 0 100px;
    text-align: right;
  }
}
.box-card-body {
  height: 300px;
  overflow: auto;
}
</style>
