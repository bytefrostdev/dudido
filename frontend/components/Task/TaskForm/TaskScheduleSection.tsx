import React from 'react';
import DateTimePicker from '../../Shared/DateTimePicker';
import { useTranslation } from 'react-i18next';

interface TaskScheduleSectionProps {
    scheduledStart: string;
    scheduledEnd: string;
    onStartChange: (value: string) => void;
    onEndChange: (value: string) => void;
    defaultDate?: string; // Task's due_date - used as initial calendar view
}

const TaskScheduleSection: React.FC<TaskScheduleSectionProps> = ({
    scheduledStart,
    scheduledEnd,
    onStartChange,
    onEndChange,
    defaultDate,
}) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-4 overflow-visible">
            {/* Scheduled Start */}
            <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t('forms.task.labels.scheduledStart', 'Start Time')}
                </label>
                <DateTimePicker
                    value={scheduledStart || ''}
                    onChange={onStartChange}
                    placeholder={t(
                        'forms.task.scheduledStartPlaceholder',
                        'Select start time'
                    )}
                    defaultDate={defaultDate}
                />
            </div>

            {/* Scheduled End */}
            <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t('forms.task.labels.scheduledEnd', 'End Time')}
                </label>
                <DateTimePicker
                    value={scheduledEnd || ''}
                    onChange={onEndChange}
                    placeholder={t(
                        'forms.task.scheduledEndPlaceholder',
                        'Select end time'
                    )}
                    defaultDate={scheduledStart || defaultDate}
                />
            </div>

            {/* Helper text */}
            {scheduledStart && scheduledEnd && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t(
                        'forms.task.scheduleHelperText',
                        'This task will appear as a time block in your calendar.'
                    )}
                </p>
            )}
        </div>
    );
};

export default TaskScheduleSection;
