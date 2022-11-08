import {
    FASTElement,
    html,
    observable,
    customElement,
    css,
} from "@microsoft/fast-element";
import type { TextField } from "@fluentui/web-components";

const template = html<o365BookingSetting>`
    <form @submit=${x=> x.submitPluginSetting()}>
        <fluent-text-field :value=${x=> x.clientId}
            @input=${(x, c) => x.onInputChange(c.event, 'clientId')} >
        </fluent-text-field>
        <fluent-text-field :value=${x=> x.applicationKey}
            @input=${(x, c) => x.onInputChange(c.event, 'applicationKey')}>
        </fluent-text-field>
        <fluent-text-field :value=${x=> x.tenantName}
            @input=${(x, c) => x.onInputChange(c.event, 'tenantName')}>
        </fluent-text-field>
        <fluent-text-field :value=${x=> x.authEndPoint}
            @input=${(x, c) => x.onInputChange(c.event, 'authEndPoint')}>
        </fluent-text-field>
        <fluent-text-field :value=${x=> x.graphEndPoint}
            @input=${(x, c) => x.onInputChange(c.event, 'graphEndPoint')}>
        </fluent-text-field>
        <fluent-button type="submit" appearance="accent" ?disabled=${true}>
            Submit
        </fluent-button>
    </form>
`;

export interface pluginSettingType {
    clientId: string;
    applicationKey: string;
    tenantName: string;
    authEndPoint: string;
    graphEndPoint: string;
}

const pluginSetting: pluginSettingType = {
    clientId: '65913b83-1c00-4a26-b4c5-2250c6dfd2f3',
    applicationKey: 'vFGd65E~T7s_Kfa.WZj72pj5JifdsOC.AP',
    tenantName: 'dwsnow',
    authEndPoint: 'https://login.microsoftonline.com',
    graphEndPoint: 'https://login.microsoftonline.com'
};

const styles = css`
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    fluent-button {
        margin: 4px;
    }

    fluent-text-field {
        width: 60%;
        border: 1px solid black;
    }
`;

@customElement({
    name: "o365-booking-setting",
    template,
    styles,
})
export class o365BookingSetting extends FASTElement {
    @observable public clientId: string = '65913b83-1c00-4a26-b4c5-2250c6dfd2f3';
    @observable public applicationKey: string = 'vFGd65E~T7s_Kfa.WZj72pj5JifdsOC.AP';
    @observable public tenantName: string = 'dwsnow';
    @observable public authEndPoint: string = 'https://login.microsoftonline.com';
    @observable public graphEndPoint: string = 'https://login.microsoftonline.com'


    public submitPluginSetting() {
        // API call and get access token
        console.log(this.clientId, this.tenantName);
        // this.$emit("todo-submit", this.clientId);
    }

    public onInputChange(event: Event, type: string) {
        let value = (event.target! as TextField).value;
        if (type === 'clientId') {
            this.clientId = value;
        }
        if (type === 'applicationKey') {
            this.applicationKey = value;
        }
        if (type === 'tenantName') {
            this.tenantName = value;
        }
        if (type === 'authEndPoint') {
            this.authEndPoint = value;
        }
        if (type === 'graphEndPoint') {
            this.graphEndPoint = value;
        }
    }
}
