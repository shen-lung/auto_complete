import * as React from 'react'
import { AppContext } from '../context/AppContext'
import { mainIcons } from '../assets/SectionIcons'

import './Card.scss'

type Item = {
    item: {
        email: string,
        phone: string,
        location: string,
        userId: string,
        name: string,
        picture: string,
    }
}

const Card = ({item}: Item) => {
    const {
        setUserListContext,
        setUserListCopy,
        userList,
    } = React.useContext(AppContext)

    // Create different states to control the card process
    const [email, setEmail] = React.useState(item.email)
    const [phone, setPhone] = React.useState(item.phone)
    const [location, setLocation] = React.useState(item.location)
    const [emailCopy, setEmailCopy] = React.useState('')
    const [phoneCopy, setPhoneCopy] = React.useState('')
    const [locationCopy, setLocationCopy] = React.useState('')
    const [isEdit, setIsEdit] = React.useState(false)

    // Cancel the edit process
    const handleCancel = () => {
        setEmail(emailCopy)
        setPhone(phoneCopy)
        setLocation(locationCopy)
        setIsEdit(!isEdit)
    }
    
    // Save the edit process
    const handleAccept = () => {
        // Search the user to edit using the id
        userList.forEach((user) => {
            // Asing the new values
            if(user.userId === item.userId) {
                user.email = email
                user.phone = phone
                user.location = location
            }
        })

        // Set new values
        setUserListContext([...userList])
        setUserListCopy([...userList])
        setIsEdit(!isEdit)
    }
    
    // Handle email input change
    const handleEmail = (e: { target: HTMLInputElement; }) => {
        setEmail(e.target.value)
    }

    // Handle phone input change
    const handlePhone = (e: { target: HTMLInputElement; }) => {
        setPhone(e.target.value)
    }

    // Handle location input change
    const handleLocation = (e: { target: HTMLInputElement; }) => {
        setLocation(e.target.value)
    }

    // Activate the edit process
    const handleEdit = () => {
        if(isEdit) return false

        // Set the copy of current values
        setEmailCopy(email)
        setPhoneCopy(phone)
        setLocationCopy(location)
        setIsEdit(!isEdit)
    }

    return (
        <div key={item.userId} className='card'>
            <div className='editButton' onClick={handleEdit}>
                <img className={isEdit ? 'userEditDesactivate' : 'userEdit'} src={mainIcons.iconEditUser} alt='Edit user' />
            </div>
            <div className='cardHeader'></div>
            <div className='userName'>{item.name}</div>
            <img className='userImage' src={item.picture} alt={item.name} />
            <div className='cardContent'>
                {isEdit ? (
                    <>
                        <div>
                            <input
                                className='cardChangeInfo'
                                type='text'
                                id='email'
                                name='email'
                                value={email}
                                onChange={handleEmail}
                            />
                        </div>
                        <div>
                            <input
                                className='cardChangeInfo'
                                type='text'
                                id='phone'
                                name='phone'
                                value={phone}
                                onChange={handlePhone}
                            />
                        </div>
                        <div>
                            <input
                                className='cardChangeInfo'
                                type='text'
                                id='location'
                                name='location'
                                value={location}
                                onChange={handleLocation}
                            />
                        </div>
                        <div className='iconEditSection'>
                            <img className='iconEdit' src={mainIcons.iconCancel} alt='Cancel' onClick={handleCancel} />
                            <img className='iconEdit' src={mainIcons.iconAccept} alt='Accept' onClick={handleAccept} />
                        </div>
                    </>
                ) : (
                    <>
                        <div>{email}</div>
                        <div>{phone}</div>
                        <div className='cardLocation'>{location}</div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Card