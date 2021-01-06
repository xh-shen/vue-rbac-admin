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
      title="角色列表"
      :btn-group="btnGroup"
    />
    <base-table
      ref="baseTable"
      :loading="loading"
      :data="data"
      :columns="columns"
      :is-mobile="mobile"
      row-key="id"
      :indent="0"
      lazy
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
      :detail-loading="detailLoading"
      :visible.sync="dialogVisible"
      @on-success="handleSuccess"
    />
    <user-dialog
      :detail="detail"
      :user-list="userList"
      :detail-loading="detailLoading"
      :visible.sync="userDialog"
      @on-success="handleSuccess"
    />
    <perm-dialog
      :id="roleId"
      :name="roleName"
      :tree-info="treeInfo"
      :detail-loading="detailLoading"
      :visible.sync="permDialog"
      @on-success="handleSuccess"
    />
  </div>
</template>

<script>
import { getRoleList, getRoleDetail, getPermission, del } from '@/api/role';
import { getAllUser } from '@/api/user';
import tableConf from './tableConf';
import FormDialog from './components/form-dialog';
import UserDialog from './components/user-dialog';
import PermDialog from './components/perm-dialog';
export default {
  components: {
    FormDialog,
    UserDialog,
    PermDialog
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      detailLoading: false,
      userDialog: false,
      permDialog: false,
      isCreate: true,
      roleName: '',
      data: [],
      roleId: 0,
      userList: [],
      treeInfo: {},
      detail: {},
      columns: [],
      total: 0,
      searchCell: [
        {
          tag: 'input',
          prop: 'keyword',
          width: '300px',
          placeholder: '请输入角色名称'
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
          label: '新增角色',
          permission: 'add-role',
          handle: this.handleDataCreate
        }
      ]
    };
  },
  mounted () {
    this.columns = tableConf(this);
    this.getList();
  },
  methods: {
    async getList () {
      this.loading = true;
      try {
        const { data } = await getRoleList(this.query);
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
        const { data } = await getRoleDetail(id);
        this.detail = data;
        this.detailLoading = false;
      } catch (error) {
        this.detail = {};
        this.detailLoading = false;
      }
    },
    async getAllUser () {
      this.detailLoading = true;
      try {
        const { data } = await getAllUser();
        this.userList = data;
        this.detailLoading = false;
      } catch (error) {
        this.detailLoading = false;
      }
    },
    async getPermission (id) {
      this.detailLoading = true;
      try {
        const { data } = await getPermission(id);
        this.treeInfo = data;
        this.detailLoading = false;
      } catch (error) {
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
    async handleRoleAndUser (id) {
      this.userDialog = true;
      await this.getDetail(id);
      await this.getAllUser();
    },
    async handleRoleAndPermission (id, name) {
      this.roleId = id;
      this.roleName = name;
      this.permDialog = true;
      await this.getPermission(id);
    },
    handleCommandChange (command, row) {
      switch (command) {
        case 'permission':
          this.handleRoleAndPermission(row.id, row.name);
          break;
        case 'user':
          this.handleRoleAndUser(row.id);
          break;
      }
    },
    handleSearchSubmit () {
      this.query.page = 1;
      this.getList();
    },
    handleDataDelete (id) {
      this.handleConfirm('此操作将永久删除该数据, 是否继续?')
        .then(async () => {
          const { msg } = await del(id);
          this.$message.success(msg);
          this.getList();
        })
        .catch(action => {});
    },
    handleConfirm (msg) {
      return this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
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
