import React, {Component, Fragment} from 'react'

class Carrousel extends Component {

    constructor(props) {
        super(props)
        this.totalPages = 4
        this.state = {
            selected: 0,
        }
        this.handleSelectedChange = this.handleSelectedChange.bind(this)
        this.previous = this.previous.bind(this)
        this.next = this.next.bind(this)
    }

    handleSelectedChange(selected) {
        this.setState({selected})
    }

    previous() {
        this.setState(state => ({
            selected: state.selected - 1
        }))
    }

    next() {
        this.setState(state => ({
            selected: state.selected + 1
        }))
    }

    onLoadFile(){
      const selectedFile = document.getElementById("input1").files[0]
      if(!selectedFile) return


      var r = new FileReader();
      r.onload = function(e) { 
      var contents = e.target.result;
      console.log(contents)
      alert( "Got the file.n" 
            +"name: " + selectedFile.name + "\n"
            +"type: " + selectedFile.type + "\n"
            +"size: " + selectedFile.size + " bytes \n"
            + "starts with: " + contents.substr(1, 100000)
        );  
      }
      r.readAsText(selectedFile);

    }

    render() {
        return (<Fragment>
<div class="col-md-9">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">    
        <div class="carousel-inner" role="listbox">
        <div class="carousel-item">
            <img class="d-block img-fluid" src="https://opensource.google.com/assets/static/images/home/blog/blog_image_1.jpg" alt="Third slide"/>
            <div class="carousel-caption d-none d-md-block">
                <h5>...</h5>
                <p>...</p>
            </div>
        </div>
    </div>
        <div class="carousel-item">
        <img class="d-block img-fluid" src="https://lh3.googleusercontent.com/FyZA5SbKPJA7Y3XCeb9-uGwow8pugxj77Z1xvs8vFS6EI3FABZDCDtA9ScqzHKjhU8av_Ck95ET-P_rPJCbC2v_OswCN8A=s688" alt="Second slide"/>
            <div class="carousel-caption d-none d-md-block">
                <h5>...</h5>
                <p>...</p>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
    </div>
</div>
        </Fragment>
        )
    }

}


export default Carrousel;