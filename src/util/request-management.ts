const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

export async function uploadImageSB(
	file: File,
	resolution: { width: number; height: number },
) {
	const apiUrl = `${DOMAIN_URL}/api/image`

	const formData = new FormData()
	formData.append('image', file)
	formData.append('resolution', JSON.stringify(resolution))

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			body: formData,
		})

		const result = await response.json()

		if (response.ok) {
			console.log('Archivo enviado correctamente.')
		} else {
			console.error('Error al enviar el archivo:', response.statusText)
		}
		return result
	} catch (error) {
		console.error('Error de red:', error)
	}
}

export async function uploadVideoSB(
	video: File,
	thumbnail: File,
	resolution: { width: number; height: number },
) {
	const apiUrl = `${DOMAIN_URL}/api/video`

	const formData = new FormData()
	formData.append('video', video)
	formData.append('thumbnail', thumbnail)
	formData.append('resolution', JSON.stringify(resolution))

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			body: formData,
		})

		const result = await response.json()

		if (response.ok) {
			console.log('Archivo enviado correctamente.')
		} else {
			console.error('Error al enviar el archivo:', response.statusText)
		}
		return result
	} catch (error) {
		console.error('Error de red:', error)
	}
}

export async function uploadRemoveSB(name: string, fileType: 'image' | 'video') {
	const apiUrl = `${DOMAIN_URL}/api/video`

	const formData = new FormData()
	formData.append('name', name)
	formData.append('fileType', fileType)

	try {
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			body: formData,
		})

		if (response.ok) {
			console.log('Archivo enviado correctamente.')
		} else {
			console.error('Error al enviar el archivo:', response.statusText)
		}
	} catch (error) {
		console.error('Error de red:', error)
	}
}

export async function updatingFileFavorites(name: string, favorite: string) {
	const params = new URLSearchParams()
	params.append('name', name)
	params.append('favorite', favorite)

	const apiUrl = `${DOMAIN_URL}/api/image?${params.toString()}`

	try {
		const response = await fetch(apiUrl, {
			method: 'PATCH',
		})

		if (response.ok) {
			console.log('Does')
		} else {
			console.error('Error', response.statusText)
		}
	} catch (error) {
		console.error('Error de red:', error)
	}
}
