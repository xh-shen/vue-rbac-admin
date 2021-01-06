import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['device', 'userInfo', 'dict', 'campus']),
    mobile () {
      return this.device === 'mobile';
    }
  }
};
