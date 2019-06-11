import React, { useState } from "react";
import ReactDOM from "react-dom";

const History = (props) => {
    if(props.allClicks.length === 0) {
        return (
            <div>
                This app is used by clicking the buttons.
            </div>
        )
    }

    return (
        <div>
            Button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const App = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1);
    };

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1);
    };

    const handleReset = () => {
        setAll([])
        setLeft(0)
        setRight(0)
    }

    return (
        <div>
            <div>
                {left}
                <Button handleClick={handleLeftClick} text='left'/>
                <Button handleClick={handleRightClick} text='right'/>
                {right}
                <Button handleClick={handleReset} text='reset'/>
                <History allClicks={allClicks} />
            </div>
            
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
