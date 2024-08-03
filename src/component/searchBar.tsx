'use client'

import React, { useState } from 'react'
import { atom, useAtom } from 'jotai'

import { store } from '@/utilities/jotai'

import Icon from './base/icon'

import styles from './searchBar.module.scss'

export const inputValueAtom = atom<string>('')

const SearchBar = () => {
	const [searchValue, setSearchValue] = useAtom(inputValueAtom)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSearchValue(value)
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
			/>
			<button className={styles.button}>
				<Icon path='camera' alt='camera' className={styles.camera} />
			</button>
		</label>
	)
}

export default SearchBar
