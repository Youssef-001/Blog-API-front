import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCE() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey='cn1ckum0bb04d33l4p66f54tjjo70o4jup207fmzp1jniexm'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        
        init={{
          plugins: 'autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount codesample',
          toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image media codesample | code',
          // height: 500,
          // width: 800
        }}
      />
    </>
  );
}
