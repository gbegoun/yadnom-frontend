import { useRef, useState } from 'react';
import SVGService from '../../../services/svg/svg.service.js';
import { uploadService } from '../../../services/upload.service.js';

export const Files = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef();

    const handleCellClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (ev) => {
        setIsUploading(true);
        try {
            const { secure_url } = await uploadService.uploadImg(ev);
            setImgUrl(secure_url);
            // Add artificial delay to make loading stage longer
            await new Promise(resolve => setTimeout(resolve, 2500));
        } catch (err) {
            // handle error if needed
        }
        setIsUploading(false);
    };

    return (
        <div className={`files-item files-item-empty${(isUploading || imgUrl) ? ' has-file' : ''}`} onClick={handleCellClick} style={{ cursor: 'pointer' }}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
            />
            <div className="files-icons-container">
                {isUploading && (
                    <img src="https://res.cloudinary.com/drunensjg/image/upload/v1748721657/Yadnom-Gif_eivr7l.gif" style={{ width: 40, height: 40 }} />
                )}
                {!isUploading && imgUrl && (
                    <img src={imgUrl} alt="Uploaded" style={{ width: 15, height: 20, objectFit: 'cover', borderRadius: 1 }} />
                )}
                {!isUploading && !imgUrl && (
                    <>
                        <div className="files-icon-wrapper add-icon">
                            <span>+</span>
                        </div>
                        <div className="files-icon-wrapper paper-icon">
                            <SVGService.PapperIcon className="paper-svg-icon" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};