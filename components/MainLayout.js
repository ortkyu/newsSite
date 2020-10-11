import Link from 'next/link'
import Head from 'next/head'

export function MainLayout({ children, title}) {
    return (
        <>
            <Head >
                <title>{title}|news</title>
            </Head>
            <nav>
                <Link href={'/'}><a><h1>TECHNO</h1></a></Link>
            </nav>
            <main>
                {children}
            </main>
            <style jsx>{`
        nav {
          
          font-weight: bold;
          height: 90px;
          left: 0;
          top: 0;
          right: 0;
          background: #000000;
          display: flex;
          align-items: center;
          padding-left: 5rem;
        }
        
        nav a {
          color: #fff;
          text-decoration: none;
        }
        
        main {
          padding: 1rem;
        }
      `}</style>
        </>
    )
}