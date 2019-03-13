import React, { Component } from 'react'

import InvitationItem from '../InvitationItem'
import Feedback from '../Feedback'
import logic from '../../logic'

class InvitationList extends Component {
  state = { invitations: [], feedback: null }

  componentDidMount() {
    logic.invitationList()
      .then(invitations => {
        this.setState({ invitations })
      })
      .catch(({ error }) => console.log(error))
  }

  handleDelete = (id) => {
    logic.deleteInvitation(id)
      .then(({ message }) =>
        logic.invitationList()
          .then(invitations => {
            this.setState({ invitations, feedback: message })
          })
          .catch(({ error }) => console.log(error))
      )
      .catch(({ error }) => console.log(error))
  }

  handleSendEmailInvitation = (id, email) => {
    // const { state:  } = this

    logic.sendEmailInvitation({ id, email })
      .then(message => {
        logic.invitationList()
          .then(invitations => {
            this.setState({ invitations, message})
          })
          .catch(({ error }) => console.log(error))
      })
  }

  render() {
    const { state: { invitations, feedback }, handleDelete, handleSendEmailInvitation, props: {handleNewInvitation } } = this

    return (
      <main className="itemlist invitation-list">
        <div className="itemlist__header course-header group">
          <h1 className="itemlist__header__title subtitle is-4">{invitations.length} invitations</h1>
          <button className="itemlist__header__new button is-link is-warning" onClick={handleNewInvitation}>New</button>
        </div>

        <div className="itemlist__feedback" >
          {feedback && <Feedback message={feedback} />}
        </div>

        <div className="itemlist__items" >
          {invitations.map((invitation, index) => <InvitationItem
            key={index}
            results={invitation}
            onDelete={handleDelete}
            onSendInvitationEmail={handleSendEmailInvitation}
          />)}
        </div>

      </main>
    )
  }
}

export default InvitationList