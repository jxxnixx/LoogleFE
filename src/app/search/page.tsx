import React from 'react'
import Link from 'next/link'

import FillImg from '@/component/base/fillImg'
import SearchBar from '@/component/searchBar'

import Item from './item'
import SearchResult from './searchResult'

import styles from './search.module.scss'

const page = () => {
	const items = Array.from({ length: 16 }, (_, i) => `Item ${i + 1}`)

	return (
		<section className={styles.search}>
			<FillImg src='/image/gradientBackground.png' alt='background' className={styles.background} />

			<div className={styles.max}>
				<header className={styles.header}>
					<Link href={'/'} className={styles.loogle}>
						<span>Loogle</span>
					</Link>
					<div className={styles.searchBarArea}>
						<SearchBar height='100%' minWidth='280px' />
					</div>
				</header>

				<div className={styles.content}>
					<div className={styles.wrap}>
						<SearchResult />
						{/* {items.map((item, index) => (
							<Item
								key={index}
								title={item}
								brand={'brandddd'}
								price={32800}
								similarity={80.1129318723}
								imgUrls={'/image/file.png'}
								href={''}
							/>
						))} */}
					</div>
				</div>
			</div>
		</section>
	)
}

export default page
