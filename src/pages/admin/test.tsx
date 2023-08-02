// pages/upload.js
import { useState } from "react";
import supabase from "../../../lib/supabase";

export default function Upload() {
  const [image, setImage] = useState<any>("");
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) return;

    // Upload image to Supabase Storage
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`images/${image.name}`, image);

    if (error) {
      console.error("Error uploading image:", error);
    } else {
      console.log("Image uploaded successfully:", data);
      // Add image URL to Supabase database
      const imageURL = data.path;
      const { data: insertData, error: insertError } = await supabase
        .from("menu")
        .insert({ image_url: imageURL })
        .select();

      if (insertError) {
        console.error("Error adding image to database:", insertError);
      } else {
        console.log("Image URL added to database:", insertData);
      }
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
