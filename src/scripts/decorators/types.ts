export type Constructor<T = {}> = {
    new (...args: any[]): T,
    prototype: T
};
export type ClassDecorator<T, I = any> = <TInner extends Constructor<T>>(Base: TInner) => Constructor<InstanceType<TInner> & I> | void;
export type ElementPropertyDecorator = (target: HTMLElement, propertyKey: string | symbol) => void;