var SceneService = (function (_super) {
    __extends(SceneService, _super);
    function SceneService() {
        _super.call(this);
        SceneService.count++;
        if (SceneService.count > 1) {
            throw 'Singleton!!!!!!!!';
        }
    }
    var d = __define,c=SceneService,p=c.prototype;
    SceneService.getInstance = function () {
        if (SceneService.instance == null) {
            SceneService.instance = new SceneService();
        }
        return SceneService.instance;
    };
    p.getTaskByCustomRole = function (Rule) {
        return Rule(this.taskList);
    };
    p.Rule = function (taskList) {
        var i;
        for (i = 0; i < taskList.length; i++) {
            //if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.CAN_SUBMIT || taskList[i].status == TaskStatus.DURING) {
            if (taskList[i].status != TaskStatus.UNACCEPTABLE) {
                console.log("TaskFound!!!!!!!!");
                return taskList[i];
            }
            else {
                console.log("TaskNotFound!!!!!!!!");
                return null;
            }
        }
    };
    SceneService.count = 0;
    return SceneService;
}(EventEmitter));
egret.registerClass(SceneService,'SceneService');
//# sourceMappingURL=SceneService.js.map