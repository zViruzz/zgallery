import { useNotificationContext } from '@/context/notification'
import type { ExtendedFileType } from '@/type'
import {
	updatingFileFavorites,
	uploadImageSB,
	uploadRemoveSB,
	uploadVideoSB,
} from '@/util/request-management'
import { createBrowserClient } from '@supabase/ssr'
import {
	changeResolution,
	getResolutionImage,
	getResolutionVideo,
	getVideoThumbnail,
} from '../util/utils'

function useUser() {
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL ||
			(() => {
				throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined')
			})(),
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
			(() => {
				throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined')
			})(),
	)
	const { handleNotification } = useNotificationContext()

	const getUser = async () => {
		return await supabase.auth.getUser()
	}

	const uploadImage = async (file: File) => {
		try {
			const resolution = await getResolutionImage(file)
			const result = await uploadImageSB(file, resolution)

			if (result.error === true) {
				handleNotification({ message: result.message, type: 'ERROR' })
			} else {
				location.reload()
			}

			return result
		} catch (error) {
			console.log(error)
		}
	}

	const uploadVideo = async (file: File) => {
		try {
			const resolution = await getResolutionVideo(file)
			const thumbnail = await getVideoThumbnail(file, 0)

			const result = await uploadVideoSB(file, thumbnail, resolution)

			if (result.error === true) {
				handleNotification({ message: result.message, type: 'ERROR' })
			} else {
				location.reload()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const imageTransform = async (
		file: ExtendedFileType,
		transform: { width: number; height: number },
	) => {
		try {
			const {
				data: { user },
			} = await getUser()

			const { data } = await supabase.storage
				.from('image')
				.createSignedUrl(`${user?.id}/${file.fileName}`, 2000, {
					transform,
				})

			const imageUrl = data?.signedUrl
			if (imageUrl === undefined) return

			const url = await changeResolution(imageUrl, transform)
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', file.fileName)
			document.body.appendChild(link)
			link.click()
		} catch (error) {
			console.log(error)
		}
	}

	const deleteFile = async (fileName: string, fileType: 'image' | 'video') => {
		await uploadRemoveSB(fileName, fileType)
	}

	const favoriteFile = async (fileName: string, favorite: string) => {
		await updatingFileFavorites(fileName, favorite)
	}

	return {
		supabase,
		uploadImage,
		uploadVideo,
		deleteFile,
		favoriteFile,
		imageTransform,
		getUser,
	}
}

export default useUser
