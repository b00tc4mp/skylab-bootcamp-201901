import React from 'react'
import literals from './literals';

function ChoosePlan({ lang, onSelectedPlan }) {

    const { planTitle, plan1, plan2, plan3, option1, option2, option3, option4, option5, option6, button } = literals[lang]

    function handlesubmit(event) {
        event.preventDefault()

        const radios = document.getElementsByName("transporte");
        let plan
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                plan = radios[i].value;
                break;
            }
        }
        onSelectedPlan(plan)
    }

    return <div className="plan">
        <h2>{planTitle}</h2>

        <form onSubmit={handlesubmit}>
            <div>
                <div>
                    <input type="radio" name="transporte" value="7.99" />{plan1}
                    <input type="radio" name="transporte" value="10.99" />{plan2}
                    <input type="radio" name="transporte" value="13.99" />{plan3}
                </div>

                <div>{option1}</div>

                <div>
                    <div>EUR7.99</div>
                    <div>EUR10.99</div>
                    <div>EUR13.99</div>
                </div>

                <div>{option2}</div>

                <div>
                    <div><i className="fas fa-times"></i></div>
                    <div><i className="fas fa-check"></i></div>
                    <div><i className="fas fa-check"></i></div>
                </div>

                <div>{option3}</div>

                <div>
                    <div><i className="fas fa-times"></i></div>
                    <div><i className="fas fa-times"></i></div>
                    <div><i className="fas fa-check"></i></div>
                </div>

                <div>{option4}</div>

                <div>
                    <div>1</div>
                    <div>2</div>
                    <div>4</div>
                </div>

                <div>{option5}</div>

                <div>
                    <div><i className="fas fa-check"></i></div>
                    <div><i className="fas fa-check"></i></div>
                    <div><i className="fas fa-check"></i></div>
                </div>

                <div>{option6}</div>

                <div>
                    <div><i className="fas fa-check"></i></div>
                    <div><i className="fas fa-check"></i></div>
                    <div><i className="fas fa-check"></i></div>
                </div>
            </div>

            <button>{button}</button>
        </form>
    </div>
}

export default ChoosePlan