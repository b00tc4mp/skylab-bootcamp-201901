import React from 'react'
import logic from '../../logic'
import './index.sass'
import Feedback from '../Feedback'

class InputsFridge extends React.Component {
    state = { 
        numberInputs: 1, 
        calories: "0",
        diet: 'indifferent', 
        activeVegan: false, 
        activeVegeterian: false,
        activeGluten: false,
        activePeanut: false,
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: ''
     }


    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { input1, input2, input3, input4, input5, calories, diet, activeVegan, activeVegeterian, activeSugar, activePeanut }, props: { onSearch } } = this

        let query=''
        if (input1) query+=input1+'+'
        if (input2) query+=input2+'+'
        if (input3) query+=input3+'+'
        if (input4) query+=input4+'+'
        if (input5) query+=input5+'+'
 
        query=query.slice(0,query.length-1)  //To eliminate the last +

        let health= []
        if(activeVegan) health.push('vegan')
        if(activeVegeterian) health.push('vegetarian')
        if(activeSugar) health.push('sugar-conscious')
        if(activePeanut) health.push('peanut-free')

        

        onSearch(query, calories, diet, health)
    }

    handleSearch1Input = event => this.setState({input1: event.target.value})
    handleSearch2Input = event => this.setState({input2: event.target.value})
    handleSearch3Input = event => this.setState({input3: event.target.value})
    handleSearch4Input = event => this.setState({input4: event.target.value})
    handleSearch5Input = event => this.setState({input5: event.target.value})

    handleAdd = event => {
        event.preventDefault()
        const {state: {numberInputs}} =this
        if (numberInputs>=1 && numberInputs<5) this.setState({numberInputs: numberInputs+1})
    }

    handleDelete = event => {
        event.preventDefault()
        const {state: {numberInputs}} =this
        if (numberInputs>1 && numberInputs<=5) this.setState({numberInputs: numberInputs-1})
    }

    handleCalories = event => {
        event.preventDefault()
        this.setState({calories: event.target.value})
    }

    handleDietInput = event =>{
        event.preventDefault()
        this.setState({diet: event.target.value})
    }

    handleVegan = event =>{
        event.preventDefault()
        this.setState({activeVegan:!this.state.activeVegan})
    }

    handleVegeterian = event =>{
        event.preventDefault()
        this.setState({activeVegeterian:!this.state.activeVegeterian})
    }

    handleSugar = event =>{
        event.preventDefault()
        this.setState({activeSugar:!this.state.activeSugar})
    }

    handlePeanut = event =>{
        event.preventDefault()
        this.setState({activePeanut:!this.state.activePeanut})
    }

    render() {
        const {state: {numberInputs, calories, activeVegan, activeVegeterian, activeSugar, activePeanut}} =this

        const user= JSON.parse(sessionStorage.getItem('user'))
        const maxCalories=logic.caloriesCounter(user.gender, user.height, user.weight, user.birthDate, user.lifeStyle)

        return <section className="inputsFridge">
                 <h2 className="text-center display-2 mt-3">What's on your fridge?</h2>
                <div className="inputsFridge__box container pl-lg-5 pr-lg-5 mt-3">
                    <form onSubmit={this.handleFormSubmit} className="form-group container mb-3 " >
                        <div className="row mt-4">

                            <input onChange={this.handleSearch1Input} type="text" className="col col-12 form-control mt-5" name="query1" placeholder="Ingredient 1" required />

                            {numberInputs>=2 && <input onChange={this.handleSearch2Input} type="text" className="col col-12 form-control mt-1" name="query2" placeholder="Ingredient 2" required />}
                            {numberInputs>=3 && <input onChange={this.handleSearch3Input} type="text" className="col col-12 form-control mt-1" name="query3" placeholder="Ingredient 3" required />}
                            {numberInputs>=4 && <input onChange={this.handleSearch4Input} type="text" className="col col-12 form-control mt-1" name="query4" placeholder="Ingredient 4" required />}
                            {numberInputs===5 && <input onChange={this.handleSearch5Input} type="text" className="col col-12 form-control mt-1" name="query5" placeholder="Ingredient 5" required/>}
                        
                        </div>
                        <div className='row'>
                            <div className='col-0 col-sm-6'></div>
                            <button onClick={this.handleAdd} className="btn btn-dark col-12 col-sm-3 mt-2 ">Add Ingredient</button>
                            <div className="col-12 col-sm-3 pl-sm-2 p-0 mt-2">
                                <button onClick={this.handleDelete} className="btn btn-outline-dark col-12">Delete</button>
                            </div>
                        </div>
                        
                        <div className='row calories mt-3'>
                            <h3 className='calories__title'>Calories <span className='ml-2 calories__value'>{calories}</span></h3>
                            <input onChange={this.handleCalories} className='calories__input col-12 p-0 ' type="range" name="points" min="0" max={maxCalories}/>
                        </div>

                        <div className='row mt-5'>
                                <label htmlFor="diet" className="col col-md-3 col-sm-12 flex mt-1 diet__title">Diet</label>
                                <select onChange={this.handleDietInput} value={this.state.value} name="lifestyle" className="col col-md-9 col-12 form-control mt-1">
                                    <option value="indifferent">Indifferent</option>
                                    <option value="balanced">Balanced: Protein/Fat/Carb values in 15/35/50 ratio</option>
                                    <option value="high-protein">High-Protein: More than 50% of total calories from proteins</option>
                                    <option value="low-carb">Low-Carb: Less than 20% of total calories from carbs</option>
                                    <option value="low-fat">Low-Fat: Less than 15% of total calories from fat</option>

                                </select>
                        </div>

                        <div className='row'>
                            <div className="col-12 col-sm-3 pl-sm-2 p-0 mt-2">
                                <button onClick={this.handleVegan} className={`btn btn-outline-dark col-12 ${activeVegan? `active`:``}`}>Vegan</button>
                            </div>
                            <div className="col-12 col-sm-3 pl-sm-2 p-0 mt-2">
                                <button onClick={this.handleVegeterian} className={`btn btn-outline-dark col-12 ${activeVegeterian? `active`:``}`}>Vegeterian</button>
                            </div>
                            <div className="col-12 col-sm-3 pl-sm-2 p-0 mt-2">
                                <button onClick={this.handleSugar} className={`btn btn-outline-dark col-12 ${activeSugar? `active`:``}`}>Low-Sugar</button>
                            </div>
                            <div className="col-12 col-sm-3 pl-sm-2 p-0 mt-2">
                                <button onClick={this.handlePeanut} className={`btn btn-outline-dark col-12 ${activePeanut? `active`:``}`}>Peanut-Free</button>
                            </div>
                        </div>
                        {this.props.sincronSearchFeedback && <Feedback message={this.props.sincronSearchFeedback} />}
                        <div className="row flex mt-5">
                            <button type="submit" className="btn btn-dark col-12 mr-2">Search</button>
                        </div>
                    </form>
                </div>
        </section>
    }
}

export default InputsFridge

