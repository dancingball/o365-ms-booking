import { html, css, customElement, property } from 'lit-element'
import {  } from 'lit/decorators.js'
import store from '../store/Stores';
import "@ui5/webcomponents/dist/Calendar.js";
import './o365-booking-staff';
import { MobxLitElement } from '@adobe/lit-mobx';

/**
  * Calender Component
  */
@customElement('o365-booking-calendar')
export class o365BookingCalendar extends MobxLitElement {
  static styles = css`
    .staff-slots-block {
      display: flex;
      flex-direction: column;
    }
    :host(o365-booking-calendar) {
      float: left;
    }
  `
  @property()
  minDate = store.Booking.selectDate;

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <ui5-calendar id="calendar" min-date="${store.Booking.selectedMinCurrentDate}" selectedDates=${store.Booking.selectDate} hide-week-numbers format-pattern="YYYY-MM-dd"
        selection-mode="Single" @selected-dates-change=${this._onDateChange}>
        <ui5-date value=${store.Booking.selectDate}></ui5-date>
      </ui5-calendar>
    `
  }

  private _onDateChange(e: any) {
    store.Booking.selectedDate(e?.detail?.values?.[0], true);
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'o365-booking-calendar': o365BookingCalendar
  }
}
