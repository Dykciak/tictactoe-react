import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
	X: "Player 1",
	O: "Player 2",
};

const INITIALGAMEBOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
	let currentPlayer = "X";

	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O";
	}

	return currentPlayer;
};

const deriveWinner = (gameBoard, players) => {
	let winner;
	let draw;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}

	return winner;
};

const deriveGameBoard = (gameTurns) => {
	let gameBoard = [...INITIALGAMEBOARD.map((array) => [...array])];
	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

	return gameBoard;
};

function App() {
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);
	// const [hasWinner, setHasWinner] = useState(false);
	// const [activePlayer, setActivePlayer] = useState("X");

	const currentPlayer = deriveActivePlayer(gameTurns);

	const gameBoard = deriveGameBoard(gameTurns);

	const winner = deriveWinner(gameBoard, players);
	const hasDraw = gameTurns.length === 9 && !winner;

	const handleSelectSquare = (rowIndex, colIndex) => {
		// setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);

			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];

			return updatedTurns;
		});
	};

	const handleRematch = () => {
		setGameTurns([]);
	};

	const handlePlayerNameChange = (symbol, newName) => {
		setPlayers((prevPlayers) => {
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	};

	return (
		<>
			<main>
				<div id="game-container">
					<ol id="players" className="highlight-player">
						<Player
							initialName={PLAYERS.X}
							symbol="X"
							isActive={currentPlayer === "X"}
							onChangeName={handlePlayerNameChange}
						/>
						<Player
							initialName={PLAYERS.O}
							symbol="O"
							isActive={currentPlayer === "O"}
							onChangeName={handlePlayerNameChange}
						/>
					</ol>
					{(winner || hasDraw) && (
						<GameOver winner={winner} onRematch={handleRematch} />
					)}
					<GameBoard
						onSelectSquare={handleSelectSquare}
						board={gameBoard}
					></GameBoard>
				</div>
				<Log turns={gameTurns} />
			</main>
		</>
	);
}

export default App;
