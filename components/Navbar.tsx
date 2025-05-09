// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleDropdown = (item: string) => {
    setDropdownOpen(dropdownOpen === item ? null : item);
  };

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Projects",
      href: "#",
      subItems: [
        { name: "E-Governance", href: "#" },
        { name: "Web Dev", href: "#" },
        { name: "Mobile Development", href: "#" },
      ],
    },
    { name: "People & Culture", href: "/#" },
    { name: "Carrers", href: "/#" },
    { name: "Success Stories", href: "/#" },
    { name: "About Us", href: "/#" },
    { name: "Contact", href: "/#" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full z-50 border-b border-gray-100" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">INET</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600 transition-colors"}`}
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === item.name ? "rotate-180" : ""}`} />
                    </button>

                    {dropdownOpen === item.name && (
                      <div className="absolute left-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="py-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm ${pathname === subItem.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                              onClick={() => setDropdownOpen(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600 transition-colors"}`}>
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/apply"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Lets Talk
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none" aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium ${
                        pathname === item.href ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`h-5 w-5 transition-transform ${dropdownOpen === item.name ? "rotate-180" : ""}`} />
                    </button>

                    {dropdownOpen === item.name && (
                      <div className="pl-4 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                              pathname === subItem.href ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                            onClick={closeMenu}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.href ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/apply"
              className="block w-full text-center px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg mt-2"
              onClick={closeMenu}
            >
              Lets talk
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
