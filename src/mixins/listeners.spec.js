import { isVue3 } from '../vue'
import { mount } from '@vue/test-utils'
import { listenersMixin } from './listeners'

// Note: The following tests indirectly test `utils/cache`

describe('mixins > listeners', () => {
  it('works', async () => {
    const BTest = {
      compatConfig: {
        MODE: 3,
        RENDER_FUNCTION: 'suppress-warning',
        INSTANCE_LISTENERS: 'suppress-warning',
      },
      name: 'BTest',
      mixins: [listenersMixin],
      inheritAttrs: false,
      render(h) {
        return h('button', { on: this.bvListeners })
      },
    }
    const App = {
      compatConfig: { MODE: 3, RENDER_FUNCTION: 'suppress-warning' },
      name: 'App',
      props: ['listenClick', 'listenFocus', 'listenBlur'],
      computed: {
        listeners() {
          const listeners = {}
          if (this.listenClick) {
            listeners.click = (event) => this.$emit('click', event)
          }
          if (this.listenFocus) {
            listeners.focus = (event) => this.$emit('focus', event)
          }
          if (this.listenBlur) {
            listeners.blur = (event) => this.$emit('blur', event)
          }
          return listeners
        },
      },
      render(h) {
        return h(BTest, { on: this.listeners })
      },
    }

    const wrapper = mount(App)

    expect(wrapper).toBeDefined()
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('BUTTON')

    const $test = wrapper.findComponent(BTest)

    expect($test.exists()).toBe(true)
    expect($test.vm).toBeDefined()

    expect($test.vm.bvListeners).toBeDefined()
    expect($test.vm.bvListeners.click).toBeUndefined()
    expect($test.vm.bvListeners.focus).toBeUndefined()
    expect($test.vm.bvListeners.blur).toBeUndefined()

    // Correctly adds new listeners
    await wrapper.setProps({
      listenClick: true,
      listenFocus: true,
    })

    expect($test.vm.bvListeners.click).toBeDefined()
    expect($test.vm.bvListeners.focus).toBeDefined()
    expect($test.vm.bvListeners.blur).toBeUndefined()

    // Correctly updates listeners
    await wrapper.setProps({
      listenClick: false,
      listenBlur: true,
    })

    expect($test.vm.bvListeners.click).toBeUndefined()
    expect($test.vm.bvListeners.focus).toBeDefined()
    expect($test.vm.bvListeners.blur).toBeDefined()

    // Correctly removes listeners
    await wrapper.setProps({
      listenClick: false,
      listenFocus: false,
      listenBlur: false,
    })

    expect($test.vm.bvListeners.click).toBeUndefined()
    expect($test.vm.bvListeners.focus).toBeUndefined()
    expect($test.vm.bvListeners.blur).toBeUndefined()

    wrapper.destroy()
  })

  it('does not re-render parent child components', async () => {
    let input1RenderCount = 0
    let input2RenderCount = 0

    const Input1 = {
      compatConfig: {
        MODE: 3,
        RENDER_FUNCTION: 'suppress-warning',
        INSTANCE_LISTENERS: 'suppress-warning',
      },
      props: ['value'],
      render(h) {
        input1RenderCount++
        return h('input', {
          attrs: { value: this.value },
          domProps: { value: this.value },
          on: { ...this.$listeners, input: (e) => this.$emit('input', e.target.value) },
        })
      },
    }
    const Input2 = {
      compatConfig: {
        MODE: 3,
        RENDER_FUNCTION: 'suppress-warning',
        INSTANCE_LISTENERS: 'suppress-warning',
      },
      props: ['value'],
      mixins: [listenersMixin],
      render(h) {
        input2RenderCount++
        return h('input', {
          attrs: { value: this.value },
          domProps: { value: this.value },
          on: { ...this.bvListeners, input: (e) => this.$emit('input', e.target.value) },
        })
      },
    }

    const App1 = {
      components: { Input1 },
      props: ['listenFocus1', 'listenFocus2'],
      methods: {
        emit1($event) {
          if (this.listenFocus1) {
            this.$emit('focus1', $event)
          }
        },
        emit2($event) {
          if (this.listenFocus2) {
            this.$emit('focus2', $event)
          }
        },
      },
      template: `<div>
        <Input1 @focus="emit1" />
        <Input1 @focus="emit2" />
      </div>`,
    }
    const App2 = {
      components: { Input2 },
      props: ['listenFocus1', 'listenFocus2'],
      methods: {
        emit1($event) {
          if (this.listenFocus1) {
            this.$emit('focus1', $event)
          }
        },
        emit2($event) {
          if (this.listenFocus2) {
            this.$emit('focus2', $event)
          }
        },
      },
      template: `<div>
        <Input2 @focus="emit1" />
        <Input2 @focus="emit2" />
      </div>`,
    }

    const wrapper1 = mount(App1, { attachTo: document.body })
    const wrapper2 = mount(App2, { attachTo: document.body })

    // --- `Input1` tests ---

    const $inputs1 = wrapper1.findAllComponents(Input1)
    expect($inputs1.length).toBe(2)
    expect($inputs1.at(0)).toBeDefined()
    expect($inputs1.at(1)).toBeDefined()
    expect(wrapper1.emitted().focus1).not.toBeTruthy()
    expect(wrapper1.emitted().focus2).not.toBeTruthy()
    expect(input1RenderCount).toBe(2)

    await $inputs1.at(0).trigger('focus')
    expect(wrapper1.emitted().focus1).not.toBeTruthy()
    await $inputs1.at(1).trigger('focus')
    expect(wrapper1.emitted().focus2).not.toBeTruthy()
    expect(input1RenderCount).toBe(2)

    // Enable focus events for the first input and trigger it
    await wrapper1.setProps({ listenFocus1: true })
    await $inputs1.at(0).trigger('focus')
    expect(wrapper1.emitted().focus1).toBeTruthy()
    expect(wrapper1.emitted().focus2).not.toBeTruthy()
    // Both `Input1`'s are re-rendered (See: https://github.com/vuejs/vue/issues/7257)
    expect(input1RenderCount).toBe(isVue3 ? 2 : 4)

    // Enable focus events for the second input and trigger it
    await wrapper1.setProps({ listenFocus2: true })
    await $inputs1.at(1).trigger('focus')
    expect(wrapper1.emitted().focus1).toBeTruthy()
    expect(wrapper1.emitted().focus2).toBeTruthy()
    // Both `Input1`'s are re-rendered (See: https://github.com/vuejs/vue/issues/7257)
    expect(input1RenderCount).toBe(isVue3 ? 2 : 6)

    // --- `Input2` tests ---

    const $inputs2 = wrapper2.findAllComponents(Input2)
    expect($inputs2.length).toBe(2)
    expect($inputs2.at(0)).toBeDefined()
    expect($inputs2.at(1)).toBeDefined()
    expect(wrapper2.emitted().focus1).not.toBeTruthy()
    expect(wrapper2.emitted().focus2).not.toBeTruthy()
    expect(input2RenderCount).toBe(2)

    await $inputs2.at(0).trigger('focus')
    expect(wrapper2.emitted().focus1).not.toBeTruthy()
    await $inputs2.at(1).trigger('focus')
    expect(wrapper2.emitted().focus2).not.toBeTruthy()
    expect(input2RenderCount).toBe(2)

    // Enable focus events for the first input and trigger it
    await wrapper2.setProps({ listenFocus1: true })
    await $inputs2.at(0).trigger('focus')
    expect(wrapper2.emitted().focus1).toBeTruthy()
    expect(wrapper2.emitted().focus2).not.toBeTruthy()
    // With `listenersMixin` only the affected `Input2` is re-rendered
    expect(input2RenderCount).toBe(2)

    // Enable focus events for the second input and trigger it
    await wrapper2.setProps({ listenFocus2: true })
    await $inputs2.at(1).trigger('focus')
    expect(wrapper2.emitted().focus1).toBeTruthy()
    expect(wrapper2.emitted().focus2).toBeTruthy()
    // With `listenersMixin` only the affected `Input2` is re-rendered
    expect(input2RenderCount).toBe(2)

    wrapper1.destroy()
    wrapper2.destroy()
  })
})
