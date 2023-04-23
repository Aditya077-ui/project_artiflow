import { motion } from 'framer-motion'
import React from 'react'
import CTACard from './CTAcard'
import { parentVariants, childVariants } from '@/Animations/common'



function CTACardList() {
    return (
        <>
            <motion.div
                variants={parentVariants}
                initial='hidden'
                whileInView='show'
                viewport={{ once: true }}
                className='grid grid-cols-1 md:grid-cols-2 gap-4'
            >
                <motion.div variants={childVariants}>
                    <CTACard
                        title='Join our community'
                        desc='Our community bring together like-minded individuals to share common interests,collaborate,and have a good time.In this way, community members gain more knowledge, and the brand overseeing the community gains more trust. '
                    />
                </motion.div>
                <motion.div variants={childVariants}>
                    <CTACard
                        title='Learn more about Artiflow'
                        desc='Artiflow is a huge community where people from all around the world can buy,sell or mint their favourite NFTs. We are dedicated to provide services to millions of people from all around the world without any laborious. '
                    />
                </motion.div>
            </motion.div>
        </>
    )
}

export default CTACardList