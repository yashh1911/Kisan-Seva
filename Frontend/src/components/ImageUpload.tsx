import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8">
      {!previewUrl ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors
            ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Upload Crop Image
          </h3>
          <p className="text-muted-foreground text-center mb-6 max-w-sm">
            Drag and drop a clear photo of the affected crop area, or click to
            browse files.
          </p>
          <Button type="button" variant="outline" className="px-8">
            Select File
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden border border-border bg-muted/30 flex items-center justify-center min-h-[300px]">
            <img
              src={previewUrl}
              alt="Crop preview"
              className="max-h-[400px] object-contain"
            />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 bg-background/80 hover:bg-background backdrop-blur-sm p-2 rounded-full shadow-sm border border-border transition-colors"
              title="Remove image"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
          
          <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3 overflow-hidden">
              <ImageIcon className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-sm font-medium text-foreground truncate">
                {selectedFile?.name}
              </span>
            </div>
            <Button size="lg" onClick={handleAnalyzeClick} className="shrink-0 ml-4">
              Analyze Crop
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
