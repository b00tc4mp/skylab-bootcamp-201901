import React from 'react'
import literals from './literals'

function ChoosePlan({ lang, onSelectedPlan }) {

    const { planTitle, plan1, plan2, plan3, option1, option2, option3, option4, option5, option6, button } = literals[lang]

    function handlesubmit(event) {
        event.preventDefault()

        const radios = document.getElementsByName("transporte")
        let plan
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                plan = radios[i].value
                break
            }
        }
        onSelectedPlan(plan)
    }

    return <div className="plan">
        <h2 className="text-white">{planTitle}</h2>

        <form onSubmit={handlesubmit}>

            <div className="container">
                <div class="form-check">
                    <input class="form-check-input " type="radio" name="transporte" id="exampleRadios1" value="7.99" checked />
                    <label class="form-check-label text-white" for="exampleRadios1" >
                        {plan1}
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="transporte" id="exampleRadios2" value="10.99" />
                    <label class="form-check-label text-white" for="exampleRadios2" >
                        {plan2}
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input text-white" type="radio" name="transporte" id="exampleRadios2" value="13.99" />
                    <label class="form-check-label text-white" for="exampleRadios3" >
                        {plan3}
                    </label>
                </div>

                <div className="text-white">{option1}</div>

                <div>
                    <div className="col-sm-6 text-white">EUR7.99</div>
                    <div className="col-sm-6 text-white">EUR10.99</div>
                    <div className="col-sm-6 text-white">EUR13.99</div>
                </div>

                <div className="text-white">{option2}</div>

                <div>
                    <div className="col-sm-3 text-white"><i className="text-white fas fa-times"></i></div>
                    <div className="col-sm-3 text-white"><i className="text-white fas fa-check"></i></div>
                    <div className="col-sm-3 text-white"><i className="text-white fas fa-check"></i></div>
                </div>

                <div className="text-white">{option3}</div>

                <div className="text-white">
                    <div><i className="text-white fas fa-times"></i></div>
                    <div><i className="text-white fas fa-times"></i></div>
                    <div><i className="text-white fas fa-check"></i></div>
                </div>

                <div className="text-white">{option4}</div>

                <div>
                    <div className="text-white">1</div>
                    <div className="text-white">2</div>
                    <div className="text-white">4</div>
                </div>

                <div className="text-white">{option5}</div>

                <div>
                    <div><i className="text-white fas fa-check"></i></div>
                    <div><i className="text-white fas fa-check"></i></div>
                    <div><i className="text-white fas fa-check"></i></div>
                </div>

                <div className="text-white">{option6}</div>

                <div>
                    <div><i className="text-white fas fa-check"></i></div>
                    <div><i className="text-white fas fa-check"></i></div>
                    <div><i className="text-white fas fa-check"></i></div>
                </div>
            </div>

            <button className="btn btn-light">{button}</button>
        </form>
    </div >
}

export default ChoosePlan