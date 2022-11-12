export interface ServiceClient {
    subscribe(email: string, responseToken: string): Promise<Response>,
    unsubscribe(email: string): Promise<Response>
}