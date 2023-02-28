import React, { useEffect, useState } from 'react'
import Categories from './Categories'

export default function StartScreen(prop){
   
    return(
        <div className="start">
                <h1>Quizzical</h1>
                <p>Do you know the answer?</p>
                <Categories value={prop.value} changeCategory={prop.changeCategory}/>
                <button className="start-button" onClick={prop.handleClick}>Start quiz</button>
            </div>

    )
}