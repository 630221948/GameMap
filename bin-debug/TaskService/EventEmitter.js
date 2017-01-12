var EventEmitter = (function () {
    function EventEmitter() {
        this.taskList = [];
        this.observerList = [];
    }
    var d = __define,c=EventEmitter,p=c.prototype;
    p.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    p.notify = function () {
        var i;
        for (i = 0; i < this.taskList.length; i++) {
            for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
                var observer = _a[_i];
                observer.onChange(this.taskList[i]);
            }
        }
    };
    return EventEmitter;
}());
egret.registerClass(EventEmitter,'EventEmitter');
//# sourceMappingURL=EventEmitter.js.map