import React from 'react'
import { useTranslations } from 'next-intl'

import FillImg from '@/component/base/fillImg'
import GlassText from '@/component/glassText'
import SearchBar from '@/component/searchBar'

import styles from './landing.module.scss'

export default function Home() {
	const t = useTranslations('landing')

	return (
		<main className={styles.landing}>
			<h1>{t('title')}</h1>
			{/* <FillImg src='/image/gradientBackground.png' alt='background' className={styles.background} /> */}
			{/* <FillImg src='/image/file.png' alt='background' className={styles.background} /> */}
			<div className={styles.searchBarArea}>
				<SearchBar width='50%' height='60%' minWidth='380px' />
			</div>
			<GlassText />
		</main>
	)
}
