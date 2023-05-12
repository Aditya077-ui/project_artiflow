import '@/styles/globals.css'
import { useState, createContext } from 'react';
import AppContext from '@/components/context/AppContext'


export default function App({ Component, pageProps }) {
  const [marketplace, setMarketplace] = useState({})
  const [accountContext, setAccountContext] = useState()
  return(
    <AppContext.Provider value= {{marketplace, setMarketplace, accountContext, setAccountContext}}>
         <Component {...pageProps} />
    </AppContext.Provider>
  )
}
