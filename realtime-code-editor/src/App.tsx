import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import './App.css'
import CodeRoom from './components/CodeRoom'
import Landing from './components/Landing'

function App() {

  return (
    <div className='bg-neutral-950 h-screen max-w-screen flex justify-center items-center text-white'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/coderoom/:roomId' element={<CodeRoomWithParam />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

// Wrapper to extract roomId from URL and pass to CodeRoom
function CodeRoomWithParam() {
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId) return null;
  return <CodeRoom roomId={roomId} />;
}

export default App
