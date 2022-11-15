import { delay } from '../lib/animation';
import { Displayable } from '../decorators/displayable';
import { Fadeable } from '../decorators/fadeable';
import { Transitionable } from '../decorators/transitionable';
import { Input } from '../decorators/input';
import { Reference } from '../decorators/reference';

export interface Feedback extends Displayable, Transitionable, Fadeable {}

@Fadeable
@Transitionable
@Displayable
export class Feedback extends HTMLElement {

    @Input() protected timeout = 3000;

    @Input('success-bg') protected successBg!: string;

    @Input('error-bg') protected errorBg!: string;

    @Reference('.feedback-content') protected feedbackContent!: HTMLElement;

    public showSuccess(content: string) {
        return this.show(this.successBg, content);
    }

    public showError(content: string) {
        return this.show(this.errorBg, content);
    }

    public async toastSuccess(content: string) {
        await this.showSuccess(content);

        await this.toast();
    }

    public async toastError(content: string) {
        await this.showError(content);

        await this.toast();
    }

    public async hide() {
        await this.hideFade(true);

        this.classList.remove(this.errorBg, this.successBg);
    }

    protected show(cssClass: string, content: string) {
        this.classList.add(cssClass);

        this.setContent(content);

        return this.showFade(true);
    }

    protected async toast() {
        await delay(this.timeout);

        await this.hide();
    }

    protected setContent(content: string) {
        this.feedbackContent.innerText = content;
    }
}