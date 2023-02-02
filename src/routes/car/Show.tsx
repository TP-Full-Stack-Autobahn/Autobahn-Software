import React, { useContext, useState } from "react";
import { AppContext } from "../../core/contexts/AppContext";

import NavigateBackComponent from "../../components/NavigateBackComponent";

import "../../styles/pages/car/index.scss";
import { useLocation } from "react-router-dom";
import { CarProps } from "../../core/types";

const CarShow: React.FC = () => {

    const location = useLocation();
    const car:CarProps = location.state.car;
    
    console.log(car);
    return (
        <>
            <section className="cars-container">
                <NavigateBackComponent label="Retour à la liste des véhicules"/>
                <div className="cars-show-container">
                    <article>
                        <div className="head">
                            <h1 className="name">{car.name}</h1>
                            <img src={car.image} alt={"Image voiture " + car.name}/>
                        </div>
                        <div className="content">
                            <span className="price">à partir de <span className="price-number">{car.price} €</span></span>
                        </div>
                    </article>
                </div>
            </section>
        </>
  )
}

export default CarShow
