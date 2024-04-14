import { useEffect, useMemo, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const API = 'https://dummyjson.com/todos?limit=10&skip=80';
  const [arr, setArr] = useState([]);
  const [userArr, setuserArr] = useState([]);
  const [mp, setMap] = useState(new Map());

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        const tempArr = data.todos;

        // Update arr state
        setArr((prevArr) => [...prevArr, ...tempArr]);

        // Update mp state
        const newMap = new Map(mp); // Create a new map from the previous state
        tempArr.forEach((item) => {
          if (newMap.has(item.userId)) {
            newMap.get(item.userId).push(item);
          } else {
            newMap.set(item.userId, [item]);
          }
        });
        setMap(newMap); // Update the mp state with the modified map
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='parent'>
      <h1 className='heading'>Todo Fetcher</h1>
      <div>
        {Array.from(mp.values()).map((item, index) => (
          <div key={index}>
            <h3 className='userid'>UserId: {item[0].userId}</h3>
            {item.map((it, idx) => (
              <div className='todo'>
                <ul key={idx}>{it.todo}</ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
