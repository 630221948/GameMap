class NPCTalkTaskCondition implements TaskCondition {
	public constructor() {
	}

	public onAccept(task: TaskConditionContext) {
		task.setCurrent();
	}

	public onDuring(task: TaskConditionContext) {
		task.setCurrent();
		console.log("对话完毕！！！！！")
	}

	public onSubmit(task: TaskConditionContext) {
		task.setCurrent();
	}
}