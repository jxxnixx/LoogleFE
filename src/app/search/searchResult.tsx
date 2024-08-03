'use client'

import React, { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'

import { getKeywordSearchResult } from '@/api/api'
import FillImg from '@/component/base/fillImg'
import { inputValueAtom, loadingAtom, searchResultAtom } from '@/component/searchBar'

import Item from './item'

import styles from './search.module.scss'

const SearchResult = () => {
	const searchResult = useAtomValue(searchResultAtom)
	const searchValue = useAtomValue(inputValueAtom)
	const loading = useAtomValue(loadingAtom)

	const [error, setError] = useState(null)

	if (loading) return <p>Loading...</p>
	if (error) return <p>{error}</p>
	if (!searchResult || searchResult.length === 0) return <p>No search results available. Please perform a search.</p>

	const { productIds, similarities, products } = searchResult

	console.log(searchResult)

	return (
		<div className={styles.wrap}>
			{productIds.map((productId: any, index: number) => (
				<Item
					key={index}
					title={products[index].title}
					brand={products[index].brand}
					price={products[index].price}
					similarity={similarities[index]}
					imgUrls={products[index].imgUrls[0]}
					href={products[index].href}
				/>
			))}
		</div>
	)
}

export default SearchResult
