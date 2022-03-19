import { Fragment, useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { AnimalList } from "../models/AnimalList";
import './Animals.css';
import axios from "axios";
import { Link } from "react-router-dom";

export function Animals(){
    const [animals, setAnimals] = useState<AnimalList[]>([]);

    const getData = ()=>{
        axios
        .get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
        .then((response)=>{
            let animalsFromApi = response.data.map((animal:IAnimal)=>{
                return new AnimalList (animal.id, animal.name, animal.latinName, animal.yearOfBirth, animal.shortDescription, animal.longDescription, animal.imageUrl, animal.medicine, animal.isFed, animal.lastFed);
            }); setAnimals(animalsFromApi);
        });
    }//getDataの最後

    console.log(animals);
    //useEffect
    useEffect(getData, []);

    const ListItems = ()=>{
        const items = animals.map((item:IAnimal)=>
        <>
        <div style={{backgroundColor:'green'}}>
        <Link to='/AnimalDetail'>
        <p className="container-name" key={item.id}>{item.name}</p>
        <p className="container-img"><img src={item.imageUrl} width="80px" height='60px'/></p>
        </Link>
        </div>
        </>);
        return(
            <>{items}</>
        )
    }

    return (
        <Fragment>
            <h1>🐘WELCOME TO ZOO!?🐼</h1>
            <h2>We have {animals.length} animals!</h2>
            <div className="container">
            {ListItems()}
            </div>           
        </Fragment>
    )
}