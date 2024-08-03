import React from 'react'
import Link from 'next/link'

import FillImg from '@/component/base/fillImg'
import SearchBar from '@/component/searchBar'

import SearchResult from './searchResult'

import styles from './search.module.scss'

const page = () => {
	return (
		<section className={styles.search}>
			<FillImg src='/image/gradientBackground.png' alt='background' className={styles.background} />

			<div className={styles.max}>
				<header className={styles.header}>
					<Link href={'/'} className={styles.loogle}>
						<span>Loogle</span>
					</Link>
					<div className={styles.searchBarArea}>
						<SearchBar />
					</div>
				</header>

				<div className={styles.content}>
					<SearchResult />
				</div>
			</div>
		</section>
	)
}

export default page
