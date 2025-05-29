export const uploadService = {
	uploadImg,
}

async function uploadImg(ev) {
	const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
	const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

	const file = ev.type === 'change' ? ev.target.files[0] : ev.dataTransfer.files[0]
	const formData = new FormData()
	
    // Building the request body
	formData.append('file', file)
	formData.append('upload_preset', UPLOAD_PRESET)
	
    // Sending a post method request to Cloudinary API
	try {
		const res = await fetch(UPLOAD_URL, { 
			method: 'POST',
			body: formData
		})
		const imgData = await res.json()
		console.log('imgData', imgData)

		return imgData
	} catch (err) {
		console.error(err)
		throw err
	}
}