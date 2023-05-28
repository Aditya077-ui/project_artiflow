
import { AiOutlineClockCircle, AiFillHeart } from 'react-icons/ai'
import { FaEthereum } from 'react-icons/fa'
import Image from 'next/image';
import AppContext from '@/components/context/AppContext'
import { ethers }  from 'ethers'
import React, { useContext } from 'react'


function Purchase_Card({ img, title, price, likes ,tokenId}) {
    const context = useContext(AppContext);

    async function resellNFT() {
        const myprice = ethers.utils.parseUnits(price.toString(), 'ether')   
        const transaction = await context.marketplace.resellToken(tokenId, myprice, {
          value: myprice
        })
        await transaction.wait()
        // loadNFTs()
      }
    return (
        <>
            <div className='flex group flex-col space-y-10 rounded-lg overflow-hidden border border-slate-400/10 pb-8 hover:shadow-xl duration-500 ease-in-out hover:shadow-white/5 relative'>
                {/* Image & Counter */}
                <div className='flex flex-col items-start relative'>
                    <img src={`https://${img}`} width={300} height={200} alt='NFT' className='object-cover' />
                    {/* {sale && (
                        <div className='flex space-x-2 items-center justify-center px-4 py-1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-xl absolute bottom-5 left-5'>
                            <AiOutlineClockCircle />
                            <p className='text-xs'>66 : 08 : 19 : 27</p>
                        </div>
                    )} */}
                </div>
                {/* Content */}
                <div className='px-6 flex flex-col space-y-3'>
                    {/* Title */}
                    <h1>{title}</h1>
                    {/* Price & Like */}
                    <div className='flex justify-between'>
                        {/* Price */}
                        <div className='flex space-x-2 text-indigo-600 items-center'>
                            <FaEthereum size={18} />
                            <p className='text-sm font-semibold'>{price} ETH</p>
                        </div>
                        {/* Like */}
                        <div className='flex space-x-2 items-center'>
                            <AiFillHeart className='text-rose-600' />
                            <p className='text-sm text-slate-400 '>{likes}</p>
                        </div>
                    </div>
                </div>
                {/* Hover */}
                <div className='absolute hidden top-1/4 left-1/3 md:left-1/4 group-hover:flex animate-bounce transition-all ease-in-out duration-1000'>
                    <button onClick={resellNFT} className='text-sm px-6 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 duration-200 ease-in-out'>
                        Resell My Nft
                    </button>
                </div>
            </div>
        </>
    )
}

export default Purchase_Card