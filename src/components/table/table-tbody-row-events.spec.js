import { mount } from '@vue/test-utils'
import { isVue3 } from '../../vue'
import { waitNT } from '../../../tests/utils'
import { BTable } from './table'

const testItems = [
  { a: 1, b: 2, c: 3 },
  { a: 5, b: 5, c: 6 },
  { a: 7, b: 8, c: 9 },
]
const testFields = ['a', 'b', 'c']

describe('table > tbody row events', () => {
  it('should emit row-clicked event when a row is clicked', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
      listeners: {
        // Row-clicked will only occur if there is a registered listener
        'row-clicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).toBeUndefined()
    await $rows.at(1).trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeDefined()
    expect(wrapper.emitted('row-clicked').length).toBe(1)
    expect(wrapper.emitted('row-clicked')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-clicked')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-clicked')[0][2]).toBeInstanceOf(MouseEvent) // Event

    wrapper.destroy()
  })

  it('should not emit row-clicked event when prop busy is set', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true,
      },
      listeners: {
        // Row-clicked will only occur if there is a registered listener
        'row-clicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).toBeUndefined()
    await $rows.at(1).trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeUndefined()

    wrapper.destroy()
  })

  it('should not emit row-clicked event when vm.localBusy is true', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
      listeners: {
        // Row-clicked will only occur if there is a registered listener
        'row-clicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).toBeUndefined()
    await wrapper.setData({
      localBusy: true,
    })
    await $rows.at(1).trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeUndefined()

    wrapper.destroy()
  })

  it('should emit row-dblclicked event when a row is dblclicked', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
      listeners: {
        // Row-dblclicked will only occur if there is a registered listener
        'row-dblclicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-dblclicked')).toBeUndefined()
    await $rows.at(1).trigger('dblclick')
    expect(wrapper.emitted('row-dblclicked')).toBeDefined()
    expect(wrapper.emitted('row-dblclicked').length).toBe(1)
    expect(wrapper.emitted('row-dblclicked')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-dblclicked')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-dblclicked')[0][2]).toBeInstanceOf(MouseEvent) // Event

    wrapper.destroy()
  })

  it('should not emit row-dblclicked event when a row is dblclicked and table busy', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true,
      },
      listeners: {
        // Row-dblclicked will only occur if there is a registered listener
        'row-dblclicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-dblclicked')).toBeUndefined()
    await $rows.at(1).trigger('dblclick')
    expect(wrapper.emitted('row-dblclicked')).toBeUndefined()

    wrapper.destroy()
  })

  it('should emit row-middle-clicked event when a row is middle clicked', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
      listeners: {
        // Row-middle-clicked will only occur if there is a registered listener
        'row-middle-clicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-middle-clicked')).toBeUndefined()
    await $rows.at(1).trigger('auxclick', { which: 2 })
    expect(wrapper.emitted('row-middle-clicked')).toBeDefined()
    expect(wrapper.emitted('row-middle-clicked').length).toBe(1)
    expect(wrapper.emitted('row-middle-clicked')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-middle-clicked')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-middle-clicked')[0][2]).toBeInstanceOf(Event) // Event

    wrapper.destroy()
  })

  it('should not emit row-middle-clicked event when a row is middle clicked and table busy', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true,
      },
      listeners: {
        // Row-middle-clicked will only occur if there is a registered listener
        'row-middle-clicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-middle-clicked')).toBeUndefined()
    await $rows.at(1).trigger('auxclick', { which: 2 })
    expect(wrapper.emitted('row-middle-clicked')).toBeUndefined()

    wrapper.destroy()
  })

  it('should emit row-contextmenu event when a row is right clicked', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
      listeners: {
        // Row-contextmenu will only occur if there is a registered listener
        'row-contextmenu': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-contextmenu')).toBeUndefined()
    await $rows.at(1).trigger('contextmenu')
    expect(wrapper.emitted('row-contextmenu')).toBeDefined()
    expect(wrapper.emitted('row-contextmenu').length).toBe(1)
    expect(wrapper.emitted('row-contextmenu')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-contextmenu')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-contextmenu')[0][2]).toBeInstanceOf(Event) // Event

    wrapper.destroy()
  })

  it('should not emit row-contextmenu event when a row is right clicked and table busy', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true,
      },
      listeners: {
        // Row-contextmenu will only occur if there is a registered listener
        'row-contextmenu': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-contextmenu')).toBeUndefined()
    await $rows.at(1).trigger('contextmenu')
    expect(wrapper.emitted('row-contextmenu')).toBeUndefined()

    wrapper.destroy()
  })

  it('should emit row-hovered event when a row is hovered', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
      listeners: {
        // Row-hovered will only occur if there is a registered listener
        'row-hovered': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-hovered')).toBeUndefined()
    await $rows.at(1).trigger('mouseenter')
    expect(wrapper.emitted('row-hovered')).toBeDefined()
    expect(wrapper.emitted('row-hovered').length).toBe(1)
    expect(wrapper.emitted('row-hovered')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-hovered')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-hovered')[0][2]).toBeInstanceOf(MouseEvent) // Event

    wrapper.destroy()
  })

  it('should not emit row-hovered event when a row is hovered and no listener', async () => {
    if (isVue3) {
      // We can't track if we have an event listener in vue3 so we skip this test for vue 3
      return
    }

    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-hovered')).toBeUndefined()
    await $rows.at(1).trigger('mouseenter')
    expect(wrapper.emitted('row-hovered')).toBeUndefined()

    wrapper.destroy()
  })

  it('should not emit row-hovered event when a row is hovered and table busy', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true,
      },
      listeners: {
        // Row-hovered will only occur if there is a registered listener
        'row-hovered': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-hovered')).toBeUndefined()
    await $rows.at(1).trigger('mouseenter')
    expect(wrapper.emitted('row-hovered')).toBeUndefined()

    wrapper.destroy()
  })

  it('should emit row-unhovered event when a row is unhovered', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
      listeners: {
        // Row-unhovered will only occur if there is a registered listener
        'row-unhovered': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-unhovered')).toBeUndefined()
    await $rows.at(1).trigger('mouseleave')
    expect(wrapper.emitted('row-unhovered')).toBeDefined()
    expect(wrapper.emitted('row-unhovered').length).toBe(1)
    expect(wrapper.emitted('row-unhovered')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-unhovered')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-unhovered')[0][2]).toBeInstanceOf(MouseEvent) // Event

    wrapper.destroy()
  })

  it('should not emit row-unhovered event when a row is hovered and no listener', async () => {
    if (isVue3) {
      // We can't track if we have an event listener in vue3 so we skip this test for vue 3
      return
    }

    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-unhovered')).toBeUndefined()
    await $rows.at(1).trigger('mouseleave')
    expect(wrapper.emitted('row-unhovered')).toBeUndefined()

    wrapper.destroy()
  })

  it('should not emit row-unhovered event when a row is unhovered and table busy', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true,
      },
      listeners: {
        // Row-unhovered will only occur if there is a registered listener
        'row-unhovered': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-unhovered')).toBeUndefined()
    await $rows.at(1).trigger('mouseleave')
    expect(wrapper.emitted('row-unhovered')).toBeUndefined()

    wrapper.destroy()
  })

  it('should emit row-clicked event when a row is focusable and enter pressed', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
      listeners: {
        // Rows will only have tabindex=0 when a row-clicked listener present
        'row-clicked': () => {},
      },
      attachTo: document.body,
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).toBeUndefined()
    $rows.at(1).element.focus() // Event only works when the TR is focused
    await waitNT(wrapper.vm)
    await $rows.at(1).trigger('keydown.enter')
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-clicked')).toBeDefined()
    expect(wrapper.emitted('row-clicked').length).toBe(1)
    expect(wrapper.emitted('row-clicked')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-clicked')[0][1]).toEqual(1) // Row index
    // Note: the KeyboardEvent is passed to the row-clicked handler
    expect(wrapper.emitted('row-clicked')[0][2]).toBeInstanceOf(KeyboardEvent) // Event

    wrapper.destroy()
  })

  it('should not emit row-clicked event when a row is focusable, enter pressed, and table busy', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true,
      },
      listeners: {
        // Row-clicked will only occur if there is a registered listener
        'row-clicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).toBeUndefined()
    $rows.at(1).element.focus() // Event only works when the TR is focused
    await $rows.at(1).trigger('keydown.enter')
    expect(wrapper.emitted('row-clicked')).toBeUndefined()

    wrapper.destroy()
  })

  it('should not emit row-clicked event when clicking on a button or other interactive element', async () => {
    const wrapper = mount(BTable, {
      attachTo: document.body,
      propsData: {
        // Add extra virtual columns
        fields: [].concat(testFields, ['d', 'e', 'f']),
        // We just use a single row for testing
        items: [testItems[0]],
      },
      slots: {
        // In Vue 2.6x, slots get translated into scopedSlots
        'cell(a)': '<button id="a">button</button>',
        'cell(b)': '<input id="b">',
        'cell(c)': '<a href="#" id="c">link</a>',
        'cell(d)':
          '<div class="dropdown-menu"><div id="d" class="dropdown-item">dropdown</div></div>',
        'cell(e)': '<label for="e">label</label><input id="e">',
        'cell(f)': '<label class="f-label"><input id="e"></label>',
      },
      listeners: {
        // Row-clicked will only occur if there is a registered listener
        'row-clicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(1)
    expect(wrapper.emitted('row-clicked')).toBeUndefined()

    const $btn = wrapper.find('button[id="a"]')
    expect($btn.exists()).toBe(true)
    await $btn.trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeUndefined()

    const $input = wrapper.find('input[id="b"]')
    expect($input.exists()).toBe(true)
    await $input.trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeUndefined()

    const $link = wrapper.find('a[id="c"]')
    expect($link.exists()).toBe(true)
    await $link.trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeUndefined()

    const $dd = wrapper.find('div[id="d"]')
    expect($dd.exists()).toBe(true)
    await $dd.trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeUndefined()

    const $label = wrapper.find('label[for="e"]')
    expect($label.exists()).toBe(true)
    await $label.trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeUndefined()

    const $labelf = wrapper.find('label.f-label')
    expect($labelf.exists()).toBe(true)
    await $labelf.trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeUndefined()

    wrapper.destroy()
  })

  it('keyboard events moves focus to appropriate rows', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
      },
      listeners: {
        // Tabindex will only be set if there is a row-clicked listener
        'row-clicked': () => {},
      },
      attachTo: document.body,
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect($rows.wrappers.every((w) => w.attributes('tabindex') === '0')).toBe(true)

    expect(document.activeElement).not.toBe($rows.at(0).element)
    expect(document.activeElement).not.toBe($rows.at(1).element)
    expect(document.activeElement).not.toBe($rows.at(2).element)

    $rows.at(0).element.focus()
    expect(document.activeElement).toBe($rows.at(0).element)

    await $rows.at(0).trigger('keydown.end')
    expect(document.activeElement).toBe($rows.at(2).element)

    await $rows.at(2).trigger('keydown.home')
    expect(document.activeElement).toBe($rows.at(0).element)

    await $rows.at(0).trigger('keydown.down')
    expect(document.activeElement).toBe($rows.at(1).element)

    await $rows.at(1).trigger('keydown.up')
    expect(document.activeElement).toBe($rows.at(0).element)

    await $rows.at(0).trigger('keydown.down', { shiftKey: true })
    expect(document.activeElement).toBe($rows.at(2).element)

    await $rows.at(2).trigger('keydown.up', { shiftKey: true })
    expect(document.activeElement).toBe($rows.at(0).element)

    // Should only move focus if TR was target
    await $rows.at(0).find('td').trigger('keydown.down')
    expect(document.activeElement).toBe($rows.at(0).element)

    wrapper.destroy()
  })
})
