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

    return (
        <div className='container'>
            {/* Breadcrumb or other content can be added here */}
            <div className='imageUploader'>
                <div className='imageUploadBox'>
                    {images[0] ? (
                        <img src={images[0].image_data} alt="Selected" className='uploadedImage' />
                    ) : (
                        <label className='uploadLabel'>
                            Add Photo +
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 0)}
                                className='fileInput'
                            />
                        </label>
                    )}
                </div>

                <div className='additionalPhotos'>
                    {images.slice(1).map((image, index) => (
                        <div className='additionalPhotoBox' key={index + 1}>
                            {image ? (
                                <img src={image.image_data} alt="Selected" className='uploadedImage' />
                            ) : (
                                <label className='uploadLabel'>
                                    Add More Photos +
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, index + 1)}
                                        className='fileInput'
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
