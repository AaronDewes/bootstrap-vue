import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'

// --- Constants ---
const COMPONENT_UID_KEY = '_uid'

const isVue3 = Vue.version.startsWith('3')

const ALLOWED_FIELDS_IN_DATA = [
  'class',
  'staticClass',
  'style',
  'attrs',
  'props',
  'domProps',
  'on',
  'nativeOn',
  'directives',
  'scopedSlots',
  'slot',
  'key',
  'ref',
  'refInFor',
]

if (isVue3) {
  const { extend: originalExtend } = Vue
  const KNOWN_COMPONENTS = ['router-link', 'transition']
  Vue.extend = function (definition) {
    if (typeof definition === 'object' && definition.render && !definition.__alreadyPatched) {
      const originalRender = definition.render
      definition.__alreadyPatched = true
      definition.render = function (h) {
        const patchedH = function (tag, dataObjOrChildren, ...rest) {
          const isTag = typeof tag === 'string' && !KNOWN_COMPONENTS.includes(tag)
          const isSecondArgumentDataObject =
            dataObjOrChildren &&
            typeof dataObjOrChildren === 'object' &&
            !Array.isArray(dataObjOrChildren)

          if (!isSecondArgumentDataObject) {
            return h(tag, dataObjOrChildren, ...rest)
          }

          const { attrs, props, ...restData } = dataObjOrChildren
          const normalizedData = {
            ...restData,
            attrs,
            props: isTag ? {} : props,
          }
          if (tag === 'router-link' && !normalizedData.slots && !normalizedData.scopedSlots) {
            // terrible workaround to fix router-link rendering with compat vue-router
            normalizedData.scopedSlots = { $hasNormal: () => {} }
          }
          return h(tag, normalizedData, ...rest)
        }

        if (definition.functional) {
          const ctx = arguments[1]
          const patchedCtx = { ...ctx }
          patchedCtx.data = {
            attrs: { ...(ctx.data.attrs || {}) },
            props: { ...(ctx.data.props || {}) },
          }
          Object.keys(ctx.data || {}).forEach((key) => {
            if (ALLOWED_FIELDS_IN_DATA.includes(key)) {
              patchedCtx.data[key] = ctx.data[key]
            } else if (key in ctx.props) {
              patchedCtx.data.props[key] = ctx.data[key]
            } else if (!key.startsWith('on')) {
              patchedCtx.data.attrs[key] = ctx.data[key]
            }
          })

          const IGNORED_CHILDREN_KEYS = ['_ctx']
          const children = ctx.children?.default?.() || ctx.children

          if (
            children &&
            Object.keys(patchedCtx.children).filter((k) => !IGNORED_CHILDREN_KEYS.includes(k))
              .length === 0
          ) {
            delete patchedCtx.children
          } else {
            patchedCtx.children = children
          }

          patchedCtx.data.on = ctx.listeners
          return originalRender.call(this, patchedH, patchedCtx)
        }

        return originalRender.call(this, patchedH)
      }
    }
    return originalExtend.call(this, definition)
  }
}

const nextTick = Vue.nextTick

export { COMPONENT_UID_KEY, Vue, mergeData, isVue3, nextTick }
