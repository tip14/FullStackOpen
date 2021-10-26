import React, { useState } from 'react'

const Button = ({event, text}) => {
  return(<button onClick={event}>{text}</button>)
}

const Header = ({text}) => {
  return (<h1>{text}</h1>)
}

const Anecdote = ({text, votes}) => {
  return(
    <>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  //init votes holder object
  const votesInitial = {};
  for(let i = 0; i < anecdotes.length; i++) {
    votesInitial[i] = 0;
  }

  const [votes, setVotes] = useState(votesInitial);
  const [bestAnecdoteIdx, setBestAnecdoteIdx] = useState(0);

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 0) + 0))
  }

  const getBestAnecdoteIdx = (votes) => {
    let bestAnecdoteIdx = 0;
    let bestAnecdoteValue = 0;
    for(let i = 0; i < anecdotes.length; i++) {
      if(votes[i] > bestAnecdoteValue) {
        bestAnecdoteIdx = i;
        bestAnecdoteValue = votes[i];
      }
    }
    console.log(bestAnecdoteIdx);
    return bestAnecdoteIdx;
  }

  const vote = () => {
    const updatedVotes = {...votes, [selected]: votes[selected] + 1};
    setVotes(updatedVotes);
    setBestAnecdoteIdx(getBestAnecdoteIdx(updatedVotes));
  }

  
  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button text="vote" event={vote} />
      <Button text="next anecdote" event={nextAnecdote} />

      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[bestAnecdoteIdx]} votes={votes[bestAnecdoteIdx]}/>
      
    </div>
  )
}

export default App