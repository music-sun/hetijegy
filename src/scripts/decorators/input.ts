type ElementPropertyDecorator = (target: HTMLElement, propertyKey: string | symbol) => void;

export const Input: (name?: string) => ElementPropertyDecorator =
    name => (target: HTMLElement, propertyKey: string | symbol) => {
        const attributeName = name ?? propertyKey as string;
        const privateKey = `_private_${propertyKey.toString()}`;

        Object.defineProperty(target, propertyKey, {
            get(this: HTMLElement): any {
                if (!(<any>this)[privateKey]) {
                    Object.defineProperty(this, privateKey, {
                        value: getValue(this, attributeName),
                        writable: false
                    });
                }

                return (<any>this)[privateKey];
            },
            set(this: HTMLElement, v: any): any {
                (<any>this)[privateKey] = getValue(this, attributeName) || v;
            }
        });
    }

    function getValue(element: HTMLElement, attributeName: string) {
        return element.getAttribute(attributeName) ||
            (element.hasAttribute(`[${attributeName}]`) ? eval('(' + element.getAttribute(`[${attributeName}]`) + ')') : undefined);
    }