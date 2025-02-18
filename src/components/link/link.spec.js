import VueRouter from 'vue-router'
import { createLocalVue, mount } from '@vue/test-utils'
import { BLink } from './link'
import { Vue } from '../../vue'

Vue.use(VueRouter)

describe('b-link', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BLink)

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('#')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders content from default slot', async () => {
    const wrapper = mount(BLink, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('#')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('sets attribute href to user supplied value', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        href: '/foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('sets attribute href when user supplied href is hash target', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        href: '#foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('#foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('should set href to string `to` prop', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        to: '/foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('should set href to path from `to` prop', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        to: { path: '/foobar' },
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('should default rel to `noopener` when target==="_blank"', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        href: '/foobar',
        target: '_blank',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_blank')
    expect(wrapper.attributes('rel')).toEqual('noopener')
    expect(wrapper.classes().length).toBe(0)

    wrapper.destroy()
  })

  it('should render the given rel to when target==="_blank"', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        href: '/foobar',
        target: '_blank',
        rel: 'alternate',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_blank')
    expect(wrapper.attributes('rel')).toEqual('alternate')
    expect(wrapper.classes().length).toBe(0)

    wrapper.destroy()
  })

  it('should add "active" class when prop active=true', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        active: true,
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes().length).toBe(1)

    wrapper.destroy()
  })

  it('should add aria-disabled="true" when disabled', async () => {
    const wrapper = mount(BLink, {
      propsData: {
        disabled: true,
      },
    })
    expect(wrapper.attributes('aria-disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toEqual('true')

    wrapper.destroy()
  })

  it("should add '.disabled' class when prop disabled=true", async () => {
    const wrapper = mount(BLink, {
      propsData: {
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('disabled')

    wrapper.destroy()
  })

  it('focus and blur methods work', async () => {
    const wrapper = mount(BLink, {
      attachTo: document.body,
      propsData: {
        href: '#foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')

    expect(document.activeElement).not.toBe(wrapper.element)
    wrapper.vm.focus()
    expect(document.activeElement).toBe(wrapper.element)
    wrapper.vm.blur()
    expect(document.activeElement).not.toBe(wrapper.element)

    wrapper.destroy()
  })

  describe('click handling', () => {
    it('should invoke click handler bound by Vue when clicked on', async () => {
      let called = 0
      let event = null
      const wrapper = mount(BLink, {
        listeners: {
          click: (e) => {
            event = e
            called++
          },
        },
      })
      expect(wrapper.element.tagName).toBe('A')
      expect(called).toBe(0)
      expect(event).toEqual(null)
      await wrapper.find('a').trigger('click')
      expect(called).toBe(1)
      expect(event).toBeInstanceOf(MouseEvent)

      wrapper.destroy()
    })

    it('should invoke multiple click handlers bound by Vue when clicked on', async () => {
      const spy1 = jest.fn()
      const spy2 = jest.fn()
      const wrapper = mount(BLink, {
        listeners: {
          click: [spy1, spy2],
        },
      })
      expect(wrapper.element.tagName).toBe('A')
      expect(spy1).not.toHaveBeenCalled()
      expect(spy2).not.toHaveBeenCalled()
      await wrapper.find('a').trigger('click')
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()

      wrapper.destroy()
    })

    it('should NOT invoke click handler bound by Vue when disabled and clicked', async () => {
      let called = 0
      let event = null
      const wrapper = mount(BLink, {
        propsData: {
          disabled: true,
        },
        listeners: {
          click: (e) => {
            event = e
            called++
          },
        },
      })
      expect(wrapper.element.tagName).toBe('A')
      expect(called).toBe(0)
      expect(event).toEqual(null)
      await wrapper.find('a').trigger('click')
      expect(called).toBe(0)
      expect(event).toEqual(null)

      wrapper.destroy()
    })

    it('should NOT invoke click handler bound via "addEventListener" when disabled and clicked', async () => {
      const wrapper = mount(BLink, {
        propsData: {
          disabled: true,
        },
      })
      const spy = jest.fn()
      expect(wrapper.element.tagName).toBe('A')
      wrapper.find('a').element.addEventListener('click', spy)
      await wrapper.find('a').trigger('click')
      expect(spy).not.toHaveBeenCalled()

      wrapper.destroy()
    })

    it('should emit "bv::link::clicked" on $root when clicked on', async () => {
      const spy = jest.fn()
      const App = {
        render(h) {
          return h('div', [h(BLink, { props: { href: '/foo' } }, 'link')])
        },
      }

      const wrapper = mount(App)
      expect(wrapper.vm).toBeDefined()
      wrapper.vm.$root.$on('bv::link::clicked', spy)

      await wrapper.find('a').trigger('click')
      expect(spy).toHaveBeenCalled()

      wrapper.destroy()
    })

    it('should not emit "bv::link::clicked" on $root when clicked on when disabled', async () => {
      const spy = jest.fn()
      const App = {
        render(h) {
          return h('div', [h(BLink, { props: { href: '/foo', disabled: true } }, 'link')])
        },
      }

      const wrapper = mount(App)
      expect(wrapper.vm).toBeDefined()
      wrapper.vm.$root.$on('bv::link::clicked', spy)

      await wrapper.find('a').trigger('click')
      expect(spy).not.toHaveBeenCalled()

      wrapper.destroy()
    })

    it('should emit "clicked::link" on $root when clicked on', async () => {
      const spy = jest.fn()
      const App = {
        render(h) {
          return h('div', [h(BLink, { props: { href: '/foo' } }, 'link')])
        },
      }

      const wrapper = mount(App)
      expect(wrapper.vm).toBeDefined()
      wrapper.vm.$root.$on('clicked::link', spy)

      await wrapper.find('a').trigger('click')
      expect(spy).toHaveBeenCalled()

      wrapper.destroy()
    })

    it('should not emit "clicked::link" on $root when clicked on when disabled', async () => {
      const spy = jest.fn()
      const App = {
        render(h) {
          return h('div', [h(BLink, { props: { href: '/foo', disabled: true } }, 'link')])
        },
      }

      const wrapper = mount(App)
      expect(wrapper.vm).toBeDefined()
      wrapper.vm.$root.$on('clicked::link', spy)

      await wrapper.find('a').trigger('click')
      expect(spy).not.toHaveBeenCalled()

      wrapper.destroy()
    })
  })

  describe('router-link support', () => {
    it('works', async () => {
      const localVue = createLocalVue()

      const router = new VueRouter({
        mode: 'abstract',
        routes: [
          { path: '/', component: { name: 'R', template: '<div class="r">ROOT</div>' } },
          { path: '/a', component: { name: 'A', template: '<div class="a">A</div>' } },
          { path: '/b', component: { name: 'B', template: '<div class="a">B</div>' } },
        ],
      })

      // Fake Gridsome `<g-link>` component
      const GLink = {
        name: 'GLink',
        props: {
          to: {
            type: [String, Object],
            default: '',
          },
        },
        render(h) {
          // We just us a simple A tag to render the
          // fake `<g-link>` and assume `to` is a string
          return h('a', { attrs: { href: this.to } }, [this.$slots.default])
        },
      }

      localVue.component('GLink', GLink)

      const App = {
        router,
        components: { BLink },
        render(h) {
          return h('main', [
            // router-link
            h('b-link', { props: { to: '/a' } }, ['to-a']),
            // regular link
            h('b-link', { props: { href: '/a' } }, ['href-a']),
            // router-link
            h('b-link', { props: { to: { path: '/b' } } }, ['to-path-b']),
            // g-link
            h('b-link', { props: { routerComponentName: 'g-link', to: '/a' } }, ['g-link-a']),
            h('router-view'),
          ])
        },
      }

      const wrapper = mount(App, {
        localVue,
        attachTo: document.body,
      })

      expect(wrapper.vm).toBeDefined()
      expect(wrapper.element.tagName).toBe('MAIN')

      expect(wrapper.findAll('a').length).toBe(4)

      const $links = wrapper.findAllComponents('a')
      $links.wrappers.forEach(($link) => {
        expect($link.vm).toBeDefined()
        expect($links.at(0).vm.$options.name).toBe('BLink')
      })
      expect(
        $links.wrappers.map(($link) => $link.findComponent({ name: 'RouterLink' }).exists())
      ).toStrictEqual([true, false, true, false])

      expect($links.at(3).findComponent(GLink).exists()).toBe(true)

      wrapper.destroy()
    })
  })
})
