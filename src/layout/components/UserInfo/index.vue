<template>
  <el-drawer
    title="个人信息"
    :visible.sync="visible"
    direction="rtl"
    :size="mobile ? '80%' : '500px'"
  >
    <div class="detail">
      <detail-item
        name="用户名"
        :value="userInfo.username"
      />
      <detail-item
        name="单位/公司名称"
        :value="userInfo.name || userInfo.companyName"
        :is-edit="(userInfo.type === 1 || userInfo.type === 2) ?isEdit : false"
        @on-input="onInput($event, 'name')"
      />
      <detail-item
        name="手机号"
        :value="userInfo.phone"
        :is-edit="isEdit"
        @on-input="onInput($event, 'phone')"
      />
      <detail-item
        v-if="userInfo.type === 2 || userInfo.type === 3"
        name="地区"
        :value="userInfo.regionName"
      />
      <detail-item
        name="角色"
        :value="userInfo.roleName"
      />
      <detail-item
        name="状态"
        :value="userInfo.statusName"
      />
      <detail-item
        name="创建时间"
        :value="userInfo.createdAt"
      />
      <div class="btn">
        <template v-if="!isEdit">
          <el-button
            type="primary"
            @click="isEdit = true"
          >
            编辑
          </el-button>
        </template>
        <template v-else>
          <el-button
            type="primary"
            :loading="isSubmiting"
            @click="submitForm"
          >
            {{ isSubmiting ? '提交中...' : '提交' }}
          </el-button>
          <el-button
            :disabled="isSubmiting"
            @click="isEdit = false"
          >取 消</el-button>
        </template>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { editInfo } from '@/api/user';
import { mapGetters } from 'vuex';
import DetailItem from './item';
export default {
  components: { DetailItem },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isSubmiting: false,
      isEdit: false,
      model: {
        name: '',
        phone: ''
      }
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    visible: {
      get () {
        return this.show;
      },
      set (val) {
        this.$emit('update:show', val);
      }
    }
  },
  watch: {
    isEdit () {
      this.model.name = this.userInfo.name;
      this.model.phone = this.userInfo.phone;
    }
  },
  methods: {
    async submitForm () {
      this.isSubmiting = true;
      try {
        const { msg } = await editInfo(this.model);
        await this.$store.dispatch('user/userInfo');
        this.$message.success(msg);
        this.isSubmiting = false;
        this.isEdit = false;
      } catch (error) {
        this.isSubmiting = false;
      }
    },
    onInput (value, key) {
      this.model[key] = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  padding-left: 20px;
  margin-top: 20px;
}
</style>
