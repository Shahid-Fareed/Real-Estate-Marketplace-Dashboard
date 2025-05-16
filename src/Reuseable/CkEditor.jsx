import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const CkEditor = (props) => {
  const { editorContent, setEditorContent } = props;
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={editorContent}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorContent(data);
        }}
      />
    </>
  );
};

export default CkEditor;
