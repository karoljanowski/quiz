import React from 'react'
import StartScreen from './Components/StartScreen'
import Quiz from './Components/Quiz'

function App() {

  const [start, setStart] = React.useState(false)
  const [apiData, setApiData] = React.useState([])
  const [category, setCategory] = React.useState(0)

  function startGame(){
    setStart(true)
  }
  function startAgain(){
    setStart(false)
  }
  console.log(apiData)
  React.useEffect(()=>{
      fetch(`https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&category=${category}`)
          .then(res => res.json())
          .then(data => setApiData(data))
  }, [category, start])

  function changeCategory(id){
    setCategory(id)
  }

  return (
    <div>
      {!start ? <StartScreen value={category} changeCategory={changeCategory} handleClick={startGame}/> : <Quiz startAgain={startAgain} data={apiData} />}
    </div>
  )
}

export default App
