import React, { useState } from 'react';
import '../css/AddPhoto.css';

const AddPhoto = () => {
    const [images, setImages] = useState([null, null, null]);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images];
                newImages[index] = reader.result;
                setImages(newImages);
            };
            reader.onerror = (error) => {
                console.error('Error reading the file:', error);
            };
            reader.readAsDataURL(file);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
        },
        imageUploader: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '20px',
            width: '100%',
        },
        imageUploadBox: {
            width: '800px',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: '#fff',
            borderRadius: '10px',
            overflow: 'hidden', // Ensure images fit within the box
        },
        uploadLabel: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            color: '#007BFF',
            fontSize: '16px',
            textAlign: 'center',
            cursor: 'pointer',
        },
        fileInput: {
            display: 'none',
        },
        uploadedImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        additionalPhotos: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '10px',
            width: '100%',
        },
        additionalPhotoBox: {
            height: '240px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: '#fff',
            borderRadius: '10px',
            overflow: 'hidden', // Ensure images fit within the box
        },
        label: {
            display: 'block',
            pointerEvents: 'auto',
        },
    };

    return (
        <div style={styles.container}>
            {/* Breadcrumb or additional content can be added here */}
            <div className="leftContent">
                <div className="breadcrumb">
                    Home {'>'} Goa {'>'} Casa Simoes - Candolim
                </div>
            </div>

            {/* Image uploader section */}
            <div style={styles.imageUploader}>
                {/* Main upload box for primary image */}
                <div style={styles.imageUploadBox}>
                    {images[0] ? (
                        <img src={images[0]} alt="Selected" style={styles.uploadedImage} />
                    ) : (
                        <label style={styles.uploadLabel}>
                            Add Photo +
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 0)}
                                style={styles.fileInput}
                            />
                        </label>
                    )}
                </div>

                {/* Additional photo boxes for more images */}
                <div style={styles.additionalPhotos}>
                    {images.slice(1).map((image, index) => (
                        <div style={styles.additionalPhotoBox} key={index + 1}>
                            {image ? (
                                <img src={image} alt="Selected" style={styles.uploadedImage} />
                            ) : (
                                <label style={styles.uploadLabel}>
                                    Add More Photos
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, index + 1)}
                                        style={styles.fileInput}
                                    />
                                </label>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddPhoto;
