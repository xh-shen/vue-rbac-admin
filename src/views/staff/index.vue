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
      title="员工列表"
      :radio-value="null"
      :btn-group="btnGroup"
    />
    <base-table
      ref="baseTable"
      :loading="loading"
      :data="data"
      :columns="columns"
      row-key="id"
      :is-mobile="mobile"
      highlight-current-row
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
      :is-create="isCreate"
      :detail-loading="detailLoading"
      :visible.sync="dialogVisible"
      @on-success="handleSuccess"
    />
    <view-dialog
      :title="name"
      :url="photo"
      :visible.sync="viewVisible"
    />
  </div>
</template>

<script>
import { getList, getDetail, del, exportStaff } from '@/api/staff';
import { getAllRegion, getAllCompany } from '@/api/base';
import { uploadExcelImportStaff } from '@/api/upload';
import tableConf from './tableConf';
import FormDialog from './components/form-dialog';
import ViewDialog from './components/view-dialog';
export default {
  components: {
    FormDialog,
    ViewDialog
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      viewVisible: false,
      detailLoading: false,
      isCreate: true,
      data: [],
      ids: [],
      detail: {},
      companyList: [],
      regionList: [],
      columns: [],
      total: 0,
      name: '',
      photo: '',
      searchCell: [
        {
          tag: 'input',
          prop: 'keyword',
          width: '300px',
          placeholder: '请输入姓名、身份证号、手机号'
        },
        {
          tag: 'select',
          prop: 'gasRegionId',
          width: '200px',
          placeholder: '请选择地区',
          options: [],
          listeners: {
            change: this.handleRegionChange
          },
          hidden: false
        },
        {
          tag: 'select',
          prop: 'gasCompanyId',
          width: '200px',
          placeholder: '请选择公司',
          options: [],
          hidden: false
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
        gasRegionId: null,
        gasCompanyId: null,
        limit: 20
      },
      exportQuery: {
        keyword: '',
        status: null,
        page: 1,
        gasRegionId: null,
        gasCompanyId: null,
        limit: 20
      },
      btnGroup: [
        {
          tag: 'button',
          plain: true,
          icon: 'el-icon-plus',
          label: '导出员工',
          loading: false,
          permission: 'export-staff',
          handle: this.handleExportData
        },
        // {
        //   tag: 'button',
        //   plain: true,
        //   icon: 'el-icon-plus',
        //   label: '导入员工',
        //   handle: this.handleImportStaff
        // },
        {
          tag: 'button',
          plain: true,
          icon: 'el-icon-plus',
          label: '新增员工',
          permission: 'add-staff',
          handle: this.handleCreateData
        }
      ]
    };
  },
  watch: {
    viewVisible (newVal) {
      if (!newVal) {
        this.photo = '';
      }
    }
  },
  mounted () {
    this.columns = tableConf(this);
    if (this.userInfo && this.userInfo.type === 3) {
      Promise.all([this.getList()]).then(() => {
        this.loading = false;
        this.searchCell[1].hidden = true;
        this.searchCell[2].hidden = true;
      });
    } else if (this.userInfo && this.userInfo.type === 2) {
      Promise.all([
        this.getList(),
        this.getAllCompany(this.userInfo.gasRegionId)
      ]).then(() => {
        this.loading = false;
        this.searchCell[1].hidden = true;
      });
    } else {
      Promise.all([this.getList(), this.getAllRegion()]).then(() => {
        this.loading = false;
        this.searchCell[1].options = this.regionList;
      });
    }
  },
  methods: {
    async getList () {
      this.loading = true;
      try {
        const { data } = await getList(this.query);
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
        const { data } = await getDetail(id);
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
      this.searchCell[2].options = this.companyList;
    },
    handleSuccess () {
      this.getList();
    },
    handleCreateData () {
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
    handleConfirm (msg) {
      return this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
    },
    handleSearchSubmit () {
      this.query.page = 1;
      this.exportQuery = {
        ...this.query
      };
      this.getList();
    },
    handleRegionChange (value) {
      this.query.gasCompanyId = null;
      this.getAllCompany(value);
    },
    handlePhotoView (name, photo) {
      this.name = name;
      this.photo = photo;
      this.viewVisible = true;
    },
    async handleExportData () {
      this.btnGroup[0].loading = true;
      this.btnGroup[0].label = '正在导出';
      const { data } = await exportStaff(this.exportQuery);
      this.btnGroup[0].loading = false;
      this.btnGroup[0].label = '导出员工';
      window.location = data.url;
    },
    async handleImportStaff () {
      await uploadExcelImportStaff();
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
