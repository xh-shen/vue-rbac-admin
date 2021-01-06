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
      title="公司列表"
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
  </div>
</template>

<script>
import { getList, getDetail, del } from '@/api/company';
import { getAllRegion } from '@/api/base';
import { uploadExcelImport } from '@/api/upload.js';
import tableConf from './tableConf';
import FormDialog from './components/form-dialog';
export default {
  components: {
    FormDialog
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
      regionList: [],
      columns: [],
      total: 0,
      searchCell: [
        {
          tag: 'input',
          prop: 'keyword',
          width: '300px',
          placeholder: '请输入公司名称，手机号'
        },
        {
          tag: 'select',
          prop: 'gasRegionId',
          width: '200px',
          placeholder: '请选择地区',
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
        limit: 20
      },
      btnGroup: [
        {
          tag: 'button',
          plain: true,
          icon: 'el-icon-plus',
          label: '新增公司',
          permission: 'add-company',
          handle: this.handleCreateData
        }
        // {
        //   tag: 'button',
        //   plain: true,
        //   icon: 'el-icon-plus',
        //   label: 'EXCEL导入',
        //   permission: 'import-company',
        //   handle: this.handleImportData
        // }
      ]
    };
  },
  mounted () {
    this.columns = tableConf(this);
    if (this.userInfo && this.userInfo.type === 2) {
      Promise.all([this.getList()]).then(() => {
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
      this.getList();
    },
    handleImportData () {
      uploadExcelImport();
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
