'use client'

import React, { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { useTranslations } from 'next-intl'

import { inputValueAtom, loadingAtom, searchResultAtom } from '@/component/searchBar'

import Item from './item'

import styles from './search.module.scss'

const SearchResult = () => {
	const searchResult = useAtomValue(searchResultAtom)
	const searchValue = useAtomValue(inputValueAtom)
	const loading = useAtomValue(loadingAtom)

	const [error, setError] = useState(null)

	const t = useTranslations('searchResultText')

	if (loading) return <p>{t('loading')}</p>
	if (error) return <p>{error}</p>
	if (!searchResult || searchResult.length === 0) return <p>{t('noResults')}</p>

	const { productIds, similarities, products } = searchResult

	return (
		<div className={styles.wrap}>
			{productIds.map((productId: any, index: number) => {
				const brand = products[index].brandId === 1 ? t('cider') : t('unknown')

				return (
					<Item
						key={index}
						title={products[index].title}
						brand={brand}
						price={products[index].price}
						similarity={similarities[index]}
						imgUrls={products[index].imgUrls[0]}
						href={products[index].href}
					/>
				)
			})}
		</div>
	)
}

export default SearchResult
