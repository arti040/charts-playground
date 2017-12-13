
export interface dialog  {
    samanta: Array<sentence>,
    user: Array<sentence>
}

export interface sentence {
    name: string,
    text: Array<string>,
    action?: () => void,
    answers: Array<string>
}

export const mainDialog: dialog = {
    samanta: [
        {
            name: 'welcome',
            text: ['Hello!^100\n', 'How can I help you?'],
            action: () => {},
            answers: ['getTits', 'getAge'] 
        },
        {
            name: 'showAge',
            text: ['I\'m 17, and you?'],
            action: () => {},
            answers: ['showAge']
        }
    ],
    user: [
        {
            name: 'getTits',
            text: ['Show me your tits!'],
            action: () => { console.log('Getting tits...'); },
            answers: ['No way!']
        },
        {
            name: 'getAge',
            text: ['How old are you?'],
            action: () => { console.log('Getting age...'); },
            answers: ['showAge']
        },
        {
            name: 'showAge',
            text: ['I could be your father!','Bye!'],
            action: () => {},
            answers: []
        }
    ]
}