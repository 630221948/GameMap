var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.apply(this, arguments);
    }
    var d = __define,c=GameScene,p=c.prototype;
    GameScene.replaceScene = function (scene) {
        GameScene.gameScene = scene;
    };
    GameScene.getCurrentScene = function () {
        return GameScene.gameScene;
    };
    p.moveTo = function (m, gridMap, interval, endX, endY) {
        var _this = this;
        GameScene.clickLayer--;
        if (GameScene.clickLayer == -1) {
            var astar_1 = new AStar(gridMap);
            egret.stopTick(this.moveFunction, this);
            clearInterval(interval);
            m.x = endX;
            m.y = endY;
            var MaxLength_1 = 0;
            var RatioX_1;
            var RatioY_1;
            var nodeCounts_1 = gridMap.getNodeCounts();
            var endXPos = Math.floor(endX / nodeCounts_1); //终点的x和y值（行和列数）
            var endYPos = Math.floor(endY / nodeCounts_1);
            var startXPos = Math.floor(m.PlayerContainer.x / nodeCounts_1); //起点的x和y值（行和列数）
            var startYPos = Math.floor(m.PlayerContainer.y / nodeCounts_1);
            if (astar_1.findPath(gridMap.getNode(startXPos, startYPos), gridMap.getNode(endXPos, endYPos))) {
                astar_1._path.map(function (tile) {
                    console.log("x:" + tile.x + ",y:" + tile.y);
                });
            }
            var pathLength_1 = astar_1._path.length;
            var i_1 = 0;
            astar_1._path.shift(); //弹出第一个节点，防止第一次移动时原地踏步
            interval = setInterval(function () {
                var pos = astar_1._path.shift();
                m.x = pos.x * nodeCounts_1;
                m.y = pos.y * nodeCounts_1;
                var dx = m.x - m.PlayerContainer.x;
                var dy = m.y - m.PlayerContainer.y;
                MaxLength_1 = Math.pow(dx * dx + dy * dy, 1 / 2);
                RatioX_1 = dx / MaxLength_1;
                RatioY_1 = dy / MaxLength_1;
                m.RatioX = RatioX_1;
                m.RatioY = RatioY_1;
                m.setState("move");
                m.timeOnEnterFrame = egret.getTimer();
                egret.startTick(_this.moveFunction, _this);
                /*console.log("当前终点：" + m.x + "   " + m.y);
                console.log("当前i：" + i);
                console.log("数组长度：" + astar._path.length);
                console.log("path中节点数量："+pathLength);
                console.log("节点下标记录i的值"+i);*/
                i_1++;
                if (i_1 == pathLength_1 - 1) {
                    console.log("2332322322323232323232332323");
                    clearInterval(interval);
                    i_1 = 0;
                }
            }, 400);
            GameScene.clickLayer++;
        }
    };
    p.moveFunction = function () {
        //console.log("============开始移动===========");
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
        var playerPosX = Math.floor(m.PlayerContainer.x / gridMap.getNodeCounts());
        var playerPosY = Math.floor(m.PlayerContainer.y / gridMap.getNodeCounts());
        //console.log(playerPosX + "\n" + playerPosY)
        if (playerPosX == 0 &&
            playerPosY == 6 &&
            UMP45Icon.visible == true) {
            UMP45Icon.visible = false;
            user.heroesInTeam[0].equipmentList.pop();
            user.heroesInTeam[0].equipmentList.push(UMP45);
        }
        if (m.PlayerContainer.y - m.y < 6 && m.PlayerContainer.y - m.y > -6 &&
            m.PlayerContainer.x - m.x < 6 && m.PlayerContainer.x - m.x > -6) {
            //console.log("Im IN!!!!")
            egret.stopTick(moveFunction, this);
            m.setState("stand");
        }
        return false;
        //console.log("ContainerCoordinate=============="+this.mac.PlayerContainer.x);
        //console.log("TargetCoordinate=============="+this.mac.x);        
    };
    GameScene.clickLayer = 0;
    return GameScene;
}(egret.DisplayObjectContainer));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map