import { useParams } from "react-router-dom"

const AnimalDetail = () =>{
    const { id } = useParams();


return(
    <div>
        <h2>Animal detail - {id} </h2>
    </div>
);
}

export default AnimalDetail;