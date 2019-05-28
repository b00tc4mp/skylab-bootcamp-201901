import { useState } from 'react';

const useCustomHook = () => {
  const [isShowing, setIsShowing] = useState(null);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
}

export default useCustomHook
