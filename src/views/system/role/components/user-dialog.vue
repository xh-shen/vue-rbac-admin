<template>
  <el-dialog
    title="关联用户"
    :width="mobile ? '90%' : width"
    :top="mobile ? '5vh' : '15vh'"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="dialogVisible"
  >
    <el-checkbox-group
      v-loading="detailLoading"
      v-model="model.userIds"
      size="mini"
    >
      <el-checkbox
        v-for="item in userList"
        :label="item.id"
        border
        :key="item.id"
      >{{ item.username }}-{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <div slot="footer">
      <el-button
        :disabled="isSubmiting"
        @click="handleClose"
      >取 消</el-button>
      <el-button
        type="primary"
        :loading="isSubmiting"
        @click="submitForm"
      >
        {{ isSubmiting ? '提交中...' : '提交' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { setUser } from '@/api/role';
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
      default: '800px'
    },
    userList: {
      type: Array,
      default () {
        return [];
      }
    },
    detail: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      isSubmiting: false,
      model: {
        userIds: [],
        name: ''
      }
    };
  },
  computed: {
    dialogVisible: {
      get () {
        return this.visible;
      },
      set (val) {
        this.$emit('update:visible', val);
      }
    }
  },
  watch: {
    detail (newObj, oldObj) {
      if (this.visible && newObj.id) {
        Object.keys(this.model).forEach(key => {
          this.model[key] = newObj[key];
        });
      }
    }
  },
  methods: {
    async submitForm () {
      this.isSubmiting = true;
      try {
        const { msg } = await setUser(this.detail.id, this.model);
        this.$message.success(msg);
        this.isSubmiting = false;
        this.handleClose();
        this.$emit('on-success');
      } catch (error) {
        this.isSubmiting = false;
      }
    },
    handleClose () {
      this.dialogVisible = false;
    }
  }
};
</script>
