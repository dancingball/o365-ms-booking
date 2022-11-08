import { html, css, customElement } from 'lit-element'
import { MobxLitElement } from '@adobe/lit-mobx';
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Icon.js";
import store from '../store/Stores';
import './o365-booking-slot';

// import '../styles.css';
/**
 * Booking Staff Component.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('o365-booking-staff')
export class o365BookingStaff extends MobxLitElement {
    
    static styles = css`
    .selector-staff-member {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    :host(o365-booking-staff) {
      display: flex;
      margin-top: 2rem;
    }
    .staff-selector {
        width: 15vw; 
    }
  `
    connectedCallback() {
        super.connectedCallback();
    }

    staffTemplate() {
        if (!store.Booking.selectedServiceStaffMembers.length) {
            return html`<ui5-label class="border-black">Select a service and date to see available times.</ui5-label>`
        }
        if (store.Booking.selectedServiceStaffMembers.length) {
            return html`
            <fluent-select @change=${this.selectedStaff} value=${store.Booking.selectedStaff[0].id}>
                ${store.Booking.selectedServiceStaffMembers.map((member: any) => html`
                <fluent-option value=${member.id}>${member.displayName}</fluent-option>`)}
            </fluent-select>
                `;
        }
    }

    private selectedStaff(e: any) {
        // check select service
        store.Booking.selectedStaffMember(e?.detail?.value);
    }

    render() {
        return html`
        ${this.staffTemplate()}
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'o365-booking-staff.ts': o365BookingStaff
    }
}

