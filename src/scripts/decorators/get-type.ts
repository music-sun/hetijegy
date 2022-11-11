import 'reflect-metadata';

export const getType: <T>(target: any, propertyKey: string | symbol, type?: T) => T =
    (target, propertyKey, type) => {
        type ??= Reflect.getMetadata('design:type', target, propertyKey);

        if (!type) {
            throw new Error(`No type found for ${type}`);
        }

        return type;
    }