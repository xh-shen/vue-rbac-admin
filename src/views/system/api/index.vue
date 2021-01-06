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
      title="接口列表"
      :btn-group="btnGroup"
    />
    <base-table
      ref="baseTable"
      :loading="loading"
      :data="data"
      :columns="columns"
      :is-mobile="mobile"
      row-key="id"
      default-expand-all
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
      :tree-list="treeList"
      :detail-loading="detailLoading"
      :visible.sync="dialogVisible"
      @on-success="handleSuccess"
    />
  </div>
</template>

<script>
import { getList, getDetail } from '@/api/api';
import { getList as getMenuList } from '@/api/menu';
import { toSelectTree } from '@/utils/common';
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
      total: 0,
      searchCell: [
        {
          tag: 'input',
          prop: 'keyword',
          width: '200px',
          placeholder: '请输入接口名称、路径'
        },
        {
          tag: 'select',
          prop: 'status',
          width: '200px',
          placeholder: '请选择状态',
          options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }]
        },
        {
          tag: 'select',
          prop: 'method',
          width: '200px',
          placeholder: '请选择方法',
          options: [
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'DELETE', label: 'DELETE' },
            { value: 'PUT', label: 'PUT' },
            { value: 'HEAD', label: 'HEAD' },
            { value: 'PATCH', label: 'PATCH' }
          ]
        }
      ],
      query: {
        keyword: '',
        method: '',
        status: null,
        page: 1,
        limit: 20
      },
      treeList: [],
      detail: {},
      columns: [],
      btnGroup: [
        {
          tag: 'button',
          plain: true,
          icon: 'el-icon-plus',
          label: '新增接口',
          permission: 'add-api',
          handle: this.handleDataCreate
        }
      ]
    };
  },
  mounted () {
    this.loading = true;
    this.columns = tableConf(this);
    Promise.all([this.getList(true), this.getMenuList()]).then(() => {
      this.loading = false;
    });
  },
  methods: {
    async getList (isInit = false) {
      if (!isInit) {
        this.loading = true;
      }
      try {
        const { data } = await getList(this.query);
        if (!isInit) {
          this.loading = false;
        }
        this.data = data.list;
        this.total = data.total;
      } catch (error) {
        this.loading = false;
      }
    },
    async getMenuList () {
      try {
        const { data } = await getMenuList();
        this.treeList = toSelectTree(data);
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
    handleSuccess () {
      this.getList();
    },
    handleDataCreate () {
      this.isCreate = true;
      this.dialogVisible = true;
    },
    async handleDataUpdate (id) {
      this.isCreate = false;
      this.dialogVisible = true;
      await this.getDetail(id);
    },
    handleSearchSubmit () {
      this.query.page = 1;
      this.getList();
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
