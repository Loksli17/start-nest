import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "C:/Users/ASUS/Desktop/develop/back-end/start-nest/clientnuxtssr/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}