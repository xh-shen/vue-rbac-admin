<template>
  <div>
    <search-form
      label-width="80px"
      :model="query"
      :form-cell="searchCell"
      :is-show-btn="false"
      :is-mobile="mobile"
    />
    <operation
      title="菜单列表"
      :btn-group="btnGroup"
    />
    <base-table
      ref="baseTable"
      :loading="loading"
      :data="filterList"
      :columns="columns"
      :is-mobile="mobile"
      :has-page="false"
      row-key="id"
      default-expand-all
      highlight-current-row
    />
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
import { getList, getMenuDetail, del } from '@/api/menu';
import { toTree, toSelectTree } from '@/utils/common';
import tableConf from './tableConf';
import FormDialog from './components/form-dialog';

function includeStr (item, keyword) {
  return item.name.indexOf(keyword) > -1 || item.code.indexOf(keyword) > -1;
}

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
      treeList: [],
      detail: {},
      searchCell: [
        {
          tag: 'input',
          prop: 'keyword',
          width: '300px',
          placeholder: '请输入菜单名称、编码'
        },
        {
          tag: 'select',
          prop: 'status',
          width: '200px',
          placeholder: '请选择状态',
          options: [{ value: 1, label: '启用' }, { value: 0, label: '停用' }]
        }
      ],
      query: {
        keyword: '',
        status: undefined
      },
      columns: [],
      btnGroup: [
        {
          tag: 'button',
          type: 'default',
          plain: true,
          icon: 'el-icon-plus',
          label: '新增菜单',
          permission: 'add-menu',
          handle: this.handleDataCreate
        }
      ]
    };
  },
  computed: {
    filterList () {
      let { keyword, status } = this.query;
      if (!(keyword || status === 0 || status === 1)) {
        return toTree(JSON.parse(JSON.stringify(this.data)));
      }
      return this.data.filter(item => {
        return keyword
          ? status === 1 || status === 0
            ? includeStr(item, keyword) && item.status === status
            : includeStr(item, keyword)
          : item.status === status;
      });
    }
  },
  mounted () {
    this.columns = tableConf(this);
    this.getList();
  },
  methods: {
    async getList () {
      this.loading = true;
      try {
        const { data } = await getList();
        this.loading = false;
        this.data = data;
        this.treeList = toSelectTree(data);
      } catch (error) {
        this.loading = false;
      }
    },
    async getDetail (id) {
      this.detailLoading = true;
      try {
        const { data } = await getMenuDetail(id);
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
    handleConfirm (msg) {
      return this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
    },
    handleDataDelete (id) {
      this.handleConfirm('此操作将永久删除该数据, 是否继续?')
        .then(async () => {
          const { msg } = await del(id);
          this.$message.success(msg);
          this.getList();
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
