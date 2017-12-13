
export interface dialog  {
    samanta: Array<sentence>,
    user: Array<sentence>
}

export interface sentence {
    name: string,
    text: Array<string>,
    action?: () => void,
    answers?: Array<string>
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
        },
        {
            name: 'noWay',
            text: ['No way!'],
            action: () => {},
            answers: ['whyNoTits']
        },
        {
            name: 'dontHaveAny',
            text: ['Because I\'m a computer program and don\'t have any'],
            action: () => {},
            answers: ['showChart']
        },
        {
            name: 'showChart',
            text: ['Here you are:'],
            action: () => { console.log('Showing chart...'); },
        }
    ],
    user: [
        {
            name: 'getTits',
            text: ['Show me your tits!'],
            action: () => { console.log('Getting tits...'); },
            answers: ['noWay']
        },
        {
            name: 'getAge',
            text: ['How old are you?'],
            action: () => { console.log('Getting age...'); },
            answers: ['showAge']
        },
        {
            name: 'showAge',
            text: ['I could be your father, bye!'],
            action: () => {},
            answers: []
        },
        {
            name: 'whyNoTits',
            text: ['But, why?!'],
            action: () => {},
            answers: ['dontHaveAny']
        },
        {
            name: 'showChart',
            text: ['Then show me some chart, please.'],
            action: () => {},
            answers: ['showChart']
        }
    ]
}