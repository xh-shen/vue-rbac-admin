<template>
  <el-drawer
    title="公司信息"
    :visible.sync="visible"
    direction="rtl"
    :size="mobile ? '80%' : '500px'"
  >
    <div class="detail">
      <detail-item
        name="公司名称"
        :value="companyInfo.name"
        :is-edit="isEdit"
        @on-input="onInput($event, 'name')"
      />
      <detail-item
        name="公司电话"
        :value="companyInfo.mobile"
        :is-edit="isEdit"
        @on-input="onInput($event, 'mobile')"
      />
      <detail-item
        name="联系人"
        :value="companyInfo.contacts"
        :is-edit="isEdit"
        @on-input="onInput($event, 'contacts')"
      />
      <detail-item
        name="联系人电话"
        :value="companyInfo.contactsMobile"
        :is-edit="isEdit"
        @on-input="onInput($event, 'contactsMobile')"
      />
      <detail-item
        name="公司邮箱"
        :value="companyInfo.email"
        :is-edit="isEdit"
        @on-input="onInput($event, 'email')"
      />
      <detail-item
        name="公司网址"
        :value="companyInfo.website"
        :is-edit="isEdit"
        @on-input="onInput($event, 'website')"
      />
      <detail-item
        name="地区"
        :value="companyInfo.regionName"
      />
      <detail-item
        name="状态"
        :value="companyInfo.statusName"
      />
      <detail-item
        name="创建时间"
        :value="companyInfo.createdAt"
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
import { editInfo } from '@/api/company';
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
    ...mapGetters(['companyInfo']),
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
      this.model.name = this.companyInfo.name;
      this.model.mobile = this.companyInfo.mobile;
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
