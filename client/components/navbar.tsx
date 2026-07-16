'use client'
import { useRouter, usePathname } from "next/navigation"

interface NavLink {
  label: string
  path: string
  icon: string
}

const links: NavLink[] = [
  { label: "Pizza", path: "/pizza", icon: "ti-pizza" },
  { label: "Drinks", path: "/drinks", icon: "ti-bottle" },
  { label: "Home", path: "/home", icon: "ti-home-2" },
  { label: "Cart", path: "/cart", icon: "ti-shopping-cart" },
  { label: "Account", path: "/account", icon: "ti-user-circle" },
]

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-99">
      <div className="flex items-stretch justify-around bg-[#0e0b0832] backdrop-blur-3xl pt-2 pb-2.5 border-b border-white/5">
        {links.map(({ label, path, icon }) => {
          const isActive = pathname === path

          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className="flex flex-1 flex-col items-center  justify-center gap-1 py-1 rounded-xl transition-colors"
            >
              <i
                className={`ti ${icon} text-xl transition-colors ${isActive ? "text-orange-400" : "text-white/50"
                  }`}
              />
              <span
                className={`text-[20px] md:text-[30px] font-medium transition-colors ${isActive ? "text-orange-400" : "text-white/50"
                  }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar