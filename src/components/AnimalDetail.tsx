import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Animal } from "../models/Animal";
import './AnimalDetail.css';
import { Link } from "react-router-dom";
import { setDefaultResultOrder } from "dns";

const AnimalDetail = () =>{
    const { id } = useParams();
    const [ animalId, setAnimalId] = useState(0);

    //fetch data
    const [data, setData] = useState<Animal[]>([]);
    //localstorage
    let getData = localStorage.getItem('data');

    useEffect(()=>{
    const fetchData = async()=>{
        const result = await axios(
        'https://animals.azurewebsites.net/api/animals'
        );
        setData(result.data);
        localStorage.setItem('data', JSON.stringify(result));
    }; 
    fetchData();
}, []); //AnimalDetail last

//setId & useeffect
const setId =()=>{
    if(id)
    setAnimalId(+id);
};
useEffect(setId, []);

//filter by id
//parseInt is convert a string integer to a numeric integer
//(id!) tells TypeScript that even though something looks like it could be null, it can trust you that it's not.
const res = data.filter(animalId => {
    return animalId.id == parseInt(id!);
  });
  console.log("resの中身 ", res);

//toggle button
const [ feed, setFeed] = useState(false);
function feedStatus(){
    console.log("You clicked a button")
    res.map(resData=>{
        resData.lastFed = new Date();
        setFeed(!resData);
    });
    localStorage.setItem('data', JSON.stringify(data));
}

  //disable button
  const [once, setOnce] = useState(false);

  //hungry or full?
  let hungry =  data.map(time =>{
      let timeSinceLastFed = Math.floor((new Date().getTime()
      - new Date(time.lastFed).getTime())/(1000*60*60));
      console.log(timeSinceLastFed);

      if(timeSinceLastFed>=4){
          res.map( (item)=>{
              item.isFed = false;
              return(
                  <>
                  <h1>I haven't been fed for more than 4 hours</h1>
                  <h1>{time.isFed}</h1>
                  <h1>{item.isFed}</h1>
                  </>
              )
          })
      }else{
          return <h1>I am full!!!!</h1>
      }
});

//I got an error, so I added this '{res.toString()}' to solve it.
return(
    <Fragment>
        <h2>Animal ID:  {id} </h2>
        <button onClick={feedStatus} disabled={once} >I am hungry</button>
        {!feed && <p>Not feed yet!!!</p>}
        {feed && <p>Fed is done!</p>}

        <div>Check more than 4hours here →→{hungry}</div>
        <ul>
            {res.map(item=>(
                <li key={item.id}>
                    <h1>Name: {item.name}</h1>
                    <img src={item.imageUrl} width="140px" height='100px' />
                    <p>Year of birth: {item.yearOfBirth}</p>
                    <p>Long description: <br></br> {item.longDescription}</p>
                    <p>Medicine: {item.medicine}</p>
                    {!item.isFed && <p>I'm Hungry!</p>}
            
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

