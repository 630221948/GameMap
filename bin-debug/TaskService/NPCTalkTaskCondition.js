var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.setCurrent();
    };
    p.onDuring = function (task) {
        task.setCurrent();
        console.log("对话完毕！！！！！");
    };
    p.onSubmit = function (task) {
        task.setCurrent();
    };
    return NPCTalkTaskCondition;
}());
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition',["TaskCondition"]);
//# sourceMappingURL=NPCTalkTaskCondition.js.map