import { Recaptcha } from "../lib/recaptcha";

export class CaptchaService {
    constructor(grecaptcha: Recaptcha, key: string) {}
    public getResponseToken() { return 'token' }
};