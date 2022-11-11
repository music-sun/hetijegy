import { Descriptor } from '../services/service-provider';
import { getType } from './get-type';
import { Constructor, ElementPropertyDecorator } from './types';

export const INJECT_EVENT_TYPE = 'provide-request';

export const Inject: <T extends Constructor>(classType?: T) => ElementPropertyDecorator =
    <T extends Constructor>(classType?: T) => (target: HTMLElement, propertyKey: string | symbol) => {
        const type = getType(target, propertyKey, classType);

        const event = createEvent(type);

        const property: PropertyDescriptor = {
            get(this: HTMLElement): any {
                if (!event.detail.instance) {
                    this.dispatchEvent(event);
                }
                return event.detail.instance;
            }
        }

        Object.defineProperty(target, propertyKey, property);
    }

const createEvent: <T>(classType: Constructor<T>) => CustomEvent<Descriptor<T>> =
    <T>(classType: Constructor<T>) => new CustomEvent<Descriptor<T>>(INJECT_EVENT_TYPE, {
        detail: { classType },
        bubbles: true,
        composed: true
    });