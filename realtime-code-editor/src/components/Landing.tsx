import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [roomId, setRoomId] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  function generateRoomId() {
    return Math.random().toString(36).substring(2, 10);
  }

  function handleJoin() {
    if (roomId.trim()) {
      navigate(`/coderoom/${roomId.trim()}`);
    }
  }

  function handleCreateRoom() {
    const newId = generateRoomId();
    setCreatedRoomId(newId);
    setCopied(false);
  }

  function handleCopyLink() {
    if (createdRoomId) {
      navigator.clipboard.writeText(window.location.origin + `/coderoom/${createdRoomId}`);
      setCopied(true);
    }
  }

  return (
    <div className="flex flex-col items-center text-white">
  <div className='flex flex-col h-72 w-72 border items-center border-gray-200 rounded-2xl' style={{backgroundColor: '#272640'}}>
      <div className=" font-bold  py-5 items-center">
        <div className="text-center text-4xl text-emerald-500">
        Code Duro
        </div>
        <div className="flex flex-col py-5">
        <input
          type="text"
          placeholder="Enter your room id"
          className="py-2 my-2 border-gray-300 border rounded-md px-3"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input type="text" placeholder="Username" className="py-2 my-2 border-gray-300 border rounded-md px-3" />
        </div>
        <div className="text-center">
        <button
          className="border border-emerald-500 py-2 px-4 rounded-2xl text-black text-xl hover:cursor-pointer"
          style={{backgroundColor: '#272640'}}
          onClick={handleJoin}
        >
          Join
        </button>
        </div>
      </div>
      </div>
      <div className="flex mt-4 items-center">
      <div>don't have a room id?</div>
        <button
          className="ml-2 text-emerald-500 font-semibold hover:cursor-pointer underline"
          style={{backgroundColor: '#272640'}}
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      </div>
      {createdRoomId && (
      <div className="mt-4 flex flex-col items-center">
        <div className="text-sm text-white">Share this link with others:</div>
        <div className="flex items-center mt-1">
        <input
          type="text"
          readOnly
          value={window.location.origin + `/coderoom/${createdRoomId}`}
          className="border px-2 py-1 rounded w-64 text-white"
          onFocus={e => e.target.select()}
        />
            <button
              className="ml-2 px-2 py-1 rounded text-black border border-emerald-500"
              style={{backgroundColor: '#272640'}}
              onClick={handleCopyLink}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              className="ml-2 px-2 py-1 rounded text-white border border-emerald-700"
              style={{backgroundColor: '#272640'}}
              onClick={() => navigate(`/coderoom/${createdRoomId}`)}
            >
              Join Room
            </button>
        </div>
      </div>
      )}
    </div>
  );
}

export default Landing;
