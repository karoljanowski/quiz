import React from 'react'

export default function Question(props){
    

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
   function style(answer) {
        if(props.check){
            if(answer.userChoice && answer.correct){
                return {backgroundColor: '#94D7A2'}
            }else if(answer.userChoice){
                return {backgroundColor: '#F8BCBC'}
            }else if(answer.correct){
                return {backgroundColor: '#94D7A2'}
            }
        }else{
            if(answer.userChoice){
                return {backgroundColor: '#D6DBF5'}
            }else{
                return {backgroundColor: 'transparent'}
            }
        }
    }
    const buttonElements = props.data.answers.map(answer => {
        return <button
            style={style(answer)} 
            key={answer.id} 
            onClick={() => props.handleUserChoice(answer.id, props.data.id)}
            >{decodeHtml(answer.text)}</button>
    })
    return(
        <div className="question">
            <h2>{decodeHtml(props.data.question)}</h2>
            <div className="answers">{buttonElements}</div>
            {props.check && <p className={props.data.goodAnswer ? 'good' : 'bad'}>{props.data.goodAnswer ? 'GOOD ANSWER!': 'BAD ANSWER'}</p>}
        </div>
    )
}