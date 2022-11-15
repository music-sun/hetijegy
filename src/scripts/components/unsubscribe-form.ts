import { Reference } from '../decorators/reference';
import { AlertFeedbackForm } from './alert-feedback-form';

const SUCCESS_MESSAGE   = 'Sikeresen leiratkoztál!';
const ERROR_MESSAGE     = 'Hiba történt, kérjük, próbáld újra!';

export class UnsubscribeForm extends AlertFeedbackForm {

    @Reference('#unsubscribe-email') private input!: HTMLInputElement;

    protected getResponse(): Promise<Response> {
        return this.client.unsubscribe(this.input.value);
    }

    protected async getMessage(response: Response) {
        return response.ok ? SUCCESS_MESSAGE : ERROR_MESSAGE;
    }
}