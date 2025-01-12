// // import React, { useState } from 'react';
// // import axios from 'axios';

// // function App() {
// //     const [file, setFile] = useState(null);
// //     const [optimizedImage, setOptimizedImage] = useState('');

// //     const handleFileChange = (e) => {
// //         setFile(e.target.files[0]);
// //     };

// //     const handleUpload = async () => {
// //         const formData = new FormData();
// //         formData.append('image', file);

// //         try {
// //             await axios.post('http://localhost:5000/api/images/upload', formData, {
// //                 headers: { 'Content-Type': 'multipart/form-data' },
// //             });
// //             alert('Image uploaded successfully!');
// //         } catch (error) {
// //             alert('Failed to upload image.');
// //         }
// //     };

// //     const handleOptimize = async () => {
// //         try {
// //             const response = await axios.post('http://localhost:5000/api/images/optimize', {
// //                 fileName: file.name,
// //                 width: 800,
// //                 height: 600,
// //                 quality: 90,
// //             });
// //             alert(response.data.message);
// //         } catch (error) {
// //             alert('Failed to optimize image.');
// //         }
// //     };

// //     const handleServe = async () => {
// //         try {
// //             const response = await axios.get('http://localhost:5000/api/images/serve', {
// //                 params: {
// //                     fileName: file.name,
// //                     width: 800,
// //                     height: 600,
// //                     quality: 90,
// //                 },
// //                 responseType: 'blob',
// //             });
// //             const imageUrl = URL.createObjectURL(response.data);
// //             setOptimizedImage(imageUrl);
// //         } catch (error) {
// //             alert('Failed to serve image.');
// //         }
// //     };

// //     return (
// //         <div>
// //             <h1>Image Optimization CDN</h1>
// //             <input type="file" onChange={handleFileChange} />
// //             <button onClick={handleUpload}>Upload</button>
// //             <button onClick={handleOptimize}>Optimize</button>
// //             <button onClick={handleServe}>Serve</button>
// //             {optimizedImage && <img src={optimizedImage} alt="Optimized" />}
// //         </div>
// //     );
// // }

// // export default App;

// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [file, setFile] = useState(null);
//   const [width, setWidth] = useState("");
//   const [height, setHeight] = useState("");
//   const [optimizedImage, setOptimizedImage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle width input change
//   const handleWidthChange = (e) => {
//     setWidth(e.target.value);
//   };

//   // Handle height input change
//   const handleHeightChange = (e) => {
//     setHeight(e.target.value);
//   };

//   // Upload and optimize image
//   // const handleUpload = async () => {
//   //   if (!file || !width || !height) {
//   //     alert("Please select a file and enter width and height.");
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     // Step 1: Upload the image
//   //     const formData = new FormData();
//   //     formData.append("image", file);

//   //     const uploadResponse = await axios.post(
//   //       "http://localhost:5000/api/images/upload",
//   //       formData,
//   //       {
//   //         headers: { "Content-Type": "multipart/form-data" },
//   //       }
//   //     );
//   //     console.log(uploadResponse.data);

//   //     // Step 2: Optimize the image
//   //     const optimizeResponse = await axios.post(
//   //       "http://localhost:5000/api/images/optimize",
//   //       {
//   //         fileName: file.name,
//   //         width: parseInt(width),
//   //         height: parseInt(height),
//   //         quality: 90, // Default quality
//   //       }
//   //     );
//   //     console.log(optimizeResponse.data);

//   //     // Step 3: Fetch and display the optimized image
//   //     const imageUrl = `http://localhost:5000/api/images/serve?fileName=${file.name}&width=${width}&height=${height}&quality=90`;
//   //     setOptimizedImage(imageUrl);
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //     alert("Failed to process image.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleUpload = async () => {
//     if (!file || !width || !height) {
//       alert("Please select a file and enter width and height.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Step 1: Upload the image
//       const formData = new FormData();
//       formData.append("image", file);

//       const uploadResponse = await axios.post(
//         "http://localhost:5000/api/images/upload",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       console.log(uploadResponse.data);

//       // Step 2: Optimize the image and get the public URL
//       const optimizeResponse = await axios.post(
//         "http://localhost:5000/api/images/optimize",
//         {
//           fileName: file.name,
//           width: parseInt(width),
//           height: parseInt(height),
//           quality: 90, // Default quality
//         }
//       );
//       console.log(optimizeResponse.data);

//       // Step 3: Fetch the public URL of the optimized image
//       const serveResponse = await axios.get(
//         "http://localhost:5000/api/images/serve",
//         {
//           params: {
//             fileName: file.name,
//             width: width,
//             height: height,
//             quality: 90,
//           },
//         }
//       );
//       setOptimizedImage(serveResponse.data.url);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to process image.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>Image Optimization CDN</h1>
//       <div style={{ marginBottom: "20px" }}>
//         <input type="file" onChange={handleFileChange} />
//       </div>
//       <div style={{ marginBottom: "20px" }}>
//         <label>
//           Width:
//           <input
//             type="number"
//             value={width}
//             onChange={handleWidthChange}
//             placeholder="Enter width"
//             style={{ marginLeft: "10px" }}
//           />
//         </label>
//       </div>
//       <div style={{ marginBottom: "20px" }}>
//         <label>
//           Height:
//           <input
//             type="number"
//             value={height}
//             onChange={handleHeightChange}
//             placeholder="Enter height"
//             style={{ marginLeft: "10px" }}
//           />
//         </label>
//       </div>
//       <button
//         onClick={handleUpload}
//         disabled={loading}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: loading ? "#ccc" : "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         {loading ? "Processing..." : "Upload and Optimize"}
//       </button>

//       {optimizedImage && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>Optimized Image</h2>
//           <img
//             src={optimizedImage}
//             alt="Optimized"
//             style={{ maxWidth: "100%", height: "auto" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [optimizedImage, setOptimizedImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle width input change
  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };

  // Handle height input change
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  // Upload and optimize image
  const handleUpload = async () => {
    if (!file || !width || !height) {
      alert("Please select a file and enter width and height.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload the image
      const formData = new FormData();
      formData.append("image", file);

      const uploadResponse = await axios.post(
        "http://localhost:5000/api/images/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(uploadResponse.data);

      // Step 2: Optimize the image
      const optimizeResponse = await axios.post(
        "http://localhost:5000/api/images/optimize",
        {
          fileName: file.name,
          width: parseInt(width),
          height: parseInt(height),
          quality: 90, // Default quality
        }
      );
      console.log(optimizeResponse.data);

      // Step 3: Fetch the public URL of the optimized image
      const serveResponse = await axios.get(
        "http://localhost:5000/api/images/serve",
        {
          params: {
            fileName: file.name,
            width: width,
            height: height,
            quality: 90,
          },
        }
      );
      setOptimizedImage(serveResponse.data.url);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to process image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Image Optimization CDN</h1>
      <div style={{ marginBottom: "20px" }}>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={handleWidthChange}
            placeholder="Enter width"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={handleHeightChange}
            placeholder="Enter height"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Upload and Optimize"}
      </button>

      {optimizedImage && (
        <div style={{ marginTop: "20px" }}>
          <h2>Optimized Image</h2>
          <img
            src={optimizedImage}
            alt="Optimized"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <p>Image URL: {optimizedImage}</p>
        </div>
      )}
    </div>
  );
}

export default App;



