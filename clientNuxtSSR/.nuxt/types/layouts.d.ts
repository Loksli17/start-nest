import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "custom"
declare module "C:/Users/ASUS/Desktop/develop/back-end/start-nest/clientnuxtssr/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}