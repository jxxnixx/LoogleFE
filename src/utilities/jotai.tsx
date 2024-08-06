'use client'

import React from 'react'
import { createStore, Provider } from 'jotai'

export const store = createStore()

type Props = {
	children: React.ReactNode
}
export const JotaiProviders = ({ children }: Props) => {
	return <Provider store={store}>{children}</Provider>
}
