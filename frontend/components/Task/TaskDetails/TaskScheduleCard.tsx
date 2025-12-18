import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClockIcon } from '@heroicons/react/24/outline';
import TaskScheduleSection from '../TaskForm/TaskScheduleSection';
import { Task } from '../../../entities/Task';

interface TaskScheduleCardProps {
    task: Task;
    isEditing: boolean;
    editedScheduledStart: string;
    editedScheduledEnd: string;
    onChangeStart: (value: string) => void;
    onChangeEnd: (value: string) => void;
    onStartEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
}

const TaskScheduleCard: React.FC<TaskScheduleCardProps> = ({
    task,
    isEditing,
    editedScheduledStart,
    editedScheduledEnd,
    onChangeStart,
    onChangeEnd,
    onStartEdit,
    onSave,
    onCancel,
}) => {
    const { t, i18n } = useTranslation();

    const formatDateTime = (dateTimeStr: string): string | null => {
        if (!dateTimeStr) return null;
        const date = new Date(dateTimeStr);
        if (Number.isNaN(date.getTime())) return null;

        return date.toLocaleString(i18n.language, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatTimeOnly = (dateTimeStr: string): string | null => {
        if (!dateTimeStr) return null;
        const date = new Date(dateTimeStr);
        if (Number.isNaN(date.getTime())) return null;

        return date.toLocaleTimeString(i18n.language, {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getScheduleDisplay = () => {
        const startDate = task.scheduled_start
            ? new Date(task.scheduled_start)
            : null;
        const endDate = task.scheduled_end
            ? new Date(task.scheduled_end)
            : null;

        if (!startDate) return null;

        const startFormatted = formatDateTime(task.scheduled_start!);

        // Check if start and end are on the same day
        if (endDate) {
            const sameDay =
                startDate.toDateString() === endDate.toDateString();

            if (sameDay) {
                // Same day: show date once with time range
                const dateOnly = startDate.toLocaleDateString(i18n.language, {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
                const startTime = formatTimeOnly(task.scheduled_start!);
                const endTime = formatTimeOnly(task.scheduled_end!);
                return `${dateOnly} • ${startTime} – ${endTime}`;
            } else {
                // Different days: show full range
                const endFormatted = formatDateTime(task.scheduled_end!);
                return `${startFormatted} – ${endFormatted}`;
            }
        }

        // Only start time
        return startFormatted;
    };

    const hasSchedule = task.scheduled_start;

    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t('task.scheduledTime', 'Scheduled Time')}
            </h4>
            <div className="rounded-lg shadow-sm bg-white dark:bg-gray-900 border-2 border-gray-50 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 p-4 transition-colors">
                {isEditing ? (
                    <div className="space-y-3">
                        <TaskScheduleSection
                            scheduledStart={editedScheduledStart}
                            scheduledEnd={editedScheduledEnd}
                            onStartChange={onChangeStart}
                            onEndChange={onChangeEnd}
                            defaultDate={task.due_date}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={onSave}
                                className="px-4 py-2 text-sm bg-green-600 dark:bg-green-500 text-white rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                            >
                                {t('common.save', 'Save')}
                            </button>
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                {t('common.cancel', 'Cancel')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={onStartEdit}
                        className="flex w-full items-center justify-between text-left"
                    >
                        {hasSchedule ? (
                            <div className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                                <ClockIcon className="h-4 w-4 flex-shrink-0 text-blue-500 dark:text-blue-400" />
                                <span className="text-sm font-medium">
                                    {getScheduleDisplay()}
                                </span>
                            </div>
                        ) : (
                            <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                                {t('task.noScheduledTime', 'No scheduled time')}
                            </span>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskScheduleCard;
