import React from 'react'
import NFTCard from './NFTCard'
import nfts from '@/Data/nfts'
import { motion } from 'framer-motion'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import NFTMarketplaceAddress from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace-address.json'
import NFTMarketplaceAbi from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import {
    parentNFTVariants,
    parentVariants,
    childVariants,
} from '@/Animations/hotProducts'
function NFTCardList() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    // useEffect(() => {
    //     loadNFTs()
    // }, [])
    async function loadNFTs() {
        /* create a generic provider and query for unsold market items */
        const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/')
        const contract = new ethers.Contract(NFTMarketplaceAddress.address, NFTMarketplaceAbi.abi, provider)
        const data = await contract.fetchMarketItems()

        /*
        *  map over items returned from smart contract and format 
        *  them as well as fetch their token metadata
        */
        const items = await Promise.all(data.map(async i => {
            const tokenUri = await contract.tokenURI(i.tokenId)
            console.log(tokenUri)
            const meta = await axios.get(`https://${tokenUri}`)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.fileUrl,
                name: meta.data.name,
                description: meta.data.description,
                category: meta.data.category
            }
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')
        console.log(items)
    }
    const parentVariants = {
        hidden: {
            x: -100,
            opacity: 0,
        },
        show: {
            x: 0,
            opacity: 1,
            transition: { when: 'beforeChildren', staggerChildren: 0.1 },
        },

    }

    const childvariants = {
        hidden: {
            x: 100,
            opacity: 0,
        },
        show: {
            x: 0,
            opacity: 1,
        },
    }
    if (loadingState === 'loaded' && !nfts.length) return (

        <motion.p
            variants={childVariants}
            className='text-slate-400 max-w-lg text-center'
        >
            No items to list
        </motion.p>
    )
    return (
        <>

            {nfts.map((nft, idx) => {
                return (
                    <motion.div variants={childvariants} key={idx}>
                        <NFTCard
                            key={nft.name}
                            img={nft.image}
                            title={nft.name}
                            price={nft.price}
                            likes='20'
                            sale='false'
                            tokenId={nft.tokenId}
                        />
                    </motion.div>
                )
            })}


        </>
    )
}
export default NFTCardList