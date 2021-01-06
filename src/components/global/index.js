export default Vue => {
  const requireComponent = require.context('.', true, /index.vue$/);
  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const Component = requireComponent(fileName).default;
    // 全局注册组件
    Vue.component(Component.name, Component);
  });
};
