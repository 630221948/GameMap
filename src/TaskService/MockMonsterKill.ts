class MockMonsterKill extends egret.DisplayObjectContainer {
	private killMonster: egret.Bitmap;
	private MonsterHP: egret.Bitmap;
	private sceneService:SceneService;

	public constructor(sceneService:SceneService) {
		super();
		this.killMonster = this.createBitmapByName("Enemy_png");
		this.killMonster.alpha = 1;
		this.killMonster.touchEnabled = true;
		this.addChild(this.killMonster);
		this.killMonster.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);
		
		this.sceneService = sceneService;
	}

	public onButtonClick(): void {
		//this.killMonster.touchEnabled = false;
		//this.killMonster.visible = false;
		this.sceneService.notify();
	}

	private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}