/**
 * Debounce callback execution
 *
 * debounce(fn, delay[, isAsap]):Function
 *
 * Creates a function that will delay the execution of fn until after delay
 * milliseconds have elapsed since the last time it was invoked.
 *
 * Subsequent calls to the debounced function will return the result of the
 * last fn call.
 *
 * sometimes less is more
 *
 * const lazyRedraw = debounce(redraw, 300);
 * foo.on.resize.add(lazyRedraw);
 * lazyRedraw won't be called since `cancel` was called before the `delay`
 * lazyRedraw.cancel();
 *
 * */

function debounce(fn, threshold, isAsap){
    let timeout;
    let result;

    function debounced(){
        const args = arguments;
        const context = this;

        function delayed(){
            if (! isAsap) {
                result = fn.apply(context, args);
            }
            timeout = null;
        }

        if (timeout) {
            clearTimeout(timeout);
        } else if (isAsap) {
            result = fn.apply(context, args);
        }

        timeout = setTimeout(delayed, threshold);

        return result;
    }

    debounced.cancel = function(){
        clearTimeout(timeout);
    };

    return debounced;
}

export default debounce;
