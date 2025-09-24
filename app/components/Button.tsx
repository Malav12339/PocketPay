interface ButtonType {
  label: string, 
  onClick?: () => void,
  type?: "button" | "submit",
  disabled?: boolean,
  variant?: "primary" | "secondary"
}

function Button({label, onClick, type, disabled = false, variant = "primary"} : ButtonType) {
  const baseClasses = "w-full p-2 rounded-md cursor-pointer font-medium transition-colors duration-200"
  
  const variantClasses = {
    primary: disabled 
      ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
      : "bg-stone-800 hover:bg-stone-950 text-white",
    secondary: disabled
      ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
      : "bg-white text-stone-800 border border-stone-300 hover:bg-stone-50"
  }

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={disabled ? undefined : onClick} 
      type={type ?? "button"}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button