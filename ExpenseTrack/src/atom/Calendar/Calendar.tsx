import React from 'react';
import { Calendar as PrimeCalendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';

interface CalendarProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  name,
  label,
  error,
  required = false,
  minDate,
  maxDate,
  disabled = false
}) => {
  return (
    <div className="calender-container">
      <PrimeCalendar
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.value as Date)}
        dateFormat="dd/mm/yy"
        showIcon
        className={classNames('w-100', { 'p-invalid': error })}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
      />
      {error && (
        <small className="p-error block mt-1">{error}</small>
      )}
    </div>
  );
};

export default Calendar;