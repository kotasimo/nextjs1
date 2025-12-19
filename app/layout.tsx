import "./globals.css"
import Header from "./component/header"
import Footer from "./component/footer"
import { ReactNode } from "react"

const RootLayout = ({ children }: { children: ReactNode}) => {
  return(
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}

export default RootLayout