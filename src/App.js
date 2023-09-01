import './App.css';
import Results from './Results';
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

function App() {

  const [inputValueOne, setInputValueOne] = useState('')
  const [inputValueTwo, setInputValueTwo] = useState('')
  const [ghData, setGhData] = useState({})
  const [ghDataSecondUser, setGhDataSecondUser] = useState({})
  const [handleButtonOne, setHandleButtonOne] = useState(true)
  const [handleButtonTwo, setHandleButtontwo] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [resultUserOne, setResultUserOne] = useState({})
  const [resultUserTwo, setResultUserTwo] = useState({})
  const [totalScoreUserOne, setTotalScoreUserOne] = useState(0)
  const [totalScoreUserTwo, setTotalScoreUserTwo] = useState(0)

  useEffect(() => {
// By adding the empty array it behaves like componentDidMount method
  }, [])

  const handleinputValueOne = (event) => {
    setInputValueOne(event.target.value)
  }

  const handleinputValueTwo = (event) => {
    setInputValueTwo(event.target.value)
  }

  const handleSubmitButtonOne = (event) => {
    if (inputValueOne) {
      setHandleButtonOne(!handleButtonOne)
      const url = `https://api.github.com/users/${inputValueOne}`
      fetch(url).then(res => res.json()).then(data => {
        setGhData(data)
      })
    }
    setInputValueOne('')
  }

  const handleSubmitButtonTwo = (event) => {
    if (inputValueTwo) {
      setHandleButtontwo(!handleButtonTwo)
      const url = `https://api.github.com/users/${inputValueTwo}`
      fetch(url).then(res => res.json()).then(data => {
        setGhDataSecondUser(data)
      })
    }
    setInputValueTwo('')
  }

  const handleResults = (event) => {
    setShowResults(!showResults)

    let objUserOne = {
      repoCount: ghData.public_repos + 0.5,
      followersCount: ghData.followers + 1,
      followingCount: ghData.following + 1
    }

    let userOneScore = Math.ceil(objUserOne.repoCount + objUserOne.followersCount + objUserOne.followingCount)

    let objUserTwo = {
      repoCount: ghDataSecondUser.public_repos + 0.5,
      followersCount: ghDataSecondUser.followers + 1,
      followingCount: ghDataSecondUser.following + 1
    }

    let userTwoScore = Math.ceil(objUserTwo.repoCount + objUserTwo.followersCount + objUserTwo.followingCount)

    setResultUserOne(objUserOne)
    setResultUserTwo(objUserTwo)
    setTotalScoreUserOne(userOneScore)
    setTotalScoreUserTwo(userTwoScore)
  }

  return (
    <div className="App">
      <h1>Instructions</h1>
      <div className='heroContainer' style={{ display: 'flex' }}>
        <div style={{ textAlign: 'center' }}>
          <h3>Enter Two GitHub Users</h3>
          <img src={require('./assets/enter-two-users.jpg')} />
        </div>
        <div>
          <h3>Battle</h3>
          <img src={require('./assets/battle.jpg')} />
        </div>
        <div>
          <h3>See the Winner</h3>
          <img src={require('./assets/see-the-winner.jpg')} />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div >
          <TextField onChange={handleinputValueOne} value={inputValueOne}
            id='outlined-basic' label='Enter GitHub User' variant='outlined' />
          <Button onClick={handleSubmitButtonOne}
            disabled={!inputValueOne}
            style={{ height: '55px' }} variant='outlined'>SUBMIT</Button>
        </div>
        <div>
          <TextField onChange={handleinputValueTwo} value={inputValueTwo}
            id='outlined-basic' label='Enter GitHub User' variant='outlined' />
          <Button onClick={handleSubmitButtonTwo}
            disabled={!inputValueTwo}
            style={{ height: '55px' }} variant='outlined'>SUBMIT</Button>
        </div>
      </div>
      <div style={{display: !handleButtonOne && !handleButtonTwo? 'block': 'none', height: '40px', cursor: 'pointer' }}>
        <Button variant='outlined' onClick={handleResults}
          >Battle</Button>
      </div>
      <Results/>
      
    </div>
    
  );
}

export default App;
