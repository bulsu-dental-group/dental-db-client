import { createContext } from 'react'

const ProfileContext = createContext({
    profile: null,
    setProfile: (profile) => {}
})

export default ProfileContext