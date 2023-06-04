import * as React from "react";
import {useEffect, useReducer, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import PropTypes from "prop-types";
import {battle} from "../utils/api";
import Loading from "./Loading";


function Card({profile}) {
    const {
        login,
        avatar_url,
        html_url,
        followers,
        following,
        public_repos,
        location,
        company,
    } = profile;

    return (
        <div className="card bg-light">
            <header className="split">
                <div>
                    <h4>
                        <a href={html_url}>{login}</a>
                    </h4>
                    <p>{location || "unknown"}</p>
                </div>
                <img
                    className="avatar large"
                    src={avatar_url}
                    alt={`Avatar for ${login}`}
                />
            </header>
            <ul className="stack">
                <li className="split">
                    <span>Name:</span> <span>{login || "n/a"}</span>
                </li>
                <li className="split">
                    <span>Company:</span> <span>{company || "n/a"}</span>
                </li>
                <li className="split">
                    <span>Followers:</span> <span>{followers}</span>
                </li>
                <li className="split">
                    <span>Following:</span> <span>{following}</span>
                </li>
                <li className="split">
                    <span>Repositories:</span> <span>{public_repos}</span>
                </li>
            </ul>
        </div>
    );
}

Card.propTypes = {
    profile: PropTypes.shape({
        login: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        followers: PropTypes.number.isRequired,
        following: PropTypes.number.isRequired,
        repositories: PropTypes.number,
        location: PropTypes.string,
        company: PropTypes.string,
    }).isRequired,
};

function battleReducer(state, action) {
    if (action.type === 'success') {
        return {
            winner: action.winner,
            loser: action.loser,
            error: null,
            loading: false,
        }
    } else if (action.type === 'error') {
        return {
            ...state,
            error: action.message,
            loading: false,
        }
    } else {
        throw new Error('This type of Action isn\'t supported!')
    }
}

export default function Results({router}) {
    const [state, dispatch] = useReducer(
        battleReducer,
        {
            winner: null,
            loser: null,
            error: null,
            loading: true,
        }
    )

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const playerOne = searchParams.get('playerOne');
        const playerTwo = searchParams.get('playerTwo');

        battle([playerOne, playerTwo]).then((players) => dispatch({
                type: 'success',
                winner: players[0],
                loser: players[1]
            })
        ).catch(({message}) => dispatch({type: 'error', message}))
    }, [])

    const { winner, loser, loading, error } = state;

    if (loading === true) {
        return <Loading text={"Battling"} speed={300}/>
    }

    if (error) {
        return <p className={"text-center error"}>{error}</p>
    }

    return (
        <main className={"animate-in stack main-stack"}>
            <div className={"split"}>
                <h1>Results</h1>
                <Link to={"/battle"} className={"btn secondary"}>
                    Reset
                </Link>
            </div>
            <section className={"grid"}>
                <article className={"results-container"}>
                    <Card profile={winner.profile}/>
                    <p className={"results"}>
                            <span>
                                {winner.score === loser.score ? "Tie " : "Winner "}
                                {winner.score.toLocaleString()}
                            </span>
                        {winner.score !== loser.score && (
                            <img
                                width={80}
                                src={"https://ui.dev/images/certificate.svg"}
                                alt={"Certificate"}
                            />
                        )}
                    </p>
                </article>
                <article className={"results-container"}>
                    <Card profile={loser.profile}/>
                    <p className={"results"}>
                            <span>
                                {winner.score === loser.score ? "Tie " : "Loser "}
                                {loser.score.toLocaleString()}
                            </span>
                    </p>
                </article>
            </section>
        </main>
    )
}
