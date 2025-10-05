import React from 'react';
import { Password } from 'primereact/password';

const PasswordInputField = React.forwardRef(({
  id,
  placeholder,
  className = '',
  error,
  toggleMask = true,
  feedback = true,
  ...props
}, ref) => {
  const inputClassName = `${className} ${error ? 'p-invalid' : ''}`.trim();

  return (
    <div className="field w-100">
      <Password
        id={id}
        ref={ref}
        placeholder={placeholder}
        className={`${inputClassName} w-100`}
        toggleMask={toggleMask}
        feedback={feedback}
        {...props}
      />
      {error && <small className="p-error d-inline-block">{error.message}</small>}
    </div>
  );
});

PasswordInputField.displayName = 'PasswordInputField';

export default PasswordInputField;