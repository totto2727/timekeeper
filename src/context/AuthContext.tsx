import React, { createContext, FC, ReactNode, useContext } from 'react'

import { AuthState, CognitoUserInterface } from '@aws-amplify/ui-components'

const AuthContext = createContext<{
  auth: AuthState
  user?: CognitoUserInterface
}>({ auth: AuthState.Loading })

export const AuthProvider: FC<{
  auth: AuthState
  user?: CognitoUserInterface
  children: ReactNode
}> = ({ auth, user, children }) => (
  <AuthContext.Provider value={{ auth, user }}>{children}</AuthContext.Provider>
)

export const useAuth = () => useContext(AuthContext)
