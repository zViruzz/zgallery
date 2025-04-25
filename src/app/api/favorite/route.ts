import { createServerClientHandle } from '@/services/supabase'
import { SP_TABLET } from '@/static/static'
import type { ExtendedFileType, FileType } from '@/type'
import type { SupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
	const supabase = await createServerClientHandle()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	const favoriteUrl: ExtendedFileType[] = []

	const getSignedUrls = async (
		supabase: SupabaseClient,
		pathList: string[],
		bucket: string,
	) => {
		const { data: resultUrls } = await supabase.storage
			.from(bucket)
			.createSignedUrls(pathList, 10000)
		return resultUrls ?? []
	}

	const { data } = await supabase
		.from(SP_TABLET.PROFILES)
		.select('list_files')
		.eq('user_id', user?.id)

	if (data === null) return NextResponse.json({ error: 'is null data' }, { status: 500 })

	const list: FileType[] = data[0].list_files === null ? [] : data[0].list_files.image

	if (list.length === 0) {
		return NextResponse.json({ list: [] }, { status: 200 })
	}

	const filterFavorite = (list: FileType[]) => {
		return list.filter((item) => item.favorite)
	}
	const favoritesFilterList = filterFavorite(list)

	const imagePathList = favoritesFilterList
		.filter((img) => img.fileType === 'image')
		.map((img) => `${user?.id}/${img.fileName}`)

	const videoPathList = favoritesFilterList
		.filter((video) => video.fileType === 'video')
		.map((video) => `${user?.id}/${video.fileName}/${video.fileName}`)

	const thumbnailPathList = favoritesFilterList
		.filter((video) => video.fileType === 'video')
		.map((video) => `${user?.id}/${video.fileName}/video_thumbnail.png`)

	const listOfImageUrls = await getSignedUrls(supabase, imagePathList, 'image')
	const listOfVideoUrls = await getSignedUrls(supabase, videoPathList, 'video')
	const listOfThumbnailUrls = await getSignedUrls(supabase, thumbnailPathList, 'video')

	if (
		listOfVideoUrls === null ||
		listOfThumbnailUrls === null ||
		listOfImageUrls === null
	) {
		return NextResponse.json(
			{ error: 'is null listOfVideoUrls or listOfThumbnailUrls' },
			{ status: 500 },
		)
	}

	let indexImage = 0
	let indexVideo = 0

	for (const file of favoritesFilterList) {
		let url: string | undefined
		let thumbnailUrl: string | undefined
		const { fileType } = file

		if (fileType === 'image') {
			url = listOfImageUrls[indexImage].signedUrl
			favoriteUrl.push({ ...file, url })
			indexImage++
		} else if (fileType === 'video') {
			url = listOfVideoUrls[indexVideo].signedUrl
			thumbnailUrl = listOfThumbnailUrls[indexVideo].signedUrl
			favoriteUrl.push({ ...file, url, thumbnailUrl })
			indexVideo++
		}
	}

	return NextResponse.json({ list: favoriteUrl })
}
