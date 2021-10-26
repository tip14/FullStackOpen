import React, { useState } from 'react'


const Header = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

const Button = ({ label, addPoints }) => {
  return (<button onClick={addPoints}>{label}</button>)
}

const StatisticLine = ({ text, value, symbol }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value} {symbol}</td>
    </tr>
  )
}

const Statistics = ({ bad, neutral, good }) => {

  const showStatistics = good > 0 || neutral > 0 || bad > 0;

  if (showStatistics) {
    const all = bad + neutral + good;
    const average = (-1 * bad + 0 * neutral + 1 * good) / all;
    const positivePercentage = good / all * 100;

    return (
      <table>
        <tbody>
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="good" value={good} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positivePercentage} symbol="%" />
        </tbody>
      </table>
    )
  } else {
    return (<p>No feedback given</p>)
  }


}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const addGoodPoints = () => {
    setGood(good + 1);
  }

  const addNeutralPoints = () => {
    setNeutral(neutral + 1);
  }

  const addBadPoints = () => {
    setBad(bad + 1);
  }


  return (
    <div>
      <Header text="give feedback" />
      <Button label="good" addPoints={addGoodPoints} />
      <Button label="neutral" addPoints={addNeutralPoints} />
      <Button label="bad" addPoints={addBadPoints} />
      <Header text="statistics" />
      <Statistics bad={bad} neutral={neutral} good={good} />
    </div>
  )
}

export default App