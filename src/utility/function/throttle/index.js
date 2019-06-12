/**
 * Creates a function that, when executed, will only call
 * the fn function at most once per every interval milliseconds.
 *
 * throttle(fn, interval):Function
 *
 * If the throttled function is invoked more than once during the
 * wait timeout, fn will also be called on the trailing edge of the timeout.
 *
 * Subsequent calls to the throttled function will return the result of the last fn call.
 *
 * EX:
 * const lazyRedraw = throttle(redraw, 300);
 * foo.on.resize.add(lazyRedraw);
 *
 * lazyRedraw();
 * setTimeout(function(){
 *      lazyRedraw();
 *
 *      lazyRedraw will be called only once since 'cancel' was called before
 *      the 'interval' for 2nd call completed
 *
 *      lazyRedraw.cancel();
 * }, 250);
 *
 */

function now()  {
    return (+new Date());
}

function throttle(fn, delay){
    let context;
    let timeout;
    let result;
    let args;
    let diff;
    let prevCall = 0;

    function delayed(){
        prevCall = now();
        timeout = null;
        result = fn.apply(context, args);
    }
    function throttled(){
        context = this;
        args = arguments;
        diff = delay - (now() - prevCall);
        if (diff <= 0) {
            clearTimeout(timeout);
            delayed();
        } else if (! timeout) {
            timeout = setTimeout(delayed, diff);
        }
        return result;
    }
    throttled.cancel = function(){
        clearTimeout(timeout);
    };
    return throttled;
}

export default throttle;
