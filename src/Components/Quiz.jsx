import React from 'react'
import { nanoid } from 'nanoid'
import Question from './Question'

export default function Quiz(prop){

    const result = prop.data.results

    const [check, setCheck] = React.useState(false)
    const [questions, setQuestions] = React.useState(createQuestions())

    function createQuestions(){
        let arrayOfQuestions = []
        for(let question of result){
            let arrayOfAnswers = []
            for(let answer of question.incorrect_answers){
                arrayOfAnswers.push({
                    id: nanoid(),
                    text: answer,
                    correct: false,
                    userChoice: false
                })
            }
            arrayOfAnswers.push({
                id: nanoid(),
                text: question.correct_answer,
                correct: true,
                userChoice: false
            })
            arrayOfQuestions.push({
                id: nanoid(),
                goodAnswer: false,
                question: question.question,
                answers: arrayOfAnswers.sort(() => Math.random() - 0.5)
            })
        }
        return arrayOfQuestions
    }
    function handleUserChoice(answerID, questionID){
        const newQuestions = [...questions]
        const currentQuestion = newQuestions.find(que => que.id === questionID)
        for(let answer of currentQuestion.answers){
            if(answer.id === answerID){
                answer.userChoice = !answer.userChoice
            }else{
                answer.userChoice = false
            }
        }
        setQuestions(newQuestions)
    }
    
    function handleCheck(){
        setCheck(true)
        const newArray = [...questions]
        for(let question of newArray){
            for(let answer of question.answers){
                if(answer.correct && answer.userChoice){
                    question.goodAnswer = true
                    
                }
            }
        }
        setQuestions(newArray)
        console.log(newArray)
    }

    
    const questionsElements = questions.map(question => {
        return <Question check={check} handleUserChoice={handleUserChoice} key={question.id} data={question}/>
    })   
    
    return(
        <div className="start">
            {questionsElements}
            {check && <p className='score'>You scored {questions.filter(que => que.goodAnswer).length}/5 correct answers</p>}
            <button onClick={check ? prop.startAgain : handleCheck} className='check--answers-btn'>{check ?'Play again' :'Check answers'}</button>
        </div>
    )
}