// Molecule: CalendarField.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Label from '../atom/Label/Label';
import CalendarAtom from '../atom/Calendar/Calendar';

const CalendarField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  className,
  dateFormat,
  required,
  error,
  invalid
}) => {
  return (
    <div className={`calendar-field d-inline-flex flex-column ${className || ''}`}>
      {label && (
        <Label htmlFor={id} className="mb-2">
          {label}
          {required && <span className="text-danger"> *</span>}
        </Label>
      )}
      <CalendarAtom
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-100"
        dateFormat={dateFormat}
        invalid={invalid}
      />
      {error && <small className="p-error d-inline-block mt-1" role="alert">{error}</small>}
    </div>
  );
};

CalendarField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  invalid: PropTypes.bool
};

CalendarField.defaultProps = {
  placeholder: '',
  className: '',
  dateFormat: 'yy-mm-dd',
  required: false,
  error: '',
  invalid: false
};

export default CalendarField;
