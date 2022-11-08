import {  css } from 'lit';
import { html, customElement, property } from 'lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import '@ui5/webcomponents/dist/Calendar.js';
import '@ui5/webcomponents/dist/TabContainer';
import '@ui5/webcomponents/dist/Tab';
import '@ui5/webcomponents/dist/TabSeparator';
import '@ui5/webcomponents/dist/Icon.js';
import '@ui5/webcomponents-icons/dist/message-information.js';
import store from '../store/Stores';


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('o365-booking-services')
export class o365BookingServices extends MobxLitElement {
  static styles = css`
    .booking-services {
      display: flex;
      list-style-type: none;
      border: 1px solid black;
      align-items: center;
      justify-content: space-evenly;
      width: auto;
      height: 50px;
    }

    .booking-services li {
      border-right: 1px solid black;
      cursor: pointer;
    }

    .list-text {
      display: inline-block;
      align-self: center;
      margin: 0px 8px;
      flex: 1;
    }
  `;

  @property()
  _activeTab: any = null;

  set activeService(val) {
    let oldVal = this._activeTab;
    this._activeTab = val;
    debugger;

    // this.requestUpdate('activeService', oldVal);
  }
  get activeService() {
    return this._activeTab;
  }
  connectedCallback() {
    super.connectedCallback();
    store.Booking.bookingServices();
  }

  // modalTemplate() {
  //     return html `<fluent-dialog id="foo" aria-label="Simple dialog" modal="true">
  //     <h2>Dialog with text and button. The button should recieve focus</h2>
  //     <button>Button A</button>
  //     <button id="element" autofocus>Should autofocus</button>
  //   </fluent-dialog>`
  // }

  servicesTemplate() {
    return html` <ui5-tabcontainer class="full-width" collapsed fixed show-overflow @tab-select=${this.selectedService}>
      ${store.Booking.services.map((service: any) => html` <ui5-tab text=${service.displayName}> </ui5-tab> `)}
    </ui5-tabcontainer>`;
  }

  private selectedService(e: any) {
    debugger;
    const selectedServiceIdx = e.detail.tabIndex;
    const selectedService = store.Booking.services[selectedServiceIdx];
    store.Booking.setSelectedService(selectedService);
  }

  render() {
    return html` ${this.servicesTemplate()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'o365-booking-services': o365BookingServices;
  }
}
