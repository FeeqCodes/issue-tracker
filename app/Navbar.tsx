import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classnames from 'classnames';

const Navbar = () => {
  const links = [
    {label: 'Dashboard', href: '/'},
    {label: 'Issues', href: '/issues'},
  ]

  const currentPath = usePathname()


  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 items-center h-14">
      <Link href=""><AiFillBug /></Link>
      <ul className="flex space-x-6">
        <li>
          { links.map(link => 
            <Link 
              key={link.href} 
              href={link.href}  
              className={classnames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500' : link.href !== currentPath,
                'hover: text-zinc-800 transition-colors' : true
              })}>{link.label}</Link> 
            )}
          
        </li>
       
        
      </ul>

      
      
    </nav>
  )
}

export default Navbar