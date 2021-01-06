<template>
  <el-upload
    class="avatar-uploader"
    action="/admin/v1/upload/picture"
    :show-file-list="false"
    :headers="headers"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :on-error="handleAvatarError"
  >
    <img
      v-if="imgUrl"
      :src="`${imgUrl}?x-image-process=image/resize,m_lfit,h_100`"
      class="avatar"
    >
    <i
      v-else
      class="el-icon-plus avatar-uploader-icon"
    ></i>
  </el-upload>
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
  // data () {
  //   return {
  //     imageUrl: ''
  //   };
  // },
  computed: {
    ...mapGetters(['token']),
    headers () {
      return {
        Authorization: `Bearer ${this.token}`
      };
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.$emit('on-success', res.data.url);
      // this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = res.data.url;
    },
    handleAvatarError (err, file, fileList) {
      this.$message.error(JSON.parse(err.message).msg);
    },
    beforeAvatarUpload (file) {
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
