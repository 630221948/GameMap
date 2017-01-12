var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition() {
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.setCurrent();
    };
    p.onDuring = function (task) {
        if (task.getCurrent() < -1) {
            console.log("You can not kill monster now!!!!");
        }
        else if (task.getCurrent() == -1) {
            task.setCurrent();
            console.log("You can kill monster now!!!!");
        }
        else if (task.getCurrent() >= 0 && task.getCurrent() < 5) {
            task.setCurrent();
            console.log(task.getCurrent());
        }
        else if (task.getCurrent() >= 5) {
            console.log("You have killed enough monsters!!!!");
            ;
        }
    };
    p.onSubmit = function (task) {
        task.setCurrent();
    };
    p.onChange = function (task) {
        this.onDuring(task);
        console.log(task.getCurrent());
    };
    return KillMonsterTaskCondition;
}());
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["TaskCondition","Observer"]);
//# sourceMappingURL=KillMonsterTaskCondition.js.map