import React, { useImperativeHandle, useRef } from "react";
import { Toast } from "primereact/toast";

// Default duration in milliseconds
const DEFAULT_LIFE = 3000;

const CustomToast = React.forwardRef((props, ref) => {
  const toastRef = useRef(null);

  // Expose custom show method with default timing
  useImperativeHandle(ref, () => ({
    show: (options) => {
      toastRef.current.show({
        ...options,
        life: options.life || DEFAULT_LIFE,
      });
    }
  }));

  return <Toast ref={toastRef} position={props.position || "top-right"} />;
});

export default CustomToast;