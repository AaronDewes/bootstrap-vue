import { mount } from '@vue/test-utils'
import { BTable } from './table'

const testItems = [{ a: 1, b: 2, c: 3 }]
const testFields = [
  { key: 'a', label: 'A' },
  { key: 'b', label: 'B' },
  { key: 'c', label: 'C' },
]

describe('table > tfoot events', () => {
  it('should emit head-clicked event when a head cell is clicked', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true,
      },
      listeners: {
        // Head-clicked will not be emitted unless there is a
        // registered head-clicked listener
        'head-clicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tfoot > tr')
    expect($rows.length).toBe(1)
    const $ths = wrapper.findAll('tfoot > tr > th')
    expect($ths.length).toBe(testFields.length)
    expect(wrapper.emitted('head-clicked')).toBeUndefined()
    await $ths.at(0).trigger('click')
    expect(wrapper.emitted('head-clicked')).toBeDefined()
    expect(wrapper.emitted('head-clicked').length).toBe(1)
    expect(wrapper.emitted('head-clicked')[0][0]).toEqual(testFields[0].key) // Field key
    expect(wrapper.emitted('head-clicked')[0][1]).toEqual(testFields[0]) // Field definition
    expect(wrapper.emitted('head-clicked')[0][2]).toBeInstanceOf(MouseEvent) // Event
    expect(wrapper.emitted('head-clicked')[0][3]).toBe(true) // Is footer

    await $ths.at(2).trigger('click')
    expect(wrapper.emitted('head-clicked').length).toBe(2)
    expect(wrapper.emitted('head-clicked')[1][0]).toEqual(testFields[2].key) // Field key
    expect(wrapper.emitted('head-clicked')[1][1]).toEqual(testFields[2]) // Field definition
    expect(wrapper.emitted('head-clicked')[1][2]).toBeInstanceOf(MouseEvent) // Event
    expect(wrapper.emitted('head-clicked')[1][3]).toBe(true) // Is footer

    wrapper.destroy()
  })

  it('should not emit head-clicked event when prop busy is set', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true,
        busy: true,
      },
      listeners: {
        // Head-clicked will not be emitted unless there is a
        // registered head-clicked listener
        'head-clicked': () => {},
      },
    })
    expect(wrapper).toBeDefined()
    const $ths = wrapper.findAll('tfoot > tr > th')
    expect($ths.length).toBe(testFields.length)
    expect(wrapper.emitted('head-clicked')).toBeUndefined()
    await $ths.at(0).trigger('click')
    expect(wrapper.emitted('head-clicked')).toBeUndefined()

    wrapper.destroy()
  })

  it('should not emit head-clicked event when vm.localBusy is true', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true,
      },
      listeners: {
        // Head-clicked will not be emitted unless there is a
        // registered head-clicked listener
        'head-clicked': () => {},
      },
    })
    await wrapper.setData({
      localBusy: true,
    })
    expect(wrapper).toBeDefined()
    const $ths = wrapper.findAll('tfoot > tr > th')
    expect($ths.length).toBe(testFields.length)
    expect(wrapper.emitted('head-clicked')).toBeUndefined()
    await $ths.at(0).trigger('click')
    expect(wrapper.emitted('head-clicked')).toBeUndefined()

    wrapper.destroy()
  })

  it('should not emit head-clicked event when clicking on a button or other interactive element', async () => {
    const wrapper = mount(BTable, {
      propsData: {
        fields: testFields,
        items: testItems,
        footClone: true,
      },
      listeners: {
        // Head-clicked will not be emitted unless there is a
        // registered head-clicked listener
        'head-clicked': () => {},
      },
      slots: {
        // In Vue 2.6x, slots get translated into scopedSlots
        'foot(a)': '<button id="a">button</button>',
        'foot(b)': '<input id="b">',
        // Will use `head` slot if foot slot not defined
        'head(c)': '<a href="#" id="c">link</a>',
      },
    })
    expect(wrapper).toBeDefined()
    const $ths = wrapper.findAll('tfoot > tr > th')
    expect($ths.length).toBe(testFields.length)
    expect(wrapper.emitted('head-clicked')).toBeUndefined()

    const $btn = wrapper.find('button[id="a"]')
    expect($btn.exists()).toBe(true)
    await $btn.trigger('click')
    expect(wrapper.emitted('head-clicked')).toBeUndefined()

    const $input = wrapper.find('input[id="b"]')
    expect($input.exists()).toBe(true)
    await $input.trigger('click')
    expect(wrapper.emitted('head-clicked')).toBeUndefined()

    const $link = wrapper.find('a[id="c"]')
    expect($link.exists()).toBe(true)
    await $link.trigger('click')
    expect(wrapper.emitted('head-clicked')).toBeUndefined()

    wrapper.destroy()
  })
})
