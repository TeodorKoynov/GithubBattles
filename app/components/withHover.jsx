import * as React from "react";
import {useRef} from "react";

export default function withHover(Component, propName = "hovering") {

    return function WithHover(props) {
        const hovering = useRef();

        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                <Component {{
                    [propName]: hovering.current,
                    ...props
                }} />
            </div>
        )
    }

    // return class WithHover extends React.Component {
    //
    //     render() {
    //         const props = {
    //             [propName]: this.state.hovering,
    //             ...this.props,
    //         };
    //
    //         return (
    //             <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
    //                 <Component {...props} />
    //             </div>
    //         );
    //     }
    // };
}
