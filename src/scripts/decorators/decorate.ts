export function decorate(target: any, propertyKey: string | symbol | undefined, assign: any) {
    if (!propertyKey) {
        Object.assign(target.prototype, assign);
        return;
    }
    
    const original = Object.getOwnPropertyDescriptor(target, propertyKey);
    Object.defineProperty(target, propertyKey, {
        get: function(this: HTMLElement) {
            const value = original?.get?.call(this);
            return Array.isArray(value) ? value.map(item => Object.assign(item, assign)) : Object.assign(value, assign);
        },
        configurable: true
    });
}