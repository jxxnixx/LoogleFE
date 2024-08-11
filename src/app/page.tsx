import React from 'react'
import { useTranslations } from 'next-intl'

import FillImg from '@/component/base/fillImg'
import GlassText from '@/component/glassText'
import SearchBar from '@/component/searchBar'

import styles from './landing.module.scss'

export default function Home() {
	return (
		<main className={styles.landing}>
			<div className={styles.searchBarArea}>
				<SearchBar width='50%' height='60%' minWidth='340px' landing />
			</div>
			<GlassText />
		</main>
	)
}
