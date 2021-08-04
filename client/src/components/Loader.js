import React from 'react';
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";

// Can be a string as well. Need to ensure each key-value pair ends with ;


function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");


    return (
        <div style={{ marginTop: "150px" }}>
            <div className="sweet-loading text-center">


                <HashLoader color="#000" loading={loading} css=' ' size={80} />
            </div>
        </div>
    )
}

export default Loader
