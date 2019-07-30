import React, { useState, Fragment } from 'react'
import CategoryChart from '../CategoryChart'
import MonthChart from '../MonthChart'
import './index.sass'
import Toast from '../Toast'

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
            
                <div class="box" id="detailProductContainer">{item.product}
                    <span class="tag is-warning is-large">
                     Total : {item.res} €
                </span>
                </div>
            )
    }




    function handleCategory() {


        let e = document.getElementsByName("Category");
        categoryChoosen = e[0].options[e[0].selectedIndex].value
        selectedCategory(categoryChoosen.toLowerCase())

    }


    function handleMonth() {

        let date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
        
        let e = document.getElementsByName("Month");
        let monthChoosen = e[0].options[e[0].selectedIndex].value
        let monthString = e[0].options[e[0].selectedIndex].label
        date = date.slice(0, 4)
        let year = date.slice(0,4)
        selectedMonth({ month: date + "/" + monthChoosen }, monthString,year)



    }
    function handleSearch() {


        let e = document.getElementsByName("query");
        productQuery = e[0].value
        findProduct(productQuery.toLowerCase())
    }



    return <Fragment>
        <div class="stadisticsContainer">
            <div class="stadistics">
                <div class="box" id="byCategory">Search product consumption by category
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


                </div>


                <div class="box">Search consumption by month
                <div class="field has-addons">
                        <div class="control is-expanded">
                            <div class="select is-fullwidth">
                                <select name="Month">
                                    <option value="01" name="January">January</option>
                                    <option value="02" name="February">February</option>
                                    <option value="03" name="March">March</option>
                                    <option value="04" name="April">April</option>
                                    <option value="05" name="May">May</option>
                                    <option value="06" name="June">June</option>
                                    <option value="07" name="July">July</option>
                                    <option value="08" name="August">August</option>
                                    <option value="09" name="September">September</option>
                                    <option value="10" name="October">October</option>
                                    <option value="11" name="Novermber">November</option>
                                    <option value="12" name="December">December</option>
                                </select>
                            </div>
                        </div>
                        <div class="control">
                            <button type="submit" class="button is-success" onClick={handleMonth}>Choose</button>
                        </div>
                    </div>

                </div>

                <div class="box">Search consumption by product

                    <div class="field has-addons">
                        <div class="control" id="productContainer">
                            <input class="input" type="text" name="query" placeholder="Search product" />
                            <button type="submit" class="button is-success" onClick={handleSearch} >Find</button>
                        </div>

                    </div>
                </div>
                <div class="productSelected" id="productsContainer">
                    {recivedProductsError && <Toast error={recivedProductsError} toastType="is-danger" />}
                    {products && <div class="box">{products}</div>}

                </div>
                {products && <div class="box" id="closeButtonProduct" ><button class="button is-danger" onClick={clearProducts}>Close</button></div>}
            </div>
            <div class="chartContainer">
                <div class="categoryChart">

                    {!recivedCategoryError && recivedCategory && <div class="box" id="categoryChart">
                        <CategoryChart data={recivedCategory} />
                        <button class="button is-danger" onClick={clearCategory}>Close</button>
                    </div>}
                    {recivedCategoryError && <div class="box">
                        No results Found
                </div>}
                </div>
                <div clas="monthChart">
                    {!recivedMonthError && recivedMonth && <div class="box" id="monthChart">
                        <MonthChart data={recivedMonth} />
                        <button class="button is-danger" onClick={clearMonth}>Close</button>
                    </div>}
                    {recivedMonthError && <div class="box" id="monthChart">
                        No results Found
            </div>}

                </div>
            </div>
        </div>
    </Fragment >
}

export default Estadistics