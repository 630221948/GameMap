class TaskPanel extends egret.DisplayObjectContainer implements Observer {

	private taskHint: egret.TextField;


	public constructor() {
		super();
		this.taskHint = new egret.TextField();
		this.taskHint.$setText("");
		this.taskHint.size = 24;
		this.taskHint.textColor = 0x000000;
		this.addChild(this.taskHint);
	}

	public onChange(task: TaskConditionContext) {
		var taskID: String = task.getTaskID();
		
		if (taskID == "00" && task.getCurrent() == 0) {             ////////////////////该去点击目标NPC了！！！！
			this.taskHint.$setText("您已接受新手任务");
		}
		else if (taskID == "00" && task.getCurrent() == 1) {                                         /////////可以交任务了！！！！
			this.taskHint.$setText("您已完成新手任务,可以提交！")
		}
		else if (taskID == "00" && task.getCurrent() > 1) {
			this.taskHint.$setText("新手任务提交完毕！！！")
		}
		else if (taskID == "01" && task.getCurrent() == -1) {               /////////////npc02先notify再onaccept
			this.taskHint.$setText("您已接受杀怪任务！");
		}
		else if (taskID == "01" && task.getCurrent() > 0 && task.getCurrent() <= 5) {
			this.taskHint.$setText("杀死怪物：" + task.getCurrent() + "/5");
		}
		else if (taskID == "01" && task.getCurrent() > 5) {
			this.taskHint.$setText("您已完成杀怪任务！！！");
		}

		console.log("233333333")

	}
}