import React, { useState, Fragment } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import initialData from './initial-data'
import './index.sass'

export default function Lab() {
    const [state, setState] = useState(initialData)

    function onDragEnd(result) {
        console.log(result)
    }

    return (<DragDropContext on onDragEnd={onDragEnd} >
        <section className="section">
            <div className="columns">
                {state.columnOrder.map(columnId => {
                    const column = state.columns[columnId]
                    const tasks = column.taskIds.map(taskId => state.tasks[taskId])

                    return (<Fragment key={column.id}>
                        <div className="column t-container">
                            <h3 className="t-title">{column.title}</h3>
                            <Droppable droppableId={column.id} >
                                {(provided) => (
                                    <div className="t-tasks" ref={provided.innerRef} {...provided.droppableProps}>
                                        {tasks.map((task, index) =>
                                            <Draggable draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <div className="t-task" key={task.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{task.content}</div>
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
        </section>
    </DragDropContext>)
}
