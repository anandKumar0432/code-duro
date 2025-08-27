import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import './App.css'
import CodeRoom from './components/CodeRoom'
import Landing from './components/Landing'

function App() {

  return (
  <div className=' text-white' style={{backgroundColor: '#30353e'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/coderoom/:roomId' element={<CodeRoomWithParam />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function CodeRoomWithParam() {
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId) return null;
  return <CodeRoom roomId={roomId} />;
}

export default App
