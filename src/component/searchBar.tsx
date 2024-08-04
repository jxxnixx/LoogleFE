'use client'

import React, { useEffect, useRef, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import { getKeywordSearchResult, postImageAndGetSearchResult } from '@/api/api'
import { clc } from '@/utilities/classComposer'

import Icon from './base/icon'

import styles from './searchBar.module.scss'

export const inputValueAtom = atom<string>('')
export const searchResultAtom = atom<any>(null)
export const loadingAtom = atom<boolean>(false)

type Props = {
	width: string
	minWidth: string
	height: string
}

const SearchBar = ({ width, minWidth, height }: Props) => {
	const [searchValue, setSearchValue] = useState('')
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [showDropZone, setShowDropZone] = useState(false)

	const [_, searchValueSet] = useAtom(inputValueAtom)
	const [searchResult, setsearchResult] = useAtom(searchResultAtom)
	const [loading, setLoading] = useAtom(loadingAtom)
	const router = useRouter()

	const dropZoneRef = useRef<HTMLDivElement>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSearchValue(value)
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
				alert('Error fetching data! try again')
			} finally {
				setLoading(false)
			}
		}
	}

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImageFile(event.target.files[0])
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
				alert('Error uploading image! try again')
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
			alert('Error compressing image! try again')
			throw error
		}
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			setImageFile(event.dataTransfer.files[0])
		}
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
	}

	const toggleDropZone = () => {
		if (!showDropZone) {
			setSearchValue('')
			searchValueSet('')
		}
		setShowDropZone((prev) => !prev)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (dropZoneRef.current && !dropZoneRef.current.contains(event.target as Node)) {
			setShowDropZone(false)
		}
	}

	const handleFileInputClick = () => {
		setImageFile(null)
		if (fileInputRef.current) {
			fileInputRef.current.click()
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
		<div className={styles.searchBar} style={{ width: width, minWidth: minWidth, height: height }}>
			<label className={styles.searchLabel}>
				<div className={styles.icon}>
					<Icon path='magnifier' alt='search' className={styles.magnifier} />
				</div>

				<input
					type='text'
					className={styles.input}
					value={searchValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					disabled={loading}
				/>

				<button className={styles.button} onClick={toggleDropZone}>
					<Icon path='camera' alt='camera' className={styles.camera} />
				</button>
			</label>

			{showDropZone && (
				<div ref={dropZoneRef} className={styles.dropZone} onDrop={handleDrop} onDragOver={handleDragOver}>
					<span>{imageFile ? imageFile.name : 'Drag & drop your file here'}</span>
					<button className={styles.fileInputButton} onClick={handleFileInputClick}>
						{imageFile ? 'Change File' : 'Choose File'}
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
						{loading ? <span className={styles.loadingIcon}></span> : 'Search'}
					</button>
				</div>
			)}
		</div>
	)
}

export default SearchBar
