import React, { useState, useEffect, Fragment } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import logic from '../../logic'
import initialData from './initial-data'
import './index.sass'

export default function ProgramCreator() {
    const [state, setState] = useState(initialData)
    const [name, setName] = useState('')
    const [feedback, setFeedback] = useState(null)

    function onDragEnd(result) {
        const { destination, source, draggableId } = result

        if (!destination) return

        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        const start = state.columns[source.droppableId]
        const finish = state.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)

            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn
                }
            }

            setState(newState)

            return
        }

        const startTaskIds = Array.from(start.taskIds)
        // startTaskIds.splice(source.index, 1)

        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds)
        const newId = Object.keys(initialData.tasks).length + 1
        const newTaskId = `task-${newId}`

        initialData.tasks[newTaskId] = Object.assign({}, initialData.tasks[draggableId])
        initialData.tasks[newTaskId].id = newTaskId

        finishTaskIds.splice(destination.index, 0, newTaskId)

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        setState(newState)
    }

    function saveProgram() {
        const ids = state.columns['column-2'].taskIds
        const orders = []

        if (ids.length === 0) {
            setFeedback('Program is empty')
            return
        }

        ids.forEach(id => {
            orders.push(state.tasks[id])
        })

        if (!name.trim().length) {
            setFeedback('name is empty')
            return
        }

        try {
            logic.createProgram(name, orders)
                .then(res => {
                    if (res) window.location.reload()
                })
                .catch(err => setFeedback(err.message))
        } catch ({ message }) {
            setFeedback(message)
        }

    }

    function deleteCommand(commandId) {
        const idDelete = state.columns['column-2'].taskIds.indexOf(commandId)
        if (idDelete > -1) state.columns['column-2'].taskIds.splice(idDelete, 1)

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                ['column-2']: state.columns['column-2'],
            }
        }

        setState(newState)
    }

    return (<DragDropContext on onDragEnd={onDragEnd} >
        <section className="section">
            <div className="columns">
                <div className="control column">
                    <input type="text" className="input" placeholder="Program name" onChange={e => setName(e.target.value)} />
                </div>
            </div>
            <div className="columns">
                {state.columnOrder.map(columnId => {
                    const column = state.columns[columnId]
                    const tasks = column.taskIds.map(taskId => state.tasks[taskId])

                    return (<Fragment key={column.id}>
                        <div className="column t-container">
                            <h3 className="t-title">{column.title}</h3>
                            <Droppable droppableId={column.id} isDropDisabled={column.id === 'column-1'} >
                                {(provided) => (
                                    <div className="t-tasks" ref={provided.innerRef} {...provided.droppableProps}>
                                        {tasks.map((task, index) =>
                                            <Draggable draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <div className="t-task" key={task.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        {task.content} {column.id == 'column-2' ? <button className="delete" onClick={() => deleteCommand(task.id)} ></button> : ''}
                                                    </div>
                                                )}
                                            </Draggable>)}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </Fragment>)
                })}
            </div>
            {feedback && <p>{feedback}</p>}
            <button className="button" onClick={() => saveProgram()} >Save</button>
        </section>
    </DragDropContext>)
}
