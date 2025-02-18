import { mount } from '@vue/test-utils'
import { BInputGroup } from './input-group'

describe('input-group', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BInputGroup)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.findAll('.input-group > *').length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('should render custom root element when prop tag is set', async () => {
    const wrapper = mount(BInputGroup, {
      propsData: {
        tag: 'span',
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('input-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toEqual('group')
    expect(wrapper.findAll('.input-group > *').length).toBe(0)

    wrapper.destroy()
  })

  it('should apply size class when when prop size is set', async () => {
    const wrapper = mount(BInputGroup, {
      propsData: {
        size: 'lg',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group')
    expect(wrapper.classes()).toContain('input-group-lg')
    expect(wrapper.classes().length).toBe(2)

    wrapper.destroy()
  })

  it('should render default slot content', async () => {
    const wrapper = mount(BInputGroup, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
    expect(wrapper.findAll('.input-group > *').length).toBe(0)

    wrapper.destroy()
  })

  it('renders input-group-prepend & input-group-append when prepend & append props set', async () => {
    const wrapper = mount(BInputGroup, {
      propsData: {
        prepend: 'foo',
        append: 'bar',
      },
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foofoobarbar')
    expect(wrapper.findAll('.input-group > *').length).toBe(2)
    expect(wrapper.findAll('.input-group-prepend').length).toBe(1)
    expect(wrapper.findAll('.input-group-prepend > .input-group-text').length).toBe(1)
    expect(wrapper.find('.input-group-prepend').text()).toBe('foo')
    expect(wrapper.findAll('.input-group-append').length).toBe(1)
    expect(wrapper.findAll('.input-group-append > .input-group-text').length).toBe(1)
    expect(wrapper.find('.input-group-append').text()).toBe('bar')
    expect(wrapper.find('.input-group > .input-group-prepend ~ .input-group-append').exists()).toBe(
      true
    )

    wrapper.destroy()
  })

  it('renders input-group-prepend & input-group-append when prepend-html & append-html props set', async () => {
    const wrapper = mount(BInputGroup, {
      propsData: {
        prependHtml: '<i>foo</i>',
        appendHtml: '<b>bar</b>',
      },
      slots: {
        default: 'baz',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobazbar')
    expect(wrapper.findAll('.input-group > *').length).toBe(2)
    expect(wrapper.findAll('.input-group-prepend').length).toBe(1)
    expect(wrapper.findAll('.input-group-prepend > .input-group-text').length).toBe(1)
    expect(wrapper.find('.input-group-prepend').text()).toBe('foo')
    expect(wrapper.findAll('.input-group-append').length).toBe(1)
    expect(wrapper.findAll('.input-group-append > .input-group-text').length).toBe(1)
    expect(wrapper.find('.input-group-append').text()).toBe('bar')
    expect(wrapper.find('.input-group > .input-group-prepend ~ .input-group-append').exists()).toBe(
      true
    )

    wrapper.destroy()
  })

  it('renders input-group-prepend & input-group-append when prepend & append slots present', async () => {
    const wrapper = mount(BInputGroup, {
      slots: {
        default: 'foobar',
        prepend: '<button>foo</button>',
        append: '<button>bar</button><button>baz</button>',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foofoobarbarbaz')
    expect(wrapper.findAll('.input-group > *').length).toBe(2)
    expect(wrapper.findAll('.input-group-prepend').length).toBe(1)
    expect(wrapper.findAll('.input-group-prepend > .input-group-text').length).toBe(0)
    expect(wrapper.findAll('.input-group-prepend > button').length).toBe(1)
    expect(wrapper.find('.input-group-prepend').text()).toBe('foo')
    expect(wrapper.findAll('.input-group-append').length).toBe(1)
    expect(wrapper.findAll('.input-group-append > .input-group-text').length).toBe(0)
    expect(wrapper.findAll('.input-group-append > button').length).toBe(2)
    expect(wrapper.find('.input-group-append').text()).toBe('barbaz')
    expect(wrapper.find('.input-group > .input-group-prepend ~ .input-group-append').exists()).toBe(
      true
    )

    wrapper.destroy()
  })
})
