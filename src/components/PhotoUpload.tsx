
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadProps {
  onPhotoChange: (file: File | null, previewUrl: string | null) => void;
  currentPhoto?: string | null;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoChange, currentPhoto }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhoto || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onPhotoChange(file, url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removePhoto = () => {
    setPreviewUrl(null);
    onPhotoChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {!previewUrl ? (
        <Card 
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            isDragging ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Camera className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-semibold text-gray-700 mb-2">Upload Child's Photo</p>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Drag and drop an image here, or click to select
            </p>
            <Button type="button" className="bg-red-500 hover:bg-red-600">
              <Upload className="h-4 w-4 mr-2" />
              Choose Photo
            </Button>
            <p className="text-xs text-gray-400 mt-2">JPG, PNG up to 5MB</p>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Child's photo preview"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
          <Button
            type="button"
            onClick={removePhoto}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full p-2"
            size="sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUpload;
