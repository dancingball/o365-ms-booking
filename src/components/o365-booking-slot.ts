import { html, css, customElement, property } from 'lit-element'
import store from '../store/Stores';
import "@ui5/webcomponents/dist/ToggleButton";
import { MobxLitElement } from '@adobe/lit-mobx';

@customElement('o365-booking-slot')
export class o365BookingSlot extends MobxLitElement {
  static styles = css`
    /* ui5-button.pink-dotted::part(button):hover {
      background-color: #b437b6;
    } */
    :host(o365-booking-slot) {
      display: inline-block;
      width: 20rem;
      margin-top: 2rem;
    }
  `
  /**
   * The number of times the button has been clicked.
   */
  @property()
  _selectedSlot: any = null;
  connectedCallback() {
    super.connectedCallback();
  }

  set selectedSlot(val) {
    let oldVal = this._selectedSlot;
    this._selectedSlot = val;
    this.requestUpdate('selectedSlot', oldVal);
  }
  get selectedSlot() { return this._selectedSlot; }
  render() {
    return html`
    ${store.Booking.bookingSlots.map((slot: any, index: number) => html`
    <fluent-button appearance="${this.selectedSlot !== index ? 'nautral': 'accent'}" @click=${()=> this._onSelectedTimeSlot(slot,
      index)}>${slot}</fluent-button>
    `)}
    `
  }

  private _onSelectedTimeSlot(slot: any, index: number) {
    console.log('e', slot);
    this.selectedSlot = index;
    store.Booking.setSelectedTimeSlot(slot, index);
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'o365-booking-slot': o365BookingSlot
  }
}
