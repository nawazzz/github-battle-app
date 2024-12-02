import './App.scss';
import Results from './Results';
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { ChakraProvider, VStack } from '@chakra-ui/react'


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
  const [inputOneEnabled, setInputOneEnabled] = useState(true)
  const [inputTwoEnabled, setInputTwoEnabled] = useState(true)


  useEffect(() => {
    console.log(inputValueOne, inputValueTwo, ghData, ghDataSecondUser)
// By adding the empty array it behaves like componentDidMount method
  }, [])

  const handleinputValue = (event) => {
    console.log(event)
    if (event.target.name === 'userOne') {
      setInputValueOne(event.target.value)
    }
    if (event.target.name === 'userTwo') {
      setInputValueTwo(event.target.value)
    }
    
  }

  const handleSubmitButtonOne = (event) => {
    if (inputValueOne) {
      setHandleButtonOne(!handleButtonOne)
      const url = `https://api.github.com/users/${inputValueOne}`
      fetch(url).then(res => res.json()).then(data => {
        setGhData(data)
        console.log(data)
      })
    }
    setInputValueOne('')
    setInputOneEnabled(false)
  }

  const handleSubmitButtonTwo = (event) => {
    if (inputValueTwo) {
      setHandleButtontwo(!handleButtonTwo)
      const url = `https://api.github.com/users/${inputValueTwo}`
      fetch(url).then(res => res.json()).then(data => {
        setGhDataSecondUser(data)
        console.log(data)
      })
    }
    setInputValueTwo('')
    setInputTwoEnabled(false)
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
      <h1 style={{textAlign: 'center'}}>Instructions</h1>
      <div className='heroContainer' style={{ display: 'flex' , justifyContent: 'center', padding: '60px', gap: '150px' }}>
        <div style={{ textAlign: 'left' }}>
          <h3>Enter Two GitHub Users</h3>
          <img src={require('./assets/enter-two-users.jpg')} alt='' />
        </div>
        <div>
          <h3>Battle</h3>
          <img src={require('./assets/battle.jpg')} alt='' />
        </div>
        <div>
          <h3>See the Winner</h3>
          <img src={require('./assets/see-the-winner.jpg')} alt='' />
        </div>
      </div>
      <h3 style={{textAlign: 'center', marginBottom: '50px'}}>Players</h3>
      <div className='parentInputContainer' style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
        <div>
          <div className='inputField' style={{display: inputOneEnabled ? 'flex' : 'none'}}>
            <input onChange={handleinputValue} value={inputValueOne}
              id='outlined-basic' label='Enter GitHub User' variant='outlined' 
              placeholder='Enter GitHub user'
              name='userOne'
              />
            <button onClick={handleSubmitButtonOne}
              disabled={!inputValueOne}
              style={{ height: '55px' }} variant='outlined'>SUBMIT</button>
          </div>
          <div className='userOverview'  style={{display: !inputOneEnabled ? 'flex' : 'none'}}>
              <img src={ghData.avatar_url} alt='avatar' style={{width: '50px'}} />
            <div style={{display: 'flex', alignItems: 'center', gap:'20px'}}>
              <h5>
                {ghData.name}
              </h5>
              <span style={{cursor: 'pointer'}}>x</span>
            </div>
          </div>
        </div>
        <div>
          <div className='inputField' style={{display: inputTwoEnabled ? 'flex' : 'none'}}>
            <input onChange={handleinputValue} value={inputValueTwo}
              id='outlined-basic' label='Enter GitHub User' variant='outlined' 
              placeholder='Enter GitHub user'
              name='userTwo'
              />
            <button onClick={handleSubmitButtonTwo}
              disabled={!inputValueTwo}
              style={{ height: '55px' }} variant='outlined'>SUBMIT</button>
          </div>
          <div className='userOverview'  style={{display: !inputTwoEnabled ? 'flex' : 'none'}}>
              <img src={ghDataSecondUser.avatar_url} alt='avatar' style={{width: '50px'}} />
            <div style={{display: 'flex', alignItems: 'center', gap:'20px'}}>
              <h5>
                {ghDataSecondUser.name}
              </h5>
              <span style={{cursor: 'pointer'}}>x</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{display: !handleButtonOne && !handleButtonTwo? 'flex': 'none', height: '40px', cursor: 'pointer', justifyContent:'center', marginTop: '20px' }}>
        <button  onClick={handleResults}
          style={{border: '0.5px solid grey', borderRadius: '10px'}}
          >Battle</button>
      </div>
      {/* <Results
        ghData={ghData} ghDataSecondUser={ghDataSecondUser} inputValueOne={inputValueOne}
        inputValueTwo={inputValueTwo} handleButtonOne={handleButtonOne} handleButtonTwo={handleButtonTwo}
        showResults={showResults} resultDataOne={resultUserOne} resultDataTwo={resultUserTwo}
        totalScoreUserOne={totalScoreUserOne} totalScoreUserTwo={totalScoreUserTwo}
      /> */}
      
    </div>
    
  );
}

export default App;
