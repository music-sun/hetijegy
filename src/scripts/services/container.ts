import { Recaptcha } from '../lib/recaptcha';
import { CaptchaService } from 'captcha-service';
import { ServiceClient } from 'service-client';

declare let grecaptcha: Recaptcha;

export const serviceClient = new ServiceClient(import.meta.env.VITE_BASE_URL);
export const captchaService = new CaptchaService(grecaptcha, import.meta.env.VITE_CAPTCHA_SITE_KEY);