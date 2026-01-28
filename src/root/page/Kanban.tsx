import { useState } from 'react';
import { Button } from '@components/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/shared/ui/card';
import { Plus, GripVertical, User } from 'lucide-react';
import { kanbanData, kanbanGrid } from '@data/dummy';

interface Task {
  Id: string;
  Title: string;
  Summary: string;
  Priority: string;
  Status: string;
  Tags?: string;
  Assignee: string;
}

const Kanban = () => {
  const [tasks, setTasks] = useState<Task[]>(kanbanData);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      Low: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
      Normal:
        'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
      High: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
      Critical:
        'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
    };
    return (
      colors[priority] ||
      'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300'
    );
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: string,
  ) => {
    e.preventDefault();
    if (draggedTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.Id === draggedTask.Id ? { ...task, Status: newStatus } : task,
        ),
      );
      setDraggedTask(null);
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.Status === status);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-1">
          Kanban
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kanbanGrid.map((column) => (
          <div
            key={column.keyField}
            className="bg-gray-50 dark:bg-main-dark-bg rounded-xl p-4 transition-colors border dark:border-gray-800"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.keyField)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  {column.headerText}
                </h3>
                <span className="bg-gray-200 dark:bg-secondary-dark-bg text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-0.5 rounded-full">
                  {getTasksByStatus(column.keyField).length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="dark:text-gray-400 dark:hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 min-h-[500px]">
              {getTasksByStatus(column.keyField).map((task) => (
                <Card
                  key={task.Id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  className="cursor-move hover:shadow-lg transition-shadow bg-white dark:bg-secondary-dark-bg border dark:border-gray-700"
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {task.Title}
                        </CardTitle>
                        <CardDescription className="text-xs mt-1 dark:text-gray-400">
                          {task.Summary}
                        </CardDescription>
                      </div>
                      <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPriorityColor(task.Priority)}`}
                      >
                        {task.Priority}
                      </span>
                      {task.Tags?.split(',').map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 pt-3 mt-1">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{task.Assignee}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;
