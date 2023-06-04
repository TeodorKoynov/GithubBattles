import * as React from "react";
import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

const styles = {
    fontSize: "14px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center",
};

function Delayed({wait = 400, children}) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setShow(true);
        }, wait)

        return clearInterval(timerId);
    }, [])

    return (
        show ? children : null
    )
}

Delayed.propTypes = {
    children: PropTypes.node.isRequired,
    wait: PropTypes.number
}

export default function Loading({text = 'Loading', speed = 300}) {
    const [content, setContent] = useState(text);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setContent((content) => content === `${text}...` ? text : `${content}.`);
        }, speed)

        return clearInterval(intervalId);
    }, [])

    return (
        <Delayed>
            <p style={styles}>{content}</p>
        </Delayed>
    )
}
