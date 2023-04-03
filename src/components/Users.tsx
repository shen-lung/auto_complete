import * as React from 'react'
import { AppContext } from '../context/AppContext'
import Card from './Card'

import { getAllUsers } from '../api/getUsers'
import './Users.scss'

const Users = () => {
    // Users is the section where we show all user information like card
    const {
        setUserListContext,
        setUserListCopy,
        userList,
    } = React.useContext(AppContext)

    const handleGetAllUsers = async() => {
        // Calling the API to get the users
        const allAsersResponse = await getAllUsers()

        // We store the information if the response status is ok 
        if(allAsersResponse.status) {
            const data: any = allAsersResponse.data
            setUserListContext(data)
            setUserListCopy([...data])
        } else {
            alert(allAsersResponse.mensaje)
        }
    }

    // Scroll to top of page. Is good approach when we have big list to show
    const handleGoTop = () => (
        window.scrollTo({ top: 0, behavior: 'smooth' })
    )

    // Call get users method. Will be called ones
    React.useEffect(() => {
        handleGetAllUsers()
    }, [])

    return (
        <div className='cardSection'>
            <div className='cardItems'>
                {userList.map((item) => (
                   <Card key={item.userId} item={item} />
                ))}
            </div>
            <button className="arrowUp" onClick={handleGoTop}>&uarr;</button>
        </div>
    )
}

export default Users