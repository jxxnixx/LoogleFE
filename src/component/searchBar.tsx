'use client'

import React, { useState } from 'react'
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

	const [_, searchValueSet] = useAtom(inputValueAtom)
	const [searchResult, setsearchResult] = useAtom(searchResultAtom)
	const router = useRouter()

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

	return (
		<label className={styles.searchBar}>
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

			<input type='file' accept='image/*' id='imageUpload' onChange={handleImageChange} />
			<label htmlFor='imageUpload'>
				<button className={styles.button} onClick={handleImageSearch}>
					<Icon path='camera' alt='camera' className={styles.camera} />
				</button>
			</label>
		</label>
	)
}

export default SearchBar

import axios from 'axios'

export const api = axios.create({
	baseURL: '/',
	withCredentials: true,
})
