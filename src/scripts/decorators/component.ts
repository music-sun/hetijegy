import { Constructor, ClassDecorator } from './types'

export interface Component {
    selector: string;
    connectedCallback?(): void | Promise<void>;
}

export const Component: <T extends HTMLElement>(config: Component) => ClassDecorator<T> =
    <T extends HTMLElement>(config: Component) => <TInner extends Constructor<T>>(Base: TInner) => {
        Object.defineProperties(Base.prototype, {
            selector: { value: config.selector }
        });
        window.customElements.define(config.selector, Base);
    }