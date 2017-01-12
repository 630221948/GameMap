var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel() {
        _super.call(this);
        this.taskHint = new egret.TextField();
        this.taskHint.$setText("");
        this.taskHint.size = 24;
        this.taskHint.textColor = 0x000000;
        this.addChild(this.taskHint);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        var taskID = task.getTaskID();
        if (taskID == "00" && task.getCurrent() == 0) {
            this.taskHint.$setText("您已接受新手任务");
        }
        else if (taskID == "00" && task.getCurrent() == 1) {
            this.taskHint.$setText("您已完成新手任务,可以提交！");
        }
        else if (taskID == "00" && task.getCurrent() > 1) {
            this.taskHint.$setText("新手任务提交完毕！！！");
        }
        else if (taskID == "01" && task.getCurrent() == -1) {
            this.taskHint.$setText("您已接受杀怪任务！");
        }
        else if (taskID == "01" && task.getCurrent() > 0 && task.getCurrent() <= 5) {
            this.taskHint.$setText("杀死怪物：" + task.getCurrent() + "/5");
        }
        else if (taskID == "01" && task.getCurrent() > 5) {
            this.taskHint.$setText("您已完成杀怪任务！！！");
        }
        console.log("233333333");
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map