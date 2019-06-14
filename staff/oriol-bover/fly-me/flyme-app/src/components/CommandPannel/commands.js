const commands = {
    '13': { id: 'cmd-2', content: 'BATTERY', command: 'battery?', timeOut: 5000 },
    '73': { id: 'cmd-3', content: 'UP', command: 'up 20', timeOut: 5000 },
    '75': { id: 'cmd-4', content: 'DOWN', command: 'down 20', timeOut: 5000 },
    '65': { id: 'cmd-5', content: 'LEFT', command: 'left 20', timeOut: 5000 },
    '68': { id: 'cmd-6', content: 'RIGHT', command: 'right 20', timeOut: 5000 },
    '87': { id: 'cmd-7', content: 'FORWARD', command: 'forward 20', timeOut: 5000 },
    '83': { id: 'cmd-8', content: 'BACK', command: 'back 20', timeOut: 5000 },
    '76': { id: 'cmd-9', content: 'ROTATE RIGHT', command: 'cw 20', timeOut: 5000 },
    '74': { id: 'cmd-10', content: 'ROTATE LEFT', command: 'ccw 20', timeOut: 5000 },
    '49': { id: 'cmd-11', content: 'FLIP LEFT', command: 'flip l', timeOut: 5000 },
    '50': { id: 'cmd-12', content: 'FLIP RIGHT', command: 'flip r', timeOut: 5000 },
    '51': { id: 'cmd-13', content: 'FLIP FORWARD', command: 'flip f', timeOut: 5000 },
    '52': { id: 'cmd-14', content: 'FLIP BACK', command: 'flip b', timeOut: 5000 },

}

export default commands