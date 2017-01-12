class SceneService extends EventEmitter {
	private static instance;
	private static count = 0;

	public constructor() {
		super();
		SceneService.count++;
		if (SceneService.count > 1) {
			throw 'Singleton!!!!!!!!';
		}
	}

	public static getInstance() {
		if (SceneService.instance == null) {
			SceneService.instance = new SceneService();
		}
		return SceneService.instance;
	}

	public getTaskByCustomRole(Rule: Function): TaskConditionContext {
		return Rule(this.taskList);
	}

	public Rule(taskList: any): Task {
		var i: number;
		for (i = 0; i < taskList.length; i++) {
			//if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.CAN_SUBMIT || taskList[i].status == TaskStatus.DURING) {
			if (taskList[i].status != TaskStatus.UNACCEPTABLE) {
				console.log("TaskFound!!!!!!!!")
				return taskList[i];
			}
			else {
				console.log("TaskNotFound!!!!!!!!")
				return null;
			}
		}

	}

}