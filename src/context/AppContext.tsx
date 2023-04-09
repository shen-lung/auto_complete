import * as React from 'react'

interface IAppContext {
  setUserListContext: Function,
  setUserListCopy: Function,
  setUserCountries: Function,
  userListCopy: Array<any>,
  userList:  Array<any>,
  userCountries:  Array<any>,
}

type Props = {
  children: React.ReactNode;
}

export const AppContext = React.createContext<IAppContext>({} as IAppContext)

// @ts-ignore
const AppContextProvider = ({ children }: Props) => {
  // Create app context to create comunication between components.
  // Is used to control the states
  const [userList, setUserList] = React.useState<Array<any>>([])
  const [userListCopy, setUserListCopy] = React.useState<Array<any>>([])
  const [userCountries, setUserCountries] = React.useState<Array<any>>([])

  const setUserListContext = (value: Array<any>): void => {
    setUserList(value)
  }

  const contextValues = React.useMemo(
    () => ({
      setUserListContext,
      setUserListCopy,
      setUserCountries,
      userListCopy,
      userList,
      userCountries,
    }),
    [
      setUserListContext,
      setUserListCopy,
      setUserCountries,
      userListCopy,
      userList,
      userCountries,
    ]
  )
  
  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
