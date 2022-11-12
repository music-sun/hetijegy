export interface CaptchaService {
    getResponseToken(): Promise<string>
}