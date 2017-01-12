var Task = (function () {
    function Task(id, name, desc, current, total) {
        this.status = TaskStatus.ACCEPTABLE;
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.current = current;
        this.total = total;
    }
    var d = __define,c=Task,p=c.prototype;
    p.getCurrent = function () {
        return this.current;
    };
    p.setCurrent = function () {
        this.current++;
    };
    p.getTaskID = function () {
        return this.id;
    };
    p.finish = function (id) {
        if (!id) {
            return ErrorCode.TASK_MISSING;
        }
        var i;
        for (i = 0; i < TaskService.getInstance().taskList.length; i++) {
            if (TaskService.getInstance().taskList[i].id == id) {
                break;
            }
        }
        if (!TaskService.getInstance().taskList[i]) {
            return ErrorCode.TASK_MISSING;
        }
        TaskService.getInstance().taskList[i].status = TaskStatus.SUBMITTED;
        TaskService.getInstance().notify();
        return ErrorCode.SUCCEED;
    };
    p.accept = function (id) {
        if (!id) {
            return ErrorCode.TASK_MISSING;
        }
        var i;
        for (i = 0; i < TaskService.getInstance().taskList.length; i++) {
            if (TaskService.getInstance().taskList[i].id == id) {
                break;
            }
        }
        if (!TaskService.getInstance().taskList[i]) {
            return ErrorCode.TASK_MISSING;
        }
        TaskService.getInstance().taskList[i].status = TaskStatus.DURING;
        TaskService.getInstance().notify();
        return ErrorCode.SUCCEED;
    };
    p.during = function (id) {
        if (!id) {
            return ErrorCode.TASK_MISSING;
        }
        var i;
        for (i = 0; i < TaskService.getInstance().taskList.length; i++) {
            if (TaskService.getInstance().taskList[i].id == id) {
                break;
            }
        }
        if (!TaskService.getInstance().taskList[i]) {
            return ErrorCode.TASK_MISSING;
        }
        TaskService.getInstance().taskList[i].status = TaskStatus.CAN_SUBMIT;
        TaskService.getInstance().notify();
        return ErrorCode.SUCCEED;
    };
    return Task;
}());
egret.registerClass(Task,'Task',["TaskConditionContext"]);
//# sourceMappingURL=Task.js.map