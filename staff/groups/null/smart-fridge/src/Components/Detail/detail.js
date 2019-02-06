import React from 'react'

class Detail extends React.Components{
  
    

    render(){
        const { recipes } = this.props

        return <section className="detail">
        <h3>Details</h3>
            
            {
                recipes.map(recipe => (
                    <p className="instructions">{recipe.recipe.ingredients}</p> 
            
                ))
            }
            </section>
    }

}



export default Detail