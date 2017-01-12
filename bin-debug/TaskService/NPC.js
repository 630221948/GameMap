var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(NPCID, dialoguePanel, npcTexture) {
        var _this = this;
        _super.call(this);
        this.NPCBitmap = npcTexture;
        this.emoji0 = this.createBitmapByName("emoji0_png");
        this.emoji1 = this.createBitmapByName("emoji1_png");
        this.addChild(this.emoji0);
        this.addChild(this.emoji1);
        this.addChild(this.NPCBitmap);
        this.NPCBitmap.y = 50;
        this.emoji0.x = 40;
        this.emoji1.x = 40;
        this.emoji1.alpha = 0;
        this.emoji0.alpha = 0;
        this.NPCID = NPCID;
        this.dialoguePanel = dialoguePanel;
        this.$touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onNPCClick();
        }, this);
        this.npcTalkTaskCondition = new NPCTalkTaskCondition();
        this.killMonsterTaskCondition = new KillMonsterTaskCondition();
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onNPCClick = function () {
        var taskService = TaskService.getInstance();
        var task = taskService.getTaskByCustomRole(taskService.Rule); /////////////完成任务后，再次进入回调时，task为空，因为状态为submitted
        var sceneService = SceneService.getInstance();
        var task1 = sceneService.getTaskByCustomRole(sceneService.Rule);
        if (task != null) {
            console.log("找到这个任务了");
        }
        if (task == null) {
            console.log("Nothing here!!!");
        }
        else if (this.NPCID == "00" && task.getCurrent() == -1) {
            this.dialoguePanel.alpha = 1;
            this.dialoguePanel.task = task;
            this.dialoguePanel.taskDesc.$setText("嘿！我有一个新手任务！请用鼠标点目标NPC");
            this.dialoguePanel.setButtonEnable();
            this.emoji0.alpha = 0;
            this.emoji1.alpha = 0;
        }
        else if (this.NPCID == "00" && task.getCurrent() == 1) {
            this.dialoguePanel.alpha = 1;
            this.dialoguePanel.task = task;
            this.dialoguePanel.taskDesc.$setText("厉害了，我的哥，你做到了！！！");
            this.dialoguePanel.setButtonEnable();
            this.emoji0.alpha = 0;
            this.emoji1.alpha = 0;
        }
        else if (this.NPCID == "01" && task.getCurrent() == 0) {
            this.npcTalkTaskCondition.onDuring(task);
            taskService.notify();
            console.log("233333333");
        }
        else if (this.NPCID == "02" && task1.getCurrent() == -2) {
            this.killMonsterTaskCondition.onAccept(task1);
            sceneService.notify();
            this.emoji0.alpha = 0;
            this.emoji1.alpha = 0;
            console.log(task1.getCurrent());
        }
        else if (this.NPCID == "02" && task1.getCurrent() == 5) {
            this.killMonsterTaskCondition.onSubmit(task1);
            sceneService.notify();
            this.emoji0.alpha = 0;
            this.emoji1.alpha = 0;
            console.log(task1.getCurrent());
        }
        else if (task.getCurrent() > 1) {
            console.log("I Got Nothing To Do With You Right Now!!!");
            console.log(task.getCurrent());
        }
    };
    p.onChange = function (task) {
        if (task.getCurrent() == -1) {
            if (this.NPCID == "00") {
                console.log("From NPC IN!");
                console.log(task.getCurrent());
                this.emoji0.alpha = 1;
                this.emoji1.alpha = 0;
            }
            else if (this.NPCID == "01") {
                console.log("To NPC IN!");
                //console.log(task.status);
                this.emoji0.alpha = 0;
                this.emoji1.alpha = 0;
            }
        }
        else if (task.getCurrent() == 0) {
            if (this.NPCID == "00") {
                console.log("From NPC IN!");
                console.log(task.getCurrent());
                this.emoji0.alpha = 0;
                this.emoji1.alpha = 0;
            }
            else if (this.NPCID == "01") {
                console.log("To NPC IN!");
                //console.log(task.status);
                this.emoji0.alpha = 1;
                this.emoji1.alpha = 0;
            }
        }
        else if (task.getCurrent() == 1) {
            if (this.NPCID == "00") {
                console.log("From NPC IN!");
                console.log(task.getCurrent());
                this.emoji0.alpha = 0;
                this.emoji1.alpha = 1;
            }
            else if (this.NPCID == "01") {
                console.log("To NPC IN!");
                //console.log(task.status);
                this.emoji0.alpha = 0;
                this.emoji1.alpha = 0;
            }
        }
        else if (task.getCurrent() == 5) {
            if (this.NPCID == "02") {
                //console.log("From NPC IN!");
                console.log(task.getCurrent());
                this.emoji0.alpha = 0;
                this.emoji1.alpha = 1;
            }
        }
        else if (task.getCurrent() == -2) {
            if (this.NPCID == "02") {
                console.log("kkkkkkkkkkkkkiiiiiiiiiiiiiiiiillllllllllll!");
                console.log(task.getCurrent());
                this.emoji0.alpha = 1;
                this.emoji1.alpha = 0;
            }
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map