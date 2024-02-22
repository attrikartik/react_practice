import React, {useState, useEffect} from 'react'
import './App.css';
import { useDebounce, useThrottle } from './common';

const DebounceThrottle = () => {
    const [value,setValue]=useState("");
  
    const debouncedInputValue = useDebounce(value,200)
  
    const getPosts = async(e) =>{
      e.preventDefault()
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      const res = await response.json()
      console.log(res);
    }
    const throttledFunction = useThrottle(getPosts,2000)
  
    useEffect(()=>{
      console.log(debouncedInputValue)
    },[debouncedInputValue])
  
  
    const handleChange = (e)=>{
      e.preventDefault()
      setValue(e.target.value)
    }
  
    return (
      <div className="App">
        <div>
          <input type='text' value={value} onChange={handleChange}/>
          <button onClick={(e)=>throttledFunction(e)}>Submit</button>
        </div>
      </div>
    );
}

export default DebounceThrottle