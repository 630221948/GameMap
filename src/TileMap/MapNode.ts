class MapNode {
	public x:number;
	public y:number;

	public f:number;
	public g:number;
	public h:number;

	public walkable :boolean;
	public parent:MapNode;
	public costMultiplier:number = 1.0;//算法乘数

	public constructor(x:number,y:number,_walkable:boolean) {
		this.x = x;
		this.y = y;
		this.walkable = _walkable;
	}
}