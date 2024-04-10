import React from 'react'
import Link from 'next/link'

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600">The page you are looking for does not exist.</p>
        <Link href={"/"}>
        <button className=' text-gray-200 border m-1 bg-slate-600 text-center  shadow-lg p-1.5 rounded-lg '>Return Home</button>
      </Link>
      </div>
     
    </div>
  )


}

export default NotFound
