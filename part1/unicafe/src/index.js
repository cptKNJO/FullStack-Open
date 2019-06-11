import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Display = ({ feedback, amount }) => {
    return (
        <div>
            <p>{feedback} {amount}</p>
        </div>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setFeedback = (feedback) => {
        if (feedback === 'good') {
            setGood(good + 1)
        } else if (feedback === 'neutral') {
            setNeutral(neutral + 1)
        } else {
            setBad(bad + 1)
        }
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handleClick={() => setFeedback('good')} text='good' />
            <Button handleClick={() => setFeedback('neutral')} text='neutral' />
            <Button handleClick={() => setFeedback('bad')} text='bad' />
            <h1>Statistics</h1>
            <Display feedback='good' amount={good} />
            <Display feedback='neutral' amount={neutral} />
            <Display feedback='bad' amount={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)