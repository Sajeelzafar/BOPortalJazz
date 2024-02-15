import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

const Bill_Processing1 = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    if (selectedFile && selectedFile.type === "text/csv") {
      // Read the content of the CSV file
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;

        // Validate column names
        const expectedColumnNames = [
          "CONSUMER_NO",
          "NAME_OF_CONSUMER",
          "BILLING_MONTH",
          "AMOUNT_BEFORE_DUE_DATE",
          "AMOUNT_AFTER_DUE_DATE",
          "DUE_DATE",
        ];

        const actualColumnNames = content
          .trim()
          .split("\n")[0] // Assuming the first line contains column headers
          .split(",")
          .map((columnName) => columnName.trim());

        const isValidColumns = expectedColumnNames.every((columnName) =>
          actualColumnNames.includes(columnName)
        );

        if (isValidColumns) {
          // Perform your file upload logic here
          console.log("Uploading file:", selectedFile);
          setErrorMessage(null);
        } else {
          setErrorMessage("Invalid column names in the CSV file");
        }
      };

      reader.readAsText(selectedFile);
    } else {
      setErrorMessage("Please upload a valid CSV file");
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleButtonClick = () => {
    if (selectedFile) {
      handleFileUpload(selectedFile);
    } else {
      setErrorMessage("Please select a file");
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={{ cursor: "pointer" }}>
        <input {...getInputProps()} />
        <p>Drag & drop or click to select a CSV file</p>
      </div>
      <Button onClick={handleButtonClick}>Browse File</Button>
      <Button onClick={handleFileUpload}>Upload File</Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleInputChange}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Bill_Processing1;
