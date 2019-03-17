import React from 'react'

function InvitationItem({ results: {email, status, id}, myKey, onDelete, onSendInvitationEmail}) {
    return (
        <div className="itemlist-item" key={myKey}>
                <div className="itemlist-item__header message-header">
                        <div class="tags has-addons">
                            <span class="tag">{email}</span>
                        </div>

                        <div className="itemlist-item__header__buttons">
                            <button className="itemlist-item__header-delete delete" onClick={() => onDelete(id)}>Delete</button>
                        </div>
                </div>
            
                <div className="itemlist-item__footer message-body">
                    <button className="itemlist-item__footer-edit button is-small" onClick={() => onSendInvitationEmail(id, email)}>Send email invitation</button>

                    <div className="itemlist-item__footer-theme tags has-addons">
                        <span className="tag">Status</span>
                        <span className="tag is-warning">{status}</span>
                    </div>
                </div>
        </div>
    )
}

export default InvitationItem