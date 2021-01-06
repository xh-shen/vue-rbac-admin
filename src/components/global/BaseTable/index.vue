<template>
  <div
    class="table-content"
    ref="content"
    :style="styles"
  >
    <el-table
      v-loading="loading"
      v-bind="$attrs"
      v-on="$listeners"
      ref="table"
      :height="tableHeight"
      class="base-table"
      style="width: 100%; font-size: 12px;"
      @row-click="handleRowClick"
    >
      <template v-for="(col, index) in columns">
        <el-table-column
          v-if="'render' in col"
          v-bind="col.attrs || col || {}"
          :align="col.align || 'center'"
          :key="`${index}-${col.prop}`"
        >
          <template slot-scope="scope">
            <Render
              :scope="scope"
              :render="col.render"
            ></Render>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="'slot' in col"
          v-bind="col.attrs || col || {}"
          :align="col.align || 'center'"
          :key="`${index}-${col.prop}`"
        >
          <template slot-scope="scope">
            <slot
              :name="col.slot"
              :scope="scope"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          v-bind="col.attrs || col || {}"
          :align="col.align || 'center'"
          :key="`${index}-${col.prop}`"
        />
      </template>
    </el-table>
    <slot />
  </div>
</template>
<script>
import Render from './render.js';
import { getPoint } from '@/utils/common';
export default {
  name: 'BaseTable',
  components: { Render },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    tHeight: {
      type: Number,
      default: 0
    },
    hasPage: {
      type: Boolean,
      default: true
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      height: null
    };
  },
  computed: {
    tableHeight () {
      if (this.isMobile) {
        return null;
      }
      if (this.tHeight > 0) {
        return this.tHeight;
      } else if (this.hasPage && this.tHeight > 0) {
        return this.tHeight - 52;
      } else if (this.hasPage && this.tHeight === 0) {
        return this.height - 52;
      } else {
        return this.height;
      }
    },
    styles () {
      return this.isMobile || this.tHeight > 0
        ? {}
        : {
          height: this.height + 'px',
          minHeight: '400px'
        };
    }
  },
  inheritAttrs: false,
  mounted () {
    if (!this.isMobile) {
      this.resizeHandler();
      window.addEventListener('resize', this.resizeHandler);
    }
  },
  beforeDestroy () {
    if (!this.isMobile) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  },
  methods: {
    handleRowClick (row, column, event) {
      this.$refs.table.toggleRowSelection(row);
      this.$emit('on-row-click', row, column, event);
    },
    resizeHandler () {
      let height = window.innerHeight - getPoint(this.$refs.content) - 20;
      this.height = height > 400 ? height : 400;
    }
  }
};
</script>

<style lang="scss" scoped>
.table-content {
  background-color: #fff;
  .base-table {
    margin-bottom: 10px;
  }
}
</style>
