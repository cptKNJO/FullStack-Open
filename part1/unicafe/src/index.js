import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ text, value }) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  
  if (total === 0) {
    return <p>No feedback given</p>
  }

  const average = ((good * 1) + (-1 * bad)) / total
  const positive = good / total * 100 + ' %'

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setFeedback = feedback => {
    if (feedback === "good") {
      setGood(good + 1);
    } else if (feedback === "neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setFeedback("good")} text="good" />
      <Button handleClick={() => setFeedback("neutral")} text="neutral" />
      <Button handleClick={() => setFeedback("bad")} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));