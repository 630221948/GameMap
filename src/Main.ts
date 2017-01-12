class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {

        //let clickLayer: number = 0;
        let scene = new GameScene();
        this.addChild(scene);

        let bullet_0: Bullet = new Bullet(BulletType.NORMAL, BulletLvl.GENERAL);          //0型加成为0：相当于没有

        let bullet_1: Bullet = new Bullet(BulletType.JHP, BulletLvl.GENERAL);

        let fist: Weapon = new Weapon(1, Quality.WHITE, bullet_0, 1, "赤手空拳")

        let UMP45: Weapon = new Weapon(10, Quality.WHITE, bullet_1, 10, "UMP45");

        let Wu: Hero = new Hero(100, 5, fist, "不知火舞");
        //let laoer: Hero = new Hero();
        let heroTeam: Hero[] = [];
        heroTeam.push(Wu);
        //heroTeam.push(laoer);
        let user: User = new User(0, 0, 0, 0, heroTeam);
        console.log(user.fightPower);

        let stageW: number = this.stage.stageWidth;
        let stageH: number = this.stage.stageHeight;

        let gridMap = new GridMap(scene);

        let idledata = RES.getRes("PLAYER_IDLE_json");
        let idletxtr = RES.getRes("PLAYER_IDLE_png");
        let idle_mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(idledata, idletxtr);
        let playeridle_mc: egret.MovieClip = new egret.MovieClip(idle_mcFactory.generateMovieClipData("Anim0"));

        let walkdata = RES.getRes("PLAYER_WALK_json");
        let walktxtr = RES.getRes("PLAYER_WALK_png");
        let walk_mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(walkdata, walktxtr);
        let playerwalk_mc: egret.MovieClip = new egret.MovieClip(walk_mcFactory.generateMovieClipData("Anim1"));
        //this.addChild(playeridle_mc);
        //playeridle_mc.gotoAndPlay(1,-1);

        let PlayerContainer = new egret.DisplayObjectContainer();
        PlayerContainer.touchEnabled = true;
        PlayerContainer.width = 100;
        PlayerContainer.height = 100;
        scene.addChild(PlayerContainer);
        PlayerContainer.addChild(playeridle_mc);
        PlayerContainer.addChild(playerwalk_mc);
        playerwalk_mc.gotoAndPlay(1, -1);
        playeridle_mc.gotoAndPlay(1, -1);
        playeridle_mc.alpha = 0;
        playerwalk_mc.alpha = 0;
        // this.touchEnabled = true;

        scene.addChild(PlayerContainer);
        GameScene.replaceScene(scene);

        ///////////////////////////////////////////////////////////////////////////

        var taskService: TaskService = TaskService.getInstance();
        var sceneService: SceneService = SceneService.getInstance();

        var npcTexture: egret.Bitmap;

        var dialoguePanel: TaskDialoguePanel = new TaskDialoguePanel();
        dialoguePanel.y = 50
        this.addChild(dialoguePanel);

        var dialoguePanel1: TaskDialoguePanel = new TaskDialoguePanel();
        dialoguePanel1.y = 650
        this.addChild(dialoguePanel1);

        npcTexture = this.createBitmapByName("npc_0_png")                      //新手任务npc
        var Npc_0: NPC = new NPC("00", dialoguePanel, npcTexture);
        Npc_0.x = 600;
        Npc_0.y = 380;
        Npc_0.scaleX = 0.35;
        Npc_0.scaleY = 0.35;
        this.addChild(Npc_0);

        npcTexture = this.createBitmapByName("npc_1_png")                          //新手任务点击nppc
        var Npc_1: NPC = new NPC("01", dialoguePanel, npcTexture);
        Npc_1.x = 300;
        Npc_1.y = 0;
        Npc_1.scaleX = 0.35;
        Npc_1.scaleY = 0.35;
        this.addChild(Npc_1);

        npcTexture = this.createBitmapByName("npc_2_png")                        ///打怪任务npc
        var Npc_2: NPC = new NPC("02", dialoguePanel1, npcTexture);
        Npc_2.x = 420;
        Npc_2.y = 600;
        Npc_2.scaleX = 0.1;
        Npc_2.scaleY = 0.1;
        this.addChild(Npc_2);

        // npcTexture = this.createBitmapByName("Enemy_png")
        // var Enemy_0: NPC = new NPC("02", dialoguePanel, npcTexture);
        // Enemy_0.x = 0;
        // Enemy_0.y = 900;
        // Enemy_0.scaleX = 0.2;
        // Enemy_0.scaleY = 0.2;
        // this.addChild(Enemy_0);

        var taskPanel: TaskPanel = new TaskPanel();
        taskPanel.x = 800;
        taskPanel.y = 950;
        this.addChild(taskPanel);

        var task_0: Task = new Task("00", "新手任务", "我有一个新手任务！请用鼠标点目标NPC！", -1, 1);
        var task_1: Task = new Task("02", "打怪任务", "我有一个打怪任务！请用鼠标点目标NPC！", -2, 1);

        var mockMosterKill: MockMonsterKill = new MockMonsterKill(sceneService);
        mockMosterKill.x = 0;
        mockMosterKill.y = 900;
        mockMosterKill.scaleX = 0.2;
        mockMosterKill.scaleY = 0.2;
        this.addChild(mockMosterKill);

        var killMonsterTaskCondition: KillMonsterTaskCondition = new KillMonsterTaskCondition();

        taskService.observerList.push(Npc_0);
        taskService.observerList.push(Npc_1);
        taskService.observerList.push(taskPanel);
        taskService.taskList.push(task_0);
        taskService.notify();

        sceneService.observerList.push(killMonsterTaskCondition);
        sceneService.observerList.push(Npc_2);
        sceneService.observerList.push(taskPanel);
        sceneService.taskList.push(task_1);
        sceneService.notify();

        //////////////////////////////////////////

        let exitButton: egret.Bitmap = this.createBitmapByName("exitbutton_png");

        let UMP45Icon: egret.Bitmap = this.createBitmapByName("UMP45_png")
        UMP45Icon.x = 0;
        UMP45Icon.y = 700;
        this.addChild(UMP45Icon);

        let wuIcon: egret.Bitmap = this.createBitmapByName("Wu_png");
        wuIcon.scaleX = 0.5;
        wuIcon.scaleY = 0.5;

        let heroesInfoField: egret.TextField = new egret.TextField();
        let heroesPanel = new egret.DisplayObjectContainer();

        let panelY = 0;

        heroesPanel.x = -300;
        heroesPanel.width = 200;
        heroesPanel.height = 400;

        let panelMap: egret.Shape = new egret.Shape()
        heroesPanel.addChild(panelMap);
        panelMap.graphics.beginFill(0x000000)
        panelMap.graphics.drawRect(0, 0, 300, 250);
        panelMap.graphics.endFill();
        panelMap.alpha = 0.7;

        heroesPanel.addChild(wuIcon);
        wuIcon.x = 180;
        wuIcon.y = 0;

        heroesPanel.addChild(exitButton);
        exitButton.scaleX = 0.5;
        exitButton.scaleY = 0.5;
        exitButton.x = 240
        exitButton.y = 200
        //exitButton.touchEnabled

        //

        //;
        // for (let h of user.hero) {
        //     heroesInfoField = displayUtils(h);
        //     heroesInfoField.y = panelY;
        //     heroesPanel.addChild(heroesInfoField);
        //     panelY += 200;
        // }

        this.addChild(heroesPanel);

        PlayerContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
            console.log("233333")
            for (let h of user.hero) {
                heroesInfoField.y = panelY;
                heroesInfoField = displayUtils(h);
                heroesPanel.addChild(heroesInfoField);
                panelY += 200
            }
            let tw = egret.Tween.get(heroesPanel);
            tw.to({ x: 20 }, 500);
            exitButton.touchEnabled = true;
            GameScene.clickLayer = 2;
        }, this, false, 2);

        exitButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
            let tw = egret.Tween.get(heroesPanel);
            tw.to({ x: -300 }, 500);
            exitButton.touchEnabled = false;
            heroesPanel.removeChild(heroesInfoField);
            GameScene.clickLayer = 1;
        }, this, false, 1);


        let m: StateMachine = new StateMachine(this, playeridle_mc, PlayerContainer, playerwalk_mc);
        //m.setState("move");

        scene.setMoveFuncInfo(m, gridMap, UMP45Icon, user, UMP45);

        let interval: any;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
            // clickLayer--;
            // if (clickLayer == -1) {
            //     let astar: AStar = new AStar(gridMap);

            //     egret.stopTick(moveFunction, this);
            //     clearInterval(interval);

            //     m.x = e.stageX;
            //     m.y = e.stageY;

            //     let MaxLength = 0;
            //     let RatioX;
            //     let RatioY;

            //     let nodeCounts: number = gridMap.getNodeCounts()

            //     let endXPos = Math.floor(e.stageX / nodeCounts);            //终点的x和y值（行和列数）
            //     let endYPos = Math.floor(e.stageY / nodeCounts);
            //     let startXPos = Math.floor(m.PlayerContainer.x / nodeCounts);//起点的x和y值（行和列数）
            //     let startYPos = Math.floor(m.PlayerContainer.y / nodeCounts);


            //     if (astar.findPath(gridMap.getNode(startXPos, startYPos), gridMap.getNode(endXPos, endYPos))) { //传入起点和终点
            //         astar._path.map((tile) => {
            //             console.log(`x:${tile.x},y:${tile.y}`)
            //         });
            //     }

            //     let pathLength: number = astar._path.length;
            //     let i: number = 0;

            //     astar._path.shift();                           //弹出第一个节点，防止第一次移动时原地踏步
            //     interval = setInterval(() => {
            //         let pos = astar._path.shift();
            //         m.x = pos.x * nodeCounts;
            //         m.y = pos.y * nodeCounts;
            //         let dx = m.x - m.PlayerContainer.x;
            //         let dy = m.y - m.PlayerContainer.y;
            //         MaxLength = Math.pow(dx * dx + dy * dy, 1 / 2);
            //         RatioX = dx / MaxLength;
            //         RatioY = dy / MaxLength;
            //         m.RatioX = RatioX;
            //         m.RatioY = RatioY;
            //         m.setState("move");
            //         m.timeOnEnterFrame = egret.getTimer();
            //         egret.startTick(moveFunction, this);
            //         /*console.log("当前终点：" + m.x + "   " + m.y);
            //         console.log("当前i：" + i);
            //         console.log("数组长度：" + astar._path.length);             
            //         console.log("path中节点数量："+pathLength);
            //         console.log("节点下标记录i的值"+i);*/
            //         i++;
            //         if (i == pathLength - 1) {
            //             console.log("2332322322323232323232332323")
            //             clearInterval(interval);
            //             i = 0;
            //         }
            //     }, 400);
            //     clickLayer++;
            // }

        }, this, false, 0);



    }


    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}


