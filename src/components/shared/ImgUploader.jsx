import { useState } from 'react'
import { uploadService } from '../../services/upload.service'

export function ImgUploader({ onUploaded = null }) {

    const [imgData, setImgData] = useState({ imgUrl: null })
    const [isUploading, setIsUploading] = useState(false)

    async function uploadImg(ev) {
        ev.preventDefault()
        console.log("🚀 ~ uploadImg ~ ev:", ev)
        setIsUploading(true)

        const { secure_url } = await uploadService.uploadImg(ev)

        setImgData({ imgUrl: secure_url, })
        setIsUploading(false)
        onUploaded && onUploaded(secure_url)
    }

    function getUploadLabel() {
        if (imgData.imgUrl) return 'Change picture?'
        if (isUploading) 
            return <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjhtMzJyaWF2ZzlsczR3b21kcDVqMGZjenpxMXNmbGhuODk1ZGwycyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEjI6SIIHBdRxXI40/giphy.gif" />;
        else 
            return 'Upload Image';
    }

    return (
        <div >
            <div >{getUploadLabel()}</div>


            <label
                onDrop={uploadImg}
                // onDragOver={console.log}
                onDragOver={ev => ev.preventDefault()}
            >

                <img src={imgData.imgUrl || 'https://res.cloudinary.com/drunensjg/image/upload/v1748513702/default_profile_pic_jxjpai.svg'}
                    style={{ width: '40px', height: '40px' }} />

                <input hidden
                    type="file"
                    onChange={uploadImg} accept="img/*" />
            </label>

        </div>
    )
}








