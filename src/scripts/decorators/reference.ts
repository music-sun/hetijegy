import { getType } from './get-type';

export interface Reference extends HTMLElement {}

export const Reference: (selector: string) => PropertyDecorator =
    selector => (target: Object, propertyKey: string | symbol) => {

        const isArray = getType(target, propertyKey) === Array;
        
        Object.defineProperty(target, propertyKey, {
            get: function(this: HTMLElement) {
                const privateKey = `_private_${propertyKey.toString()}`;

                if (!(<any>this)[privateKey]) {
                    Object.defineProperty(this, privateKey, {
                        value: isArray ?
                            Array.from(this.querySelectorAll<HTMLElement>(selector)) :
                            this.querySelector<HTMLElement>(selector),
                        writable: false
                    })
                }

                return (<any>this)[privateKey];
            },
            configurable: true
        });
    }