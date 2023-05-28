import React, {useEffect, useState, useContext} from 'react'
import { ethers } from 'ethers'
import Purchase_Card from './PurchaseCard'
import { motion } from 'framer-motion'
import AppContext from '../context/AppContext'
import axios from 'axios'
import {
    parentNFTVariants,
    parentVariants,
    childVariants,
} from '@/Animations/hotProducts'

function PurchaseCard_List() {
    const context = useContext(AppContext);
    const [loading, setLoading] = useState(true)
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadNFTs()
    }, [])
    async function loadNFTs() {
        /* create a generic provider and query for unsold market items */
        // const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/')
        // const contract = new ethers.Contract(context.contractAddress, NFTMarketplaceAbi.abi, provider)
        const data = await context.marketplace.fetchMyNFTs()
        // console.log(data)
        /*
        *  map over items returned from smart contract and format 
        *  them as well as fetch their token metadata
        */
        const items = await Promise.all(data.map(async i => {
            const tokenUri = await context.marketplace.tokenURI(i.tokenId)
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
        setLoading(false)
        
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
    const childVariants = {
        hidden: {
            x: 100,
            opacity: 0,
        },
        show: {
            x: 0,
            opacity: 1,
            // transition: { delay: 0.1 },
        },
    }
    if (loading) return (
        <div className='flex h-screen items-center justify-center'>
        <motion.p
            variants={childVariants}
            className='text-slate-400 max-w-lg text-center'
        >
           loading your list
        </motion.p>
        </div>
    )
    return (
        <div>
            {nfts.length > 0 ?
               ( <div>
                {nfts.map((nft, idx) => {
                return (
                    <motion.div variants={childVariants} key={idx}>
                    <Purchase_Card
                            key={nft.name}
                            img={nft.image}
                            title={nft.name}
                            price={nft.price}
                            likes='20'
                            tokenId={nft.tokenId}
                        />
                    
                    </motion.div>
                )
            })}

                </div>
        
               ) :
               (
                <div className='flex items-center justify-center'>
                <motion.p
                    variants={childVariants}
                    className='text-slate-400 max-w-lg text-center'
                >
                   No items purchased
                </motion.p>
                </div>
               )
        }
            


        </div>
    )
}

export default PurchaseCard_List