// Molecule: DropdownField.jsx
import React from 'react';
import PropTypes from 'prop-types';
import DropdownAtom from '../atom/Dropdown/Dropdown';
import Label from '../atom/Label/Label';

const DropdownField = ({
  id,
  name,
  label,
  value,
  options,
  optionLabel,
  optionValue,
  onChange,
  placeholder,
  disabled,
  className,
  required,
  error
}) => {
  return (
    <div className={`dropdown-field d-inline-flex flex-column ${className || ''}`}>
      <Label
        htmlFor={id}
        className="mb-2"
      >
        {label}
        {required && <span className="text-danger"> *</span>}
      </Label>
      <DropdownAtom
        id={id}
        name={name}
        value={value}
        options={options}
        optionLabel={optionLabel}
        optionValue={optionValue}
        placeholder={placeholder}
        disabled={disabled}
        className=""
        error={!!error}
        onChange={onChange}
      />
      {error && <span className="text-danger mb-1" role="alert">{error}</span>}
    </div>
  );
};

DropdownField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array.isRequired,
  optionLabel: PropTypes.string,
  optionValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string
};

DropdownField.defaultProps = {
  placeholder: 'Select an option',
  disabled: false,
  className: '',
  required: false,
  label: '',
  error: ''
};

export default DropdownField;
