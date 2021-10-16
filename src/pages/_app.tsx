import { useEffect, useState } from 'react'

import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import Amplify, { I18n } from 'aws-amplify'
import { AppProps } from 'next/app'

import awsconfig from '../aws-exports'

import '../styles/main.css'

// 以下で作成したCognitoをAmplifyで利用できるよう読み込ませる
Amplify.configure(awsconfig)

// 以下のような形で日本語と英語を紐づけた辞書を作成する
const dict = {
  ja: {
    'Forgot your password?': 'パスワードを忘れた場合',
    'Reset password': 'パスワードをリセット',
    'No account?': 'アカウントを持っていない場合',
    'Create account': 'サインアップ',
    'Sign in to your account': 'サインイン',
    Username: 'ユーザーID',
    'Username *': 'ユーザーID *',
    Password: 'パスワード',
    'Password *': 'パスワード *',
    Email: 'メールアドレス',
    'Email Address *': 'メールアドレス *',
    'Enter your username': 'ユーザーIDを入力',
    'Enter your password': 'パスワードを入力',
    'Sign In': 'サインイン',
    'Sign in': 'サインイン',
    'Have an account?': 'アカウントを持っている場合',
    'Create Account': 'アカウント作成',
  },
}

// 作成した辞書を渡して反映させる
I18n.putVocabularies(dict)
I18n.setLanguage('ja')

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [authState, setAuthState] = useState<AuthState>()
  const [user, setUser] = useState<object | undefined>()

  useEffect(
    () =>
      onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState)
        setUser(authData)
      }),
    []
  )

  return authState === AuthState.SignedIn && user ? (
    <Component {...pageProps} />
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn slot='sign-in' />
      <AmplifySignUp
        slot='sign-up'
        // formFields内に必要な項目だけを指定することで
        // 電話番号を除外できる
        formFields={[
          {
            type: 'username',
            label: 'Username *',
            placeholder: 'Username',
          },
          {
            type: 'email',
            label: 'Email Address *',
            placeholder: 'Email',
          },
          {
            type: 'password',
            label: 'Password *',
            placeholder: 'Password',
            inputProps: { required: true, autocomplete: 'new-password' },
          },
        ]}
      />
    </AmplifyAuthenticator>
  )
}

export default MyApp
