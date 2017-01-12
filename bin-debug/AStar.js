var AStar = (function () {
    function AStar(gamemap) {
        //	private _heuristic:Function = manhattan;
        //	private _heuristic:Function = euclidian;
        this._heuristic = this.diagonal;
        this._straightCost = 1.0;
        this._diagCost = Math.sqrt(2);
        this._gamemap = gamemap;
    }
    var d = __define,c=AStar,p=c.prototype;
    p.findPath = function (startNode, endNode) {
        this._startNode = startNode;
        this._endNode = endNode;
        this._open = new Array();
        this._close = new Array();
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        return this.search();
    };
    p.search = function () {
        var currentnode = this._startNode;
        while (currentnode != this._endNode) {
            var startX = Math.max(0, currentnode.x - 1); //防止超出左边界
            var endX = Math.min(this._gamemap.column - 1, currentnode.x + 1);
            var startY = Math.max(0, currentnode.y - 1);
            var endY = Math.min(this._gamemap.row - 1, currentnode.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._gamemap.getNode(i, j);
                    if (test == currentnode || !test.walkable) {
                        continue;
                    }
                    var cost = this._straightCost;
                    if (!((currentnode.x == test.x) || (currentnode.y == test.y))) {
                        cost = this._diagCost;
                    }
                    var g = currentnode.g + cost * test.costMultiplier;
                    var h = this._heuristic(test);
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = currentnode;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = currentnode;
                        this._open.push(test);
                    }
                }
            }
            for (var o = 0; o < this._open.length; o++) {
            }
            this._close.push(currentnode);
            if (this._open.length == 0) {
                return false;
            }
            this._open.sort(function (a, b) {
                return a.f - b.f;
            });
            ;
            this._open.map(function (a) {
                console.log(a.f);
            });
            console.log("======");
            currentnode = this._open.shift();
        }
        this.buildPath();
        console.log('right');
        return true;
    };
    p.buildPath = function () {
        this._path = new Array();
        var node = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node);
        }
    };
    p.diagonal = function (node) {
        var dx = Math.abs(node.x - this._endNode.x);
        var dy = Math.abs(node.y - this._endNode.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    };
    p.isOpen = function (node) {
        return this._open.indexOf(node) >= 0;
    };
    p.isClosed = function (node) {
        return this._close.indexOf(node) >= 0;
    };
    return AStar;
}());
egret.registerClass(AStar,'AStar');
//# sourceMappingURL=AStar.js.map