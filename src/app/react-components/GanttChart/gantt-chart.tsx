import * as React from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import { ViewSwitcher } from './view-switcher';
import { TrProjectTask } from 'src/types';
import { useFetch } from './use-fetch';
import { environment } from 'src/environments/environment';
import { PersistenceStorage } from 'src/app/utils/persistence-storage';
import { MST_PROFILE_CODE } from 'src/constants';
import Swal from 'sweetalert2';

export const GanttChartTask = ({ projectId }: { projectId: string }) => {
  const { data, error, loading, refetch } = useFetch<{ data: TrProjectTask[] }>(
    `${environment.apiUrl}/project/task/${projectId}`
  );

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [isChecked, setIsChecked] = React.useState(true);
  const [ganttHeight, setGanttHeight] = React.useState(400);
  const [viewDependencies, setViewDependencies] = React.useState(false);

  React.useEffect(() => {
    const user = PersistenceStorage.user.get();

    const headerHeight = 350;
    const windowHeight = window.innerHeight;
    setGanttHeight(windowHeight - headerHeight);

    if (data) {
      const tasks: Task[] = data.data.map((task) => {
        return {
          id: task.id.toString(),
          name: task.task_name,
          type: 'task',
          start: new Date(task.plan_start_date),
          end: new Date(task.plan_end_date),
          progress: task.percent_done,
          isDisabled: user?.role !== MST_PROFILE_CODE.TECHNICIAN,
          dependencies: viewDependencies
            ? task.parent_id
              ? [task.parent_id.toString()]
              : []
            : undefined,
        };
      });
      const sorted = tasks.sort((a, b) => a.start.getTime() - b.start.getTime());
      setTasks(sorted);
    }
  }, [data, viewDependencies]);

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const updateTask = async (task: Task) => {
    if (!data) return;
    const user = PersistenceStorage.user.get();
    
    if (user?.role !== MST_PROFILE_CODE.TECHNICIAN) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not authorized to update this task!',
      });
      return;
    }
    
    const findOriginalTask = data?.data.find((t) => +t.id === +task.id);
    let parent_id = null;
    if (findOriginalTask?.parent_id) {
      parent_id = findOriginalTask?.parent_id;
    }
    const body = {
      project_id: +projectId,
      id: +task.id,
      plan_start_date: task.start,
      plan_end_date: task.end,
      percent_done: task.progress,
      parent_id,
    };

    try {
      const token = PersistenceStorage.token.get();
      const response = await fetch(`${environment.apiUrl}/project/task/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await refetch();
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleTaskChange = async (task: Task) => {
    await updateTask(task);
    return;
  };

  const handleTaskDelete = (task: Task) => {};

  const handleProgressChange = async (task: Task) => {
    await updateTask(task);
  };

  const handleDblClick = (task: Task) => {
    // alert('On Double Click event Id:' + task.id);
  };

  const handleClick = (task: Task) => {
    // console.log('On Click event Id:' + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    // console.log(task.name + ' has ' + (isSelected ? 'selected' : 'unselected'));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-2 mt-1">
        <ViewSwitcher
          viewMode={view}
          onViewModeChange={(viewMode) => setView(viewMode)}
          onViewListChange={setIsChecked}
          isChecked={isChecked}
        />
        <div className='d-flex gap-1'>
          <button
            className={`btn ${viewDependencies ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setViewDependencies(!viewDependencies)}
          >
            {viewDependencies ? 'Hide' : 'Show'} Dependencies
          </button>
          {tasks.length > 0 && !loading && (
            <button className="btn btn-primary" onClick={refetch}>
              Refresh
            </button>
          )}
          {tasks.length > 0 && loading && (
            <button className="btn btn-primary-outline" disabled>
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span>&nbsp; Saving your works...</span>
            </button>
          )}
        </div>
      </div>
      {tasks.length === 0 && loading && (
        <div className="skeleton-loading" style={{ height: `${ganttHeight}px` }}></div>
      )}
      {tasks.length > 0 && (
        <Gantt
          tasks={tasks}
          viewMode={view}
          onDateChange={handleTaskChange}
          onDelete={handleTaskDelete}
          onProgressChange={handleProgressChange}
          onDoubleClick={handleDblClick}
          onClick={handleClick}
          onSelect={handleSelect}
          listCellWidth={isChecked ? '200px' : ''}
          columnWidth={columnWidth}
          barProgressColor="#4880FF"
          barProgressSelectedColor="#2f67e9"
          ganttHeight={ganttHeight}
        />
      )}
    </>
  );
};
