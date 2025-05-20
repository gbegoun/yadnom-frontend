import { useRef, useEffect, useState } from 'react';
import { MONTHS, WEEKDAYS, formatDate } from '../../services/calendar.service';
import { generateCalendarDays } from './CalendarComponents';

export default function DateOptionsModal({ value, onSelect, onClose }) {
    const inputRef = useRef();
    const [currentDate, setCurrentDate] = useState(value?.substring(0, 10) || formatDate(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
    ));

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleTodayClick = () => {
        const today = new Date();
        onSelect(formatDate(today.getFullYear(), today.getMonth() + 1, today.getDate()));
        onClose();
    };

    const handleMonthChange = (e) => {
        const newDate = currentDate.replace(/-\d{2}-/, `-${e.target.value}-`);
        setCurrentDate(newDate);
    };

    const handleYearChange = (e) => {
        const newDate = `${e.target.value}${currentDate.substring(4)}`;
        setCurrentDate(newDate);
    };

    const handleDaySelect = (date) => {
        onSelect(date);
        onClose();
    };

    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 }, (_, i) => currentYear + i)
            .map(year => (
                <option key={year} value={year}>{year}</option>
            ));
    };

    const renderMonthOptions = () => (
        MONTHS.map(month => (
            <option key={month.value} value={month.value}>
                {month.label}
            </option>
        ))
    );

    const MonthSelector = () => (
        <select
            value={monthValue}
            onChange={handleMonthChange}
            className="month-select"
        >
            {renderMonthOptions()}
        </select>
    );

    const YearSelector = () => (
        <select
            value={yearValue}
            onChange={handleYearChange}
            className="year-select"
        >
            {renderYearOptions()}
        </select>
    );

    const WeekdayHeaders = () => (
        WEEKDAYS.map(day => (
            <div key={day} className="weekday-header">{day}</div>
        ))
    );

    const monthValue = currentDate.substring(5, 7);
    const yearValue = currentDate.substring(0, 4);

    return (
        <>
            <button className="date-modal-today-btn" onClick={handleTodayClick}>
                Today
            </button>
            <div className="date-calendar-container">
                <div className="month-navigation">
                    <MonthSelector />
                    <YearSelector />
                </div>
                <div className="calendar-grid">
                    <WeekdayHeaders />
                    {generateCalendarDays(currentDate, handleDaySelect, onClose)}
                </div>
            </div>
        </>
    );
}
