import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import FillImg from '@/component/base/fillImg'
import SearchBar from '@/component/searchBar'

import Item from './item'
import SearchResult from './searchResult'

import styles from './search.module.scss'

const page = () => {
	const items = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`).reverse()

	return (
		<section className={styles.search}>
			{/* <FillImg src='/image/gradientBackground.png' alt='background' className={styles.background} /> */}

			<div className={styles.max}>
				<header className={styles.header}>
					<Link href={'/'} className={styles.loogle}>
						<span>Loogle</span>
					</Link>
					<div className={styles.searchBarArea}>
						<SearchBar width='90%' height='100%' minWidth='230px' />

						<div className={styles.gemini}>
							<span className={styles.geminiText}>Powered By</span>
							<Image src={'/image/gemini.png'} alt='Gemini' width={50} height={10} className={styles.geminiIcon} />
						</div>
					</div>
				</header>

				<div className={styles.content}>
					<div className={styles.wrap}>
						<SearchResult />
						{/* {items.map((item, index) => (
							<Item
								key={index}
								title={'ㅌㅌㅌㅌㅌㅌㅌㅌㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅌ'}
								brand={'brandddd'}
								price={32800}
								similarity={index}
								imgUrls={['/image/file.png', '/image/file.png', '/image/file.png']}
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
