import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../atom/Input/Input';  


const TextInputField = ({ id,name, type, label, value, onChange, placeholder, required = false, className = '', error }) => {
  return (
    <div className={`labeled-input d-inline-flex flex-column ${className}`}>
      <label htmlFor={id} className="mb-2">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      <TextInput
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-required={required}
        type={type}
        error={error}
      />
    </div>
  );
};

TextInputField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string
  })
};

export default TextInputField;
