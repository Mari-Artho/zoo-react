import { Fragment, useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { Animal } from "../models/Animal";
import './Animals.css';
import axios from "axios";
import { Link } from "react-router-dom";

export function Animals(){
    let [animals, setAnimals] = useState<Animal[]>([]);

    let getData = ()=>{
        let animalData = localStorage.getItem('data');
        if(animalData===null){
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
            }); 
            setAnimals(animalsFromApi);
            localStorage.setItem('data', JSON.stringify(animalsFromApi));
        });
    } else {
        setAnimals(JSON.parse(animalData!));
    }
}//getData

    //useEffect
    useEffect(getData, []);

    //Get the current time
    const now = new Date().getTime();

    let ListItems = ()=>{
        let items = animals.map((item:IAnimal)=>
        <>
        <div style={{backgroundColor:'#cee4b4'}}>
        <Link to={`AnimalDetail/${item.id}`}>
        <p className="container-name" key={item.id}>{item.name}</p>
        <p className="container-img"><img src={item.imageUrl} width="120px" height='80px'alt="Animal"/></p>
        <p className="container-short">{item.shortDescription}</p>
        <p>{Math.floor((now - new Date(item.lastFed).getTime())/(1000*60*60)) >=4 ? "No food more than 4 hours" : "I'm full"}</p>
        </Link>
        </div>
        </>)
        return(
            <>{items}</>
        )
    };

    return (
        <Fragment>
            <body>
            <h1>🐻WELCOME TO ZOO!?🐘</h1>
            <h2>There are {animals.length} animals in this zoo!</h2>
            <h2>Click on the animal picture to open the details page and feed the hungry animal</h2>
            <div className="container">
            {ListItems()}
            </div>   
            </body>        
        </Fragment>
    )
}//Animals last
