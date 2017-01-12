class TaskService extends EventEmitter{

	//private observerList: Observer[] = [];
	//private taskList: Task[] = [];

	private static instance;
	private static count = 0;

	public constructor() {
		super();
		TaskService.count++;
		if (TaskService.count > 1) {
			throw 'Singleton!!!!!!!!';
		}
	}

	public static getInstance() {
		if (TaskService.instance == null) {
			TaskService.instance = new TaskService();
		}
		return TaskService.instance;
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



enum TaskStatus {
	UNACCEPTABLE = 0,
	ACCEPTABLE = 1,
	DURING = 2,
	CAN_SUBMIT = 3,
	SUBMITTED = 4
}

enum ErrorCode {
	TASK_MISSING = 0,
	SUCCEED = 1
}