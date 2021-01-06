<template>
  <div class="home">
    <div class="home-welcome">
      <svg-icon
        icon-class="people"
        className="icon"
      />
      <div>
        您好！

        <span class="name">{{ userInfo.name || userInfo.companyName }}。</span><br>
        <p>祝您开心每一天！</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'home',
  data () {
    return {};
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.home {
  &-welcome {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 30px;
    .icon {
      font-size: 40px;
      color: #1890ff;
      margin-right: 30px;
    }
    div {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      p {
        color: rgba(0, 0, 0, 0.45);
        line-height: 30px;
        font-size: 14px;
        margin: 0;
      }
    }
  }
}
</style>
