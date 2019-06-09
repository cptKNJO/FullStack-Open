import React from 'react';
import ReactDOM from 'react-dom';

const Hello = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old!</p>
            <p>So you were probably born {bornYear()}</p>
        </div>
    )
}

const App = () => {
    const name = "Peter"
    const age = 12

    return (
        <div>
            <h1>Greetings!</h1>
            <Hello name="George" age={26 + 10}/>
            <Hello name={name} age={age}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))