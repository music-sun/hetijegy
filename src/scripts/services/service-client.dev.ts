import { ServiceClient } from './service-client';

export default class implements ServiceClient {
    constructor (baseUrl: string) {}

    public subscribe(email: string, token: string) {
        return new Promise<Response>(r => r({
            ok: true,
            json: function() {
                return new Promise(resolve => resolve(({ redirect: window.location.href })))
            }
        } as Response));
    }

    public unsubscribe(email: string) {
        return new Promise<Response>(resolve => resolve({ ok: true } as Response));
    }
};
