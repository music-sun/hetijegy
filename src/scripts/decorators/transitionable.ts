import { decorate } from './decorate';

export interface Transitionable {
    waitTransition(propertyName: string, fn: () => any): void;
}

export const Transitionable = (target: any, propertyKey?: string | symbol) =>
    decorate(target, propertyKey, {
        waitTransition: function (this: HTMLElement, propertyName: string, fn: () => any) {
            const listener = (event: Event) => {
                if ((event as TransitionEvent).propertyName !== propertyName) return;
        
                this.removeEventListener(event.type, listener);
                fn();
            }
        
            this.addEventListener('transitionend', listener);
        }
    });