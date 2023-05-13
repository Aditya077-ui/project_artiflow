import '@/styles/globals.css'
import { useState, createContext } from 'react';
import AppContext from '@/components/context/AppContext'
import Navbar from '@/components/Header/Navbar';
import { ethers } from 'ethers'
import NFTMarketplaceAbi from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function App({ Component, pageProps }) {
  const [marketplace, setMarketplace] = useState({})
  const [accountContext, setAccountContext] = useState()

  // const [provider, setProvider] = useState()
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState()
  const [contractAddress, setAddress] = useState("0x5FbDB2315678afecb367f032d93F642f64180aa3")
 
  // MetaMask Login/Connect
  const web3Handler = async () => {
    if (typeof window.ethereum !== 'undefined') {

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0])
        setAccountContext(accounts[0])
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()


        window.ethereum.on('chainChanged', (chainId) => {
          window.location.reload();
        })

        window.ethereum.on('accountsChanged', async function (accounts) {
          setAccount(accounts[0])
          setAccountContext(accounts[0])
          await web3Handler()
        })
        setLoading(false)
        console.log(loading)
        loadContracts(signer)

      } catch (err) {
        console.error('User rejected account connection request')
      }
    } else {
      alert('Please install Metamask to continue !')
    }
  }


  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(contractAddress, NFTMarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    setLoading(false)
    console.log(marketplace)

  }
  return <>

    <AppContext.Provider value={{ marketplace, setMarketplace, accountContext, setAccountContext, contractAddress }}>
      <Component {...pageProps} />
      <Navbar web3Handler={web3Handler} account={account} />
    </AppContext.Provider>

  </>

}


