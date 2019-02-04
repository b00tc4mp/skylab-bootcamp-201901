import React from 'react'
import './index.sass'

class InputsFridge extends React.Component {
    state = { numberInputs: 1, userCal: 2500 }


    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleAdd = () => {
        const {state: {numberInputs}} =this
        if (numberInputs>=1 && numberInputs<5) this.setState({numberInputs: numberInputs+1})
        console.log(numberInputs)
    }

    handleDelete = event => {
        event.preventDefault()
        const {state: {numberInputs}} =this
        if (numberInputs>1 && numberInputs<=5) this.setState({numberInputs: numberInputs-1})
    }

    render() {
        const {state: {numberInputs}} =this

        return <section className="inputsFridge">
                 <h2 className="text-center display-2 mt-3">What's on your fridge?</h2>
                <div className="login__box container pl-lg-5 pr-lg-5 mt-3">
                    <form onSubmit={this.handleFormSubmit} className="form-group container mb-3 " >
                        <div className="row">

                            <label htmlFor="query1" className="col col-md-3 col-sm-12 flex mt-1">Ingredient 1</label>
                            <input onChange={this.handleSearch1Input} type="text" className="col col-md-9 col-12 form-control mt-1" name="query1" placeholder="Ingredient 1" required />

                            {numberInputs>=2 && <label htmlFor="query2" className="col col-md-3 col-sm-12 flex mt-1">Ingredient 2</label>}
                            {numberInputs>=2 && <input onChange={this.handleSearch2Input} type="text" className="col col-md-9 col-12 form-control mt-1" name="query2" placeholder="Ingredient 2" />}

                            {numberInputs>=3 && <label htmlFor="query3" className="col col-md-3 col-sm-12 flex mt-1">Ingredient 3</label>}
                            {numberInputs>=3 && <input onChange={this.handleSearch3Input} type="text" className="col col-md-9 col-12 form-control mt-1" name="query3" placeholder="Ingredient 3" />}

                            {numberInputs>=4 && <label htmlFor="query4" className="col col-md-3 col-sm-12 flex mt-1">Ingredient 4</label>}
                            {numberInputs>=4 && <input onChange={this.handleSearch4Input} type="text" className="col col-md-9 col-12 form-control mt-1" name="query4" placeholder="Ingredient 4" />}

                            {numberInputs===5 && <label htmlFor="query5" className="col col-md-3 col-sm-12 flex mt-1">Ingredient 5</label>}
                            {numberInputs===5 && <input onChange={this.handleSearch5Input} type="text" className="col col-md-9 col-12 form-control mt-1" name="query5" placeholder="Ingredient 5" />}
                        
                        </div>
                        <div className='row'>
                            <div className='col-0 col-sm-6'></div>
                            <button onClick={this.handleAdd} className="btn btn-dark col-12 col-sm-3 mt-2 ">Add Ingredient</button>
                            <div className="col-12 col-sm-3 pl-sm-2 p-0 mt-2">
                                <button onClick={this.handleDelete} className="btn btn-outline-dark col-12">Delete</button>
                            </div>
                        </div>

                        <input type="range" name="points" min="0" max={this.state.userCal}/>
                        <div className="row flex mt-3">
                            <div className="col-md-3 col-0"></div>
                            <button type="submit" className="btn btn-dark col-12 mr-2">Search</button>
                        </div>
                    </form>
                </div>
        </section>
    }
}

export default InputsFridge



// var inputs=1;

// onClick= inouts ++


// render()
//     for (i=0; i<inouts; i++) {
//         <Search placeholder=`ingredient ${inputs}`></Search>
//     }