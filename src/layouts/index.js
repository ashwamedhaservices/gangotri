import { useContext } from "react";
import { AuthContext } from "../context/authentication/authContextProvider";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

const Layout = ({ children }) => {
    const {isSignedIn} = useContext(AuthContext)
    return (
        <>
        {isSignedIn && <div className="parent">
            <div className="main">
                <Sidebar />
                <article className="content k-pl16 k-pr16">
                    <Header />
                    {children}
                </article>
            </div>
        </div>
        }
        {
            !isSignedIn && <>{children}</>
        }
        </>
    )
}

export default Layout;