import React from 'react'

function InvitationItem({ results: {email, status, id}, myKey, onDelete, onSendInvitationEmail}) {
    return (
        <div className="invitation-item" key={myKey}>
            <h3>{email}</h3>
            <p>{status}</p>

            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={() => onSendInvitationEmail(id, email)}>Send Email</button>
            <hr />
        </div>
    )
}

export default InvitationItem