<!--
 * @Author: shen
 * @Date: 2019-11-04 10:30:50
 * @LastEditors: shen
 * @LastEditTime: 2021-01-06 09:31:34
 * @Description:
-->
<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action="/admin/v1/upload/multiple"
      multiple
      :headers="headers"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-error="handleAvatarError"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png/gif文件，且不超过500kb</div>
    </el-upload>
    <div></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['token']),
    headers() {
      return {
        Authorization: `Bearer ${this.token}`
      };
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {},
    handleAvatarError(err, file, fileList) {
      this.$message.error(JSON.parse(err.message).msg);
    },
    beforeAvatarUpload(file) {
      const imgType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const isJPG = imgType.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、JPEG、PNG、GIF 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #d9d9d9;
  width: 70px;
  height: 100px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 70px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  max-width: 100%;
  max-height: 100%;
  display: block;
}
</style>
