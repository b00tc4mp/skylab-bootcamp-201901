import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import './index.sass'
import logic from '../../logic'
import Modal from '../Modal'

export default function ProgramDetail({ programId, user, history }) {
    const [program, setProgram] = useState(null)
    const [drones, setDrones] = useState(null)
    const [droneSelected, setDroneSelected] = useState(null)
    const [feedback, setFeedback] = useState(null)
    const [modal, setModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    useEffect(() => {
        (async function () {
            try {
                return logic.retrieveProgram(programId)
                    .then(program => {
                        setProgram(program)
                        return logic.retrieveDrones(user.id)
                    })
                    .then(drones => {
                        setDrones(drones)
                    })
                    .catch(err => setFeedback(err.message))
            } catch ({ message }) {
                setFeedback(message)
            }
        })();
    }, programId);


    function playProgram() {

        toast.success('Program wanna start', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })

        try {
            return logic.playProgram(droneSelected, program.orders)
                .then(res => {
                    if (res.error) {
                        setFeedback(res.error)
                        setDeleteModal(false)
                        setModal(true)
                        return
                    }

                    setModal(true)
                    setDeleteModal(false)
                    setFeedback('All comands done!')

                })
                .catch(err => {
                    setFeedback(err.message)
                    setDeleteModal(false)
                    setModal(true)
                })
        } catch ({ message }) {
            if (message === 'null is not a string') setFeedback('You must select a drone')
            else setFeedback(message)
            setDeleteModal(false)
            setModal(true)
        }
    }

    function deleteProgram() {
        if (program) {
            try {
                logic.deleteProgram(program._id)
                    .then(res => {
                        if (res.status == 'OK') history.push(`/admin/user/${user.id}/programs`)
                    })
                    .catch(err => {
                        setFeedback(err.message)
                        setDeleteModal(false)
                        setModal(true)
                    })
            } catch ({ message }) {
                setFeedback(message)
                setDeleteModal(false)
                setModal(true)
            }
        }
    }

    function closeModal() {
        setDeleteModal(false)
        setModal(false)
    }

    return (<section className="section">

        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
        />
        <ToastContainer />

        {modal && <Modal message={feedback} onClose={closeModal} showButtons={false} />}
        {deleteModal && <Modal message="Do you want to delete this program?" onClose={closeModal} showButtons={true} onCancel={closeModal} onAccept={deleteProgram} />}
        <div className="columns is-centered">
            <div className="column is-8-tablet is-8-desktop is-8-widescreen">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <button className="button" onClick={() => playProgram()} >Play</button>
                        </div>
                        {user && program && program.userId._id == user.id && <div className="level-item">
                            <button className="button is-danger" onClick={() => setDeleteModal(true)} >Delete program</button>
                        </div>}
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <div className="control">
                                {drones && <div className="select">
                                    <select onChange={e => setDroneSelected(e.target.value)}>
                                        <option value="">Select Drone</option>
                                        {drones && drones.map(drone =>
                                            <option key={drone.id} value={drone._id} >{drone.brand} {drone.model}</option>
                                        )}
                                    </select>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="columns is-centered has-text-centered">
            <div className="column t-container is-8-tablet is-8-desktop is-8-widescreen">
                <h1 className="title">{program ? program.name : 'NO PROGRAM'}</h1>
                <div className="t-tasks">
                    {program && program.orders && program.orders.map(order =>
                        <div className="t-task" key={order.id}>
                            {order.content}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>)
}