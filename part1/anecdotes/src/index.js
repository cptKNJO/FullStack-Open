import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Display = ({ anecdote, vote }) => {
    return (
       <div>
            <p>{anecdote}</p>
            <p>has {vote} votes</p>
       </div>
    )
}

const MaxVoted = ({ anecdotes, votes }) => {
    const getMax = (votes, mostVoted=0) => {
        votes.forEach((vote, index) => {
            if (vote > votes[mostVoted]) {
                mostVoted = index
            }          
        });
        return mostVoted
    }

    const mostVoted = getMax(votes)

    return (
        <div>
            <Display anecdote={anecdotes[mostVoted]} vote={votes[mostVoted]} />
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const setNextAnecdote = () => {
      // Set selected to a random number
      const max = props.anecdotes.length
      const newSelected = Math.floor(Math.random() * max);
      setSelected(newSelected)
  }

  const handleVote = () => {
      const newVotes = [...votes]
      newVotes[selected] += 1
      setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display anecdote={props.anecdotes[selected]} vote={votes[selected]} />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={setNextAnecdote} text='next anecdote' />

      <h1>Anecdote with most votes</h1>
      <MaxVoted anecdotes={props.anecdotes} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)