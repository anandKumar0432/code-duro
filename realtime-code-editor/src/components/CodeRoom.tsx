
import { useRef } from "react";
import { Editor } from "@monaco-editor/react";
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { editor } from "monaco-editor";

const serverWsUrl = "ws://localhost:8080";

export default function CodeRoom( roomId : any) {
    const editorRef = useRef<editor.IStandaloneCodeEditor>();
    
    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
        editorRef.current = editor;

        // Initialize yjs
        const doc = new Y.Doc(); // collection of shared objects

        // Connect to peers with WebSocket
        const provider: WebsocketProvider = new WebsocketProvider(serverWsUrl, roomId, doc);
        const type = doc.getText("monaco");

        // Bind yjs doc to Manaco editor
        const binding = new MonacoBinding(type, editorRef.current!.getModel()!, new Set([editorRef.current!]));

    }

    return (
        <>
        <Editor 
            height="100vh"
            language={"cpp"}
            defaultValue={"// your code here"}
            onMount={handleEditorDidMount}
        />
        </>
    );
}