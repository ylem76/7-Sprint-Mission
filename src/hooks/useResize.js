import { useState, useEffect } from 'react';

const debounce = (func, delay) => {
  let timeoutId = null;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const useResize = () => {
  const [state, setState] = useState({
    w: null,
    h: null,
  });

  const onResize = (e) => {
    setState({
      w: e.target.innerWidth,
      h: e.target.innerHeight,
    });
  };

  useEffect(() => {
    //console.log("window");
    if (state.w === null) {
      setState({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    }

    window.addEventListener(
      'resize',
      debounce((e) => {
        onResize(e);
      }, 100)
    );

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return state;
};

export default useResize;
