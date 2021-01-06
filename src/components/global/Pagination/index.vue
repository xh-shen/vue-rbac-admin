<template>
  <div
    :class="{'hidden':hidden}"
    class="pagination-container"
  >
    <el-pagination
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to';

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50, 100];
      }
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page;
      },
      set (val) {
        this.$emit('update:page', val);
      }
    },
    pageSize: {
      get () {
        return this.limit;
      },
      set (val) {
        this.$emit('update:limit', val);
      }
    },
    layout () {
      return this.isMobile
        ? 'prev, pager, next'
        : 'total, sizes, prev, pager, next, jumper';
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('pagination', { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800, document.getElementById('app-main'));
      }
    },
    handleCurrentChange (val) {
      this.$emit('pagination', { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800, document.getElementById('app-main'));
      }
    }
  }
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 0 0 20px 0;
  text-align: center;
}
.pagination-container.hidden {
  display: none;
}
</style>
