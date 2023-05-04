const Input = ({ inputType, title, placeholder, handleClick }) => {

    return (
        <div className="mt-10 w-full">
            <p className="font-poppins dark:text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 focus:outline-none caret-rose-500 text-nft-black-1 font-semibold text-xl">
                {title}

            </p>

            {inputType === 'number' ? (
                <div className=" flex-w-full font-poppins border-2 border-solid border-gray-500 dark:text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-lg w-full focus:outline-none caret-rose-500 text-base mt-4 px-4 py-3 flexBetween flex-row bg-black outline-none">
                    <input
                        type="number"
                        className="flex w-full font-poppins  dark:text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-lg  focus:outline-none caret-rose-500 text-base flexBetween flex-row bg-black outline-none"
                        placeholder={placeholder}
                        onChange={handleClick}
                    />
                    {/* <p className="font-poppins dark:text-black text-nft-black-1 font-semibold text-xl">
                        
                    </p> */}
                </div>
            ) : inputType === 'textarea' ? (
                <textarea
                    rows={10}
                    className="font-poppins border-2 border-solid border-gray-500 p-20 dark:text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-lg w-full focus:outline-none caret-red-500 text-base mt-4 px-4 py-3 flexBetween flex-row bg-black outline-none"
                    placeholder={placeholder}
                    onChange={handleClick}
                />
            ) : (
                <input
                    className="flex w-full font-poppins border-2 border-solid border-gray-500 dark:text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-lg  focus:outline-none caret-rose-500 text-base mt-4 px-4 py-3 flexBetween flex-row bg-black outline-none"
                    placeholder={placeholder}
                    onChange={handleClick}
                />
            )}
        </div>
    );
};

export default Input;