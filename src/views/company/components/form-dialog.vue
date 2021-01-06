<template>
  <el-dialog
    :title="title"
    :width="mobile ? '90%' : width"
    :top="mobile ? '5vh' : '15vh'"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="dialogVisible"
  >
    <base-form
      v-loading="detailLoading"
      ref="form"
      :model="model"
      :schema="schema"
      :is-mobile="mobile"
    />
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
import { create, update } from '@/api/company';
import formConf from '../formConf';
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
    isCreate: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '800px'
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
      model: formConf(this).model,
      schema: formConf(this).schema
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
    },
    title () {
      return this.isCreate ? '新增公司' : '编辑公司';
    }
  },
  watch: {
    visible (newVal) {
      if (newVal) {
        this.model = formConf(this).model;
        this.schema = formConf(this).schema;
      }
    },
    detail (newObj, oldObj) {
      if (!this.isCreate && this.visible && newObj.id) {
        Object.keys(this.model).forEach(key => {
          this.model[key] = newObj[key];
        });
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form
        .submitForm()
        .then(async () => {
          this.isSubmiting = true;
          try {
            let res = null;
            if (this.isCreate) {
              res = await create(this.model);
            } else {
              res = await update(this.detail.id, this.model);
            }
            this.$message.success(res.msg || '编辑成功');
            this.isSubmiting = false;
            this.handleClose();
            this.$emit('on-success');
          } catch (error) {
            this.isSubmiting = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClose () {
      this.$refs.form.resetForm();
      this.dialogVisible = false;
    }
  }
};
</script>
