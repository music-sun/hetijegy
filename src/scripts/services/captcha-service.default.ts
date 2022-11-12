import { Recaptcha } from "../lib/recaptcha";

export class CaptchaService {
    constructor(private service: Recaptcha, private siteKey: string) {}

    public getResponseToken() {
        return new Promise<string>(resolve => {
            this.service.ready(() =>
                this.service.execute(this.siteKey, { action: 'submit' })
                    .then(responseToken => resolve(responseToken)));
        });
    }
}