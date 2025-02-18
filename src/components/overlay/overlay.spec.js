import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BOverlay } from './overlay'

describe('overlay', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BOverlay, {
      slots: {
        default: '<span>foobar</span>',
      },
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.attributes('aria-busy')).not.toBe('true')
    expect(wrapper.text()).toContain('foobar')
    expect(wrapper.find('.b-overlay').exists()).toBe(false)
    expect(wrapper.find('.spinner-border').exists()).toBe(false)

    wrapper.destroy()
  })

  it('has expected default structure when `show` prop is true', async () => {
    const wrapper = mount(BOverlay, {
      propsData: {
        show: true,
      },
      slots: {
        default: '<span>foobar</span>',
      },
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.text()).toContain('foobar')

    const $overlay = wrapper.find('.b-overlay')
    expect($overlay.exists()).toBe(true)
    expect($overlay.classes()).toContain('position-absolute')

    const $children = $overlay.findAll('div:not(.b-overlay)')
    expect($children.length).toBe(2)

    expect($children.at(0).classes()).toContain('position-absolute')
    expect($children.at(0).classes()).toContain('bg-light')
    expect($children.at(0).text()).toBe('')

    expect($children.at(1).classes()).toContain('position-absolute')
    expect($children.at(1).classes()).not.toContain('bg-light')
    expect($children.at(1).find('.spinner-border').exists()).toBe(true)

    wrapper.destroy()
  })

  it('responds to changes in the `show` prop', async () => {
    const wrapper = mount(BOverlay, {
      attachTo: document.body,
      propsData: {
        show: false,
      },
      slots: {
        default: '<span>foobar</span>',
      },
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.attributes('aria-busy')).not.toBe('true')
    expect(wrapper.text()).toContain('foobar')
    expect(wrapper.find('.b-overlay').exists()).toBe(false)
    expect(wrapper.find('.spinner-border').exists()).toBe(false)

    expect(wrapper.emitted('shown')).toBeUndefined()
    expect(wrapper.emitted('hidden')).toBeUndefined()

    await wrapper.setProps({
      show: true,
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.text()).toContain('foobar')
    expect(wrapper.find('.b-overlay').exists()).toBe(true)
    expect(wrapper.find('.spinner-border').exists()).toBe(true)

    expect(wrapper.emitted('shown')).not.toBeUndefined()
    expect(wrapper.emitted('hidden')).toBeUndefined()
    expect(wrapper.emitted('shown').length).toBe(1)

    await wrapper.setProps({
      show: false,
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.attributes('aria-busy')).not.toBe('true')
    expect(wrapper.text()).toContain('foobar')
    expect(wrapper.find('.b-overlay').exists()).toBe(false)
    expect(wrapper.find('.spinner-border').exists()).toBe(false)

    expect(wrapper.emitted('hidden')).not.toBeUndefined()
    expect(wrapper.emitted('shown').length).toBe(1)
    expect(wrapper.emitted('hidden').length).toBe(1)

    await wrapper.setProps({
      show: true,
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('shown').length).toBe(2)
    expect(wrapper.emitted('hidden').length).toBe(1)

    await wrapper.setProps({
      show: false,
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('shown').length).toBe(2)
    expect(wrapper.emitted('hidden').length).toBe(2)

    wrapper.destroy()
  })

  it('emits event when overlay clicked', async () => {
    const wrapper = mount(BOverlay, {
      propsData: {
        show: true,
      },
      slots: {
        default: '<span>foobar</span>',
      },
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')

    const $overlay = wrapper.find('.b-overlay')
    expect($overlay.exists()).toBe(true)

    expect(wrapper.emitted('click')).toBeUndefined()

    await $overlay.trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
    expect(wrapper.emitted('click').length).toBe(1)
    expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(Event)
    expect(wrapper.emitted('click')[0][0].type).toEqual('click')

    wrapper.destroy()
  })

  it('has expected default structure when `no-wrap` is set', async () => {
    const wrapper = mount(BOverlay, {
      propsData: {
        noWrap: true,
      },
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.find('div').exists()).toBe(false)

    wrapper.destroy()
  })

  it('has expected default structure when `no-wrap` is set and `show` is true', async () => {
    const wrapper = mount(BOverlay, {
      propsData: {
        noWrap: true,
        show: true,
      },
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay')
    expect(wrapper.classes()).toContain('position-absolute')
    expect(wrapper.classes()).not.toContain('b-overlay-wrap')
    expect(wrapper.classes()).not.toContain('position-relative')

    const $children = wrapper.findAll('div:not(.b-overlay)')
    expect($children.length).toBe(2)

    expect($children.at(0).classes()).toContain('position-absolute')
    expect($children.at(0).classes()).toContain('bg-light')
    expect($children.at(0).text()).toBe('')

    expect($children.at(1).classes()).toContain('position-absolute')
    expect($children.at(1).classes()).not.toContain('bg-light')
    expect($children.at(1).find('.spinner-border').exists()).toBe(true)

    wrapper.destroy()
  })
})
