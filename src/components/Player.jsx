import { useState } from "react";

export default function Player({
	initialName,
	symbol,
	isActive,
	onChangeName,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	const handleEditClick = () => {
		setIsEditing((editing) => !editing); //isEditing ? false : bardziej skomplikowany sposob niz !isEditing ale lepszy jest ten uzyty
		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	};

	const handleChange = (e) => {
		setPlayerName(e.target.value);
	};

	let editablePlayerName = <span className="player-name">{playerName}</span>;
	// let btnCaption = "Edit"        pierwszy sposob

	if (isEditing) {
		//isEditing === true
		editablePlayerName = (
			<input
				type="text"
				required
				defaultValue={playerName}
				onChange={handleChange}
			/>
		);
		// btnCaption = "Save";        pierwszy sposob
	}

	return (
		<li className={isActive ? "active" : undefined}>
			<span className="player">
				{editablePlayerName}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
		</li>
	);
}
