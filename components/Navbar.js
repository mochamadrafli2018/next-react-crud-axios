import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{backgroundColor:'transparent',position:'fixed'}}
      className='flex justify-center m-0 py-1 px-0 top-0 shadow-sm space-x-3 text-black w-100'
    >
      {[
        ['Home', '/'],
        ['Register', '/register'],
        ['Login','/login'],
        ['Admin','/admin'],
      ].map(([title, url, index]) => (
        <Link href={url} key={index}>
            <a className="font-bold bg-green-300 hover:bg-green-400 no-underline my-0 px-3 py-2 rounded-lg text-white">
            {title}
            </a>
        </Link>
      ))}
    </nav>
  )
}