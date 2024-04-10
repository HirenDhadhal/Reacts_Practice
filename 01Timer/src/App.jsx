import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [start, setStart] = useState(false);
  const [t1, setTxt] = useState('Start');
  const [count, setCount] = useState(0);

  const changeTxt = () => {
    setStart(!start);
    setTxt(start ? 'Start' : 'Stop');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (start) setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);
  return (
    <>
      <p>{count}</p>
      <button onClick={changeTxt}>{t1}</button>
    </>
  );
}

export default App;
