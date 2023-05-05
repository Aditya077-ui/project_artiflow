import React from 'react'

const DropdownInput = ({ label, name, options, value, onChange }) => {
    const handleDropdownChange = (event) => {
        event.preventDefault()
        onChange(event)
    }

    return (
        <div className="mb-4">
            <label className="font-poppins dark:text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 focus:outline-none caret-rose-500 text-black font-semibold text-xl" htmlFor={name}>
                {label}
            </label>

            <div className="relative">
                <select className='dark:bg-slate-400 border border-solid border-gray-500 block w-96 h-10 font-poppins rounded-lg font-semibold text-xl my-1'
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleDropdownChange}
                >

                    {options.map((option) => (
                        <option key={option.value || option.placeholder} value={option.value || option.placeholder}>
                            {option.label}
                        </option>
                    ))}

                </select>

            </div>
        </div>
    )
}

export default DropdownInput
