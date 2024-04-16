import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="flex h-20 w-full text-gray-200 items-center justify-between px-6 bg-gray-100 shadow-md dark:bg-gray-800">
        <nav className="flex gap-6 items-center">
            <Link to="/">
                Inicio
            </Link>
            <Link to="/listar-articulos" className="text-lg font-semibold hover:underline">
                Ver Articulos
            </Link>
            <Link to="/listar-pedidos" className="text-lg font-semibold hover:underline">
                Ver Pedidos
            </Link>
        </nav>
    </header>
  )
}
