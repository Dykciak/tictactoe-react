import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
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

function App() {
	const [players, setPlayers] = useState({
		X: "Player 1",
		O: "Player 2",
	});
	const [gameTurns, setGameTurns] = useState([]);
	// const [hasWinner, setHasWinner] = useState(false);
	// const [activePlayer, setActivePlayer] = useState("X");

	const currentPlayer = deriveActivePlayer(gameTurns);

	let gameBoard = [...initialGameBoard.map((array) => [...array])];
	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

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
							initialName="Player 1"
							symbol="X"
							isActive={currentPlayer === "X"}
							onChangeName={handlePlayerNameChange}
						/>
						<Player
							initialName="Player 2"
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
