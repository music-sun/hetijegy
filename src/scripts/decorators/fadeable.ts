import { decorate } from './decorate';
import { Displayable } from './displayable';
import { Transitionable } from './transitionable';

export interface Fadeable {
    showFade(toggleDisplay: boolean): Promise<void>;
    hideFade(toggleDisplay: boolean): Promise<void>;
}

const FADE_TOGGLE_CLASS = 'show';

interface FadeableBase extends HTMLElement, Transitionable, Displayable {};

export const Fadeable = (target: any, propertyKey?: string | symbol) =>
    decorate(target, propertyKey, {
        showFade: function (this: FadeableBase, toggleDisplay: boolean) {
            return new Promise<void>(resolve => {
                if (toggleDisplay) this.display();

                if (this.classList.contains(FADE_TOGGLE_CLASS)) {
                    resolve();
                    return;
                }
        
                this.getBoundingClientRect();

                this.waitTransition('visibility', resolve);
                this.classList.add(FADE_TOGGLE_CLASS);
            });
        },
        hideFade: function (this: FadeableBase, toggleDisplay: boolean) {
            return new Promise<void>(resolve => {
                if(!this.classList.contains(FADE_TOGGLE_CLASS)) {
                    resolve();
                    return;
                }

                this.waitTransition('visibility', () => {
                    if (toggleDisplay) this.displayNone();
                    this.getBoundingClientRect();
                    resolve();
                });
                
                this.classList.remove(FADE_TOGGLE_CLASS);
            });
        }
    });