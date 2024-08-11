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

	const reversedProductIds = [...productIds].reverse()
	const reversedSimilarities = [...similarities].reverse()
	const reversedProducts = [...products].reverse()

	return (
		<div className={styles.wrap}>
			{reversedProductIds.map((productId: any, index: number) => {
				const brand = reversedProducts[index].brandId === 1 ? t('cider') : t('unknown')

				return (
					<Item
						key={index}
						title={reversedProducts[index].title}
						brand={brand}
						price={reversedProducts[index].price}
						similarity={reversedSimilarities[index]}
						imgUrls={reversedProducts[index].imgUrls}
						href={reversedProducts[index].href}
					/>
				)
			})}
		</div>
	)
}

export default SearchResult
