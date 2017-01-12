class Task implements TaskConditionContext {
	public id: String;
	public name: String;
	public desc: String;
	public status: TaskStatus;
	public current: number;
	public total: number;

	public constructor(id: String, name: String, desc: String, current:number, total: number) {
		this.status = TaskStatus.ACCEPTABLE;
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.current = current;
		this.total = total;
	}

	public getCurrent() {
		return this.current;
	}

	public setCurrent() {
		this.current++;
	}

	public getTaskID() {
		return this.id;
	}

	public finish(id: String): ErrorCode {
		if (!id) {
			return ErrorCode.TASK_MISSING;
		}

		var i: number;
		for (i = 0; i < TaskService.getInstance().taskList.length; i++) {
			if (TaskService.getInstance().taskList[i].id == id) {
				break;
			}
		}

		if (!TaskService.getInstance().taskList[i]) {
			return ErrorCode.TASK_MISSING;
		}

		TaskService.getInstance().taskList[i].status = TaskStatus.SUBMITTED;
		TaskService.getInstance().notify();
		return ErrorCode.SUCCEED;
	}

	public accept(id: String): ErrorCode {
		if (!id) {
			return ErrorCode.TASK_MISSING;
		}

		var i: number;
		for (i = 0; i < TaskService.getInstance().taskList.length; i++) {
			if (TaskService.getInstance().taskList[i].id == id) {
				break;
			}
		}

		if (!TaskService.getInstance().taskList[i]) {
			return ErrorCode.TASK_MISSING;
		}

		TaskService.getInstance().taskList[i].status = TaskStatus.DURING;
		TaskService.getInstance().notify();
		return ErrorCode.SUCCEED;
	}

	public during(id: String): ErrorCode {
		if (!id) {
			return ErrorCode.TASK_MISSING;
		}

		var i: number;
		for (i = 0; i < TaskService.getInstance().taskList.length; i++) {
			if (TaskService.getInstance().taskList[i].id == id) {
				break;
			}
		}

		if (!TaskService.getInstance().taskList[i]) {
			return ErrorCode.TASK_MISSING;
		}

		TaskService.getInstance().taskList[i].status = TaskStatus.CAN_SUBMIT;
		TaskService.getInstance().notify();
		return ErrorCode.SUCCEED;
	}
}