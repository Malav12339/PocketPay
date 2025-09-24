import Link from "next/link"

interface BottomWarningType {
    label: string,
    linkText: string,
    to: string
}

function BottomWarning({label, linkText, to} : BottomWarningType) {
  return (
    <div className="text-black py-2 flex justify-center text-sm">
        <div>
            {label}
        </div>
        <Link href={to} className="pl-1 underline cursor-pointer">
            {linkText}
        </Link>
    </div>
  )
}

export default BottomWarning