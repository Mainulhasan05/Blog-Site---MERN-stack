import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const CKeditor = ({setDescription,description}) => {

  
  return (
      <div className="container">

      <h3>Description</h3>
    <CKEditor
    
    editor={ ClassicEditor }
    
    data={description}
    onReady={ editor => {
        // You can store the "editor" and use when it is needed.
        // console.log( 'Editor is ready to use!', editor );
    } }
    onChange={ ( event, editor ) => {
        const data = editor.getData();
        
        setDescription(data);
        // console.log( { event, editor, data } );
    } }
    // onBlur={ ( event, editor ) => {
    //     console.log( 'Blur.', editor );
    // } }
    // onFocus={ ( event, editor ) => {
    //     console.log( 'Focus.', editor );
    // } }
/>
</div>
  )
};

export default CKeditor;
