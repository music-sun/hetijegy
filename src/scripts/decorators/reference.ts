export interface Reference extends HTMLElement {}

export const Reference: (selector: string) => PropertyDecorator =
    selector => (target: Object, propertyKey: string | symbol) => {
        Object.defineProperty(target, propertyKey, {
            get: function(this: HTMLElement) {
                const privateKey = `_private_${propertyKey.toString()}`;

                if (!(<any>this)[privateKey]) {
                    const items = this.querySelectorAll<HTMLElement>(selector);

                    const value = items.length < 1 ? undefined :
                        (items.length < 2 ? items.item(0) : Array.from(items));

                    Object.defineProperty(this, privateKey, {
                        value,
                        writable: false
                    })
                }
                return (<any>this)[privateKey];
            },
            configurable: true
        });
    }