import { Recaptcha } from "../lib/recaptcha";
import { CaptchaService } from './captcha-service';

export default class implements CaptchaService {
    constructor(grecaptcha: Recaptcha, key: string) {}
    public getResponseToken() { return new Promise<string>(resolve => resolve('token')) }
};