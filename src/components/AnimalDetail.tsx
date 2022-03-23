import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Animal } from "../models/Animal";
import './AnimalDetail.css';
import { Link } from "react-router-dom";

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
}, []); //AnimalDetail last

//filter by id
//parseInt is convert a string integer to a numeric integer
//(id!) tells TypeScript that even though something looks like it could be null, it can trust you that it's not.
const res = data.filter(animalId => {
    return animalId.id == parseInt(id!);
  });

//toggle button
const [ isFed, setIsFed] = useState("I'm hungry!!");
const FeedBtn=()=>{
    const hungry:boolean = false;
    const fed = hungry == false ?  "I'm full!!" : " I'm hungry!!";
    setIsFed(fed);

    // const [ date, setDate] = useState('');
    // const currentDate =  Date();
    // setDate(currentDate);
    // console.log(date);
    //     return(
    //     <>
    //     <p>Last fed is: {date}</p>
    //     </>
    //     )
};

  //disable button
  const [once, setOnce] = useState(false);

  //hungry or full?
  const hungry:boolean = false;
  const eaten = hungry == false ? " I'm full " : " I'm hungry' ";

//I got an error, so I added this '{res.toString()}' to solve it.
//<button onClick={() =>Hungry} disabled={once} >{isFed}</button>
return(
    <Fragment>
        <h2>Animal ID:  {id} </h2>
        <button onClick={FeedBtn} disabled={once} >{isFed}</button>
        
        <ul>
            {res.map(item=>(
                <li key={item.id}>
                    <h1>Name: {item.name}</h1>
                    <img src={item.imageUrl} width="140px" height='100px' />
                    <p>Year of birth: {item.yearOfBirth}</p>
                    <p>Long description: <br></br> {item.longDescription}</p>
                    <p>Medicine: {item.medicine}</p>
                    <p>Hungry: {item.isFed} {eaten}</p>
                    <p>Lastfed: {item.lastFed}</p>
                </li>
            ))}
        </ul>
        <br></br>
        <button style={{marginLeft:"40%"}}><Link to={'/'}>Back to ZOO</Link></button>
    </Fragment>
);
}

export default AnimalDetail;

