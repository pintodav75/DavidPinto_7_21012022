import React, {useState} from 'react';

function FileUploadPage({ setFile }){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState();

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();
		formData.append('File', selectedFile);
        setFile(formData)
	};

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
	</div>
	)
}

export default FileUploadPage;