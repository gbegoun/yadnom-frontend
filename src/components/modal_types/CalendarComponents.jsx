import { formatDate, isSameDate, isToday, getMonthDetails } from '../../services/calendar.service';

export const CalendarDay = ({ day, isSelected, isToday, onClick }) => (
    <div
        key={day}
        className={['calendar-day', isSelected ? 'selected' : '', isToday ? 'today' : ''].filter(Boolean).join(' ')}
        onClick={onClick}
    >
        {day}
    </div>
);

export const generateCalendarDays = (selectedDate, onSelect, onClose) => {
    const date = selectedDate ? new Date(selectedDate) : new Date();
    const { year, month, firstDayIndex, daysInMonth } = getMonthDetails(date);
    
    const emptyDays = Array.from({ length: firstDayIndex - 1 }, (_, i) => (
        <div key={`empty-${i}`} className="calendar-day empty" />
    ));

    const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
        const dayNum = i + 1;
        const dayDate = new Date(year, month, dayNum);
        const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
        
        return (
            <CalendarDay
                key={dayNum}
                day={dayNum}
                isSelected={isSameDate(dayDate, selectedDateObj)}
                isToday={!selectedDate && isToday(dayDate)}
                onClick={() => {
                    onSelect(formatDate(year, month + 1, dayNum));
                    onClose();
                }}
            />
        );
    });

    return [...emptyDays, ...monthDays];
};
