var MockMonsterKill = (function (_super) {
    __extends(MockMonsterKill, _super);
    function MockMonsterKill(sceneService) {
        _super.call(this);
        this.killMonster = this.createBitmapByName("Enemy_png");
        this.killMonster.alpha = 1;
        this.killMonster.touchEnabled = true;
        this.addChild(this.killMonster);
        this.killMonster.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.sceneService = sceneService;
    }
    var d = __define,c=MockMonsterKill,p=c.prototype;
    p.onButtonClick = function () {
        //this.killMonster.touchEnabled = false;
        //this.killMonster.visible = false;
        this.sceneService.notify();
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return MockMonsterKill;
}(egret.DisplayObjectContainer));
egret.registerClass(MockMonsterKill,'MockMonsterKill');
//# sourceMappingURL=MockMonsterKill.js.map