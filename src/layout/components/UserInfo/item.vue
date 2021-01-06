<template>
  <div class="detail-row">
    <div class="detail-row-name">{{ name }}</div>
    <div
      class="detail-row-info"
      :class="{'edit': isEdit}"
    >
      <template v-if="!isEdit">
        {{ value }}
      </template>
      <template v-else>
        <el-input
          size="mini"
          v-model="inputValue"
          :placeholder="`请输入${name}`"
          @input="onInput"
        ></el-input>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    tagList: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  watch: {
    isEdit (newVal) {
      if (newVal) {
        this.inputValue = this.value;
      }
    }
  },
  data () {
    return {
      inputValue: this.value
    };
  },
  methods: {
    onInput (value) {
      this.$emit('on-input', this.inputValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6ebf5;
  & > div {
    min-height: 46px;
    padding: 7px 15px;
    line-height: 32px;
    color: #606266;
    font-size: 14px;
    white-space: normal;
    word-break: break-all;
  }
  &-name {
    width: 30%;
    flex: 0 0 30%;
    overflow: hidden;
    font-weight: 500;
    text-align: right;
  }
  &-info {
    flex: 1;
    border-left: 1px solid #e6ebf5;
    // width: 416px;
    &.edit {
      height: 46px;
      overflow: hidden;
    }
  }
  &-btn {
    text-align: right;
    .icon {
      padding: 5px;
      cursor: pointer;
    }
  }
  &:first-child {
    border-top: 1px solid #e6ebf5;
  }
}
</style>
