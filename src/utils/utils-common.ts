export function formatClass(className: string) {
  return '.' + className.replaceAll(' ', '.'); // 'main-div flex'>>'.main-div.flex'
}
