const Button = ({ btnName, classStyles, handleClick }) => (
    <button
        type="button"
        className={`border border-solid text-left text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-lg text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold  ${classStyles}`}
        onClick={handleClick}
    >
        {btnName}
    </button>
);

export default Button;