import React from 'react';
import PropTypes from 'prop-types';
import Label from '../atom/Label/Label'; 
import PasswordInputField from '../atom/PasswordInputField/PasswordInputField';

const PasswordInput = React.forwardRef(({
  id,
  label,
  labelClassName = '',
  inputClassName = '',
  error,
  toggleMask = true,
  feedback = true,
  placeholder = '',
  required,
  ...props
}, ref) => {
  return (
    <div className="d-inline-flex flex-column w-100">
      <Label htmlFor={id} className={`${labelClassName} mb-2`} >
        {label}
        {required && <span className="text-danger"> *</span>}
      </Label>
      <PasswordInputField
        id={id}
        ref={ref}
        placeholder={placeholder}
        className={inputClassName}
        error={error}
        toggleMask={toggleMask}
        feedback={feedback}
        {...props}
      />
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

// PasswordInput.propTypes = {
//   id: PropTypes.string.isRequired,
//   labelText: PropTypes.node.isRequired,
//   labelClassName: PropTypes.string,
//   inputClassName: PropTypes.string,
//   error: PropTypes.shape({
//     type: PropTypes.string,
//     message: PropTypes.string,
//   }),
//   toggleMask: PropTypes.bool,
//   feedback: PropTypes.bool,
//   placeholder: PropTypes.string,
// };

export default PasswordInput;
