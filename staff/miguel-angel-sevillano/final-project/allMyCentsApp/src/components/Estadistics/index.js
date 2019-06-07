import React, { useState, Fragment } from 'react'
import CategoryChart from '../CategoryChart'
import MonthChart from '../MonthChart'

function Estadistics({ selectedCategory,
    recivedCategory,
    recivedCategoryError,
    selectedMonth,
    recivedMonth,
    recivedMonthError,
    findProduct,
    recivedProduct,
    recivedProductsError,
    clearMonth,
    clearCategory,
    clearProducts }) {




    let categoryChoosen
  
    let productQuery
    let products


    if (recivedProduct.length > 0) {
        products = recivedProduct.map(item =>
            <div class="box">{item.product}<span class="tag is-warning">{item.res} € </span> </div>)
    }




    function handleCategory() {


        let e = document.getElementsByName("Category");
        categoryChoosen = e[0].options[e[0].selectedIndex].value
        selectedCategory(categoryChoosen.toLowerCase())

    }


    function handleMonth() {

        let date =new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
        let e = document.getElementsByName("Month");
        let  monthChoosen = e[0].options[e[0].selectedIndex].value
        let monthString = e[0].options[e[0].selectedIndex].label
        date = date.slice(0,4)
        debugger
        selectedMonth({month:date+"/"+monthChoosen},monthString)



    }
    function handleSearch() {


        let e = document.getElementsByName("query");
        productQuery = e[0].value
        findProduct(productQuery)
    }



    return <Fragment>

        <div class="box">Search product consumption by category</div>
        <div class="field has-addons">
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select name="Category">
                        <option value="Frutas">Frutas</option>
                        <option value="Verduras">Verduras</option>
                        <option value="Carne">Carne</option>
                        <option value="Pescado">Pescado</option>
                        <option value="Reposteria">Reposteria</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Hogar">Hogar</option>
                    </select>
                </div>
            </div>
            <div class="control">
                <button type="submit" class="button is-success" onClick={handleCategory}>Choose</button>
            </div>
        </div>
        {!recivedCategoryError && recivedCategory && <div class="box">
            <CategoryChart data={recivedCategory} />
            <button class="button is-danger" onClick={clearCategory}>Clear</button>
        </div>}
        {recivedCategoryError && <div class="box">
            No results Found
        </div>}


        <div class="box">Search consumption by month</div>
        <div class="field has-addons">
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select name="Month">
                        <option value="01" name="January">January</option>
                        <option value="02" name="February">February</option>
                        <option value="03" name="March">March</option>
                        <option value="04"name="April">April</option>
                        <option value="05" name="May">May</option>
                        <option value="06" name="June">June</option>
                        <option value="07" name="July">July</option>
                        <option value="08"name="Agoust">Agoust</option>
                        <option value="09"name="September">September</option>
                        <option value="10"name="October">October</option>
                        <option value="11"name="Novermber">November</option>
                        <option value="12" name="December">December</option>
                    </select>
                </div>
            </div>
            <div class="control">
                <button type="submit" class="button is-success" onClick={handleMonth}>Choose</button>
            </div>
        </div>
        {!recivedMonthError && recivedMonth && <div class="box">
            <MonthChart data={recivedMonth} />
            <button class="button is-danger" onClick={clearMonth}>Clear</button>
        </div>}
        {recivedMonthError && <div class="box">
            No results Found
        </div>}








        <div class="box">Search consumption by product </div>
        <div class="box">
            <div class="field has-addons">
                <div class="control">
                    <input class="input" type="text" name="query" placeholder="Search product" />
                    <button type="submit" class="button is-success" onClick={handleSearch} >Find</button>
                </div>
            </div>
            {products && <span>{products}</span>}
            {recivedProductsError && !products && <span>{recivedProductsError}</span>}
            {products && <div class="box"><button class="button is-danger" onClick={clearProducts}>Clear</button></div>}

        </div>

    </Fragment >
}

export default Estadistics