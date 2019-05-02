import React from 'react'
import literals from './literals'
import './index.sass'

function Landing({ onRegister, onLogin }) {

    return <div className="landing" onClick={e => e.preventDefault()}>

        <main className='landing__main'>

            <h1 className='landing__main-title'>FOOD<span className='landing__main-title-colored'>LAB</span></h1>
            <h2 className='landing__main-slogan'>Improvisa. Experimenta. Cocina.</h2>
            <div>
                <a className='landing__main-button' href="" onClick={() => onRegister()}>Register</a> <span> or </span> <a className='landing__main-button' href="" onClick={() => onLogin()}>Login</a>
            </div>

        </main>

        <footer className='landing__footer'>
            <p>Come sano, con lo que tienes a mano</p>
            {/* <p>Recetas Fáciles y Rápidas · Recetas con Arroz · Cocina Asiática · Recetas con Carne · Platos de Cuchara · Desayunos · Recetas de Ensaladas · Recetas Fitness · Guisos · Recetas de Hamburguesas · Recetas con Legumbres · Cocina Mexicana · Recetas con Pasta · Recetas de Pizza · Recetas con Pescado · Recetas con Pollo · Postres Fáciles · Recetas sin Gluten · Snacking Saludable · Recetas de Sopas y Cremas · Recetas de Tupper · Recetas Veganas · Recetas Vegetarianas</p> */}
            <p>Términos y condiciones Política de Privacidad </p>
            <p>Política de cookies </p>
            <p>FOODLAB 2019</p>
        </footer>
    </div>

}

export default Landing