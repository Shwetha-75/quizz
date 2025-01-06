import React from 'react'
import DataSet from "./data";
export default function Main() {
  const array=DataSet.map((item,index)=>{
    return (

    <div className='mt-5 w-90 ml-10' key={index}>
    <p>{index+1}. What does some points means ?</p>
    <input type="radio" id="option1" name={"index--"+index}/>
    <label for="option1">Option 1</label>
    <input type="radio" id="option2" name={"index--"+index}/>
    <label for="option2">Option 2</label>
    <input type="radio" id="option3" name={"index--"+index}/>
    <label for="option3">Option 3</label>
    <input type="radio" id="option4" name={"index--"+index}/>
    <label for="option4">Option 4  </label>
  </div>
    )
  });


  return (
    <div className="div--tag ">
     <h2 className='text-center text-2xl text-lime-900'>Quiz</h2>
    {array}
    <button></button>
    </div>
  )
}
