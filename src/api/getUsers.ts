import axiosClient from '../network/apiClient'
import { crudResponse } from '../network/response'

export const getAllUsers = async(resultsValue = 20) => {
    try {
        // Using axiosClient metod created with default url
        const response = await axiosClient({
            method: 'get',
            url: `?results=${resultsValue}`,
        })
        
        // Create mapping data when the status is 200 (Success) 
        if(response.status === 200) {
            const mappedData = response?.data?.results.map((item: any) => {
            return {
                userId: item.login.uuid,
                name: `${item.name.first} ${item.name.last}`,
                picture: item.picture.large,
                email: item.email,
                phone: item.phone,
                city: item.location.city,
                state: item.location.state,
                country: item.location.country,
                location: `${item.location.city}, ${item.location.state}, ${item.location.country}`,
            }
            })

            // Return custom response
            return crudResponse(true, mappedData, 'Success')
        } else {
            return crudResponse(false, null, 'Failed to call')
        }
    } catch (error) {
      return crudResponse(false, null, 'Failed to call')
    }
}