import { mount } from '@vue/test-utils'
import { BButtonGroup } from './button-group'

describe('button-group', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BButtonGroup)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.text()).toBe('')

    wrapper.destroy()
  })

  it('should render default slot', async () => {
    const wrapper = mount(BButtonGroup, {
      slots: {
        default: '<span>foobar</span>',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.text()).toBe('foobar')

    wrapper.destroy()
  })

  it('should apply vertical class', async () => {
    const wrapper = mount(BButtonGroup, {
      propsData: {
        vertical: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).not.toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('should apply size class', async () => {
    const wrapper = mount(BButtonGroup, {
      propsData: {
        size: 'sm',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('btn-group-sm')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('should apply size class when vertical', async () => {
    const wrapper = mount(BButtonGroup, {
      propsData: {
        size: 'sm',
        vertical: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group-sm')
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).not.toContain('btn-group')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('has custom role when aria-role prop set', async () => {
    const wrapper = mount(BButtonGroup, {
      propsData: {
        ariaRole: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('foobar')

    wrapper.destroy()
  })
})
