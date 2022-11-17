import { Recaptcha } from "../lib/recaptcha";

export class CaptchaService {
    constructor(_grecaptcha: Recaptcha, _key: string) {}
    public getResponseToken() { return new Promise<string>(resolve => resolve('token')) }
};