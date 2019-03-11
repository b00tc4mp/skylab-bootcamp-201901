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
      <main className="invitation-list">
        <div className="course-header group">
          <h2>Invitations</h2>
          <p>{invitations.length} invitations</p>
          <button onClick={handleNewInvitation}>New</button>
        </div>

        {feedback && <Feedback message={feedback} />}

        {invitations.map((invitation, index) => <InvitationItem
          key={index}
          results={invitation}
          onDelete={handleDelete}
          onSendInvitationEmail={handleSendEmailInvitation}
        />)}

      </main>
    )
  }
}

export default InvitationList