import { decorate } from './decorate';

export interface Displayable {
    display(): void;
    displayNone(): void;
    displayToggle(): void;
}

const DISPLAY_CLASS = 'd-none';

export const Displayable = (target: any, propertyKey?: string | symbol) => 
    decorate(target, propertyKey, {
        display: function (this: HTMLElement) {
            this.classList.remove(DISPLAY_CLASS);
        },
        displayNone: function (this: HTMLElement) {
            this.classList.add(DISPLAY_CLASS);
        },
        displayToggle: function (this: HTMLElement) {
            this.classList.toggle(DISPLAY_CLASS);
        }
    });