import { useState } from "react";
import { Upload, FileText } from "lucide-react"; // assuming lucide-react
import { useTheme } from "../context/ThemeContext"; // adjust the path

// File Upload Component
const FileUpload = () => {
  const theme = useTheme();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...files.map((f) => f.name)]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...files.map((f) => f.name)]);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className={`${theme.colors.text} text-xl font-semibold mb-2`}>
          Upload Documents
        </h2>
        <p className={`${theme.colors.textSecondary} text-sm`}>
          Drag and drop files or click to upload
        </p>
      </div>

      <div
        className={`
          flex-1 flex flex-col items-center justify-center
          ${theme.colors.card} ${theme.colors.border}
          border-2 border-dashed rounded-xl p-8
          transition-colors cursor-pointer
          ${dragActive ? "border-blue-500 bg-blue-50" : "hover:border-blue-400"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <div className="text-center">
          <div
            className={`${
              dragActive ? "text-blue-600" : theme.colors.textSecondary
            } mb-4`}
          >
            <Upload size={48} className="mx-auto" />
          </div>
          <p className={`${theme.colors.text} font-medium mb-2`}>
            {dragActive ? "Drop files here" : "Click to upload or drag and drop"}
          </p>
          <p className={`${theme.colors.textSecondary} text-sm`}>
            PDF, DOC, TXT files up to 10MB
          </p>
        </div>
        <input
          id="fileInput"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInput}
          accept=".pdf,.doc,.docx,.txt"
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className={`${theme.colors.text} font-medium mb-3`}>
            Uploaded Files
          </h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className={`${theme.colors.card} ${theme.colors.border} border rounded-lg p-3 flex items-center space-x-3`}
              >
                <FileText size={20} className={theme.colors.textSecondary} />
                <span
                  className={`${theme.colors.text} text-sm font-medium truncate`}
                >
                  {file}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
