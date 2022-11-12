import { UnsubscribeForm } from './components/unsubscribe-form';
import config from './config';

import { Component } from './decorators/component';
import { ServiceContainer } from './decorators/service-container';
import { ServiceClient } from './services/service-client.default';

interface Unsubscribe extends Component {}

@Component({
    selector: 'app-unsubscribe'
})
@ServiceContainer([
    { classType: ServiceClient, instance: new ServiceClient(config.baseUrl) }
])
class Unsubscribe extends HTMLElement {}

const components = [ UnsubscribeForm ]