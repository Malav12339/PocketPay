"use client"

import { useState } from "react"

interface InputBoxType {
    label: string, 
    placeholder: string,
    type?: "text" | "password" | "email",
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function InputBox({ label, placeholder, type, value, onChange } : InputBoxType) {
  const [showPassword, setShowPassword] = useState(false)

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type

  return (
    <div className="relative">
        <div className="text-black text-left py-2">
            {label}
        </div>
        <input 
            className="w-full border rounded border-slate-200 text-slate-500 py-1 px-2"
            type={inputType} 
            placeholder={placeholder} 
            value={value}
            onChange={onChange} 
        />

        {type === "password" && (
          <button 
          type="button"
          className="text-gray-500 text-sm cursor-pointer absolute right-2 top-[48px]"
          onClick={() => setShowPassword(x => !x)}>
            {showPassword ? "hide" : "show"}
          </button>
        )}
    </div>
  )
}

export default InputBox