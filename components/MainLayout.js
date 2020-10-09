import Link from 'next/link'
import Head from 'next/head'

export function MainLayout({ children, title}) {
    return (
        <>
            <Head>
                <title>{title} | News</title>
            </Head>
            <nav>
                <Link href={'/'}><a>NEWS</a></Link>
                <Link href={'/articles'}><a>ARTICLES</a></Link>
                <Link href={'/info'}><a>more info</a></Link>
            </nav>
            <main>
                {children}
            </main>
            <style jsx>{`
        nav {
          font-weight: bold;
          height: 60px;
          left: 0;
          top: 0;
          right: 0;
          background: #4f4d52;
          display: flex;
          justify-content: space-around;
          align-items: center;
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