import '../scss/styles.scss';

import { Collapse, ScrollSpy } from 'bootstrap';

import { SubscribeForm } from './components/subscribe-form';
import { Navbar } from './components/navbar';
import { Feedback } from './components/feedback';
import { Recaptcha } from './lib/recaptcha';
import { Component } from './decorators/component';
import { ServiceContainer } from './decorators/service-container';
import { ServiceClient } from './services/service-client';
import { CaptchaService } from './services/captcha-service';
import config from './config';

declare let grecaptcha: Recaptcha;

interface Main extends Component {}

@Component({
    selector: 'app-main'
})
@ServiceContainer([
    { classType: ServiceClient, instance: new ServiceClient(config.baseUrl) },
    { classType: CaptchaService, instance: new CaptchaService(grecaptcha, config.captchaSiteKey) }
])
class Main extends HTMLElement {}

const components = [
    Navbar,
    Feedback,
    SubscribeForm,
    Main
]