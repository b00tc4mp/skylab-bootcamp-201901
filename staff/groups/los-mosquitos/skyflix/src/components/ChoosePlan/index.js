import React, { Fragment } from 'react'
import literals from './literals'
import './index.sass'

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

    return (
        <Fragment>
            <div className="bg-container" />
            <div className="plan">
                <h2>{planTitle}</h2>

                <form onSubmit={handlesubmit}>


                    <div className="container">
                       
                            <div class="button form-check form-check-inline">
                                <input class=" form-check-input " type="radio" name="transporte" id="inlineRadio1" value="7.99" />
                                <label class="form-check-label text-white" for="inlineRadio1" >
                                    {plan1}
                                </label>
                            </div>
                        

                        <div class=" button form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="transporte" id="inlineRadio2" value="10.99" />
                            <label class="form-check-label text-white" for="inlineRadio2" >
                                {plan2}
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input text-white" type="radio" name="transporte" id="inlineRadio3"value="13.99" />
                            <label class="form-check-label text-white" for="inlineRadio3" >
                                {plan3}
                            </label>
                        </div>

                        <div className="text-white">{option1}</div>
                        <div class="info container">
                            <div class="row">
                                <div className="text-white col-sm">EUR7.99</div>
                                <div className="text-white col-sm">EUR10.99</div>
                                <div className="text-white col-sm">EUR13.99</div>
                            </div>
                        </div>


                        <div className="text-white">{option2}</div>
                        <div class="info container">
                            <div class="row">
                                <div className="text-white col-sm"><i className="text-white fas fa-times"></i></div>
                                <div className="text-white col-sm"><i className="text-white fas fa-check"></i></div>
                                <div className="text-white col-sm"><i className="text-white fas fa-check"></i></div>
                            </div>
                        </div>

                        <div className="text-white">{option3}</div>

                        <div class="info container">
                            <div class="row">
                                <div className="text-white col-sm"><i className="text-white fas fa-times"></i></div>
                                <div className="text-white col-sm"><i className="text-white fas fa-times"></i></div>
                                <div className="text-white col-sm"><i className="text-white fas fa-check"></i></div>
                            </div>
                        </div>

                        <div className="text-white">{option4}</div>

                        <div class="info container">
                            <div class="row">
                                <div className="text-white col-sm">1</div>
                                <div className="text-white col-sm">2</div>
                                <div className="text-white col-sm">4</div>
                            </div>
                        </div>


                        <div className="text-white">{option5}</div>

                        <div class="info container">
                            <div class="row">
                                <div className="text-white col-sm"><i className="text-white fas fa-check"></i></div>
                                <div className="text-white col-sm"><i className="text-white fas fa-check"></i></div>
                                <div className="text-white col-sm"><i className="text-white fas fa-check"></i></div>
                            </div>
                        </div>

                        <div className="text-white">{option6}</div>

                        <div class="info container">
                            <div class="row">
                                <div className="text-white col-sm"><i className="text-white fas fa-check"></i></div>
                                <div className="text-white col-sm"><i className="text-white fas fa-check"></i></div>
                                <div className="text-white col-sm"><i className="text-white fas fa-check"></i></div>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-light">{button}</button>
                </form>
            </div>
        </Fragment>
    )
}

export default ChoosePlan