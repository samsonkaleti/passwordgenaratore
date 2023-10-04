import { useCallback, useEffect, useRef, useState } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8) 
  const [numbers , setNumbers] = useState(false)
  const [chars,setChars] = useState(false)    
  const passwordRef = useRef(null) 

  const [password , setPassword] = useState('')

  const generate = useCallback(()=>{
    let pass =  '' 
    let passString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if(numbers) passString += '1234567890' ; 
    if(chars) passString += '~!@#$%^&*()_+' ; 

    for(let i = 0; i <= length ; i++){
      const char_index = Math.floor(Math.random()*passString.length + 1) 
      pass += passString.charAt(char_index)
      setPassword(pass) 

    }
  },[length,numbers,chars])  


  const copyPassword = useCallback(()=>{
    const p = passwordRef.current?.select() 

    window.navigator.clipboard.writeText(password) 

    

  },[password])


  useEffect(()=>{
    generate()

  },[length,chars,numbers,generate])


  return (

    <>
    <div className=" h-screen min-w-full flex flex-col justify-center items-center  ">

       <div className="flex  flex-col  justify-center  items-center w-1/2 min-h-1/2 p-10 border-2 rounded-md border-red-400 ">
       <div className="mb-4 ">
       <input value={password} ref={passwordRef} type="text" name="" id="" className='sm:w-72  rounded-sm  px-2 border-2 border-gray-600 outline-none m-2' readOnly /> 
       <button className='bg-slate-500 text-white p-0.5 sm:w-28 sm:h-8 text-center hover:bg-slate-700 rounded-md '
       onClick={copyPassword}
       >Copy</button>
       </div> 
       <div className="w-full text-center">
       <input type="range" name="" id="" min={7} max={100} className='mr-4 cursor-pointer' value={length} onChange={(e)=>{setLength(e.target.value)}} /> 
       <label htmlFor="" className='mr-4 text-red-500'>Length : {length}</label>
       
      
       <input type="checkbox" name="" className=' cursor-pointer mr-1' id="num" onChange={()=>{setNumbers(prev => !prev)}} />
       <label htmlFor="num" className='mr-4'>Numbers</label>

       
       <input type="checkbox" className=' cursor-pointer ml-2' name="" id="chars" onChange={()=>{setChars(prev => !prev)}} />
       <label htmlFor="chars" className='ml-1 '>Char</label>
       
       </div>

        

       
       </div> 
      
        
      </div>
    </>

      
  )
}

export default App
