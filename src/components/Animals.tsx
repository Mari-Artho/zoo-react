import { Fragment, useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { Animal } from "../models/Animal";
import './Animals.css';
import axios from "axios";
import { BrowserRouter as Router, Route, Link, useParams} from "react-router-dom";

export function Animals(){
    const [animals, setAnimals] = useState<Animal[]>([]);
    //Set a ID
    const {id} = useParams();

    const getData = ()=>{
        axios
        .get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
        .then((response)=>{
            let animalsFromApi = response.data.map((animal:IAnimal)=>{
                return new Animal (
                    animal.id,
                    animal.name,
                    animal.latinName,
                    animal.yearOfBirth,
                    animal.shortDescription,
                    animal.longDescription,
                    animal.imageUrl, 
                    animal.medicine, 
                    animal.isFed, 
                    animal.lastFed);
            }); setAnimals(animalsFromApi);
        });
    }//getData end

    //useEffect
    useEffect(getData, []);

    const ListItems = ()=>{
        const items = animals.map((item:IAnimal)=>
        <>
        <div style={{backgroundColor:'#cee4b4'}}>
        <Link to={`AnimalDetail/${item.id}`}>
        <p className="container-name" key={item.id}>{item.name}</p>
        <p className="container-img"><img src={item.imageUrl} width="120px" height='80px'/></p>
        <p className="container-short">{item.shortDescription}</p>
        </Link>
        </div>
        </>);
        return(
            <>{items}</>
        )
    }

    return (
        <Fragment>
            <h1>🐘WELCOME TO ZOO!?🐻</h1>
            <h2>We have {animals.length} animals!</h2>
            <div className="container">
            {ListItems()}
            </div>           
        </Fragment>
    )
}
