import { useState, useMemo, useCallback, useContext } from 'react';
import { ethers } from "ethers"
// import { create as ipfsHttpClient } from 'ipfs-http-client'
import { Web3Storage } from 'web3.storage'

import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import click1 from '../public/click1.jpg';
import Input from '@/components/Input/inputform';
import Button from '@/components/Input/formbutton';
import DropdownInput from '@/components/Input/dropdown';
import { motion, AnimatePresence } from 'framer-motion'
import { parentVariants, childVariants } from '@/Animations/common'
import {
    mobileContainer,
    mobileFlexContainer,
    mobileLinkVariants,
} from '@/Animations/mobilenav'
import AppContext from '@/components/context/AppContext';
// import NFTMarketplaceAddress from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace-address.json'
// import NFTMarketplaceAbi from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweENlNWYwNmVBOGE3MmMxRTI0ZDFEMzU2ODcxOTA3M2E3YjVBNTA3MTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODM0NjMwMzk2MDksIm5hbWUiOiJBcnRpZmxvdyJ9.baGrARtAQVqi7rUP_nIRzj36yumij9jdZG4ivPlR8fg'
const client = new Web3Storage({ token: apiKey })

const CreateNFT = () => {
    const context = useContext(AppContext)
    const [fileUrl, setFileUrl] = useState(null);

    const [formInput, setFormInput] = useState({
        price: '',
        name: '',
        description: '',
    });
    const [category, setCategory] = useState('')

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('summit clicked')
    }

    const { theme } = useTheme();

    const router = useRouter();

    // const onDrop = useCallback(async (acceptedFile) => {
    //     // upload image to the IPFS
    //     const url = await uploadToIPFS(acceptedFile[0]);
    //     setFileUrl(url);
    // }, []);

    // const {
    //     getRootProps,
    //     getInputProps,
    //     isDragActive,
    //     isDragAccept,
    //     isDragReject,
    // } = useDropzone({
    //     onDrop,
    //     accept: 'image/*',
    //     maxSize: 5000000,
    // });
    // const fileStyle = useMemo(
    //     () =>

    //         `${isDragActive && 'border-file-active'
    //         }
    //             ${isDragAccept && 'border-file-accept'}
    //             ${isDragReject && 'border-file-reject'}`,

    //     [isDragActive, isDragAccept, isDragReject]

    // );



    const uploadToIPFS = async (event) => {
        event.preventDefault()
        //   const imageFile = document.getElementById('image-input').files[0]
        const imageFile = await event.target.files[0]
        if (typeof imageFile !== 'undefined') {
            try {
                const reader = new FileReader()
                const bufferPromise = new Promise((resolve, reject) => {
                    reader.onerror = () => {
                        reader.abort()
                        reject(new Error('Error reading file'))
                    }

                    reader.onload = () => {
                        resolve(reader.result)
                    }

                    reader.readAsArrayBuffer(imageFile)
                })
                const data = await bufferPromise
                const files = [
                    new File([new Uint8Array(data)], imageFile.name, { type: imageFile.type })
                ]
                const result = await client.put(files)
                setFileUrl(`${result}.ipfs.w3s.link/${imageFile.name}`)
                console.log(`${result}.ipfs.w3s.link/${imageFile.name}`)

            } catch (error) {
                console.log("ipfs image upload error: ", error)
            }
        }
    }
    const createNFT = async () => {
        console.log(context.marketplace);

        if (!fileUrl || !formInput.price || !formInput.name || !category || !formInput.description) return
        try {
            const obj = {
                name: formInput.name,
                category: category,
                price: formInput.price,
                description: formInput.description,
                fileUrl: fileUrl
            }
            const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

            const files = [new File([blob], 'data.json')]
            const result = await client.put(files)
            console.log(result)
            mintThenList(result)

        } catch (error) {
            console.log("ipfs uri upload error: ", error)
        }
    }
    const mintThenList = async (result) => {
        const url = `${result}.ipfs.w3s.link/data.json`
        // mint nft 

        // get tokenId of new nft 
        // approve marketplace to spend nft
        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        // await (await context.marketplace.setApprovalForAll(context.contractAddress, true)).wait()
        // add nft to marketplace
        //   const listingPrice = ethers.utils.parseEther(price.toString())
        let listingPrice = await context.marketplace.getListingPrice()
        listingPrice = listingPrice.toString()
        await (await context.marketplace.createToken(url, price, { value: listingPrice })).wait()
        //   await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
        console.log(url);
    }
    return (

        <div className="mt-4 mb-4">
            <div className="container ml-auto mr-auto max-w-3xl relative">
                <div className="w-3/5 md:w-full">
                    <motion.div
                        variants={parentVariants}
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true }}

                    >
                        <h1 className='text-2xl text-left font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400'>
                            Create new NFT
                        </h1>
                        <motion.h1
                            variants={childVariants}
                            initial='hidden'
                            whileInView='show'
                            viewport={{ once: true }}
                        >
                            <div className="mt-8">

                                <p className='text-2xl text-left font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400'>
                                    Upload File
                                </p>
                                <div className='mt-4'>


                                    {/* <div className='container border-2 border-dashed border-gray-500 rounded-lg p-20'>
                                        <div {...getRootProps()} className={fileStyle}>
                                            <input {...getInputProps()} />
                                            <div className='flex-auto flex-col text-center'>
                                                <p className='font-poppins dark:text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 text-nft-black-1 font-semibold text-xl'>
                                                    JPG, PNG, GIF, SVG, WEBM.(Max 100mb)
                                                </p>
                                                <div className="my-12 w-full flex justify-center">
                                                    <Image
                                                        src={click1}
                                                        width={100}
                                                        height={100}
                                                        objectFit="contain"
                                                        alt="file_upload"
                                                        className={theme === 'light' ? 'filter invert' : ''}
                                                    />
                                                </div>
                                                <p className="font-poppins dark:text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 text-nft-black-1 font-semibold text-xl">
                                                    Drag and Drop File
                                                </p>
                                                <p className="font-poppins dark:text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 text-nft-black-1 font-semibold text-xl">
                                                    or Browse media on your device
                                                </p>
                                            </div>
                                        </div>

                                    </div> */}
                                    {/* {fileUrl && (
                                        <aside>
                                            <div>
                                                <img src={fileUrl} alt="asset_file" />
                                            </div>
                                        </aside>
                                    )} */}

                                    {/* <Form.Control
                                    type="file"
                                    required
                                    name="file"
                                    onChange={uploadToIPFS}
                                /> */}

                                </div>

                            </div>
                            <div className=" mt-4 container mx-auto">
                                <form onSubmit={handleSubmit}>

                                    <DropdownInput
                                        label="Category"
                                        name="category"


                                        options={[

                                            { placeholder: 'select a category', label: 'select a category', },
                                            { value: 'Digital Arts', label: 'Digital Arts' },
                                            { value: 'Sports', label: 'Sports' },
                                            { value: 'Photography', label: 'Photography' },
                                            { value: 'Music', label: 'Music' },
                                            { value: 'Digital Products', label: 'Digital Products' },
                                        ]}
                                        value={category}
                                        onChange={handleCategoryChange}
                                    />

                                </form>
                            </div>
                            <input
                                type="file"
                                name="Asset"
                                className="my-4 rounded-lg"
                                onChange={uploadToIPFS}
                            />
                            <Input
                                inputType="input"
                                title="Name"
                                placeholder="NFT Name"
                                handleClick={(e) =>
                                    setFormInput({ ...formInput, name: e.target.value })
                                }
                            />
                            <Input
                                inputType="textarea"
                                title="Description"
                                placeholder="NFT Description"
                                handleClick={(e) =>
                                    setFormInput({ ...formInput, description: e.target.value })
                                }
                            />
                            <Input
                                inputType="number"
                                title="Price"
                                placeholder="NFT Price"
                                handleClick={(e) =>
                                    setFormInput({ ...formInput, price: e.target.value })
                                }
                            />
                            <div className="mt-7 w-full flex justify-end">
                                <Button
                                    btnName="Create NFT"
                                    className="rounded-xl"
                                    handleClick=
                                    {createNFT}

                                />
                            </div>
                        </motion.h1>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}

export default CreateNFT;