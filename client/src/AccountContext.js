import { createContext, useState } from "react"

export const AccountContext = createContext()

export function AccountProvider({ children }) {
    const [account, setAccount] = useState()
    return (
        <AccountContext.Provider value={{account, setAccount}}>
            {children}
        </AccountContext.Provider>
    )
}