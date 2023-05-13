import React from 'react'
import Listed_Card from './ListedCard'
import nfts from '@/Data/nfts'
import { motion } from 'framer-motion'

function ListedCards_List() {
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
                    <motion.div variants={childVariants} key={idx}>
                        <Listed_Card
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

export default ListedCards_List