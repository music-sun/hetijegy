export class ServiceClient {
    constructor (_baseUrl: string) {}

    public subscribe(_email: string, _token: string) {
        return new Promise<Response>(r => r({
            ok: true,
            json: function() {
                return new Promise(resolve => resolve(({ redirect: window.location.href })))
            }
        } as Response));
    }

    public unsubscribe(_email: string) {
        return new Promise<Response>(resolve => resolve({ ok: true } as Response));
    }
};
