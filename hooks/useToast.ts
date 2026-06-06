import { useState, useCallback, useRef } from "react";

const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string, duration = 2000) => {
    // Clear any existing timer so toasts don't stack
    if (timerRef.current) clearTimeout(timerRef.current);

    setMessage(msg);
    timerRef.current = setTimeout(() => setMessage(null), duration);
  }, []);

  return { message, showToast };
};

export default useToast;
