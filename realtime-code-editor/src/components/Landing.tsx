import { useState } from "react";
import CodeRoom from "./CodeRoom";
import { Link, Links, useNavigate } from "react-router-dom";

function Landing() {
  const [roomId, setRoomId] = useState("");
  // const navigate = useNavigate();

  // const handleJoin = () => {
  //   const roomId = crypto.randomUUID(); // or use Date.now(), or any custom logic
  //   navigate(`/coderoom/${roomId}`);
  // };


  return (
        <div className="flex flex-col items-center">
          <div className='flex flex-col h-72 w-72 border items-center 
                   border-gray-200 rounded-2xl '>
            <div className=" font-bold  py-5 items-center">
              <div className="text-center text-4xl text-emerald-500">
                Code Duro 
              </div>
              <div className="flex flex-col py-5">
                <input type="text" placeholder="Enter your room id" className="py-2 my-2 border-gray-300 border rounded-md px-3" onChange={(e)=>{
                  setRoomId(e.target.value);
                }}/>
                <input type="text" placeholder="Username" className="py-2 my-2 border-gray-300 border rounded-md px-3"/>
              </div>
              <div className="text-center">
                <button  className="border border-emerald-500 py-2 px-4 rounded-2xl bg-emerald-500 text-black text-xl hover:cursor-pointer hover:bg-emerald-400">Join</button>
              </div>
            </div>
        </div>
        <div className="flex ">
          <div>
            don't have a room id ? 
          </div>
          <div className="text-emerald-500 font-semibold hover:cursor-pointer">
            click here
          </div>
        </div>
        
        </div>
  )
}

export default Landing