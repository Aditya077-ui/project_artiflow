import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Header/Navbar'
import Hero from '@/components/Header/Hero'
import Steps from '@/components/Steps/Steps';
import BestSellers from '@/components/BestSellers/BestSellers'
import HotProducts from '@/components/HotProducts/HotProducts'
import Collections from '@/components/collections/Collections'
import CTA from '@/components/JoinUs/CTA'
import Blog from '@/components/Blog/blog'
import Footer from '@/components/Footer/footer'


//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>Artiflow</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Navbar />
        <Hero />
        <Steps />
        <BestSellers />
        <HotProducts />
        <Collections />
        <CTA />
        <Blog />
        <Footer />
      </>
    </div>
  )
}

