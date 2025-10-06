import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../atom/Input/Input';

const TextInputField = React.forwardRef(({
  id,
  name,
  type,
  label,
  placeholder,
  required = false,
  className = '',
  error,
  ...rest
}, ref) => {
  return (
    <div className={`labeled-input d-inline-flex flex-column ${className}`}>
      <label htmlFor={id} className="mb-2">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      <TextInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-required={required}
        error={error}
        ref={ref}          // <-- forward the ref
        {...rest}          // <-- spread other props like onChange, onBlur, value from register()
      />
    </div>
  );
});

TextInputField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string
  }),
};

export default TextInputField;
