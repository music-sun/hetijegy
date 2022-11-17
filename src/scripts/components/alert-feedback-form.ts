import { Displayable } from '../decorators/displayable';
import { Fadeable } from '../decorators/fadeable';
import { Reference } from '../decorators/reference';
import { Transitionable } from '../decorators/transitionable';
import { serviceClient } from '../services/container';
import { ServiceClient } from 'service-client';
import { Feedback } from './feedback';

export abstract class AlertFeedbackForm extends HTMLElement {

    protected client: ServiceClient;

    @Fadeable
    @Transitionable
    @Displayable
    @Reference('.form-container')
    protected container!: HTMLElement & Fadeable;

    @Reference('app-feedback') protected feedback!: Feedback;

    @Reference('form') protected form!: HTMLFormElement;

    @Reference('fieldset') protected fieldset!: HTMLFieldSetElement;

    @Displayable
    @Reference('button .default-text')
    protected defaultText!: HTMLElement & Displayable;

    @Displayable
    @Reference('button .loading-text')
    protected loadingText!: HTMLElement & Displayable;

    constructor() {
        super();
        this.client = serviceClient;
    }

    public connectedCallback(): void {
        this.form.addEventListener('submit', async (event) => {
            event.preventDefault();

            await this.handleSubmit();
        })
    }

    protected setLoadingState(isLoading: boolean) {
        this.fieldset.disabled = isLoading;
        this.defaultText.displayToggle();
        this.loadingText.displayToggle();
    }

    protected async handleSubmit() {
        this.setLoadingState(true);

        const response = await this.getResponse();

        this.setLoadingState(false);

        await this.container.hideFade(false);

        this.form.reset();

        await this.showFeedback(response);

        await this.container.showFade(false);
    }

    protected abstract getResponse(): Promise<Response>;

    protected async showFeedback(response: Response) {
        const content = await this.getMessage(response);
        await (response.ok ? this.feedback.toastSuccess(content) : this.feedback.toastError(content));
    }

    protected abstract getMessage(response: Response): Promise<string>;
}