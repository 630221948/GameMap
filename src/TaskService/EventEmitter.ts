class EventEmitter {
	public taskList:TaskConditionContext[] = [];
	public observerList:Observer[] = [];

	public constructor() {
	}

	public addObserver(observer:Observer):void{
		this.observerList.push(observer);
	}

	public notify(): void {
		var i: number;
		for (i = 0; i < this.taskList.length; i++) {
			for (var observer of this.observerList) {
				observer.onChange(this.taskList[i]);
			}
		}
	}
}