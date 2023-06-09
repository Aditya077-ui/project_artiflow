import React, { useState, useEffect } from 'react'
import { ethers } from "ethers"
// import { AiOutlineMenu } from 'react-icons/ai'
// import { IoClose } from 'react-icons/io5'
// import navLinks from '@/Data/navLinks'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { parentVariants, childVariants } from '@/Animations/common'
import {
    mobileContainer,
    mobileFlexContainer,
    mobileLinkVariants,
} from '@/Animations/mobilenav'
function Navbar({ web3Handler, account }) {
    const [nav, setNav] = useState(false)


    const toggleNav = () => {
        setNav((prev) => {
            return !prev
        })
    }
    const styles = {
        btn: 'px-5 rounded-md font-medium border-indigo-600 py-2 bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-700',
        navLink: 'hover:text-indigo-600 duration-200 ease-in-out',
        mobileNavLink:
            'hover:text-indigo-600 duration-200 ease-in-out border-b border-white  text-center',
    }

    return (
        <>
            <nav className='fixed top-0 w-full z-50 p-4 bg-slate-900 shadow-xl'>
                <div className='container mx-auto max-w-6xl relative'>
                    {/* Flex Container */}

                    <motion.div
                        variants={parentVariants}
                        initial='hidden'
                        animate='show'
                        className='flex justify-between items-center text-white'
                    >
                        {/* Logo */}
                        <motion.h1
                            variants={childVariants}
                            className='text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400'
                        >
                            <Link href="/"><span className=''>Artiflow</span></Link>
                        </motion.h1>
                        <motion.h1
                            variants={childVariants}
                            className='text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400'
                        >
                            <span className=''>NFT</span> Marketplace.
                        </motion.h1>
                        {/* Menu Items */}
                        <motion.div
                            variants={childVariants}
                            className='hidden lg:flex space-x-6 text-sm items-center'
                        >
                            {/* {navLinks.map((link, idx) => {
                                return (
                                    <a key={idx} href='#' className={styles.navLink}>
                                        {link}
                                    </a>
                                )
                            })} */}

                            <Link href="/purchase_NFT"><button className='hover:text-gray-400 font-semibold'>purchase List</button></Link>


                            <Link href="/List_NFT"><button className='hover:text-gray-400 font-semibold'>Listed Items</button></Link>

                            {account ? (<button className={styles.btn}>{account.slice(0, 5) + '...' + account.slice(38, 42)}</button>) :
                                (<button className={styles.btn} onClick={web3Handler}>Connect Wallet</button>)}
                        </motion.div>
                        {/* Hamburger Menu */}
                        <motion.div
                            variants={childVariants}
                            className='lg:hidden'
                            onClick={toggleNav}
                        >
                            {/* {nav ? (
                                <IoClose size={28} className='text-white' />
                            ) : (
                                <AiOutlineMenu size={25} />
                            )} */}
                        </motion.div>
                        {/* Mobile Menu */}
                        <AnimatePresence>
                            {nav && (
                                <motion.div
                                    variants={mobileContainer}
                                    initial='hidden'
                                    animate='show'
                                    exit='hidden'
                                    className='absolute top-14 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 z-50 w-full px-28 py-8 rounded-lg'
                                >
                                    <motion.div
                                        variants={mobileFlexContainer}
                                        className='flex flex-col items-center space-y-6 '
                                    >
                                        {/* {navLinks.map((link, idx) => {
                                            return (
                                                <motion.a
                                                    variants={mobileLinkVariants}
                                                    key={idx}
                                                    href='#'
                                                    className={styles.mobileNavLink}
                                                >
                                                    {link}
                                                </motion.a>
                                            )
                                        })} */}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </nav>
        </>
    )
}

export default Navbar