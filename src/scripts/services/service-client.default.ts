export class ServiceClient {
    constructor(private baseUrl: string) { }

    public subscribe(email: string, responseToken: string) {
        return this.response(`${this.baseUrl}subscribe`, 'POST', { email, responseToken });
    }

    public unsubscribe(email: string) {
        return this.response(`${this.baseUrl}unsubscribe`, 'POST', { email });
    }

    private response(url: string, method: string, content: any) {
        return fetch(url, {
            method: method,
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content)
        });
    }
}