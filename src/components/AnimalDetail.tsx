import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Animal } from "../models/Animal";

const AnimalDetail = () =>{
    const { id } = useParams();

    //fetch data
    const [data, setData] = useState<Animal[]>([]);
    useEffect(()=>{
    const fetchData = async()=>{
        const result = await axios(
        'https://animals.azurewebsites.net/api/animals'
        );
        setData(result.data);
    }; 
    fetchData();
}, []);

//filter2
//parseInt is convert a string integer to a numeric integer
//(id!) tells TypeScript that even though something looks like it could be null, it can trust you that it's not.
const res = data.filter(animalId => {
    return animalId.id == parseInt(id!);
  });

//I got an error, so I added this '{res.toString()}' to solve it.
return(
    <Fragment>
        <h2>Animal ID:  {id} </h2>
        
        <ul>
            {res.map(item=>(
                <li key={item.id}>
                    <p>{item.name}</p>
                    <img src={item.imageUrl} width="140px" height='100px' />
                    <p>Year of birth: {item.yearOfBirth}</p>
                    <p>Short description: {item.shortDescription}</p>
                    <p>Long description: {item.longDescription}</p>
                    <p>Medicine: {item.medicine}</p>
                    <p>Hungry: {item.isFed}</p>
                    <p>Lastfed: {item.lastFed}</p>
                </li>
            ))}
        </ul>
       
        {/* <ul>
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
        </ul> */}
    </Fragment>
);
}



export default AnimalDetail;
