
import { useRef } from "react";
import { Editor } from "@monaco-editor/react";
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { editor } from "monaco-editor";
import { useState } from "react";
import Navbar from "./Navbar";

const serverWsUrl = "ws://localhost:3001";

interface CodeRoomProps {
    roomId: string;
}
export default function CodeRoom({ roomId }: CodeRoomProps) {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
        editorRef.current = editor;

        const doc = new Y.Doc();

        const provider = new WebsocketProvider(serverWsUrl, roomId, doc);
        const type = doc.getText("monaco");

        new MonacoBinding(type, editorRef.current!.getModel()!, new Set([editorRef.current!]));
    }


    return (
        <div className="min-h-screen w-screen">
            <div>
                <Navbar roomId={roomId}/>
            </div>
            <div className="">    
            {/* <div className="flex items-center p-2 bg-gray-100 text-black ml-5">
                <span className="font-bold mr-4">Room: {roomId}</span>
                <button
                    className="px-3 py-1 rounded bg-blue-500  hover:bg-blue-600 transition text-black"
                    onClick={() => setShowInfo((prev) => !prev)}
                >
                    {showInfo ? "Hide Info" : "Show Info"}
                </button>
                {showInfo && (
                    <div className="ml-4 text-black">
                        Share this room ID with others to collaborate in real-time!
                    </div>
                )}
            </div> */}
            <Editor
                height="100vh"
                language={"javascript"}
                defaultValue={"// your code here"}
                theme="vs-dark"
                onMount={handleEditorDidMount}
            />
        </div>
        </div>
    );
}