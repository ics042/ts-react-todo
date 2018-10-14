import * as React from "react";

export class Form extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentTask: "",
      tasks: [],
    };
  }

  public render(): JSX.Element {
    const { currentTask } = this.state;
    return (
      <div>
        <h1>TS React TODO:</h1>
        <form onSubmit={e => this.handleSunmit(e)}>
          <input
            type="text"
            value={currentTask}
            onChange={e => this.setState({ currentTask: e.target.value })}
          />
          <button type="submit">Add Task</button>
        </form>
        <br />
        <section>{this.renderTasks()}</section>
      </div>
    );
  }

  public handleSunmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    this.setState({
      currentTask: "",
      tasks: [
        ...this.state.tasks,
        {
          id: this.generateId(),
          value: this.state.currentTask,
          complete: false,
        },
      ],
    });
  }

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: ITask, index: number) => {
      return (
        <div key={index}>
          {task.value} - {task.complete ? "completed" : "incompleted"} &nbsp;
          <button onClick={() => this.delete(task.id)}>Delete</button>
          &nbsp;
          <button onClick={() => this.done(index)}>Done</button>
        </div>
      );
    });
  }

  public done(index: number): void {
    const doneTask: Array<ITask> = this.state.tasks.splice(index, 1);
    const task: ITask = doneTask[0];
    task.complete = true;
    const tasks = [...this.state.tasks, task];
    this.setState({ tasks });
  }

  public delete(id: number): void {
    const filteredTask: Array<ITask> = this.state.tasks.filter(
      (task: ITask) => task.id !== id,
    );

    this.setState({
      tasks: filteredTask,
    });
  }

  private generateId() {
    return new Date().getTime();
  }
}

interface IState {
  currentTask: string;
  tasks: Array<ITask>;
}

interface ITask {
  id: number;
  value: string;
  complete: boolean;
}
