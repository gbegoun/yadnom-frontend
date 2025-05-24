export const MONTHS = [
    { value: '01', label: 'Jan' }, { value: '02', label: 'Feb' },
    { value: '03', label: 'Mar' }, { value: '04', label: 'Apr' },
    { value: '05', label: 'May' }, { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' }, { value: '08', label: 'Aug' },
    { value: '09', label: 'Sep' }, { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' }, { value: '12', label: 'Dec' }
];

export const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const formatDate = (year, month, day) =>
    `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

export const getMonthDetails = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const firstDayIndex = firstDay.getDay() || 7; // Convert Sunday (0) to 7
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return {
        year,
        month,
        firstDayIndex,
        daysInMonth
    };
};

export const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
};

export const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
};

/**
 * Get a normalized date without time component (UTC)
 * @param {Date|string} date - The date to normalize
 * @returns {Date} Normalized date in UTC
 */
export const getNormalizedDate = (date) => {
    if (!date) return null;
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
};

/**
 * Format a date for display in "Mon DD" format
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
export const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    return `${month} ${day}`;
};

/**
 * Determine task date status
 * @param {string} dateValue - The due date value
 * @param {boolean} isTaskDone - Whether the task is done
 * @returns {Object} Status flags for the date
 */
export const getTaskDateStatus = (dateValue, isTaskDone) => {
    if (!dateValue) {
        return { isCompletedOnTime: false, isCompletedLate: false, isOverdue: false };
    }

    const today = getNormalizedDate(new Date());
    const dueDate = getNormalizedDate(dateValue);

    if (!dueDate) return { isCompletedOnTime: false, isCompletedLate: false, isOverdue: false };

    return {
        isCompletedOnTime: isTaskDone && today <= dueDate,
        isCompletedLate: isTaskDone && today > dueDate,
        isOverdue: !isTaskDone && today > dueDate
    };
};
