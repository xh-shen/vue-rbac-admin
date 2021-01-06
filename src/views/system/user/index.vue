<template>
  <div>
    <search-form
      label-width="80px"
      :model="query"
      :form-cell="searchCell"
      :is-mobile="mobile"
      @on-search="handleSearchSubmit"
    />
    <operation
      title="用户列表"
      :radio-value="null"
      :btn-group="btnGroup"
    />
    <base-table
      ref="baseTable"
      :loading="loading"
      :data="data"
      :columns="columns"
      row-key="id"
      :indent="0"
      :is-mobile="mobile"
      lazy
      default-expand-all
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <pagination
        :total="total"
        :page.sync="query.page"
        :limit.sync="query.limit"
        :is-mobile="mobile"
        @pagination="getList"
      />
    </base-table>
    <form-dialog
      :detail="detail"
      :company-list="companyList"
      :region-list="regionList"
      :is-create="isCreate"
      :detail-loading="detailLoading"
      :visible.sync="dialogVisible"
      @on-success="handleSuccess"
    />
  </div>
</template>

<script>
import { getUserList, getUserDetail, del, delMult, resetPwd } from '@/api/user';
import { getAllRegion, getAllCompany } from '@/api/base.js';
import tableConf from './tableConf';
// import FormDialog from './components/form-dialog'
// import RoleDialog from './components/role-dialog'
export default {
  components: {
    // FormDialog,
    // RoleDialog
    FormDialog: () => import('./components/form-dialog')
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      detailLoading: false,
      isCreate: true,
      data: [],
      ids: [],
      detail: {},
      companyList: [],
      regionList: [],
      columns: [],
      total: 0,
      searchCell: [
        {
          tag: 'input',
          prop: 'keyword',
          width: '300px',
          placeholder: '请输入用户名、单位/公司名称'
        },
        {
          tag: 'select',
          prop: 'status',
          width: '200px',
          placeholder: '请选择状态',
          options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }]
        }
      ],
      query: {
        keyword: '',
        status: null,
        page: 1,
        limit: 20
      },
      btnGroup: [
        {
          tag: 'button',
          plain: true,
          icon: 'el-icon-plus',
          label: '新增用户',
          permission: 'add-user',
          handle: this.handleCreateUser
        }
        // {
        //   tag: 'button',
        //   plain: true,
        //   icon: 'el-icon-plus',
        //   label: '批量删除',
        //   permission: 'mult-del-user',
        //   handle: this.handleMultipleDelUser
        // }
      ]
    };
  },
  // watch: {
  //   roleList (newList) {
  //     this.searchCell[2].options = newList;
  //   }
  // },
  mounted () {
    this.columns = tableConf(this);
    if (this.userInfo && this.userInfo.type === 0) {
      Promise.all([this.getList()]).then(() => {
        this.loading = false;
      });
    } else if (this.userInfo && this.userInfo.type === 1) {
      Promise.all([this.getList(), this.getAllRegion()]).then(() => {
        this.loading = false;
      });
    } else if (this.userInfo && this.userInfo.type === 2) {
      Promise.all([
        this.getList(),
        this.getAllCompany(this.userInfo.gasRegionId)
      ]).then(() => {
        this.loading = false;
      });
    }
  },
  methods: {
    async getList () {
      this.loading = true;
      try {
        const { data } = await getUserList(this.query);
        this.loading = false;
        this.total = data.total;
        this.data = data.list;
        if (this.total > 0 && data.list.length === 0) {
          this.query.page = this.query.page - 1;
          this.getList();
        }
      } catch (error) {
        this.loading = false;
      }
    },
    async getDetail (id) {
      this.detailLoading = true;
      try {
        const { data } = await getUserDetail(id);
        this.detail = data;
        this.detailLoading = false;
      } catch (error) {
        this.detail = {};
        this.detailLoading = false;
      }
    },
    async getAllRegion () {
      const { data } = await getAllRegion();
      this.regionList = data;
    },
    async getAllCompany (regisonId) {
      const { data } = await getAllCompany(regisonId);
      this.companyList = data;
    },
    handleSuccess () {
      this.getList();
    },
    handleCreateUser () {
      this.isCreate = true;
      this.dialogVisible = true;
    },
    async handleDataUpdate (id) {
      this.isCreate = false;
      this.dialogVisible = true;
      await this.getDetail(id);
    },
    handleDataDelete (id) {
      this.$msgbox({
        title: '提示',
        message: '此操作将永久删除该数据, 是否继续?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.showCancelButton = false;
            instance.closeOnClickModal = false;
            instance.confirmButtonText = '删除中...';
            try {
              const { msg } = await del(id);
              this.getList();
              this.$message.success(msg);
              done();
              instance.confirmButtonLoading = false;
            } catch (error) {
              done();
              instance.confirmButtonLoading = false;
            }
          } else {
            done();
          }
        }
      })
        .then(action => {})
        .catch(action => {});
    },
    handleMultipleDelUser () {
      if (this.ids.length === 0) {
        this.$message({
          message: '请选择要删除的数据！',
          type: 'warning'
        });
        return;
      }
      let msg1 = '';
      this.$msgbox({
        title: '提示',
        message: '此操作将永久删除该数据, 是否继续?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.showCancelButton = false;
            instance.closeOnClickModal = false;
            instance.confirmButtonText = '删除中...';
            const { msg } = await delMult(this.ids);
            this.getList();
            msg1 = msg;
            done();
            instance.confirmButtonLoading = false;
          } else {
            done();
          }
        }
      })
        .then(action => {
          this.$message.success(msg1);
        })
        .catch(action => {});
    },
    handleConfirm (msg) {
      return this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
    },
    handleSearchSubmit () {
      this.query.page = 1;
      this.getList();
    },
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.id);
    },
    handleResetPwd (id) {
      let msg1 = '';
      this.$msgbox({
        title: '提示',
        message: '此操作不可逆，密码将会变成原始密码, 是否重置?',
        showCancelButton: true,
        confirmButtonText: '重置',
        cancelButtonText: '取消',
        showClose: false,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.showCancelButton = false;
            instance.closeOnClickModal = false;
            instance.confirmButtonText = '重置中...';
            const { msg } = await resetPwd(id);
            msg1 = msg;
            done();
            instance.confirmButtonLoading = false;
          } else {
            done();
          }
        }
      })
        .then(action => {
          this.$message.success(msg1);
        })
        .catch(action => {});
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/styles/mixin.scss";
.column-title {
  display: block;
  max-width: 100%;
  // color: #337ab7;
  font-weight: normal;
  @include no-wrap;
}
</style>
