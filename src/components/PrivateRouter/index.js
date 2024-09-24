import { Navigate, Outlet } from "react-router-dom";
import * as cookie from "../../helpers/cookie";

function PrivateRouter() {
    const token = cookie.getCookie("token");
    return (
        <>
            {token ? (<Outlet />) : (<Navigate to={"/signin"} />)}
        </>
    );
}

export default PrivateRouter;