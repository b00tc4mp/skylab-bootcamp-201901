Function.prototype.bind = (function (origBind) {
    return function () {
        var fn = origBind.apply(this, arguments);

        fn.__origFn__ = this.__origFn__ || this;

        return fn;
    };
})(Function.prototype.bind);

Function.prototype.unbind = function () {
    return this.__origFn__;
};