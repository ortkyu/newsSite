import Link from 'next/link'
import Head from 'next/head'
import React from "react";



export interface StandardComponentProps {
  title?: string
  children: React.ReactNode
}

export function MainLayout({children, title}: StandardComponentProps) {
    return (
        <>
            <Head >
                <title>{title} Новости из мира науки и техники</title>
                <meta name="description" content="Самые последние новости из мира науки и техники, открытия, исследования и изобретения" />
                <meta name="yandex-verification" content="5211a82e3d315328" />
                <meta name="google-site-verification" content="v3Eb8IrFkCvDeUzwwccE6HlTfyi8CYbZtm_SmZChmIE" />
                <meta itemProp="image" content="https://img2.akspic.ru/image/29690-struktura-kosmos-tehnologia-elektronnaya_tehnika-tehnologii-1920x1080.jpg" />
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