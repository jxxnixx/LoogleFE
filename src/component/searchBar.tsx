'use client'

import React, { useEffect, useRef, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import { getKeywordSearchResult, postImageAndGetSearchResult } from '@/api/api'

import Icon from './base/icon'

import styles from './searchBar.module.scss'

export const inputValueAtom = atom<string>('')
export const searchResultAtom = atom<any>(null)
export const loadingAtom = atom<boolean>(false)

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState('')
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [showDropZone, setShowDropZone] = useState(false)

	const [_, searchValueSet] = useAtom(inputValueAtom)
	const [searchResult, setsearchResult] = useAtom(searchResultAtom)
	const router = useRouter()

	const dropZoneRef = useRef<HTMLDivElement>(null)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSearchValue(value)
		searchValueSet(value)
	}

	const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()

			try {
				const data = await getKeywordSearchResult(searchValue)

				setsearchResult(data[0])

				router.push(`/search`)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
	}

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImageFile(event.target.files[0])
		}
	}

	const handleImageSearch = async () => {
		if (imageFile) {
			try {
				const compressedImage = await compressImage(imageFile)
				const data = await postImageAndGetSearchResult(compressedImage)

				setsearchResult(data[0])

				router.push(`/search`)
			} catch (error) {
				console.error('Error uploading image:', error)
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
			console.error('Error compressing image:', error)
			throw error
		}
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			setImageFile(event.dataTransfer.files[0])
			setShowDropZone(false)
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

	return (
		<div className={styles.searchBar}>
			<label className={styles.searchLabel}>
				<div className={styles.icon}>
					<Icon path='magnifier' alt='search' className={styles.magnifier} />
				</div>

				<input
					type='text'
					placeholder='Search'
					className={styles.input}
					value={searchValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>

				<button className={styles.button} onClick={toggleDropZone}>
					<Icon path='camera' alt='camera' className={styles.camera} />
				</button>
			</label>

			{showDropZone && (
				<div ref={dropZoneRef} className={styles.dropZone} onDrop={handleDrop} onDragOver={handleDragOver}>
					<span>Drag & drop your file here</span>
					<input type='file' accept='image/*' onChange={handleImageChange} />

					<button className={styles.searchButton} onClick={handleImageSearch}>
						Search
					</button>
				</div>
			)}
		</div>
	)
}

export default SearchBar
