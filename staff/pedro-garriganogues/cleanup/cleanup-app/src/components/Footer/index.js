import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className=" py-5 footer">
      <section className="row">
        <div className="col-12 col-md">
        </div>
        <div>
          <h5>Clintu:</h5>
          <ul>
            <Link to='/'>Garantía</Link>
            <br />
            <Link to='/about'>Preguntas</Link>
            <br />
            <Link to='/contact'>Llamanos</Link>
            <p>Tlf: 99 999 99 99</p>
          </ul>
        </div>
        <div>
          <h5>Servicios:</h5>
          <ul>
            <p>Limpieza doméstica</p>
            <p>Limpieza empresas</p>
            <p>Manitas</p>
            <Link to='/products'>Ver todos los servicios</Link>
          </ul>
        </div>
      </section>
    </footer>
  )
}

export default Footer

