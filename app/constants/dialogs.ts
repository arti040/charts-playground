
export const mainDialog = {
    samanta: {
        welcome: {
            text: ['How can I help you?'],
            action: () => {},
            answers: ['getTits', 'getAge'] 
        },
        showAge: {
            text: ['I\'m 17, and you?'],
            action: () => {},
            answers: ['showAge']
        }
    },
    user: {
        getTits: {
            text: ['Show me your tits!'],
            action: () => { console.log('Getting tits...'); },
            answers: ['No way!']
        },
        getAge: {
            text: ['How old are you?'],
            action: () => { console.log('Getting age...'); },
            answers: ['showAge']
        },
        showAge: {
            text: ['I could be your father!','Bye!'],
            action: () => {},
            answers: []
        }
    }
}