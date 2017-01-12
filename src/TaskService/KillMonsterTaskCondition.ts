class KillMonsterTaskCondition implements TaskCondition, Observer {
	public constructor() {
	}

	public onAccept(task: TaskConditionContext) {
		task.setCurrent();
	}

	public onDuring(task: TaskConditionContext) {
		if (task.getCurrent() <-1) {
			console.log("You can not kill monster now!!!!");
		}
		else if (task.getCurrent() == -1) {
			task.setCurrent();
			console.log("You can kill monster now!!!!");
		}
		else if (task.getCurrent() >= 0 && task.getCurrent() < 5) {
			task.setCurrent();
			console.log(task.getCurrent())
		}
		else if (task.getCurrent() >= 5) {
			console.log("You have killed enough monsters!!!!");;
		}
	}

	public onSubmit(task: TaskConditionContext) {
		task.setCurrent();
	}

	public onChange(task: TaskConditionContext) {
		this.onDuring(task);
		console.log(task.getCurrent())
	}
}