import React, {useState} from 'react'
import UserInput from '../components/UserInput'
import UserResume from '../components/UserResume'

function Home() {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phoneno: '',
        description: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({
           ...userDetails,
            [name]: value
        })
    }


    return (
        <div>
            <p className='p-2 text-2xl font-bold ml-5'>Resume Builder</p>
            <div className='lg:flex'>
                <UserInput userDetails={userDetails} onInputChange={handleInputChange} />
                <UserResume userDetails={userDetails} />
            </div>
        </div>
    )
}

export default Home