import React, { useImperativeHandle, useRef } from "react";
import { Toast } from "primereact/toast";

const VITE_TOAST_DEFAULT_LIFE = import.meta.env.VITE_TOAST_DEFAULT_LIFE;

const CustomToast = React.forwardRef((props, ref) => {
  const toastRef = useRef(null);

  // Expose custom show method with default timing
  useImperativeHandle(ref, () => ({
    show: (options) => {
      if (!options.severity || !options.summary) {
        console.warn('Toast requires severity and summary properties');
        return;
      }
      toastRef.current.show({
        severity: options.severity,
        summary: options.summary,
        detail: options.detail,
        life: options.life || VITE_TOAST_DEFAULT_LIFE,
      });
    }
  }));

  return <Toast ref={toastRef} position={props.position || "top-right"} />;
});

export default CustomToast;