'use client'

import React, { useEffect, useRef, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { atom, useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { getKeywordSearchResult, postImageAndGetSearchResult } from '@/api/api'
import { clc } from '@/utilities/classComposer'

import FillImg from './base/fillImg'
import Icon from './base/icon'

import styles from './searchBar.module.scss'

export const inputValueAtom = atom<string>('')
export const searchResultAtom = atom<any>(null)
export const loadingAtom = atom<boolean>(false)

type Props = {
	width: string
	minWidth: string
	height: string
	landing?: boolean
}

const SearchBar = ({ width, minWidth, height, landing }: Props) => {
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
	const [showDropZone, setShowDropZone] = useState(false)

	const [searchValue, searchValueSet] = useAtom(inputValueAtom)
	const [searchResult, setsearchResult] = useAtom(searchResultAtom)
	const [loading, setLoading] = useAtom(loadingAtom)
	const router = useRouter()

	const dropZoneRef = useRef<HTMLDivElement>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const t = useTranslations('searchBarText')
	const a = useTranslations('alertText')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		searchValueSet(value)
	}

	const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && !loading) {
			event.preventDefault()
			setLoading(true)

			try {
				const data = await getKeywordSearchResult(searchValue)
				setsearchResult(data[0])
				router.push(`/search`)
			} catch (error) {
				alert(a('fetchData'))
			} finally {
				setLoading(false)
			}
		}
	}

	const handleImageFile = (file: File) => {
		if (file.type.startsWith('image/')) {
			setImageFile(file)
			const previewUrl = URL.createObjectURL(file)
			setImagePreviewUrl(previewUrl)
			setShowDropZone(true)
		} else {
			alert(a('invalidFileType'))
			setImageFile(null)
			setImagePreviewUrl(null)
		}
	}

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			handleImageFile(event.target.files[0])
		}
	}

	const handleInputDrop = (event: React.DragEvent<HTMLInputElement>) => {
		event.preventDefault()
		event.stopPropagation()

		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			handleImageFile(event.dataTransfer.files[0])
		}
	}

	const handleImageSearch = async () => {
		if (imageFile && !loading) {
			setLoading(true)

			try {
				const compressedImage = await compressImage(imageFile)
				const data = await postImageAndGetSearchResult(compressedImage)

				setsearchResult(data[0])

				router.push(`/search`)
			} catch (error) {
				alert(a('uploadImage'))
			} finally {
				setLoading(false)
			}
		}
	}

	const compressImage = async (imageFile: File) => {
		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		}
		try {
			const compressedFile = await imageCompression(imageFile, options)
			return compressedFile
		} catch (error) {
			alert(a('compressImage'))
			throw error
		}
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
		searchValueSet('')

		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			handleImageFile(event.dataTransfer.files[0])
		}
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
	}

	const toggleDropZone = () => {
		setShowDropZone((prev) => !prev)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (dropZoneRef.current && !dropZoneRef.current.contains(event.target as Node)) {
			setShowDropZone(false)
		}
	}

	const handleFileInputClick = () => {
		setImageFile(null)
		setImagePreviewUrl(null)

		if (fileInputRef.current) {
			const fileInput = fileInputRef.current

			const onFileSelected = (event: Event) => {
				const target = event.target as HTMLInputElement
				if (target.files && target.files[0]) {
					searchValueSet('')
				}

				fileInput.removeEventListener('change', onFileSelected)
			}

			fileInput.addEventListener('change', onFileSelected)

			fileInput.click()
		}
	}

	useEffect(() => {
		if (showDropZone) {
			document.addEventListener('click', handleClickOutside)
		} else {
			document.removeEventListener('click', handleClickOutside)
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [showDropZone])

	useEffect(() => {
		if (landing) {
			searchValueSet('')
		}
	}, [landing])

	return (
		<div className={styles.searchBar} style={{ width: width, minWidth: minWidth, height: height }}>
			<label className={styles.searchLabel}>
				<div className={styles.icon}>
					<Icon path='magnifier' alt='search' className={styles.magnifier} />
					<Image src={'/svg/bard.svg'} alt='bard' width={20} height={20} className={styles.bard} />
				</div>

				<input
					type='text'
					className={styles.input}
					value={searchValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					disabled={loading}
					onDrop={handleInputDrop}
					onDragOver={handleDragOver}
				/>

				{loading && searchValue && <span className={styles.loadingIconForText}></span>}

				<button className={styles.button} onClick={toggleDropZone}>
					<Icon path='camera' alt='camera' className={styles.camera} />
				</button>
			</label>

			{showDropZone && (
				<div ref={dropZoneRef} className={styles.dropZone} onDrop={handleDrop} onDragOver={handleDragOver}>
					<div className={styles.imagePreviewWrap}>
						{imagePreviewUrl ? (
							<FillImg src={imagePreviewUrl} alt='Preview' />
						) : (
							<span className={styles.dropText}>{imageFile ? imageFile.name : 'Drag & drop your file here'}</span>
						)}
					</div>
					<button className={styles.fileInputButton} onClick={handleFileInputClick}>
						{imageFile ? t('change') : t('choose')}
					</button>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						onChange={handleImageChange}
						className={styles.fileInput}
					/>

					<button
						className={clc(styles.searchButton, (!imageFile || loading) && styles.disabled)}
						onClick={handleImageSearch}
						disabled={!imageFile || loading}>
						{loading && imageFile ? <span className={styles.loadingIconForImage}></span> : t('search')}
					</button>
				</div>
			)}

			{landing && (
				<div className={styles.gemini}>
					<span>Powered By</span>
					<Image src={'/image/gemini.png'} alt='Gemini' width={50} height={10} className={styles.geminiIcon} />
				</div>
			)}
		</div>
	)
}

export default SearchBar
