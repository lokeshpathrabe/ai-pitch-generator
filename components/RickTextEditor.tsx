import { Editor } from "react-draft-wysiwyg";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";

export interface IRichTextEditorProps {
  value: string;
}

export function RichTextEditor({ value }: IRichTextEditorProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const contentState = ContentState.createFromText(value);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }, [value]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <div className="h-[500px]">
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}
