# Form Select

> Bootstrap custom `<select>` using custom styles. Optionally specify options based on an array,
> array of objects, or an object.

Generate your select options by passing an array or object to the `options` props:

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
    <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true },
        ],
      }
    },
  }
</script>

<!-- b-form-select-options.vue -->
```

You can even define option groups with the `options` prop:

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option', disabled: true },
          {
            label: 'Grouped options',
            options: [
              { value: { C: '3PO' }, text: 'Option with object value' },
              { value: { R: '2D2' }, text: 'Another option with object value' },
            ],
          },
        ],
      }
    },
  }
</script>

<!-- b-form-select-options.vue -->
```

Or manually provide your options and option groups:

```html
<template>
  <div>
    <b-form-select v-model="selected" class="mb-3">
      <b-form-select-option :value="null">Please select an option</b-form-select-option>
      <b-form-select-option value="a">Option A</b-form-select-option>
      <b-form-select-option value="b" disabled>Option B (disabled)</b-form-select-option>
      <b-form-select-option-group label="Grouped options">
        <b-form-select-option :value="{ C: '3PO' }">Option with object value</b-form-select-option>
        <b-form-select-option :value="{ R: '2D2' }"
          >Another option with object value</b-form-select-option
        >
      </b-form-select-option-group>
    </b-form-select>

    <div class="mt-2">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
      }
    },
  }
</script>

<!-- b-form-select-manual.vue -->
```

Feel free to mix the `options` prop with `<b-form-select-option>` and
`<b-form-select-option-group>`. Manually placed options and option groups will appear _below_ the
options generated via the `options` prop. To place manual options and option groups _above_ the
options specified by the `options` prop, use the named slot `first`.

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options" class="mb-3">
      <!-- This slot appears above the options from 'options' prop -->
      <template #first>
        <b-form-select-option :value="null" disabled
          >-- Please select an option --</b-form-select-option
        >
      </template>

      <!-- These options will appear after the ones from 'options' prop -->
      <b-form-select-option value="C">Option C</b-form-select-option>
      <b-form-select-option value="D">Option D</b-form-select-option>
    </b-form-select>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: 'A', text: 'Option A (from options prop)' },
          { value: 'B', text: 'Option B (from options prop)' },
        ],
      }
    },
  }
</script>

<!-- b-form-select-both.vue -->
```

## Options property

`options` can be an array of strings or objects, or a key-value object. Available fields:

- **`value`** The selected value which will be set on `v-model`
- **`disabled`** Disables item for selection
- **`text`** Display text, or **`html`** Display basic inline html

`value` can be a string, number, or simple object. Avoid using complex types in values.

If both `html` and `text` are provided, `html` will take precedence. Only basic/native HTML is
supported in the `html` field (components will not work). Note that not all browsers will render
inline html (i.e. `<i>`, `<strong>`, etc.) inside `<option>` elements of a `<select>`.

<p class="alert alert-danger">
  <strong>Be cautious</strong> of placing user supplied content in the <code>html</code> field,
  as it may make you vulnerable to
  <a class="alert-link" href="https://en.wikipedia.org/wiki/Cross-site_scripting">
  <abbr title="Cross Site Scripting Attacks">XSS attacks</abbr></a>, if you do not first
  <a class="alert-link" href="https://en.wikipedia.org/wiki/HTML_sanitization">sanitize</a> the
  user supplied string.
</p>

### Options as an array

<!-- eslint-disable no-unused-vars -->

```js
const options = ['A', 'B', 'C', { text: 'D', value: { d: 1 }, disabled: true }, 'E', 'F']
```

If an array entry is a string, it will be used for both the generated `value` and `text` fields.

You can mix using strings and [objects](#options-as-an-array-of-objects) in the array.

Internally, BootstrapVue will convert the above array to the following array (the
[array of objects](#options-as-an-array-of-objects)) format:

<!-- eslint-disable no-unused-vars -->

```js
const options = [
  { text: 'A', value: 'A', disabled: false },
  { text: 'B', value: 'B', disabled: false },
  { text: 'C', value: 'C', disabled: false },
  { text: 'D', value: { d: 1 }, disabled: true },
  { text: 'E', value: 'E', disabled: false },
  { text: 'F', value: 'F', disabled: false },
]
```

### Options as an array of objects

<!-- eslint-disable no-unused-vars -->

```js
const options = [
  { text: 'Item 1', value: 'first' },
  { text: 'Item 2', value: 'second' },
  { html: '<b>Item</b> 3', value: 'third', disabled: true },
  { text: 'Item 4' },
  { text: 'Item 5', value: { foo: 'bar', baz: true } },
]
```

If `value` is missing, then `text` will be used as both the `value` and `text` fields. If you use
the `html` property, you **must** supply a `value` property.

<span class="badge badge-info">New in v2.2.0</span> To define option groups, just add an object with
a `label` prop as the groups name and a `options` property with the array of options of the group.

<!-- eslint-disable no-unused-vars -->

```js
const options = [
  { text: 'Item 1', value: 'first' },
  { text: 'Item 2', value: 'second' },
  {
    label: 'Grouped options',
    options: [{ html: '<b>Item</b> 3', value: 'third', disabled: true }, { text: 'Item 4' }],
  },
  { text: 'Item 5', value: { foo: 'bar', baz: true } },
]
```

### Options as an object

<span class="badge badge-warning">Deprecated</span>

Keys are mapped to `value` and values are mapped to option `text`.

<!-- eslint-disable no-unused-vars -->

```js
const options = {
  a: 'Item A',
  b: 'Item B',
  c: { html: 'Item C', disabled: true },
  d: { text: 'Item D', value: 'overridden_value' },
  e: { text: 'Item E', value: { foo: 'bar', baz: true } },
}
```

Internally, BootstrapVue will convert the above object to the following array (the
[array of objects](#options-as-an-array-of-objects)) format:

<!-- eslint-disable no-unused-vars -->

```js
const options = [
  { text: 'Item A', value: 'a', disabled: false },
  { text: 'Item B', value: 'b', disabled: false },
  { html: 'Item C', value: 'c', disabled: false },
  { text: 'Item D', value: 'overridden_value', disabled: true },
  { text: 'Item E', value: { foo: 'bar', baz: true }, disabled: false },
]
```

**Note:** When using the Object format, the order of the final array is **not** guaranteed. For this
reason, it is recommended to use either of the previously mentioned array formats.

### Changing the option field names

If you want to customize the field property names (for example using `name` field for display
`text`) you can easily change them by setting the `text-field`, `htms-field`, `value-field`, and
`disabled-field` props to a string that contains the property name you would like to use:

```html
<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-select>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: 'A',
        options: [
          { item: 'A', name: 'Option A' },
          { item: 'B', name: 'Option B' },
          { item: 'D', name: 'Option C', notEnabled: true },
          { item: { d: 1 }, name: 'Option D' },
        ],
      }
    },
  }
</script>

<!-- b-form-select-options-fields.vue -->
```

### Option notes

If the initial value of your `v-model` expression does not match any of the options, the
`<b-form-select>` component (which is a native HTML5 `<select>` under the hood) will render in an
_unselected_ state. On iOS this will cause the user not being able to select the first item because
iOS does not fire a change event in this case. It is therefore recommended to provide a disabled
option with an empty value as your first option.

```html
<b-form-select v-model="selected" :options="options">
  <template #first>
    <b-form-select-option value="" disabled>-- Please select an option --</b-form-select-option>
  </template>
</b-form-select>
```

See the [Vue select](https://vuejs.org/v2/guide/forms.html#Select) documentation for more details.

## Standard (single) select

By default, Bootstrap v4's custom select styling is applied.

### Value in single mode

In non `multiple` mode, `<b-form-select>` returns the a single `value` of the currently selected
option.

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select some item' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Default Selected Option' },
          { value: 'c', text: 'This is another option' },
          { value: 'd', text: 'This one is disabled', disabled: true },
        ],
      }
    },
  }
</script>

<!-- b-form-select-single.vue -->
```

### Select sizing (displayed rows)

You can use the `select-size` prop to switch the custom select into a select list-box, rather than a
dropdown. Set the `select-size` prop to a numerical value greater than 1 to control how many rows of
options are visible.

Note when `select-size` is set to a value greater than 1, the Bootstrap v4 custom styling will
**not** be applied, unless the `multiple` prop is also set.

Note that not all mobile browsers will show the select as a list-box.

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options" :select-size="4"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select some item' },
          { value: 'a', text: 'This is option a' },
          { value: 'b', text: 'Default Selected Option b' },
          { value: 'c', text: 'This is option c' },
          { value: 'd', text: 'This one is disabled', disabled: true },
          { value: 'e', text: 'This is option e' },
          { value: 'e', text: 'This is option f' },
        ],
      }
    },
  }
</script>

<!-- b-form-select-size.vue -->
```

## Multiple select support

Enable multiple select mode by setting the prop `multiple`, and control how many rows are displayed
in the multiple select list-box by setting `select-size` to the number of rows to display. The
default is to let the browser use its default (typically 4).

### Value in multiple mode

In `multiple` mode, `<b-form-select>` always returns an array of option values. You **must** provide
an array reference as your `v-model` when in `multiple` mode.

```html
<template>
  <div>
    <b-form-select v-model="selected" :options="options" multiple :select-size="4"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: ['b'], // Array reference
        options: [
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Default Selected Option' },
          { value: 'c', text: 'This is another option' },
          { value: 'd', text: 'This one is disabled', disabled: true },
          { value: 'e', text: 'This is option e' },
          { value: 'f', text: 'This is option f' },
          { value: 'g', text: 'This is option g' },
        ],
      }
    },
  }
</script>

<!-- b-form-select-multiple-mode.vue -->
```

## Control sizing

Set the form-control text size using the `size` prop to `sm` or `lg` for small or large
respectively.

By default `<b-form-select>` will occupy the full width of the container that it appears in. To
control the select width, place the input inside standard Bootstrap grid column.

## Autofocus

When the `autofocus` prop is set on `<b-form-select>`, the select will be auto-focused when it is
inserted (i.e. **mounted**) into the document or re-activated when inside a Vue `<keep-alive>`
component. Note that this prop **does not** set the `autofocus` attribute on the select, nor can it
tell when the select becomes visible.

## Contextual states

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

- `false` (denotes invalid state) is great for when there's a blocking or required field. A user
  must fill in this field properly to submit the form.
- `true` (denotes valid state) is ideal for situations when you have per-field validation throughout
  a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `<b-form-select>`, set the `state` prop to `false`
(for invalid), `true` (for valid), or `null` (no validation state).

### Conveying contextual validation state to assistive technologies and colorblind users

Using these contextual states to denote the state of a form control only provides a visual,
color-based indication, which will not be conveyed to users of assistive technologies - such as
screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could include a
hint about state in the form control's `<label>` text itself, or by providing an additional help
text block (via `<b-form-group>` or `<b-form-*-feedback>`). Specifically for assistive technologies,
invalid form controls can also be assigned an `aria-invalid="true"` attribute (see below).

### ARIA `aria-invalid` attribute:

When `<b-form-select>` has an invalid contextual state (i.e. state = `false`) you may also want to
set the `<b-form-select>` prop `aria-invalid` to `true`.

Supported `invalid` values are:

- `false` (default) No errors detected
- `true` The value has failed validation.

When `state` is set to `false`, aria-invalid will also be set to true.

## Non custom select

Set the prop `plain` to have a native browser `<select>` rendered (although the class
`.form-control` will always be placed on the select).

A `plain` select will always be rendered for non `multiple` selects which have the `select-size`
prop set to a value greater than 1.

<!-- Component reference added automatically from component package.json -->
