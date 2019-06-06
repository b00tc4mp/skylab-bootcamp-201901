import React from 'react'
import CategoryChart from '../CategoryChart'

function Estadistics({ selectedCategory, recivedCategory, selectedDate, recivedDate }) {

    let category

    function handleSubmit() {
        let e = document.getElementsByName("Category");
        category = e[0].options[e[0].selectedIndex].value
        selectedCategory(category.toLowerCase())
    }



    return <>

        <div class="box">Select a Category</div>
        <div class="field has-addons">
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select name="Category">
                        <option value="Frutas">Frutas</option>
                        <option value="Verduras">Verduras</option>
                        <option value="Carne">Carne</option>
                        <option value="Pescado">Pescado</option>
                        <option value="Resposteria">Resposteria</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Hogar">Hogar</option>
                    </select>
                </div>
            </div>
            <div class="control">
                <button type="submit" class="button is-primary" onClick={handleSubmit}>Choose</button>
            </div>
        </div>
        <div class="box">
            {recivedCategory && <CategoryChart data={recivedCategory} category={category}/>}
    </div>
</>
        }
        
export default Estadistics