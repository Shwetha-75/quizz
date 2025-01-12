import React from 'react'
import DataSet from "./data";
import "./main.css";
import Confetti  from "react-confetti";
import { nanoid } from 'nanoid';
export default function Main() {
  const [count,setCount]=React.useState(0);
  const [selectedData,setSelectedData]=React.useState(JSON.parse(localStorage.getItem('selectedData'))||{});
  const [result,setResult]=React.useState(false);
  const [warning,setWarning]=React.useState(false);
  const [celebrate,setCelebrate]=React.useState(false);
  const handleOnChange=(index,option)=>{
      setSelectedData((prev)=>({
        ...prev,
        [index]:option
      }))};

  React.useEffect(()=>{
    localStorage.setItem('selectedData',JSON.stringify(selectedData));
  },[selectedData]);

  const handleResetButton=()=>{
    setSelectedData({});
    setCount(0);
    setResult(false);
    setCelebrate(false)
  }

   const handleOnSubmit=(event)=>{
    console.log(selectedData)
    setCount(0);
    event.preventDefault(); 
      if(Object.keys(selectedData).length!==Object.keys(DataSet).length){
        setWarning(true);
        setResult(false);
        return;
      }
      setWarning(false);
      //  user validation 
      DataSet.forEach((item)=>{
        setCount((prev)=>prev+=item.ans===selectedData[item.id]?1:0);
      })
      if(count===Object.keys(selectedData).length){
       setCelebrate(true)
      }
      setResult(true);

   }
  const array=DataSet.map((item,index)=>{
    return (
    <div className='mt-10 w-90 ml-10' key={index}>
    <p>{index+1}. {item.question}</p>
    <div className='flex justify-between'>
      {item.option.map((opt)=>{
    const id_opt=nanoid()
    const isSelected=selectedData[item.id]===opt;
    return(
    <div key={id_opt} 
    className={`mt-2 radio--div--tag ${isSelected?'active':''}`}>
    <label 
    htmlFor={id_opt} 
    className='text-center'>{opt}</label>
    <input 
    type="radio" 
    className='option--tag' 
    id={id_opt} 
    name={opt} 
    checked={isSelected}
    onChange={()=>handleOnChange(item.id,opt)} 
     />
    </div>
    )
  })}
  </div>
  </div>)});  


  return (
    <div className="div--tag ">
     <h2 className='text-center text-2xl text-lime-900 quiz--div--tag'>
      Let's Play Quiz !
     </h2>
     <form onSubmit={handleOnSubmit}>
       {array}
       <div className='flex justify-around'>
    <button 
    type="submit" 
    className='submit--btn--tag'>
    Submit</button>
    <button 
     className='submit--btn--tag'
     onClick={handleResetButton}
     >Reset</button>
     </div>
     </form>
{celebrate && <Confetti 

 />}
     {warning&&<p  className=' text--result--tag text-center text-red-700'>Please select all question</p>}
     {result &&
     <p  className=' text--result--tag text-center'>Result :{count}</p>}
    </div>
  )
}
