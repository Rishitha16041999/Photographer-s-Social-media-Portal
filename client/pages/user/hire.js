import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/userRoute";
import { useRouter, userRouter } from "next/router";

const Hire = () =>
{
   return (
    <UserRoute>
    <div className="container-fluid">
        <div className="row p-5 bg-default-image">
            <div className="col text-center">
                <h3>Hire</h3>
            </div>
        </div>
        </div>
    </UserRoute>
   );
};

export default Hire;