import { useState } from "react";

function Navbar(roomId:any) {
  const [open, setOpen] = useState(false);
  const [copied,setCopied] = useState(false);

  function handleCopyUrl(){
    const url = window.location.origin + `/coderoom/${roomId.roomId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return ( 
    <div className='h-12 w-screen flex items-center justify-between px-6 font-mono' style={{backgroundColor: '#30353e'}}>
        <div className='hover:cursor-pointer'>
            <img height="100" width="100" src="/src/assets/logo-code-duro-2.png" alt="" />
        </div>
        <div className='flex space-x-4 lg:space-x-8 md:space-x-4'>
            <div className='hover:cursor-pointer'>
            username
            </div>
            <div className='hover:cursor-pointer'>
                <button onClick={()=>{setOpen(!open)}}>share code</button>
            </div>
        </div>
        {open && (
        <div className="h-screen w-screen flex items-center justify-between px-6 font-mono">
          <div className="flex space-x-4">
            <input
              type="text"
              readOnly
              value={window.location.origin + `/coderoom/${roomId.roomId}`}
              className="border px-2 py-1 rounded w-64 text-white"
              onFocus={e => e.target.select()}
            />
            <button onClick={handleCopyUrl}>
              {copied ? "copied" : "copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar