import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';

/**
* @namespace Exmg
*/
window.Exmg = window.Exmg || {};

/**
`exmg-paper-toolbar` will add configurable toolbar at the top of the table. This toolbar supports
a default and selected state. This state will toggle based on the content provided to the
selected items attribute.

```html
<exmg-paper-toolbar selected-items="[[selectedItems]]">
  <div slot="default">
    <div class="title-container flex">
      <span>Admin Users</span>
    </div>
    <paper-icon-button icon="add"></paper-icon-button>
  </div>
  <div slot="selected">
    <paper-icon-button icon="delete"></paper-icon-button>
  </div>
</exmg-paper-toolbar>
```

### Styling
The following custom properties and mixins are also available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--exmg-paper-toolbar-text-color` | Text color | `87% black`
`--exmg-paper-toolbar-background-color` | Background color | `#f5f5f5`
`--exmg-paper-toolbar` | Mixin applied to the toolbar root element | `{}`
`--exmg-paper-toolbar-selection-background-color` | font color of th on hover | `#E8EFFD`
`--exmg-paper-toolbar-selection` | Mixin applied to the toolbar selection element | `{}`

@customElement
@polymer
@group Exmg Paper Elements
@element exmg-paper-datatable
@demo demo/index.html
*/
export class ExmgPaperToolbarElement extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        position: relative;
        border-bottom: 1px solid var(--divider-color);
        @apply --paper-font-common-base;
        background: var(--exmg-paper-toolbar-background-color, #f5f5f5);
        color: var(--exmg-paper-toolbar-text-color, rgba(0,0,0,.87));
        font-size: 16px;
      }
      #selected-toolbar {
        padding: 0px 24px;
      }
      ::slotted(*) {
        @apply --layout;
        @apply --layout-center;
        @apply --layout-justified;
        padding: 0px 12px 0px 24px;
        height: 56px;
        width: 100%;
        box-sizing: border-box;
      }
      #selected-toolbar {
        @apply --layout;
        @apply --layout-justified;
        background: var(--exmg-paper-toolbar-selection-background-color, #E8EFFD);
        transition: transform .1s linear;
        transform: scale(1,0);
        padding: 0;
        @apply --exmg-paper-toolbar-selection;
      }
      #selected-toolbar[data-visible]{
        transform: scale(1,1);
      }
      #selected-toolbar {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-fit;
      }
      .title-container {
        padding: 0 24px;
      }
    </style>

    <div id="default-toolbar">
      <slot name="default"></slot>
    </div>
    <div id="selected-toolbar" data-visible\$="[[_isSelectedToolbarVisible(_selectedRows)]]">
      <div class="title-container">
        <span>[[_selectedRows]]</span> item<template is="dom-if" if="[[_multipleItemsSelected(_selectedRows)]]">s</template> selected
      </div>
      <div class="toolbar">
        <slot name="selected"></slot>
      </div>
    </div>
    `;
  }

  static get is() {
    return 'exmg-paper-toolbar';
  }
  static get properties() {
    return {
      /**
      * Number of selected rows
      */
      _selectedRows: {
        type: Number,
        value: 0,
      },

      /**
      * When `multiSelection` is true, this is an array that contains the selected items.
      */
      selectedItems: {
        type: Object,
      },
    };
  }
  static get observers() {
    return [
      '_selectedItemsChanged(selectedItems.*)',
    ];
  }
  _selectedItemsChanged(changes) {
    if (changes.path === 'selectedItems') {
      this.set('_selectedRows', changes.value === null ? 0 : Array.isArray(changes.value) ? changes.value.length : 1);
    }
    if (changes.path === 'selectedItems.length') {
      this.set('_selectedRows', changes.value);
    }
  }
  _isSelectedToolbarVisible() {
    return this._selectedRows > 0 ? true : false;
  }
  _multipleItemsSelected() {
    return this._selectedRows > 1 ? true : false;
  }
}

window.customElements.define(ExmgPaperToolbarElement.is, ExmgPaperToolbarElement);

Exmg.ExmgPaperToolbarElement = ExmgPaperToolbarElement;
