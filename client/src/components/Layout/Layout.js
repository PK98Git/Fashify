import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "76.7vh" }}>
        <Toaster/>
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Fashify",
  description: "Online Fashion store",
  keywords: "mern,fashion , fashify , online , ecommerce",
  author: "Pasindu Kanchana",
};

export default Layout