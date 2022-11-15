import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/scrollspy';

import { SubscribeForm } from './components/subscribe-form';
import { Navbar } from './components/navbar';
import { Feedback } from './components/feedback';
import { UnsubscribeForm } from './components/unsubscribe-form';

window.customElements.define('app-navbar', Navbar);
window.customElements.define('app-feedback', Feedback);
window.customElements.define('app-subscribe-form', SubscribeForm);
window.customElements.define('app-unsubscribe-form', UnsubscribeForm);