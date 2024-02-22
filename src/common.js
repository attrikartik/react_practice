import { useEffect, useState } from 'react'

const useDebounce = (value,delay) =>{
   const [debounceValue,setDebouncedValue] = useState(value)

   useEffect(()=>{
       let timer = setTimeout(async()=>{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
        const res = await response.json()
        // console.log(res);
        setDebouncedValue(res)
       }, delay)

       return ()=> clearTimeout(timer)
   },[value,delay])

   return debounceValue
}

const useThrottle = (func,delay) =>{
    let lastExecuted = 0

    return function(...args){
        let now = new Date().getTime();
        if(now - lastExecuted > delay){
            lastExecuted = now;
            func(...args)
        }
    }
}

export {useDebounce, useThrottle}