import {PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 *  `exmg-paper-data-filter` is filter element that lets you filter local data sets.
 *
 * ```html
 * <iron-ajax url="data/contacts.json" last-response="{{rawItems}}" auto></iron-ajax>
 *
 * <exmg-paper-data-filter
 *  raw-items="[[rawItems]]"
 *  items="{{filteredItems}}"
 *  filter-value="[[filterValue]]"
 *  filter-fields="name,email">
 * </exmg-paper-data-filter>
 *
 * <input is="iron-input" bind-value="{{filterValue}}">
 *
 *  <exmg-paper-datatable>
 *    <exmg-paper-tbody items='[[filteredItems]]'>
 *      <template>
 *       ...
 *      </template>
 *    </exmg-paper-tbody>
 *  </exmg-paper-datatable>
 * ```
 * @customElement
 * @polymer
 * @memberof Exmg
 * @group Exmg Paper Elements
 * @element exmg-paper-datatable
 * @demo demo/index.html
 */
export class DataFilterElement extends PolymerElement {
  static get is() {
    return 'exmg-paper-data-filter';
  }
  static get properties() {
    return {
      /**
       * Raw item list
       */
      rawItems: {
        type: Array,
      },

      /**
       * This array will conatin the filtered items list
       */
      items: {
        type: Array,
        notify: true,
      },

      /**
       * Text string used for filtering the fields.
       */
      filterValue: {
        type: String,
      },

      /**
       * Comma seperated list of filter fields.
       */
      filterFields: {
        type: String,
      },
    };
  }

  static get observers() {
    return [
      '_updateItems(rawItems.*, filterValue, filterFields)',
    ];
  }

  _updateItems() {
    /* Skip if raw items or filterfields are not set */
    if (!this.rawItems || !this.filterFields) {
      return;
    }

    /* return all items when filter is empty */
    if (!this.filterValue || this.filterValue === '') {
      this.set('items', []);
      this.set('items', this.rawItems);
      return;
    }

    /* Look for occurances of the filter value in the item fields */
    const items = [];
    const filterFields = this.filterFields.split(',');
    this.rawItems.forEach((o) => {
      filterFields.some((p) => o[p].indexOf(this.filterValue) !== -1) && items.push(o);
    });

    /* Reset result array before adding new results */
    this.set('items', []);
    this.set('items', items);
  }
}
window.customElements.define(DataFilterElement.is, DataFilterElement);

Exmg.DataFilterElement = DataFilterElement;

