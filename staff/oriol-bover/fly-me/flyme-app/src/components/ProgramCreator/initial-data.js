const initialData = {
    tasks: {
        'cmd-1': { id: 'cmd-1', content: 'TAKE OFF', command: 'takeoff', timeOut: 5000 },
        'cmd-2': { id: 'cmd-2', content: 'LAND', command: 'land', timeOut: 5000 },
        'cmd-3': { id: 'cmd-3', content: 'UP', command: 'up 20', timeOut: 5000 },
        'cmd-4': { id: 'cmd-4', content: 'DOWN', command: 'down 20', timeOut: 5000 },
        'cmd-5': { id: 'cmd-5', content: 'LEFT', command: 'left 20', timeOut: 5000 },
        'cmd-6': { id: 'cmd-6', content: 'RIGHT', command: 'right 20', timeOut: 5000 },
        'cmd-7': { id: 'cmd-7', content: 'FORWARD', command: 'forward 20', timeOut: 5000 },
        'cmd-8': { id: 'cmd-8', content: 'BACK', command: 'back 20', timeOut: 5000 },
        'cmd-9': { id: 'cmd-9', content: 'ROTATE RIGHT', command: 'cw 20', timeOut: 5000 },
        'cmd-10': { id: 'cmd-10', content: 'ROTATE LEFT', command: 'ccw 20', timeOut: 5000 },
        'cmd-11': { id: 'cmd-11', content: 'FLIP LEFT', command: 'flip l', timeOut: 5000 },
        'cmd-12': { id: 'cmd-12', content: 'FLIP RIGHT', command: 'flip r', timeOut: 5000 },
        'cmd-13': { id: 'cmd-13', content: 'FLIP FORWARD', command: 'flip f', timeOut: 5000 },
        'cmd-14': { id: 'cmd-14', content: 'FLIP BACK', command: 'flip b', timeOut: 5000 },
        'cmd-15': { id: 'cmd-15', content: 'BATTERY', command: 'battery?', timeOut: 5000 },


        // 'task-1': { id: 'task-1', content: 'Take out the garbage' },
        // 'task-2': { id: 'task-2', content: 'watch Tv' },
        // 'task-3': { id: 'task-3', content: 'Charge Phone' },
        // 'task-4': { id: 'task-4', content: 'sleep' }
    },

    columns: {
        'column-1': {
            id: 'column-1',
            title: 'COMMANDS',
            taskIds: [
                'cmd-1',
                'cmd-2',
                'cmd-3',
                'cmd-4',
                'cmd-5',
                'cmd-6',
                'cmd-7',
                'cmd-8',
                'cmd-9',
                'cmd-10',
                'cmd-11',
                'cmd-12',
                'cmd-13',
                'cmd-14',
                'cmd-15'
            ]
            // taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'PROGRAM',
            taskIds: []
        }
    },
    columnOrder: ['column-1', 'column-2']
}

export default initialData