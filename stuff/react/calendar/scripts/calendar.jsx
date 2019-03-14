const { Component } = React

class Calendar extends Component {
    render() {
        const { props: { year, month } } = this

        const m = moment(`${year}-${month}`)

        return <section>
            <h2>{m.format('MMMM')}</h2>
            {
                (() => {
                    const days = []

                    const weeks = Math.ceil((m.day() + m.daysInMonth()) / 7)

                    let paint = false
                    let count = 1

                    for (let w = 0; w < weeks; w++) {
                        for (let d = 0; d < 7; d++) {
                            if (d === m.day()) paint = true

                            const mNow = moment(`${year}-${month}-${count}`)

                            if (paint && count <= m.daysInMonth()) {
                                days.push(<div className="current-month-day" key={count}>{`${mNow.format('dddd')} ${count++}`}</div>)
                            } else
                                days.push(<div className="day" key={`${w}-${d}`}></div>)
                        }
                    }

                    return days
                })()
            }
        </section>
    }
}