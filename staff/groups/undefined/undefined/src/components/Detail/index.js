import React, { Component } from 'react';
import logic from '../../logic'

import './index.sass'

class Detail extends Component {

    state = {videoSelected: null, id: null, classHeart: null}

    componentDidMount () {
        const {props: {match: {params :{id}}}, handleVideoClick} = this
        id && handleVideoClick(id) 
    }

    handleVideoClick = id => {
        logic.retrieveVideo(id)
            .then(details => {
                this.setState({ videoSelected: details}) })
                if (logic.userLoggedIn) this.isFavorite()
            .catch( ({message}) => {
                this.setState({ videoSelected: null, searchFeedback: message })
            }) 
    }

    componentWillReceiveProps(nextProps) {
        const {match: {params :{id}} } = nextProps

            this.handleVideoClick(id)
    }

    onClose = () => {
        this.setState({ videoSelected: null })
        this.props.history.push(`/home/videos/${this.props.match.params.query}`)
    }

    handleFavorites = () => {
        const {props: {match: {params :{id}}}} = this
        logic.toggleFavorties(id)
        this.state.classHeart? this.setState({classHeart:false}) : this.setState({classHeart:true})
    }

    isFavorite = () => {
        let result
        return logic.retrieveUser().then(user => {
            if (user.favorites.includes(this.state.videoSelected.imdbID)) {
                result = true
            } else {
                result = false
            }
            this.setState({classHeart: result})
        })
    }

    printDetails = () => {
        if (this.state.videoSelected) {
            const {handleFavorites, state: {classHeart, videoSelected: {Title, Runtime, Plot, Genre, Actors, Poster, Released}}} = this

            if (this.state.videoSelected.Poster === "N/A")  this.setState({videoSelected: ({Title, Runtime, Plot, Genre, Actors, Poster : "http://www.lbsnaa.gov.in/upload/academy_souvenir/images/59031ff5e92caNo-image-available.jpg", Released})})
            return (
                <section className="detail modal is-active">

                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <article className="media columns">
                                <div className="poster media-left column">
                                    <figure className="image">
                                        <img className="image" src={Poster} alt={Title} />
                                    </figure>
                                </div>
                                <div className="media-content column">
                                    <div className="content">
                                        <h4 className="title is-3">{Title}</h4>
                                        { logic.userLoggedIn?
                                            <div>
                                                <hr />
                                                    <button onClick={handleFavorites} className="button">
                                                    {classHeart=== true? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                                                    {/*classHeart? <img src="data:image/png;base64,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" /> 
                                                    : <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AAAD6+vr5+fnv7+/o6Oj09PTa2tru7u7k5OTn5+fe3t7r6+vNzc3h4eHy8vJWVlawsLCAgICNjY1MTEw7OztRUVEYGBjCwsKampq6urqzs7PS0tKhoaF4eHiUlJRiYmInJycQEBA0NDQgICBra2teXl6FhYU3NzclJSVHR0cLCwuoqKh6enpAQEBwcHCLOxvpAAAMd0lEQVR4nO1d54KyOhBVUKyoWNYGCta17vu/3XXdz+QMolISCF7Pz111CCQzZyqFwgcffPDBBx98EA+aUao2m/V6vdxsNkuGLkmMbpQuv1++yGk2qyVDkyTGh3bLNkfOdt05D4bD4e570He744lpN0pCxZQatjkZd93+4Ht3kTM4d9ZbZ2TarbZQMX7o9uS47XjFAKz2p+PENoSIaV/EnParIDFeZ2tNbEl7RjOdbn8YJPaGw/40niRdZHsynp0Pz8QM+13HFL9jG/P14JnYG5Zuz04gxu65yzBiBut5Q9jafjFxl09vK11kx4opxuqEWt4Vh6U7Era+qRda7j+sejHE9J4egSB4UxHLa093UQVfMS5FOSpadR5LijdNqlurk30syRcsj+XQYurH8NvTh/0kkZka/cQV/ItNSMVqTDdJxMzin8fWeBH8m4vzZjZ3LMuaWtZxfnKDbddFG5zMEGLM0wMxq/3mND9aVzjz2eb84HPDcS3eAkedoJ/zXMe0K7Uqs7p6tXbhH9YscJ+dj6+kaM456IvLmXXhSVRMxTYd1wv69CbOYzTmARpm2bPLDzRIu1xxAs7sYvb8/tZmAQ9m71TKwRpEK5Xt+ff9N3bzyEyjHvAAu/VX6rE5vr/F52c71bynEd64+UKKVt/eX1wnvF77k+z/gVVnEvKb7t0ij494pH68W54b5uReMOncnf2Q3/yTPPF9efkTYaM3tv6T1QtW6KWe/3FvI1Ax8+7kT0JbYMOh31x0Ix7ku6Nyqgd8qj6jH/qeR2S0o66PBTkhD2OzRzmoO41O5M0Tlb1u3X2k4vruQpRd9gdtSn/j0Ht1hK+odskCPSfo/r9Ee9Knt6ni+0CFqrKY1KTukK262FZDXBpdYMeO64m1umQJHbpE3wK79884HDSb8KFD9zVPpQx4m8DT1KbkmLiozstkew2tJGKo6Zi/+jxRb4eEHliL7NQfvoOaa7JDEzqzJtl1L5Y4JZL9ZycyNPKouje7aJAN7CYOuzQImXrqNI6I5Jh8lmCL93f8749jFLMVIKVG9sQTpVxBDjWLSIOCoc3xMP7teryPw7mQmFITbevg4d4r452YhTItr6GPYYnLX5tug4IfjgVFBskS14+ufQw7ai0swKujl7k2Cgbcx8NcWOizhD87Dv7MCLjsWUxs9w+oV8bkEHYFStFA3awCjUDrCz4hNuAKsZDlD+zRH6FSCvCEvgIYhAb3dhWXYTwC3DxAX7CUOixxfP+MwCNchHQFI8gOCnEsRVgjghEotTs/RQOeKEaBU9kBIXNxIesbNKCcG/8igMw81LWCZMu7j4QN+jeix/4ziO6nhQCxtb9whRAKPyDu49H/QMDkJTmPhxGNqwTr8+SAvUICmRpf+iaEDxkLNCjTk5SybnN3cYB/52xmJSSdE4QKmox+YrflESZsrywc/leDL9yVJblQcDh7Q+GiwQ/8hhOzKT8jSRK4L9Dk/nBfgrq+wWZSdmw/apw4buRJvjxEJkbiIywUuNfdvR12m3NWacfjF/qN2XiyCnCuaLDV7G87kpuKvUzJ3PWVZClu4CrtX0EBOI9SjD3gahSHkhcIFPufG28yPbMUW9cUhKYpUcn8Q4nlTVZ/j4xT0gCXI4/QuEq7atM236QSTUWqqPBt+hsCrzHfrSPcYcsIdcZgrj4oX/CbbFKyTX/NH7cVwl37zMAjskcMvJ/f5Rgih1lrBZ2VXMzk24q00GYJ2p1eMPgxzPq6BIIHDg2uaA4vi3tyBIt5apWCxRSrbDKVJkbMBFo8uNB/H0VzMYHMF+1xl3gjJfiVEarMQqwLbLGCkwgZg1HRfoFF2U5ZX5RQsLDFgCdsRGa6sgcr0FgVWDIjTvG5umAKdFg4vPkKD4Xie66Qx7jfdoWLd18hz5K8/Tlc/A+shfeeK2QWf1lg3vAs64sSCsba9gUWlnLfx8UvQOGVyx/nl9iWxWzRYKUlXZ7y+n4nD9hkgX2HpzGGcTs/VYTF6Lb5ppEoHhI2CjqjN12R9YjZQmfmcKhDudeX1ARwquCKpqNDjY30zGV64OVJv/VPPGP6PgFTFiK9ZrVrTO38yE/PpoMqYzTD3+xakwXehu9yECssF+NeHxp/pO9iEae+FZnMXvTljkZJC22mSRd/lQo1XkT0HoF9ntW+tf1wAvAecW9eenGrLht57E+xuikVQ5WtxrtZ+Dbvh3gHR5/3I/4wvcKDi4v8c1ODKU5oDirzWrf8n0TeY/0F+UIeXfTyrk5trlQwPtriPS1rqbWf0qFznbIkvU38dK7yTWxgIhJtTuUaNt8RqQY0N/naKqATY5tffWpAU4c/KGNAS0t+PWFoIFvdPSdoP16Ibj9MC7XFs8dkQKtwCtXQMtCGVvRZwFGrwMSVXJoMDZpxv4Ocee0Iz1hSA5tUQJvvg0EbVdinC2kNXtJgwQN6VEiK4yW8vBUMTzx+8Y9HiWAX5Lfs7hKxMKGX+ln3JnbrPp4uoSBQTT5XIjgncZAf+tbAkSUvHECcmRN1yFtmKONIpq8XH65hL+s6HwwVZ4mEeCwVfIq5IOE6DooKk0Ab4cS8nvrkhgwz2IeyAGhZZLYkCwI0UBeXIa24A0MsFqq7/Ehlwl8smVSlNrkhMywjbDg8uwuVHWKc1xKt9hDnSi3VDTDiUK2IZWs6LvGsKrlp4SS6WUS1T6atbNRsLm3iUMifyASsgV9fyxp4kgRtJNFujH1m4xboqmf5dRySFm9WCpnTLGueTGxoOO9mEFMZQua0WBQ1/k8QcPgaz4RGBpn1qRZ/I3OyEwSVyFBolfjb9CDq3uNeGKrD38hYrWRVo5jqKHqqBKdIVKaX0Ict4WDu5GN3hYCMJz4lzkCU0K4qMTmjLJqLNHHasZt9wQ2ZIy1mcl8DN4Wo4bux0SZURpBPQHyUjINTOlF9wvw6opyz7XHDsJNI33yyUGSJhIIItc8W/nJ29eATpDKCORbevFVW5Mb04CqET0QSw+UTATNoErLUJHYeLrQsGCTfIKPBp4TBqU76/K2FzONHSrVIOVNyU42WYIqHGkZukr+VIhKwlKT4LS28WcGj7sqSEgg8IiuJIWoTLX+a417ImGWpao7wNxFvFwkHEmqQbKpg5HBxkVbXqQVC5TfzHiHb4yV5i1F4jCBokULKlgQqB2mQGxNVuIxp/H4QDy2FWYsNrA5Jp1c53cxbFbnaJiX3u4qhoKVkobhF96mVMJVx4wxefz4BsNrpnGKkjwSnNvL4m0YORKps38SyoqCaaiHQ8V2Tac/tGAFFPSQNrD+A7oClT7+kF0MmK0fGRtXIO90zKMvGWp2dDPkkaJFJ9AuDUxLocAOfYHokH0Ey6cLfG1HFwOEsoyoCEpwqijVWbSznyq6Sl7x0UOhLxqrIKbJMeNUwOCUwuVglSctM87KE3KxF0cYSvr0061HxJDjVFRPFNPDFnqvMiwcqsEJBZeFY9iv9xTAhYOISRURuyCt7legwI4XIyeNE5I4pUoh1vH/lb3zgrj+kEZUJA6IZEqaeiebaKjMRqI3aPdEbIknYSaXJXMRCJ3gFAWEQatVel/Ded+J2u9O3a2dfnERg7PDux7P8JBKr3rijEprpWM4AiaYXFZx60EAteIqh5rHsV80ZjiTqEL0WhERFVKpHBkxwiU7EJY5gl8uJbAmAfgR1E3GSD0YnF3NlW1f1OVj+SGVFpH3lpOwCCzhoK1JZOKEyHUW36D8gKfHChh9IXfNZ6vUJAIY1luGMGuF8S0XciccwMB8W6s3GpEVL2V5HQAuXGKKUnnSbnxUIWryGHa2GEJMD3+q05TzFCNv6XrnpFnjPu3SqVwRgApb/8DzUguMNDjmae096556RG1LXnKvhqSFnFiToNs8caAEext9owUOq1ycAyN8eFIQSKuMqE1cLizaJuQTxtzZp+c+Bpfej9mJmAaEyX+pOpngCnCUaEPskBYC5oDL3qGBZkZ/cIJXZ5YTK3ONJWx8JOykalQkD2nMNni3pNs8RlbmHhSvhVT9kWkPOX9rnBPXT2dhtnk0xkDjQQPYfuWmhBkrebZ41yMyC5a9VoN3myqUnogMHFBf3tm8GYA6pzD3Ikr5sJKzxBueoB7ItEYnSxUqBeEkcz2bF5g2E3DAoUSsjCsTE/8P7vATtCtJJf4XwbvOsYfkWKKm+P0uQgQ/Fbu6CFiGA0fsfFYf4JQaELdQqBhIHFpxSZN6UBJT++JvCA1ETo3n82g16b/sEr6iWm2qn6T/44IMPPvjgLfEfuU25sUqIr1AAAAAASUVORK5CYII=" />  */}
                                                    </button>
                                                <hr />
                                            </div> : ''}
                                        <p>{Plot}</p>
                                    </div>
                                    <hr />
                                    <div className="info">

                                        <div className="info-item">
                                            <span className="genres"><i className="fas fa-genderless"></i> <strong>Genres:</strong> <span>{Genre}</span></span>
                                        </div>

                                        <div className="info-item">
                                            <span className="released"><i className="fas fa-genderless"></i> <strong>Released:</strong> <span>{Released}</span></span>
                                        </div>

                                        <div className="info-item">
                                            <span className="runtime"><i className="fas fa-genderless"></i> <strong>Runtime:</strong> <span>{Runtime}</span></span>
                                        </div>

                                        <div className="info-item">
                                            <span className="runtime"><i className="fas fa-genderless"></i> <strong>Actors:</strong> <span>{Actors}</span></span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <button onClick={this.onClose} className="modal-close is-large" aria-label="close"></button>
                </section>

            )
        }

        return <p>Loading....</p>
    }

    render() {
        
        const { printDetails }  = this
        return (
            <div>
                {printDetails()}
            </div>
        )
    }
}


export default Detail