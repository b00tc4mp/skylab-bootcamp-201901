import React from 'react'
import './index.sass'

function detailForm({ onSubmitDetail, licensePlate, serialNumber }) {

    function handleSubmitDetail(e) {
        e.preventDefault()
            const {
                dateFrom: { value: dateFrom },
                timeFrom: { value: timeFrom },
                dateTo: { value: dateTo },
                timeTo: { value: timeTo }
            } = e.target
            onSubmitDetail(dateFrom,timeFrom,dateTo,timeTo)
      }


return<section>
<h2 className='title-detail title'>{licensePlate}</h2>
<p className='serial-detail'>{serialNumber}</p>
<hr className="detail-sep" />
<h2 className='title-detail title'>From</h2>
<form className="form-detail" onSubmit={handleSubmitDetail}>
  <input className="input-detail input field is-rounded is-warning" type="date" name="dateFrom" autoFocus required />
  <input className="input-detail input field is-rounded is-warning" type="time" name="timeFrom" required />
  <hr className="detail-sep" />
  <h2 className='title-detail title'>To</h2>
  <input className="input-detail input field is-rounded is-warning" type="date" name="dateTo" autoFocus required />
  <input className="input-detail input field is-rounded is-warning" type="time" name="timeTo" required />
  <input className="button-detail button is-rounded is-warning" type="submit" value='SEARCH' />
</form>
</section>

}

export default detailForm