import { useEffect, useRef } from "react";

export function useClickOutside(closeModal) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = function (e) {
      if (ref.current && !ref.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [closeModal]);

  return ref;
}
