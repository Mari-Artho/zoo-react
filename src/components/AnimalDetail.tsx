import { Fragment, useEffect,useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Animal } from "../models/Animal";
import './AnimalDetail.css';

export function AnimalDetail() {
    const { id } = useParams();
    const [ feed, setFeed] = useState(false);

//filter by id
//parseInt is convert a string integer to a numeric integer
// 'id!' tells TypeScript that even though something looks like it could be null, it can trust you that it's not.
let dataJSON = localStorage.getItem("data");
let data: Animal[] = JSON.parse(dataJSON!);
let animal = data.find(idFromData => {
    return idFromData.id == parseInt(id!);
  });
  if (animal == null) {
     return (<p>Not found</p>);
}

//hungry or full?
function CheckHungry() {
      let timeSinceLastFed = Math.floor((new Date().getTime()
      - new Date(animal!.lastFed).getTime())/(1000*60*60));
      console.log(timeSinceLastFed);

      if(timeSinceLastFed>=4){
        animal!.isFed = false;
        setFeed(true);
              return(
                  <h1>I haven't been fed for more than 4 hours</h1>
              )
             }else{animal!.isFed = true;
                    return <h1>I am full!!!!</h1>
                }
             
      return (<>{test}</>)
}//Checkhungry

//feed status button
let isFedText = "";
function feedStatus(animal: Animal, data: Animal[]){
    animal.lastFed = new Date();
    animal.isFed = true;
    localStorage.setItem('data', JSON.stringify(data));
}
isFedText = animal.isFed ? "I'm full" : "I'm hungry";

//I got an error, so I added this '{res.toString()}' to solve it.
return(
    <Fragment>
        <div className="hungry">{CheckHungry()}</div>
        <button onClick={()=>feedStatus(animal!, data)}>{isFedText}</button>
        <ul>
           <li key={animal.id}>
             <h1>Name: {animal.name}</h1>
             <img src={animal.imageUrl} width="140px" height='100px' />
             <p>Year of birth: {animal.yearOfBirth}</p>
             <p>Long description: <br></br> {animal.longDescription}</p>
             <p>Medicine: {animal.medicine}</p>
             <p>Food: {isFedText}</p>
             {!animal.isFed && <p>I'm Hungry!</p>}
             <p>Lastfed: {animal.lastFed}</p>
            </li>
        </ul>
        <br></br>
        <button style={{marginLeft:"40%"}}><Link to={'/'}>Back to ZOO</Link></button>
    </Fragment>
);
}//AnimalDetail last

