import { useState } from "react"

const useFetch = (url:any):void => {
    const [data, setData] = useState(null);
    const [ error, setError] = useState(null);

    setTimeout(()=>{
        fetch(url)
        .then(data => {
            setData(null);
            setError(null);
        }); 
        return {data}
    }) 
}

export default useFetch;