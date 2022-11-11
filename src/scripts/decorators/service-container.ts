import { Descriptor, ServiceProvider } from '../services/service-provider';
import { Component } from './component';
import { INJECT_EVENT_TYPE } from './inject';
import { Constructor, ClassDecorator } from './types';

export const ServiceContainer: (providers: Descriptor[]) => ClassDecorator<Component & HTMLElement> =
    (providers: Descriptor[]) => <T extends Constructor<Component & HTMLElement>>(Base: T) =>
        (<any> class extends Base {
            private readonly provider = new ServiceProvider(providers);

            public async connectedCallback() {
                this.addEventListener(INJECT_EVENT_TYPE, event => {
                    const e = <CustomEvent<Descriptor>> event;
                    e.detail.instance = this.provider.get(e.detail.classType);
                    e.stopPropagation();
                });
                if (super.connectedCallback) await super.connectedCallback();
            }
        })