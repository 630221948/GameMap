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

        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;

        var gridMap = new GridMap(this);

        var idledata = RES.getRes("PLAYER_IDLE_json");
        var idletxtr = RES.getRes("PLAYER_IDLE_png");
        var idle_mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(idledata, idletxtr);
        var playeridle_mc: egret.MovieClip = new egret.MovieClip(idle_mcFactory.generateMovieClipData("Anim0"));

        var walkdata = RES.getRes("PLAYER_WALK_json");
        var walktxtr = RES.getRes("PLAYER_WALK_png");
        var walk_mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(walkdata, walktxtr);
        var playerwalk_mc: egret.MovieClip = new egret.MovieClip(walk_mcFactory.generateMovieClipData("Anim1"));
        //this.addChild(playeridle_mc);
        //playeridle_mc.gotoAndPlay(1,-1);

        var PlayerContainer = new egret.DisplayObjectContainer();
        this.addChild(PlayerContainer);
        PlayerContainer.addChild(playeridle_mc);
        PlayerContainer.addChild(playerwalk_mc);
        playerwalk_mc.gotoAndPlay(1, -1);
        playeridle_mc.gotoAndPlay(1, -1);
        playeridle_mc.alpha = 0;
        playerwalk_mc.alpha = 0;
        // this.touchEnabled = true;




        var m: StateMachine = new StateMachine(this, playeridle_mc, PlayerContainer, playerwalk_mc);
        //m.setState("move");

        var interval:any;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
            var astar: AStar = new AStar(gridMap);

            egret.stopTick(moveFunction,this);
            clearInterval(interval);

            m.x = e.stageX;
            m.y = e.stageY;
            //console.log("TargetX==============" + e.stageX);

            var MaxLength = 0;
            var RatioX;
            var RatioY;
            //var dx = e.stageX - PlayerContainer.x;
            //var dy = e.stageY - PlayerContainer.y;
            //MaxLength = Math.pow(dx*dx+dy*dy,1/2);
            //RatioX = dx / MaxLength;
            //RatioY = dy / MaxLength;
            //m.RatioX = RatioX;
            //m.RatioY = RatioY;

            var nodeCounts: number = gridMap.getNodeCounts()

            var endXPos = Math.floor(e.stageX / nodeCounts);            //终点的x和y值（行和列数）
            var endYPos = Math.floor(e.stageY / nodeCounts);
            var startXPos = Math.floor(m.PlayerContainer.x / nodeCounts);//起点的x和y值（行和列数）
            var startYPos = Math.floor(m.PlayerContainer.y / nodeCounts);


            if (astar.findPath(gridMap.getNode(startXPos, startYPos), gridMap.getNode(endXPos, endYPos))) { //传入起点和终点
                astar._path.map((tile) => {
                    console.log(`x:${tile.x},y:${tile.y}`)
                });
            }

            var pathLength: number = astar._path.length;
            var i: number = 0;

            astar._path.shift();                           //弹出第一个节点，防止第一次移动时原地踏步
            interval = setInterval(() => {
                var pos = astar._path.shift();
                m.x = pos.x * nodeCounts;
                m.y = pos.y * nodeCounts;
                var dx = m.x - m.PlayerContainer.x;
                var dy = m.y - m.PlayerContainer.y;
                MaxLength = Math.pow(dx * dx + dy * dy, 1 / 2);
                RatioX = dx / MaxLength;
                RatioY = dy / MaxLength;
                m.RatioX = RatioX;
                m.RatioY = RatioY;
                m.setState("move");
                m.timeOnEnterFrame = egret.getTimer();
                egret.startTick(moveFunction, this);
                /*console.log("当前终点：" + m.x + "   " + m.y);
                console.log("当前i：" + i);
                console.log("数组长度：" + astar._path.length);             
                console.log("path中节点数量："+pathLength);
                console.log("节点下标记录i的值"+i);*/
                i++;
                if (i == pathLength - 1) {
                    console.log("2332322322323232323232332323")
                    clearInterval(interval);
                    i = 0;
                }
            }, 400);


            /*
                for (var i = 0; i < pathLength; i++) {
                var pos = astar._path.shift();
                m.x = pos.x * nodeCounts;
                m.y = pos.y * nodeCounts;
                var dx = m.x - m.PlayerContainer.x;
                var dy = m.y - m.PlayerContainer.y;
                MaxLength = Math.pow(dx * dx + dy * dy, 1 / 2);
                RatioX = dx / MaxLength;
                RatioY = dy / MaxLength;
                m.RatioX = RatioX;
                m.RatioY = RatioY;
                m.timeOnEnterFrame = egret.getTimer();
                egret.startTick(moveFunction, this);
                //this.addEventListener(egret.Event.ENTER_FRAME, moveFunction, this); 
                console.log("当前终点：" + m.x + "   " + m.y);
                console.log("当前i：" + i);
                console.log("数组长度：" + astar._path.length);
            }
            */



        }, this);

        function moveFunction(): boolean {
            console.log("============开始移动===========");

            var now = egret.getTimer();
            var time = m.timeOnEnterFrame;
            var pass = now - time;
            var speed = 0.3;
            //console.log("Ratio=============="+m.RatioX);
            m.PlayerContainer.x += speed * pass * m.RatioX;
            m.PlayerContainer.y += speed * pass * m.RatioY;
            //console.log("ContainerCoordinate=============="+m.PlayerContainer.x);
            //console.log("TargetCoordinate=============="+m.x);
            m.timeOnEnterFrame = egret.getTimer();
            //console.log(pass);

            if (m.PlayerContainer.y - m.y < 6 && m.PlayerContainer.y - m.y > -6 &&
                m.PlayerContainer.x - m.x < 6 && m.PlayerContainer.x - m.x > -6) {
                console.log("Im IN!!!!")
                egret.stopTick(moveFunction, this);
                m.setState("stand");
                //m.isArrived = true;
            }

            return false;
            //console.log("ContainerCoordinate=============="+this.mac.PlayerContainer.x);
            //console.log("TargetCoordinate=============="+this.mac.x);        
        }

    }


    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}


