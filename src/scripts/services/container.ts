import { Recaptcha } from '../lib/recaptcha';
import { CaptchaService } from './captcha-service';
import { ServiceClient } from './service-client';

declare let grecaptcha: Recaptcha;

const suffix = import.meta.env.MODE === 'no-api' ? 'no-api' : 'default';

const serviceClientConstructor = (await import(`./service-client.${suffix}.ts`)).default;
const captchaServiceConstructor =  (await import(`./captcha-service.${suffix}.ts`)).default;

export const serviceClient = new serviceClientConstructor(import.meta.env.VITE_BASE_URL) as ServiceClient;
export const captchaService = new captchaServiceConstructor(grecaptcha, import.meta.env.VITE_CAPTCHA_SITE_KEY) as CaptchaService;