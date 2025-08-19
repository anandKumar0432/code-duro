
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

function MonacoEditor() {
    const [code, setCode] = useState("");
    const [socket,setSocket] = useState<null | WebSocket>(null);
    const [latestCode, setLatestCode] = useState([]);
    useEffect(()=>{
        const newSocket = new WebSocket("ws://localhost:8080");
        newSocket.onopen = ()=>{
            console.log("connected");
            setSocket(newSocket);
        }
        newSocket.onmessage = (message)=>{
            console.log("message received");
            console.log(message.data);
            setLatestCode(message.data);
        }
        setSocket(newSocket);
    },[])

    if(!socket){
        return <div>
            Connecting to WebSocket server....
        </div>
    }
    return (
    <div className="">
        <Editor
        height="90vh"
        width="90vh"
        defaultLanguage="javascript"
        defaultValue="// write your code here"
        onChange={(value)=>{
            const newCode = value || "";
            setCode(newCode);
            socket?.send(newCode);
        }}
        
    />
        <div>
            {latestCode}
        </div>
    </div>
    );
}

export default MonacoEditor;