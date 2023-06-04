import * as React from "react";
import {useMemo, useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {close} from "./icons";

function Instructions() {
    return (
        <section className={"instructions-container"}>
            <h2>Instructions</h2>
            <ol>
                <li>Enter 2 Github users</li>
                <li>Battle</li>
                <li>See the winners</li>
            </ol>
        </section>
    )
}

function PlayerInput({label, onSubmit}) {
    const [username, setUsername] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        onSubmit(username);
    }

    const changeHandler = (event) => {
        const username = event.target.value.trim();
        setUsername(username);
    }

    return (
        <form className={"card bg-light"} onSubmit={submitHandler}>
            <label htmlFor="username" className={"player-label"}>
                {label}
            </label>
            <div className={"input-row"}>
                <input
                    type="text"
                    id="username"
                    className={"input-light"}
                    placeholder="github username"
                    autoComplete="off"
                    value={username}
                    onChange={changeHandler}
                />
                <button
                    className={"btn link btn-dark"}
                    type={"submit"}
                    disabled={!username}
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

function PlayerPreview({username, onReset, label}) {
    return (
        <article className={"card"}>
            <h3 className={"player-label"}>{label}</h3>
            <div className={"split"}>
                <div className={"row gap-md"}>
                    <img
                        width={32}
                        height={32}
                        className={"avatar"}
                        src={`https://github.com/${username}.png?size=200`}
                        alt={`Avatar for ${username}`}
                    />
                    <a href={`https://github.com/${username}`} className={"link"}>
                        {username}
                    </a>
                </div>
                <button onClick={onReset} className={"btn secondary icon"}>
                    {close}
                </button>
            </div>
        </article>
    );
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

export default function Battle() {
    const [playerOne, setPlayerOne] = useState(null);
    const [playerTwo, setPlayerTwo] = useState(null);

    // const disabled = useMemo(() => !playerOne || !playerTwo, [playerOne, playerTwo]);

    const submitHandler = (id, player) => id === 'playerOne' ? setPlayerOne(player) : setPlayerTwo(player)
    const resetHandler = (id) => id === 'playerOne' ? setPlayerOne(null) : setPlayerTwo(null);

    return (
        <main className={"stack main-stack animate-in"}>
            <div className={"split"}>
                <h1>Players</h1>
                <Link
                    to={{
                        pathname: "/results",
                        search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                    }}
                    className={`btn primary ${!playerOne || !playerTwo ? "disabled" : ''}`}
                >
                    Battle
                </Link>
            </div>
            <section className={"grid"}>
                {playerOne === null ? (
                    <PlayerInput
                        label={"Player One"}
                        onSubmit={(player) => submitHandler("playerOne", player)}
                    />
                ) : <PlayerPreview
                    label={"Player One"}
                    username={playerOne}
                    onReset={() => resetHandler("playerOne")}
                />}

                {playerTwo === null ? (
                    <PlayerInput
                        label={"Player Two"}
                        onSubmit={(player) => submitHandler("playerTwo", player)}
                    />
                ) : <PlayerPreview
                    label={"Player Two"}
                    username={playerTwo}
                    onReset={() => resetHandler("playerTwo")}
                />}
            </section>
            <Instructions/>
        </main>
    )
}
