'use client'

import React, { useEffect, useState } from 'react'
import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import { getKeywordSearchResult } from '@/api/api'

import Icon from './base/icon'

import styles from './searchBar.module.scss'

export const inputValueAtom = atom<string>('')
export const searchResultAtom = atom<any>(null)
export const loadingAtom = atom<boolean>(false)

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState('')

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
	return (
		<label className={styles.searchBar}>
			<div className={styles.icon}>
				<Icon path='magnifier' alt='search' className={styles.magnifier} />
			</div>

			{/* <label></label> */}
			<input
				type='text'
				placeholder='Search'
				className={styles.input}
				value={searchValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
			/>
			<button className={styles.button}>
				<Icon path='camera' alt='camera' className={styles.camera} />
			</button>
		</label>
	)
}

export default SearchBar
