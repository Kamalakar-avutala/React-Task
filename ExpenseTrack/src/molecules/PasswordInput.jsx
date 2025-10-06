import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Label from "../atom/Label/Label";
import PasswordInputField from "../atom/PasswordInputField/PasswordInputField";

const PasswordInput = React.forwardRef(
  ({
    id,
    name,
    label,
    labelClassName = "",
    inputClassName = "",
    error,
    toggleMask = true,
    feedback = true,
    placeholder = "",
    required,
    onChange,
    onBlur,
    value,
    ...props
  }, ref) => {
    const handleChange = (e) => {
      if (onChange) {
        onChange({
          target: {
            name: name,
            value: e.target.value
          },
          type: 'change'
        });
      }
    };

    const handleBlur = (e) => {
      if (onBlur) {
        onBlur({
          target: {
            name: name,
            value: e.target.value
          },
          type: 'blur'
        });
      }
    };

    return (
      <div className="d-inline-flex flex-column w-100">
        <Label htmlFor={id} className={`${labelClassName} mb-2`}>
          {label}
          {required && <span className="text-danger"> *</span>}
        </Label>
        <PasswordInputField
          id={id}
          name={name}
          ref={ref}
          placeholder={placeholder}
          className={inputClassName}
          error={error}
          toggleMask={toggleMask}
          feedback={feedback}
          required={required}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  toggleMask: PropTypes.bool,
  feedback: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string
};

export default PasswordInput;
