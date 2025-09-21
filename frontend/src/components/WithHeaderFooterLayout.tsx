import React from 'react'
import Footer from './Footer'
import Header from './Header'

interface WithHeaderFooterLayoutProps {
  children: React.ReactNode
}

const WithHeaderFooterLayout: React.FC<WithHeaderFooterLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default WithHeaderFooterLayout
