import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { fireEvent } from '@testing-library/react'
import Card from './Card'

const props = {
	userId: "ba17e195-dd64-48f3-9498-4c3debf958aa",
	name: "Owen Murray",
	picture: "https://randomuser.me/api/portraits/men/84.jpg",
	email: "owen.murray@example.com",
	phone: "(979) 635-6637",
	city: "Baton Rouge",
	state: "New Hampshire",
	country: "United States",
	location: "Baton Rouge, New Hampshire, United States"
}

const userList = [
	{
        userId: "ba17e195-dd64-48f3-9498-4c3debf958aa",
        name: "Owen Murray",
        picture: "https://randomuser.me/api/portraits/men/84.jpg",
        email: "owen.murray@example.com",
        phone: "(979) 635-6637",
        city: "Baton Rouge",
        state: "New Hampshire",
        country: "United States",
        location: "Baton Rouge, New Hampshire, United States"
    },
	{
        userId: "4889e97a-ba15-443b-acc6-3152dfaf5313",
        name: "Gottfried Endres",
        picture: "https://randomuser.me/api/portraits/men/87.jpg",
        email: "gottfried.endres@example.com",
        phone: "0821-5585825",
        city: "Wesselburen",
        state: "Hamburg",
        country: "Germany",
        location: "Wesselburen, Hamburg, Germany"
    },
]

jest.mock('react', () => {
	const ActualReact = jest.requireActual('react')
  
	return {
	  ...ActualReact,
	  useContext: () => ({
		setUserListContext: jest.fn(),
        setUserListCopy: jest.fn(),
        userList: userList,
	  }),
	}
  })

describe('Card', () => {
	let container: any = null

	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
	})

	afterEach(() => {
		unmountComponentAtNode(container)
		container.remove()
		container = null
		jest.restoreAllMocks()
	})

	it('render component', () => {
		act(() => {
			render(<Card item={props} />, container)
		})

		const card = document.querySelector('.card')

		expect(card).toBeTruthy()
	})
	
	it('card info', () => {
		act(() => {
			render(<Card item={props} />, container)
		})

		const cardLocation = document.querySelector('.cardLocation')
		const cardChangeInfo = document.querySelector('.cardChangeInfo')

		expect(cardLocation).toBeTruthy()
		expect(cardChangeInfo).toBeFalsy()
	})
	
	it('edit process', () => {
		act(() => {
			render(<Card item={props} />, container)
		})

		const editButton = document.querySelector('.editButton')
		expect(editButton).toBeTruthy()

		fireEvent.click(editButton)

		const cardChangeInfo = document.querySelector('.cardChangeInfo')
		const cardLocation = document.querySelector('.cardLocation')

		expect(cardChangeInfo).toBeTruthy()
		expect(cardLocation).toBeFalsy()
	})
})
