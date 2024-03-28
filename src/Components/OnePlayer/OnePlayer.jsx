import React, { useEffect, useState } from 'react'
import { AttentionSeeker, Fade } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

export default function OnePlayer() {
  let Navigate = useNavigate()
  
  const initialBoard = Array(9).fill('');
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [winningLine, setWinningLine] = useState([]); // Track the winning line

  useEffect(() => {
    if (!gameOver && currentPlayer === 'O') {
      makeAIMove();
    }
  }, [currentPlayer]);

  const checkWin = (board, player) => {
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let combination of winCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinningLine(combination); // Set the winning line
        return true;
      }
    }

    return false;
  };

  const checkDraw = (board) => {
    return !board.includes('');
  };

  const handleCellClick = (index) => {
    if (gameOver || board[index] !== '') return;

    document.getElementById('para').classList.add('d-none')
    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    if (checkWin(updatedBoard, currentPlayer)) {
      setMessage(`Player ${currentPlayer} wins!`);
      setGameOver(true);
    } else if (checkDraw(updatedBoard)) {
      setMessage("It's a draw!");
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const makeAIMove = () => {
    const availableMoves = board.reduce((acc, cell, index) => {
      if (cell === '') {
        return [...acc, index];
      }
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const aiMove = availableMoves[randomIndex];

    setTimeout(() => {
      handleCellClick(aiMove);
    }, 500);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setGameOver(false);
    setMessage('');
    setWinningLine([]);
    document.getElementById('para').classList.remove('d-none')

  };

  const isWinningCell = (index) => {
    return winningLine.includes(index);
  };

  return <>

     <div className='gameComponent'>

     <i onClick={()=>Navigate('/')} className="fa-solid fa-arrow-left returnBackBtn" role='button'></i>

     <AttentionSeeker effect='flash' duration={2000}><h2 className='startP' id='para'>Start Playing</h2> </AttentionSeeker> 
      
     <Fade cascade damping={0.1}>
    
      <div className={`${message? "message" : '' }`}>{message}</div>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${isWinningCell(index) ? 'winning-cell' : ''}`}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button className='reset' onClick={resetGame}>Reset</button>
      </Fade> 
    </div>
 
   
  </>
  


 


}
