import React from 'react';
import '../css/AddPhoto.css';

const AddPhoto = ({ images, setImages }) => {
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images];
                newImages[index] = {
                    image_data: reader.result,
                    description: `Image ${index + 1}`,
                };
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
            overflow: 'hidden',
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
            overflow: 'hidden',
        },
        label: {
            display: 'block',
            pointerEvents: 'auto',
        }
    };

    return (
        <div style={styles.container}>
            <div className="leftContent">
                <div className="breadcrumb">
                    Home {'>'} Goa {'>'} Casa Simoes - Candolim
                </div>
            </div>

            <div style={styles.imageUploader}>
                <div style={styles.imageUploadBox}>
                    {images[0] ? (
                        <img src={images[0].image_data} alt="Selected" style={styles.uploadedImage} />
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

                <div style={styles.additionalPhotos}>
                    {images.slice(1).map((image, index) => (
                        <div style={styles.additionalPhotoBox} key={index + 1}>
                            {image ? (
                                <img src={image.image_data} alt="Selected" style={styles.uploadedImage} />
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
