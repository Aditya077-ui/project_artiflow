import ListedCards_List from './ListedCardList'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { motion } from 'framer-motion'
import {
    parentNFTVariants,
    parentVariants,
    childVariants,
} from '@/Animations/hotProducts'


function Listed_products() {
    return (
        <>
            <section className='p-16 pb-24 text-white'>
                <div className='container max-w-6xl mx-auto overflow-hidden'>
                    <div className='flex flex-col items-center space-y-8'>
                        {/* Content */}
                        <motion.div
                            variants={parentVariants}
                            initial='hidden'
                            whileInView='show'
                            viewport={{ once: true }}
                            className='flex flex-col items-center space-y-4 '
                        >

                        </motion.div>
                        {/* Collection of NFTs */}
                        <motion.div
                            variants={parentNFTVariants}
                            initial='hidden'
                            whileInView='show'
                            viewport={{ once: true }}
                            className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'
                        >
                            {/* Card 1 */}
                            <ListedCards_List />
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Listed_products