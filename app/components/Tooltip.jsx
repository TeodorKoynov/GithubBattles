import * as React from "react";
import PropTypes from "prop-types";
import useHover from "../hooks/useHover";

const container = {
    position: "relative",
    display: "flex",
};

export default function Tooltip({children, element}) {
    const [hovering, attr] = useHover();

    return (
        <div style={container} {...attr}>
            {hovering && element}
            {children}
        </div>
    )
}

Tooltip.propType = {
    children: PropTypes.node.isRequired,
    element: PropTypes.node.isRequired,
};
