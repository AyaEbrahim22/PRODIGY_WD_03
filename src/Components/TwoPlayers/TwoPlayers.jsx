
import React, { useState } from 'react'
import { AttentionSeeker, Fade } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

export default function TwoPlayers() {

   let Navigate = useNavigate()

    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [board, setBoard] = useState(Array(9).fill(''));
    const [message, setMessage] = useState("It's Player X's turn");
    const [gameOver, setGameOver] = useState(false);
    const [winningLine, setWinningLine] = useState([]);
  
    const handleCellClick = (index) => {
        if (gameOver || board[index] !== '') return;
        document.getElementById('para').classList.add('d-none')
        const updatedBoard = [...board];
        updatedBoard[index] = currentPlayer;
        setBoard(updatedBoard);
      
        if (checkWin(updatedBoard)) {
          document.getElementById('win').classList.remove('turn')
          document.getElementById('win').classList.remove('draw')
          document.getElementById('win').classList.add('message')
          setMessage(`Player ${currentPlayer} wins!`);
          setGameOver(true);
          const updatedWinningLine = getWinningLine(updatedBoard);
          setWinningLine(updatedWinningLine);
        } else if (checkDraw(updatedBoard)) {
          document.getElementById('win').classList.add('draw')
          document.getElementById('win').classList.remove('message')
          document.getElementById('win').classList.remove('turn')
          setMessage("It's a draw!");
          setGameOver(true);
        } else {
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
          setMessage(`It's Player ${currentPlayer === 'X' ? 'O' : 'X'}'s turn`);
        }
      };
  
    const checkWin = (board) => {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
      ];
  
      return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
          board[a] !== '' &&
          board[a] === board[b] &&
          board[a] === board[c]
        );
      });
    };
  
    const getWinningLine = (board) => {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
      ];
  
      const winningCombination = winningCombinations.find(combination => {
        const [a, b, c] = combination;
        return (
          board[a] !== '' &&
          board[a] === board[b] &&
          board[a] === board[c]
        );
      });
  
      return winningCombination || [];
    };
  
    const checkDraw = (board) => {
      return board.every(cell => cell !== '');
    };
  
    const resetGame = () => {
      setBoard(Array(9).fill(''));
      setCurrentPlayer('X');
      setMessage("It's Player X's turn");
      setGameOver(false);
      setWinningLine([]);
      document.getElementById('para').classList.remove('d-none')
      document.getElementById('win').classList.add('turn')
      document.getElementById('win').classList.remove('message')
      document.getElementById('win').classList.remove('draw')
    };
  
    const isWinningCell = (index) => {
      return winningLine.includes(index);
    };

    return <>

<div className='gameComponent'>

<i onClick={()=>Navigate('/')} className="fa-solid fa-arrow-left returnBackBtn" role='button'></i>

<AttentionSeeker effect='flash' duration={2000}><h2 className='startP' id='para'>Start Playing</h2> </AttentionSeeker> 
      
      <Fade cascade damping={0.1}>

      <div id='win' className="turn">{message}</div>
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



