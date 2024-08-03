import React from 'react'

import FillImg from '@/component/base/fillImg'
import GlassText from '@/component/glassText'
import SearchBar from '@/component/searchBar'

import styles from './landing.module.scss'

export default function Home() {
	return (
		<main className={styles.landing}>
			<FillImg src='/image/gradientBackground.png' alt='background' className={styles.background} />
			{/* <FillImg src='/image/file.png' alt='background' className={styles.background} /> */}
			<div className={styles.searchBarArea}>
				<SearchBar />
			</div>
			<GlassText />
		</main>
	)
}
