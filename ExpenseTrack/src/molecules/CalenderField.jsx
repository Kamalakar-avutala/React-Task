// src/atom/Calendar/Calendar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Calendar as PrimeCalendar } from 'primereact/calendar';
import Label from '../atom/Label/Label';

const Calendar = ({
  id,
  value,
  label,
  onChange,
  name,
  minDate,
  maxDate,
  disabled,
  showIcon = false,
  error,
  required,
  className,
  ...props
}) => {

  const handleChange = (e) => {
    const selectedDate = e?.value;

    if (selectedDate instanceof Date && !isNaN(selectedDate)) {
      onChange?.({
        target: {
          name,
          value: selectedDate, // pass Date object as value
        },
      });
    } else {
      // Optional: handle invalid date or clear value
      onChange?.({
        target: {
          name,
          value: null,
        },
      });
    }
  };

  return (
    <div className={`calendar-wrapper d-inline-flex flex-column ${className || ''}`}>
      <Label
        htmlFor={id}
        className="mb-2"
      >
        {label}
        {required && <span className="text-danger"> *</span>}
      </Label>

      <PrimeCalendar
        id={id}
        value={value}
        onChange={handleChange} // ✅ uses updated logic
        name={name}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        showIcon={showIcon}
        className={`w-100 ${error ? 'p-invalid' : ''}`}
        {...props}
      />

      {error && <small className="p-error">{error}</small>}
    </div>
  );
};

Calendar.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disabled: PropTypes.bool,
  showIcon: PropTypes.bool,
  error: PropTypes.string,
};

export default Calendar;
