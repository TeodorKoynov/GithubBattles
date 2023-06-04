import * as React from 'react';
import PropTypes from "prop-types";
import {fetchPopularRepos} from "../utils/api";
import Table from "./Table";
import {useEffect, useState} from "react";

function LanguagesNav({selected, onUpdateLanguage}) {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

    return (
        <select
            onChange={(e) => onUpdateLanguage(e.target.value)}
            value={selected}
        >
            {languages.map((language) => (
                <option key={language} value={language}>
                    {language}
                </option>
            ))}
        </select>
    );
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired,
}

export default function Popular() {
    const [selectedLanguage, setSelectedLanguage] = useState('ALL');
    const [repos, setRepos] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        updateLanguage(selectedLanguage);
    }, [])

    const updateLanguage = (selectedLanguage) => {
        setSelectedLanguage(selectedLanguage);
        setError(null);

        fetchPopularRepos(selectedLanguage)
            .then((repos) => {
                setRepos(repos);
                setError(null);
            })
            .catch((error) => {
                console.warn("Error fetching repos: ", error);
                setError("There was an error fetching the repositories!");
            })
    }

    return (
        <main className={"stack main-stack animate-in"}>
            <div className={"split"}>
                <h1>Popular</h1>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={updateLanguage}
                />
            </div>

            {error && <p className={"text-center error"}>{error}</p>}

            {repos && <Table repos={repos}/>}
        </main>
    )
}

// export default class Popular extends React.Component {
//     state = {
//         selectedLanguage: "All",
//         repos: null,
//         error: null,
//     };
//
//     componentDidMount() {
//         this.updateLanguage(this.state.selectedLanguage)
//     }
//
//     updateLanguage = (selectedLanguage) => {
//         this.setState({
//             selectedLanguage,
//             error: null,
//         });
//
//         fetchPopularRepos(selectedLanguage)
//             .then((repos) => this.setState({
//                     repos,
//                     error: null
//                 })
//             ).catch(error => {
//             console.warn("Error fetching repos: ", error);
//
//             this.setState({
//                 error: "There was an error fetching the repositories!",
//             });
//         });
//     }
//
//     render() {
//         const {selectedLanguage, repos, error} = this.state;
//
//         return (
//             <main className={"stack main-stack animate-in"}>
//                 <div className={"split"}>
//                     <h1>Popular</h1>
//                     <LanguagesNav
//                         selected={selectedLanguage}
//                         onUpdateLanguage={this.updateLanguage}
//                     />
//                 </div>
//
//                 {error && <p className={"text-center error"}>{error}</p>}
//
//                 {repos && <Table repos={repos}/>}
//             </main>
//         );
//     }
// }
