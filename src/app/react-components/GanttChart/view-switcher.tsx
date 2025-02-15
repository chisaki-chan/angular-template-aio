import React from 'react';

import { ViewMode } from 'gantt-task-react';

type ViewSwitcherProps = {
  isChecked: boolean;
  viewMode: ViewMode;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
  viewMode,
}) => {
  const btnClassName = (view: ViewMode) => {
    const color = viewMode === view ? 'btn-primary' : 'btn-outline-primary';
    return `btn ${color}`;
  };

  return (
    <div>
      <div className="d-flex gap-1">
        <button
          onClick={() => onViewModeChange(ViewMode.Hour)}
          className={btnClassName(ViewMode.Hour)}
        >
          Hour
        </button>
        <button
          onClick={() => onViewModeChange(ViewMode.Day)}
          className={btnClassName(ViewMode.Day)}
        >
          Day
        </button>
        <button
          className={btnClassName(ViewMode.Week)}
          onClick={() => onViewModeChange(ViewMode.Week)}
        >
          Week
        </button>
        <button
          className={btnClassName(ViewMode.Month)}
          onClick={() => onViewModeChange(ViewMode.Month)}
        >
          Month
        </button>
        <button
          className={btnClassName(ViewMode.Year)}
          onClick={() => onViewModeChange(ViewMode.Year)}
        >
          Year
        </button>
      </div>
      <div className="form-check mb-3 mt-2">
        <input
          defaultChecked={isChecked}
          className="form-check-input"
          type="checkbox"
          id="formCheck6"
          onClick={() => onViewListChange(!isChecked)}
        />
        <label className="form-check-label" htmlFor="formCheck6">
          Show Task Name
        </label>
      </div>
    </div>
  );
};
