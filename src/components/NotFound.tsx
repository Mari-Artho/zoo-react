import { Fragment } from "react";
import { Link } from "react-router-dom";

export function NotFound(){

    return(
        <Fragment>
        <h1 style={{textAlign:'center', marginTop:'100px'}}>NOT FOUND!!😭</h1>
        <button style={{marginLeft:"40%"}}><Link to={'/'}>Back to ZOO</Link></button>
        </Fragment>
        )
}