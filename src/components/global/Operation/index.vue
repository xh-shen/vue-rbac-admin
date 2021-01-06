<template>
  <div class="operation-content">
    <div class="tab">
      <slot name="tab">
        <el-radio-group
          v-if="radioGroup && radioGroup.length > 1"
          v-model="value"
          @change="handleRadioChange"
        >
          <el-radio-button :label="null">
            全部
          </el-radio-button>
          <el-radio-button
            v-for="item in radioGroup"
            :label="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
        <div
          v-else
          class="title"
        ><span v-if="title">•</span> {{ title }}</div>
      </slot>
    </div>
    <div class="button-group">
      <template v-for="(item, index) in btnGroup">
        <el-button
          v-if="item.tag === 'button' && checkPermission(item.permission)"
          :type="item.type || 'default'"
          :plain="item.plain"
          :key="index"
          :loading="item.loading"
          style="margin-left: 5px"
          @click="item.handle"
          @mouseenter.native="item.mouseHandler && handleMouse(index, 'enter')"
          @mouseleave.native="item.mouseHandler && handleMouse(index, 'leave')"
        >{{ item.label }}</el-button>
        <el-dropdown
          v-if="item.tag === 'dropdown' && checkPermission(item.permission)"
          @command="item.handle"
          :key="index"
        >
          <el-button
            :type="item.type || 'default'"
            :plain="item.plain"
            :key="index"
            style="margin-right: 5px;"
          >{{ item.label }}</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(option, index) in item.options"
              :command="option.value"
              :key="index"
            >{{ option.label }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'; // 权限判断指令
import checkPermission from '@/utils/permission'; // 权限判断函数
export default {
  name: 'Operation',
  directives: { permission },
  props: {
    btnGroup: {
      type: Array,
      default () {
        return [];
      }
    },
    radioGroup: {
      type: Array,
      default () {
        return [];
      }
    },
    radioValue: {
      type: [String, Number]
    },
    title: {
      type: String,
      default: '列表'
    }
  },
  data () {
    return {
      value: this.radioValue
    };
  },
  methods: {
    handleRadioChange (val) {
      this.$emit('on-change', val);
    },
    handleMouse (index, type) {
      this.$emit('on-mouse', type, index);
    },
    checkPermission
  }
};
</script>

<style lang="scss" scoped>
.operation-content {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  .title {
    padding-left: 10px;
    font-weight: 600;
    line-height: 34px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: right;
    font-size: 14px;
    margin-right: 10px;
    color: #515a6e;
    overflow: hidden;
    span {
      margin-right: 5px;
    }
  }
}
</style>
