export class ServiceClient  {
    constructor (baseUrl: string) {}

    public subscribe(email: string, token: string) {
        return {
            ok: true,
            json: function() {
                return new Promise(resolve => resolve(({ redirect: window.location.href })))
            }
        } as Response;
    }

    public unsubscribe(email: string) {
        return { ok: true } as Response
    }
};
