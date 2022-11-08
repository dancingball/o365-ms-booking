import { html, css, customElement, property, state } from 'lit-element'
import { MobxLitElement } from '@adobe/lit-mobx';
import { create, cssomSheet } from 'twind'
const sheet = cssomSheet({ target: new CSSStyleSheet() });
const { tw } = create({ sheet })
import store from '../store/Stores';
@customElement('o365-booking-form')
export class o365BookingForm extends MobxLitElement {
    constructor() {
        super();
        this._requiredError = ''
      }
    
    static styles = [
        css `
         :host(fluent-text-area)::slotted('textarea'){ 
             height: 10rem;
         }
        `,
        sheet.target
    ]
    @property({ type: String })
    customerName: string = '';
    customerPhone: string = '';
    customerEmail: string = '';
    customerAddress: string = '';
    customerNotes: string = '';
    _requiredError: string = ''

    connectedCallback() {
        super.connectedCallback();
    }
    
    set requiredError(val) {
        let oldVal = this._requiredError;
        this._requiredError = val;
        // this.requestUpdate('requiredError', oldVal);
      }
      get requiredError() { return this._requiredError; }
    

    bookingFormTemplate() {
        return html`
        <div class="${tw`flex flex-row flex-1 p-8`}">
        <div class="${tw`flex flex-col py-4 gap-2 w-1/3`}">
        <fluent-text-field  class="${tw`mb-2`}" :value=${this.customerName} @input=${(e: any) => this.onInputChange(e, 'customerName')} type="text" name="customerName" id="customerName" maxlength="20" required placeholder="Your Name"></fluent-text-field>
        <fluent-text-field :value=${this.customerPhone} @input=${(e: any) => this.onInputChange(e, 'customerPhone')} type="tel" name="customerPhone" id="customerPhone" placeholder="1 (123)
            456-7890" ></fluent-text-field>
        <fluent-text-field :value=${this.customerEmail} @input=${(e: any) => this.onInputChange(e, 'customerEmail')} type="email" name="customerEmail" id="customerEmail"
            placeholder="me@mydomainname.com" ></fluent-text-field>
        <fluent-text-field :value=${this.customerAddress} @input=${(e: any) => this.onInputChange(e, 'customerAddress')} type="text" name="customerAddress" id="customerEmail" placeholder="Address
            here" ></fluent-text-field>
        <fluent-button class="${tw`mt-8 place-self-end`}" @click=${this.submitBooking} appearance="accent" >Submit</fluent-button>
        <div class="${tw`text-sm text-red-600 text-center`}">${this.requiredError}</div>
        </div>
        <div class="${tw`ml-4 gap-2`}">
            <div class="${tw`text-sm`}">Please let us know if you have any special requests. Thank you.</div>
        <fluent-text-area class="${tw`w-full h-80`}" :value=${this.customerNotes} resize="both" @input=${(e: any) => this.onInputChange(e, 'customerNotes')} type="text" name="customerNotes" id="customerNotes" placeholder="Message" >
        </fluent-text-area>
        </div>
        </div>`;
    } 

      private submitBooking() {
        // API call and get access token
        console.log(this.customerName, this.customerPhone, this.customerEmail, this.customerNotes);
        if(!this.customerName && !this.customerPhone && !this.customerEmail &&  !this.customerAddress) {
            this.requiredError = 'please required all field';
            return;
        }
        this.requiredError = '';
        store.Booking.createAppointment({
            name : this.customerName,
            phone: this.customerPhone,
            email: this.customerEmail,
            address : this.customerAddress,
            notes: this.customerNotes
        })
    }

    private onInputChange(event: any, type: string) {
        let value = event?.target?.value;
        if (type === 'customerName') {
            this.customerName = value;
        }
        if (type === 'customerPhone') {
            this.customerPhone = value;
        }
        if (type === 'customerEmail') {
            this.customerEmail = value;
        }
        if (type === 'customerAddress') {
            this.customerAddress = value;
        }
        if (type === 'customerNotes') {
            this.customerNotes = value;
        }
    }

    render() {
        return html`
        ${this.bookingFormTemplate()}`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'o365-booking-form': o365BookingForm
    }
}


