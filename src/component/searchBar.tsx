'use client'

import React, { useState } from 'react'

import Icon from './base/icon'

import styles from './searchBar.module.scss'

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value)
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
