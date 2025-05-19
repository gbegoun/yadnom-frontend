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
