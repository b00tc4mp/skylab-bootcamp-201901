import React, {Fragment} from "react"

export default function CharacterInfoResult ( { character } ) {

  return (
      <section >
        <div className="margin right columns is-mobile is-multiline is-centered">
        {character === null && <span><i className=" favourite__loading fas fa-spinner fa-spin fa-3x white" /></span>}
        {character &&
          <Fragment>
            <div key={character.id} data-id={character.id} className="column tile is-ancestor">
              <div className="tile is-vertical is-8">
                <div className="tile is-parent">
                  <article className="tile is-child notification">
                    <figure className="image is-4by3">
                      <img alt="character" src={`${character.thumbnail.path}/detail.${character.thumbnail.extension}`}/>
                    </figure>
                    <p className="title">{character.name}</p>
                    <div className="content">{character.description}</div>
                    {character.urls[1].url && (
                      <a target="_blank " className="button is-small is-outlined is-info" href={character.urls[1].url}>More Info </a>
                    )}
                  </article>
                </div>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification">
                  <div className="content">
                    <h4 className="title">Comics</h4>
                    <ul className="content">
                      {character.comics &&
                        character.comics.items.map(({ name, resourceURI }) => {
                          const uri = resourceURI.split("/");
                          var id = uri.pop() || uri.pop();
                          return (
                            <li className="pointer grow-rotate" key={id} >{name} </li>
                          );
                        })}
                    </ul>
                    {character.urls[2].url && (
                          <a target="_blank " className="button is-small is-outlined" href={character.urls[2].url}>See Comics</a>
                      )}
                  </div>
                </article>
              </div>
            </div>
          </Fragment>
        }
        </div>
    </section>
  )
}
