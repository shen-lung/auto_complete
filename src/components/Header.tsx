import * as React from 'react'
import Search from './Search'

import './Header.scss'

const Header = () => {
    // Header section where we can find two options 
    // the select and the search elements
    return (
        <div className='headSection'>
            <div className='headContent'>
                <Search />
            </div>
        </div>
    )
}

export default Header