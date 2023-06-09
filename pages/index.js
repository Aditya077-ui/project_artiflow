/* eslint-disable react-refresh/runtime */

import React, { useContext, useState } from 'react'

import Head from 'next/head'
import Hero from '@/components/Header/Hero'
import Steps from '@/components/Steps/Steps';
import BestSellers from '@/components/BestSellers/BestSellers'
import HotProducts from '@/components/HotProducts/HotProducts'
import Collections from '@/components/collections/Collections'
import CTA from '@/components/JoinUs/CTA'
import Blog from '@/components/Blog/blog'
import Footer from '@/components/Footer/footer'

import { motion } from 'framer-motion'
import {
  parentNFTVariants,
  parentVariants,
  childVariants,
} from '@/Animations/hotProducts'
import AppContext from '@/components/context/AppContext'


//const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const context = useContext(AppContext);

  return (
    <div>
      <Head>
        <title>Artiflow</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>

        {!context.accountContext ?
          (
            <div className='flex h-screen items-center justify-center'>
              <motion.p
                variants={childVariants}
                className='text-slate-400 max-w-lg text-center'
              >
                Connect metamask wallet to continue...
              </motion.p>
            </div>
          )
          :
          (
            <div>
              <Hero />
              <Steps />
              <BestSellers />
              <HotProducts />
              <Collections />
              <CTA />
              <Blog />
              <Footer />
            </div>

          )

        }

      </>
    </div>
  )
}

