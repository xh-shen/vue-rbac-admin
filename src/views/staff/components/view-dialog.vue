<template>
  <el-dialog
    :title="title"
    :width="mobile ? '90%' : width"
    :top="mobile ? '5vh' : '15vh'"
    :visible.sync="dialogVisible"
  >
    <div class="picture">
      <img
        v-if="url"
        :src="url"
      >
    </div>
    <div slot="footer">
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '600px'
    },
    title: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.visible;
      },
      set (val) {
        this.$emit('update:visible', val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.picture {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
}
</style>
