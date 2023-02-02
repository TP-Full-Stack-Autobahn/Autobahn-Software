import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AppContext } from "../../core/contexts/AppContext";

import { CarProps } from "../../core/types";

import "../../styles/pages/car/index.scss";

const CarListing: React.FC = () => {
    const {apiUrl, token} = useContext(AppContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [cars, setCars] = useState<Array<CarProps>>([])

    const location = useParams();
    
    useEffect(() => {
        getCars()
    }, [])

    const getCars = () => {
        setLoading(true)
        fetch(`${apiUrl}/.car/cars`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }).then(r => { 
            if (r.ok) {
                return r;
            }
            throw new Error('Erreur')
        }).then(r => r.json().then((cars:Array<CarProps>) => {
            return setCars(cars["cars"]);
        })
        )
        .catch(e => {
            setLoading(false)
        })
    }

    return (
        <>
            <section className="cars-container">
                <div>
                    <h1 className="page-title">Nos véhicules</h1>
                    <span>Choisissez un véhicule pour consulter les détails du modèle et les tarifs</span>
                </div>
                <div className="cars-list-container">
                    {cars.length > 0 ? 
                        cars.map(car => (
                            <Link to={car.id.toString()} state={{car: car}}>
                                <article key={car.id}>
                                    <div className="head">
                                        <img src={car.image} alt={"Image voiture " + car.name}/>
                                    </div>
                                    <div className="content">
                                        <p className="name">{car.name}</p>
                                        <span className="price">à partir de <span className="price-number">{car.price} €</span></span>
                                    </div>
                                </article>
                            </Link>
                        ))
                        : "Aucun véhicule pour le moment"      
                    }
                </div>
            </section>
        </>
  )
}

export default CarListing
