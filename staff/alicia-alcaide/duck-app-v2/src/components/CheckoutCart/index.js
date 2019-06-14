import React from 'react'
import literals from './literals'


function CheckoutCart({ lang, onPayment }) {
    const { title, card, proceed, remove, january, february, march, april, may, 
            june, july, august, september, october, november, december } = literals[lang]


    function handleSubmit(e) {
        e.preventDefault()

        //TODO - validate credit card imputs
        
        onPayment()
    }               


    return <form className="credit-card" onSubmit={handleSubmit}>
        <h4 className="title">{title}</h4>
        <input type="text" className="card-number" placeholder={card} required autoFocus />
        <div className="date-field">
            <select c>
                <option value="january">{january}</option>
                <option value="february">{february}</option>
                <option value="march">{march}</option>
                <option value="april">{april}</option>
                <option value="may">{may}</option>
                <option value="june">{june}</option>
                <option value="july">{july}</option>
                <option value="august">{august}</option>
                <option value="september">{september}</option>
                <option value="october">{october}</option>
                <option value="november">{november}</option>
                <option value="december">{december}</option>
            </select>
            <select>
                <option value={2019}>2019</option>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
            </select>
        </div>
        <div className="cvv-input">
            <input type="text" placeholder="CVV" required />
        </div>

        <input type="submit" value={proceed} />

    </form>
}

export default CheckoutCart