import { Component } from '../decorators/component';
import { Inject } from '../decorators/inject';
import { Reference } from '../decorators/reference';
import { CaptchaService } from '../services/captcha-service';
import { AlertFeedbackForm } from './alert-feedback-form';

const INVALID_EMAIL = ['Hibás e-mail címet adtál meg!'];
const USER_EXISTS   = ['Ezzel a címmel már regisztráltak!'];
const NO_ROBOT      = ['Robotok nem iratkozhatnak fel :('];
const SUCCESS       = ['Sikeres feliratkozás!'];
const UNKNOWN_ERROR = ['Váratlan hiba történt, próbáld újra!'];

@Component({
    selector: 'app-subscribe-form'
})
export class SubscribeForm extends AlertFeedbackForm {

    @Reference('#subscribe-email') private input!: HTMLInputElement;

    @Inject(CaptchaService) private captchaService!: CaptchaService;

    protected async getResponse(): Promise<Response> {
        const responseToken = await this.captchaService.getResponseToken();
        return await this.client.subscribe(this.input.value, responseToken);
    }

    protected async getMessage(response: Response) {
        if (response.ok) {
            window.location.href = (await response.json()).redirect;
            return SUCCESS;
        }

        if (response.status === 400) {
            const data = await response.json();

            if (data.error === 'invalid_email') return INVALID_EMAIL;
            if (data.error === 'user_exists') return USER_EXISTS;
            return NO_ROBOT;
        }

        return UNKNOWN_ERROR;
    }
}