import 'reflect-metadata';
import { Constructor } from '../decorators/types';

export interface Descriptor<T = any> {
    classType: Constructor<T>;
    instance?: T;
}

export class ServiceProvider {
    private readonly container = new Map<Constructor, Descriptor<any>>();

    public constructor(providers: Descriptor[]) {
        providers.forEach(item => this.provide(item.classType, item.instance));
    }

    public provide<T>(classType: Constructor<T>, instance?: T) {
        this.container.set(classType, { classType, instance });
    }

    public get<T>(classType: Constructor<T>): T {
        const item = this.container.get(classType);

        if (!item) {
            throw new Error(`No provider found for ${classType}`);
        }   

        if (!item.instance) {
            const params = this.getInjectedParams(item.classType);
            const instance = Reflect.construct(classType, params);
            this.container.set(classType, { classType, instance });
            return instance;
        }

        return item.instance;
    }

    private getInjectedParams(target: Function): any[] {
        const paramTypes = <Constructor[]> Reflect.getMetadata('design:paramtypes', target);
    
        if (paramTypes === undefined) return [];
    
        return paramTypes.map((classType: Constructor) => this.get(classType))
    }
}