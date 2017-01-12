class GameScene extends egret.DisplayObjectContainer{
	private static gameScene: GameScene;
	public static clickLayer:number = 0;
	private m:StateMachine;
	private gridMap:GridMap;
	private UMP45Icon:egret.Bitmap;
	private user:User;
	private UMP45:Equipment;
    
	public static replaceScene(scene: GameScene) {
        GameScene.gameScene = scene;
    }

    public static getCurrentScene(): GameScene {
        return GameScene.gameScene;
    }

	public setMoveFuncInfo(m:StateMachine,gridMap:GridMap,UMP45Icon:egret.Bitmap,user:User,UMP45:Equipment){
		this.m = m;
		this.gridMap = gridMap;
		this.UMP45Icon = UMP45Icon;
		this.user = user;
		this.UMP45 = UMP45;
	}

	public moveTo(m: StateMachine, gridMap: GridMap, interval: any, endX: number, endY:number) {            //endXendY为点击位置坐标
		GameScene.clickLayer--;
		if (GameScene.clickLayer == -1) {
			let astar: AStar = new AStar(gridMap);

			egret.stopTick(this.moveFunction, this);
			clearInterval(interval);

			m.x = endX;
			m.y = endY;

			let MaxLength = 0;
			let RatioX;
			let RatioY;

			let nodeCounts: number = gridMap.getNodeCounts()

			let endXPos = Math.floor(endX / nodeCounts);            //终点的x和y值（行和列数）
			let endYPos = Math.floor(endY / nodeCounts);
			let startXPos = Math.floor(m.PlayerContainer.x / nodeCounts);//起点的x和y值（行和列数）
			let startYPos = Math.floor(m.PlayerContainer.y / nodeCounts);


			if (astar.findPath(gridMap.getNode(startXPos, startYPos), gridMap.getNode(endXPos, endYPos))) { //传入起点和终点
				astar._path.map((tile) => {
					console.log(`x:${tile.x},y:${tile.y}`)
				});
			}

			let pathLength: number = astar._path.length;
			let i: number = 0;

			astar._path.shift();                           //弹出第一个节点，防止第一次移动时原地踏步
			interval = setInterval(() => {
				let pos = astar._path.shift();
				m.x = pos.x * nodeCounts;
				m.y = pos.y * nodeCounts;
				let dx = m.x - m.PlayerContainer.x;
				let dy = m.y - m.PlayerContainer.y;
				MaxLength = Math.pow(dx * dx + dy * dy, 1 / 2);
				RatioX = dx / MaxLength;
				RatioY = dy / MaxLength;
				m.RatioX = RatioX;
				m.RatioY = RatioY;
				m.setState("move");
				m.timeOnEnterFrame = egret.getTimer();
				egret.startTick(this.moveFunction, this);
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
			GameScene.clickLayer++;
		}
	}
	
	public moveFunction(): boolean {
            //console.log("============开始移动===========");

            let now = egret.getTimer();
            let time = this.m.timeOnEnterFrame;
            let pass = now - time;
            let speed = 0.3;
            //console.log("Ratio=============="+m.RatioX);
            this.m.PlayerContainer.x += speed * pass * this.m.RatioX;
            this.m.PlayerContainer.y += speed * pass * this.m.RatioY;
            //console.log("ContainerCoordinate=============="+m.PlayerContainer.x);
            //console.log("TargetCoordinate=============="+m.x);
            this.m.timeOnEnterFrame = egret.getTimer();
            //console.log(pass);

            var playerPosX = Math.floor(this.m.PlayerContainer.x / this.gridMap.getNodeCounts())
            var playerPosY = Math.floor(this.m.PlayerContainer.y / this.gridMap.getNodeCounts())
            //console.log(playerPosX + "\n" + playerPosY)

            if (playerPosX == 0 &&
                playerPosY == 6 &&
                this.UMP45Icon.visible == true) {
                this.UMP45Icon.visible = false;
                this.user.heroesInTeam[0].equipmentList.pop();
                this.user.heroesInTeam[0].equipmentList.push(this.UMP45);
                //console.log(user.heroesInTeam[0].equipmentList);
            }

            if (this.m.PlayerContainer.y - this.m.y < 6 && this.m.PlayerContainer.y - this.m.y > -6 &&
                this.m.PlayerContainer.x - this.m.x < 6 && this.m.PlayerContainer.x - this.m.x > -6) {
                //console.log("Im IN!!!!")
                egret.stopTick(this.moveFunction, this);
                this.m.setState("stand");
                //m.isArrived = true;
            }

            return false;
            //console.log("ContainerCoordinate=============="+this.mac.PlayerContainer.x);
            //console.log("TargetCoordinate=============="+this.mac.x);        
        }

	
}