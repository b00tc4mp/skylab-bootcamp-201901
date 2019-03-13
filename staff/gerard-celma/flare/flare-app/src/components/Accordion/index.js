import React, { Component } from 'react'
// import './index.sass'


class Accordion extends Component {
    state = { accordionItems: null }

    componentWillMount () {
        let accordion = []
      
        this.props.data.forEach(({_id, date, text, userIdTo:{ image, name, surname }}) => {
            accordion.push({
            image: image,  
            title: `${name} ${surname}`, 
            content: text, 
            open: false
            })
        })
      
        this.setState({ accordionItems: accordion })
    }

    click (i) {
      const newAccordion = this.state.accordionItems.slice();
      const index = newAccordion.indexOf(i)
      
      newAccordion[index].open = !newAccordion[index].open;
      this.setState({accordionItems: newAccordion});
    }



    render() {
        const { state:{ accordionItems } } = this

        const sections = accordionItems.map((i) => (
            <div key={accordionItems.indexOf(i)}>
              <div 
                className="title" 
                onClick={this.click.bind(null, i)}
              >
               <div className="arrow-wrapper">
                 <i className={i.open 
                   ? "fa fa-angle-down fa-rotate-180" 
                   : "fa fa-angle-down"}
                 ></i>
               </div>
               <span className="title-text">
                 <img src={i.image} />{i.title}
               </span>
             </div>
             <div className={i.open 
               ? "content content-open" 
               : "content"}
              >
                <div className={i.open 
                  ? "content-text content-text-open" 
                  : "content-text"}
                > {i.content}
                </div>
              </div>
            </div>
          ))

        return <div className="accordion">
                    {sections}
                </div>
    }
}

export default Accordion