import { createContext, useState } from "react"

const AccountContext = createContext()

export function AccountProvider({children}) {
    return (
        <AccountContext.Provider value={{item: 1}}>{children}</AccountContext.Provider>
    )
}

export default AccountContext