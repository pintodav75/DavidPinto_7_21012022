import React, {useState} from 'react';

function FileUploadPage({ setFile }){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState();

	const changeHandler = (event) => {
		setFile(event.target.files[0]);
	};

	return <input type="file" name="uploaded_file" onChange={changeHandler} />
	
}

export default FileUploadPage;