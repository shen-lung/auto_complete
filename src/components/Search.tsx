import * as React from 'react'
import { AppContext } from '../context/AppContext'
import { mainIcons } from '../assets/SectionIcons'

import './Search.scss'

type Item = {
    name: string,
    country: string,
}

const Search = () => {
    // Search element is to find the typed text in the user list
    // You can search by Country
    const {
        setUserListContext,
        userListCopy,
        userCountries,
    } = React.useContext(AppContext)
    
    const defaultValue = 'Search by country ...'
    const [value, setValue] = React.useState(defaultValue)
    const [countrySelect, setCountrySelect] = React.useState(false)
    const [countries, setCountries] = React.useState<Array<string>>([])
    // Handle the input text
    const handleOnChange = async (e: { target: HTMLInputElement; }) => {
        const inputValue = e.target.value
        if (inputValue.length > 0) {
            const data = userCountries.filter((item: string) => {
                // Using the name and the country fields for searching
                return item.toLowerCase().startsWith(inputValue.toLowerCase()
                )
            })

            setCountrySelect(true)
            setCountries(data)
        } else {
            setUserListContext(userListCopy)
        }
        setValue(inputValue)
    }
    
    const handleOnFocus = () => {
        if(value === defaultValue) {
            setValue('')
            setUserListContext(userListCopy)
            setCountrySelect(false)
        }
    }
    // Restore the list on focus out
    const handleOnBlur = () => {
        if(value === '') {
            setValue(defaultValue)
            setUserListContext(userListCopy)
            setCountrySelect(false)
        }
    }

    const handleCountry = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        // @ts-ignore
        const countryValue = e.target.innerHTML

        setValue(countryValue)
        setCountrySelect(false)

        const data = userListCopy.filter((item: Item) => {
            // Using the name and the country fields for searching
            return item.country.toLowerCase().startsWith(countryValue.toLowerCase())
        })

        setUserListContext(data)
    }

    return (
        <div className='searchContent'>
            <input
                className='find'
                type='text'
                id='find'
                name='find'
                value={value}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            />
            <img className='findIcon' src={mainIcons.iconSearch} alt='Edit user' />
            { countrySelect && (
                <div className='searchContentCountry'>
                    {
                        countries.map((country) => (
                            <p key={country} className='countryField' onClick={handleCountry}>{country}</p>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default Search
