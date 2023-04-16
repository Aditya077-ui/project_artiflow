import React from 'react'
import NFTCard from './NFTCard'
import nfts from '@/Data/nfts'
import { motion } from 'framer-motion'

function NFTCardList() {
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

    return (
        <>
            {nfts.map((nft, idx) => {
                return (
                    <motion.div variants={childvariants} key={idx}>
                        <NFTCard
                            key={nft.title}
                            img={nft.img}
                            title={nft.title}
                            price={nft.price}
                            likes={nft.likes}
                            sale={nft.sale}
                        />
                    </motion.div>
                )
            })}


        </>
    )
}
export default NFTCardList