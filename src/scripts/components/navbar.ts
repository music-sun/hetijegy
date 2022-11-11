import { bindAnimationFrame } from '../lib/animation';
import { Collapse } from 'bootstrap';
import { Reference } from '../decorators/reference';
import { Component } from '../decorators/component';

const NAVBAR_TOGGLE_CLASS = 'navbar-shrink';

@Component({
    selector: 'app-navbar'
})
export class Navbar extends HTMLElement {

    @Reference('#navbar-responsive-menu') private menu!: HTMLElement;

    @Reference('a[href*="#"]:not([href="#"])') private links!: HTMLElement[];

    public connectedCallback() {
        const collapse = () =>
            window.scrollY > 100 ?
            this.classList.add(NAVBAR_TOGGLE_CLASS) :
            this.classList.remove(NAVBAR_TOGGLE_CLASS);

        collapse();

        window.addEventListener('scroll', bindAnimationFrame(collapse));

        this.links.forEach(element =>
            element.addEventListener('click', () => Collapse.getInstance(this.menu)?.hide()));
    }
}