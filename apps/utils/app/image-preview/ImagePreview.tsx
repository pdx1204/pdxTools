"use client";
import React, { useState } from "react";

const ImagePreview = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-preview-container">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageSrc && (
        <img src={imageSrc} alt="Preview" className="image-preview" />
      )}
    </div>
  );
};

export default ImagePreview;
