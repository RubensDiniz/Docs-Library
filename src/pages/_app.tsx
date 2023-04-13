import Starlight from '@starlightcms/react-sdk'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

Starlight.configure({
  workspace: '1826671381',
  baseUrl: 'https://query.advancecomunicacao.com.br/v2'
})


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
