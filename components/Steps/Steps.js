import React from 'react'
import StepCard from './StepCard'
import { motion } from 'framer-motion'
import { parentVariants, childVariants } from '@/Animations/common'
import Link from 'next/link';
function Steps({marketplace}) {
    return (
        <>
            <section className='py-24 p-4'>
                <div className='container mx-auto max-w-6xl'>
                    {/* Grid */}
                    <motion.div
                        variants={parentVariants}
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true }}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white gap-6'
                    >
                        <motion.div variants={childVariants}>
                            <StepCard
                                title='Connect your wallet'
                                desc='Use Trust Wallet, Metamask or any wallet to connect to the app.'
                                icon='1'
                            />
                        </motion.div>
                        <Link href="/Create_NFT">
                            <motion.div variants={childVariants}>
                                <StepCard
                                    title='Create your NFT Item'
                                    desc='Upload your NFTs and set a title, description and price.'
                                    icon='2'
                                />
                            </motion.div>
                        </Link>
                        <Link href="/List_NFT">
                            <motion.div variants={childVariants}>
                                <StepCard
                                    title='List them for sale'
                                    desc='Earn ETH and BIT for all your NFTs that you sell on our marketplace.'
                                    icon='3'
                                />

                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default Steps