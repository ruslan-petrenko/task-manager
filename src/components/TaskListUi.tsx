import { type Task } from '../types';
import TaskUi from './TaskUi';

interface Props {
  tasks: Task[];
}
export default function TaskListUi(props: Props) {
  const { tasks } = props;
  return (
    <>
      {tasks.length ? (
        <ul className="flex flex-col gap-4">
          {tasks.map((task) => (
            <TaskUi
              key={task.id}
              {...task}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No tasks found</p>
      )}
    </>
  );
}
