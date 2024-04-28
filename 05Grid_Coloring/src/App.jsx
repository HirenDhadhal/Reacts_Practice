import { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [count, setCount] = useState(0);
  const [arr, setArr] = useState([]);

  const colorCell = (idx) => {
    setCount((prev) => prev + 1);
    setArr((arr) => [...arr, idx]);
    const newBoard = [...board];
    newBoard[idx] = 'X';
    setBoard(newBoard);
  };

  const unColor = (array) => {
    const newArray = [...array]; // Create a local copy of the array
    const temp = setInterval(() => {
      if (newArray.length === 0) {
        clearInterval(temp);
      } else {
        setBoard((prevBoard) => {
          const boardCopy = [...prevBoard];
          const lastIdx = newArray.pop(); // Use the local copy for popping
          boardCopy[lastIdx] = '';
          return boardCopy;
        });
      }
    }, 1000);
  };

  return (
    <>
      <div>Grid Coloring</div>
      {count == 9 && unColor(arr)}
      <div className='board'>
        {board.map((val, idx) => {
          return (
            <button
              color='red'
              className='cell'
              key={idx}
              style={{ backgroundColor: val === 'X' ? 'red' : 'white' }}
              disabled={val !== null}
              onClick={() => {
                colorCell(idx);
              }}
            >
              {val}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default App;
