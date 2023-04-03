import * as React from 'react'
import { AppContext } from '../context/AppContext'
import { sortBy } from '../utils'

import './Select.scss'

type Options = {
    options: Array<any>
}

const Select = ({options}: Options) => {
    const {
        setUserListContext,
        userList,
        userListCopy,
    } = React.useContext(AppContext)

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const valueSelected = e.target.value
        // sortBy is method to sort the list
        if(valueSelected) {
            const sorted = sortBy(e.target.value, userList)
            setUserListContext([...sorted])
        } else {
            setUserListContext([...userListCopy])
        }
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
        // @ts-ignore
        e.target[0].selected = true
        setUserListContext([...userListCopy])
    }

    return (
        <select className='select' name="filter" id="filter" defaultValue={''} onChange={handleOnChange} onBlur={handleOnBlur}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.text}</option>
            ))}
        </select>
    )
}

export default Select
