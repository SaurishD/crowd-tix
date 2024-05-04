const Layout = ({children} : {children: React.ReactNode}) => {
    return (
        <div style={{ backgroundImage: 'url("background.webp")', color: 'white',backgroundAttachment: 'fixed',backgroundSize: 'cover', minHeight: '100vh' }}>
            {children}
        </div>  )
}

export default Layout;