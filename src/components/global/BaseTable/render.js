export default {
  functional: true,
  props: {
    scope: Object,
    render: Function
  },
  render: (h, ctx) => ctx.props.render(h, ctx.props.scope)
};
