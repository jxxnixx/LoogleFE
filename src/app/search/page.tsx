import React from 'react'
import Link from 'next/link'

import FillImg from '@/component/base/fillImg'
import GlassText from '@/component/glassText'
import SearchBar from '@/component/searchBar'

import styles from './search.module.scss'

const page = () => {
	const tags = Array.from({ length: 20 }, (_, i) => `Tag ${i + 1}`)
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
						<SearchBar />
					</div>
				</header>

				<div className={styles.content}>
					result ::
					<div className={styles.wrap}>
						{items.map((item, index) => (
							<div key={index} className={styles.space}>
								<div className={styles.item}>
									<div className={styles.img}>
										{/* <FillImg src='/image/gradientBackground.png' alt='img' className={styles.resultImg} /> */}
									</div>
									<div className={styles.info}>
										<div className={styles.desc}>
											<div className={styles.title}>{item}title</div>
											<div className={styles.price}>
												<span>brand</span>
												<span>price</span>
											</div>
										</div>
										<div className={styles.ratio}>similarities</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default page
