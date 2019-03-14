'use strict'

class Results extends React.Component {
    render () {
      return (
      <section className="results">
        <ul>
        {results.map(({ id, title }) => <li key={id} onClick={() => onItemClick(id)}>{title}</li>)}
        </ul>
      </section>
      )
    }
}