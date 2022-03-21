import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { AnimalList } from "../models/AnimalList";

const AnimalDetail = () =>{
    const { id } = useParams();
    const url = 'https://animals.azurewebsites.net/api/animals/' + id;
    const idFromApi = 'http://localhost:3000/AnimalDetail/' + id;

    //fetch data
    const [data, setData] = useState<AnimalList[]>([]);

    useEffect(()=>{
    const fetchData = async()=>{
        const result = await axios(
        'https://animals.azurewebsites.net/api/animals?id=' + id
        );
        setData(result.data);
    }; 
    fetchData();
}, []);

return(
    <Fragment>
        <h2>Animal detail - {id} </h2>
        <h3>{idFromApi}</h3>
        <ul>
            {data.map(item=>(
                <li key={item.id}>
                    <a href={item.imageUrl}>{item.name}</a>
                    <p>ID: {item.id}</p>
                    <p>Year of birth: {item.yearOfBirth}</p>
                    <p>Short description: {item.shortDescription}</p>
                    <p>Long description: {item.longDescription}</p>
                    <p>Medicine: {item.medicine}</p>
                    <p>Hungry: {item.isFed}</p>
                    <p>Lastfed: {item.lastFed}</p>
                </li>
            ))}
        </ul>

        
    
    </Fragment>
);
}



export default AnimalDetail;