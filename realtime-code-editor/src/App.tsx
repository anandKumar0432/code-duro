import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CodeRoom from './components/CodeRoom'
import Landing from './components/Landing'

function App() {

  return (
    <div className='bg-neutral-950 h-screen max-w-screen flex justify-center items-center text-white'>
      <BrowserRouter>
        <Routes>
          <Route path='/landing' element={<Landing/>}/>
          <Route path='/coderoom/:roomId' element={<CodeRoom/>}/>
        </Routes>
      </BrowserRouter>
    </div>
      
  )
}

export default App
