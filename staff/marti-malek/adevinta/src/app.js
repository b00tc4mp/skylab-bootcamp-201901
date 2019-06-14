import React, {useState, useRef} from 'react'
import ReactDOM from 'react-dom'
import AtomSpinner, {AtomSpinnerTypes} from '@s-ui/react-atom-spinner'
import AtomCard from '@s-ui/react-atom-card'
import AtomImage from '@s-ui/react-atom-image'
import Button from '@schibstedspain/sui-atom-button'
import AtomProgressBar from '@s-ui/react-atom-progress-bar'
import MoleculeModal from '@s-ui/react-molecule-modal'
import MoleculeInputField from '@s-ui/react-molecule-input-field'
// import Modal from './modal'
import './styles.scss'

function App(openModal, closeModal) {
  let [progress, setProgress] = useState(null)
  let [showModal, setShowModal] = useState(null)
  let [userStatus, setUserStatus] = useState('Mmm....')
  let progressBar = useRef()

  const srcImageCar =
    'data:image/jpeg;base64,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'

  const urlTarget = ''
  const Spinner = () => <AtomSpinner type={AtomSpinnerTypes.FULL} />
  const productImage = () => (
    <AtomImage src={srcImageCar} alt="Amazing Picture" spinner={Spinner} />
  )

  const checkProgress = e => {
    setProgress(e.target.value)
    let value = progressBar.current ? progressBar.current.value : null
    if (value < 40) {
      setUserStatus('Meh')
    } else if (value >= 40 && value <= 70) {
      setUserStatus('Not Bad')
    } else if (value >= 70 && value <= 95) {
      setUserStatus('Great!')
    } else {
      setUserStatus('AWESOME!')
    }
  }

  const productContent = () => (
    <div className="card__content">
      <h2>Rate the meme:</h2>
    </div>
  )

  const ContentWithCloseButton = children => (
    <div className="modal">
      {children.children}
      <div className="modal__buttons">
        <Button>Contact Us!</Button>
        <Button type="secondary" onClick={closeModal}>
          Close
        </Button>
      </div>
    </div>
  )

  openModal = e => {
    e.preventDefault()
    setShowModal(true)
  }

  closeModal = () => {
    setShowModal(false)
  }

  return (
    <section className="container">
      <p className="top">CAN'T GET FIRED</p>
      <div className="card">
        <AtomCard
          media={productImage}
          content={productContent}
          href={urlTarget}
          vertical
        />
      </div>
      <p className="bottom">IF YOU DON'T HAVE A JOB</p>
      <div className="progress">
        <input
          ref={progressBar}
          type="range"
          min="0"
          max="100"
          step="1"
          value={progress || 0}
          onInput={e => checkProgress(e)}
        />
        <AtomProgressBar
          percentage={progress || 0}
          indicatorTotal
          size="large"
          type="circle"
        />
      </div>
      <div className="buttons">
        <form onSubmit={openModal} className="buttons__contact">
          <Button type="accent">Contact</Button>
        </form>
        <Button>{userStatus}</Button>
      </div>
      <div>
        <MoleculeModal
          isOpen={showModal}
          closeOnOutsideClick
          closeOnEscKeyDown
          header={<strong>Contact</strong>}
          // iconClose={<IconClose />}
          onClose={closeModal}
        >
          <ContentWithCloseButton>
            <div className="inputField">
              <MoleculeInputField
                id="first"
                placeholder="Your name"
                label="Name"
                // value="In some place of La Mancha which name..."
              />
            </div>
            <div className="inputField">
              <MoleculeInputField
                id="second"
                placeholder="Your e-mail"
                label="E-mail"
                // value="In some place of La Mancha which name..."
              />
            </div>
            <div className="inputField">
              <MoleculeInputField
                id="third"
                placeholder="Your phone"
                label="Phone Number"
                // value="In some place of La Mancha which name..."
              />
            </div>
          </ContentWithCloseButton>
        </MoleculeModal>
      </div>
    </section>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
