//Home page
//Note: py - padding vertical

import {useContext} from "react";
import {UserContext} from "../context";


const Home = () => {
    const [state, setState] = useContext(UserContext);

    return (
        <div className="container-fluid" style={{
            backgroundImage: "url(" + "/images/camera1.jpg" + ")",
            backgroundAttachment: "fixed",
            padding: "100px 0px 75px 0px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            display: "block"
        }}>
            <div className="row">
                <div className="col">
                    <h5 className="text-center py-5">Welcome to the Photographer's Community</h5>
                   {/* // {JSON.stringify(state)} */}
                   </div>
                </div>
                <div className="card text-center">
                <div className="card-header bg-danger bg-opacity-25 mb-3" >
                   
                </div>
                <div className="card-body" >
                <h5 className="card-text">“Photography is the art of making memories tangible.”
– Destin Sparks</h5>
                    <h5 className="card-title">Connect . Grow . Explore</h5>
                    <p className="card-text">A platform where you can showcase your creative photography skills, strengthen connections & get ideas</p>
                    
                
                </div>

               



                <div className="card-footer bg-danger bg-opacity-25 text-muted">
                   
                </div>
            </div>

            

         
        
   <br/>
   <br/>
            



        </div>
         
    );
};
export default Home;