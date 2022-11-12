import { Recaptcha } from "../lib/recaptcha";
import { CaptchaService } from './captcha-service';

export default class implements CaptchaService {
    constructor(private service: Recaptcha, private siteKey: string) {}

    public getResponseToken() {
        return new Promise<string>(resolve => {
            this.service.ready(() =>
                this.service.execute(this.siteKey, { action: 'submit' })
                    .then(responseToken => resolve(responseToken)));
        });
    }
}