import React, { useEffect, useState } from "react";

export default function Categories(props){
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        fetch('https://opentdb.com/api_category.php')
            .then(res => res.json())
            .then(data => setCategories(data.trivia_categories))
    }, [])
    const categoryElements = categories.map((category) => {
        return (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        );
      });

    return(
        
        <select name="category" id="category" value={props.value} onChange={(e) => props.changeCategory(e.target.value)}>
            <option value="">--Categories--</option>
            {categoryElements}
        </select>
        
    )
}