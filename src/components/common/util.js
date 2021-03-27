export const showTitle = (item, vm) => {
  return (item.meta && vm.$gettext(item.meta.title)) || item.name
}
