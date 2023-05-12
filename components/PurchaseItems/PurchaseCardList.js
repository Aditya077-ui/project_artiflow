import React from 'react'
import Purchase_Card from './PurchaseCard'
import nfts from '@/Data/nfts'
import { motion } from 'framer-motion'



function PurchaseCard_List() {
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
    return (
        <>
            {nfts.map((nft, idx) => {
                return (
                    <motion.div variants={parentVariants} key={idx}>
                        <Purchase_Card
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

export default PurchaseCard_List