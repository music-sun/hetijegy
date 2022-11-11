export const bindAnimationFrame = (fn: (...args: any[]) => void) => {
    let running = false;
    let args: any[];
    
    const run = () => {
        running = false;
        fn(args);
    }

    return (...inputArgs: any[]) => {
        args = inputArgs;
        if (running) return;

        running = true;
        window.requestAnimationFrame(run);
    }
}

export const delay = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));