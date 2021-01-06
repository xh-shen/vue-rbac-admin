<template>
  <el-form
    :model="model"
    ref="baseForm"
    label-width="100px"
    :label-position="isMobile ? 'top' : 'right'"
  >
    <el-row :gutter="20">
      <template v-for="(item, index) in schema">
        <el-col
          :span="isMobile ?  24 : (item.span || 24)"
          :key="index"
        >
          <div
            v-if="item.tag==='line'"
            class="line"
          ></div>
          <el-form-item
            v-if="!item.hidden"
            :ref="item.modelKey"
            :label="item.label"
            :prop="item.modelKey"
            :rules="item.hidden ? [] : (item.rules || [])"
          >
            <template
              slot="label"
              v-if="item.labelSlot"
            >
              <span>
                {{ item.label }}
                <el-tooltip
                  class="item"
                  :effect="item.labelSlot.effect || 'dark'"
                  :content="item.labelSlot.content"
                  :placement="item.labelSlot.placement || 'top'"
                >
                  <i :class="item.labelSlot.icon || 'el-icon-question'"></i>
                </el-tooltip>
              </span>
            </template>
            <el-input
              v-if="(item.tag==='input' || item.tag==='textarea')"
              v-model="model[item.modelKey]"
              v-bind="item.attrs || {}"
              v-on="item.listeners || {}"
              :type="item.type || 'text'"
              :placeholder="item.placeholder"
              :disabled="!!item.disabled"
              :clearable="!!item.clearable"
            >
              <el-button
                v-if="item.append"
                slot="append"
                :icon="item.append.icon"
                @click="item.append.func"
              ></el-button>
            </el-input>
            <el-input
              v-if="item.tag==='number'"
              v-model.number="model[item.modelKey]"
              v-bind="item.attrs || {}"
              v-on="item.listeners || {}"
              :placeholder="item.placeholder"
              :disabled="!!item.disabled"
              :clearable="!!item.clearable"
            />
            <el-input-number
              v-if="item.tag==='input-number'"
              v-model="model[item.modelKey]"
              v-bind="item.attrs || {}"
              v-on="item.listeners || {}"
              controls-position="right"
              :class="item.className"
              style="width: 100%;"
              :precision="item.precision || 2"
              :step="item.step ||  0.1"
              :controls="item.controls || false"
              :placeholder="item.placeholder"
              :disabled="!!item.disabled"
              :clearable="!!item.clearable"
            />
            <el-select
              v-if="item.tag==='select'"
              v-model="model[item.modelKey]"
              v-bind="item.attrs || {}"
              v-on="item.listeners || {}"
              style="width: 100%"
              :placeholder="item.placeholder"
              :disabled="!!item.disabled"
              :popper-append-to-body="false"
              :clearable="!!item.clearable"
            >
              <el-option
                v-for="op in item.options"
                :disabled="op.disabled || false"
                :label="op.label"
                :value="op.value"
                :key="op.label"
              />
            </el-select>
            <el-date-picker
              v-if="item.tag==='date'"
              v-model="model[item.modelKey]"
              v-bind="item.attrs || {}"
              v-on="item.listeners || {}"
              style="width: 100%"
              :editable="false"
              :placeholder="item.placeholder"
              :disabled="!!item.disabled"
              :popper-append-to-body="false"
              :clearable="!!item.clearable"
            />
            <el-time-select
              v-if="item.tag==='time'"
              v-model="model[item.modelKey]"
              v-bind="item.attrs || {}"
              v-on="item.listeners || {}"
              style="width: 100%"
              :editable="item.editable || false"
              :placeholder="item.placeholder"
              :disabled="!!item.disabled"
              :popper-append-to-body="false"
              :clearable="!!item.clearable"
            />
            <el-radio-group
              v-if="item.tag==='radio-group'"
              v-model="model[item.modelKey]"
              v-bind="item.attrs || {}"
              v-on="item.listeners || {}"
            >
              <el-radio
                v-for="op in item.options"
                :label="op.label"
                :key="op.label"
              >{{ op.value }}</el-radio>
            </el-radio-group>
            <el-checkbox-group
              v-if="item.tag==='checkbox-group'"
              v-model="model[item.modelKey]"
              v-bind="item.attrs || {}"
              v-on="item.listeners || {}"
            >
              <el-checkbox
                v-for="op in item.options"
                :name="item.modelKey"
                :label="op.label"
                :key="op.label"
              >{{ op.value }}</el-checkbox>
            </el-checkbox-group>
            <el-switch
              v-if="item.tag==='switch'"
              v-model="model[item.modelKey]"
              :disabled="!!item.disabled || false"
              :active="item.activeValue || true"
              :inactive-value="item.inactiveValue || false"
              active-color="#13ce66"
            >
            </el-switch>
            <treeselect
              v-if="item.tag==='select-tree'"
              v-model="model[item.modelKey]"
              v-on="item.listeners || {}"
              :options="item.options"
              :value="model[item.modelKey]"
              :defaultExpandLevel="1"
              :clearable="false"
              :placeholder="item.placeholder"
              noOptionsText="暂无数据"
            />
            <div v-if="item.tag==='uploadImg'">
              <slot name="uploadImg" />
            </div>
            <div v-if="item.tag==='text'">{{ model[item.modelKey] }}</div>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect';
export default {
  name: 'BaseForm',
  components: { Treeselect },
  props: {
    model: {
      type: Object,
      required: true
    },
    schema: {
      type: Array,
      required: true
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {};
  },
  methods: {
    submitForm () {
      return new Promise((resolve, reject) => {
        this.$refs.baseForm.validate((valid, errorFields) => {
          if (valid) {
            resolve();
          } else {
            reject(errorFields);
            return false;
          }
        });
      });
    },
    resetForm () {
      this.$refs.baseForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  display: block;
  height: 1px;
  width: 100%;
  // margin: 24px 0;
  clear: both;
  border-top: 1px dashed #e8eaec;
}
</style>
