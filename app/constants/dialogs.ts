
export interface dialog  {
    samanta: Array<sentence>,
    user: Array<sentence>
}

export interface sentence {
    name: string,
    text: Array<string>,
    action?: string,
    answers?: Array<string>
}

export const mainDialog: dialog = {
    samanta: [
        {
            name: 'welcome',
            text: ['Hello!^100\n', 'How can I help you?'],
            answers: ['getTits', 'getAge'],
            //multiple: 2 
        },
        {
            name: 'showAge',
            text: ['I\'m 17, and you?'],
            answers: ['showAge','showChart']
        },
        {
            name: 'noWay',
            text: ['No way!'],
            answers: ['whyNoTits', 'getAge', 'showChart']
        },
        {
            name: 'dontHaveAny',
            text: ['Because I\'m a computer program and don\'t have any'],
            answers: ['showChart']
        },
        {
            name: 'showChart',
            text: ['Here you are :-)'],
            action: 'SHOW_CHART'
        },
        {
            name: 'somethingElse',
            text: ['Can I do something else for you?'],
            answers: ['showChart']
        }
    ],
    user: [
        {
            name: 'getTits',
            text: ['Show me your tits!'],
            answers: ['noWay']
        },
        {
            name: 'getAge',
            text: ['How old are you?'],
            answers: ['showAge']
        },
        {
            name: 'showAge',
            text: ['I could be your father, bye!'],
            answers: ['somethingElse']
        },
        {
            name: 'whyNoTits',
            text: ['But, why?!'],
            answers: ['dontHaveAny']
        },
        {
            name: 'showChart',
            text: ['Then show me some chart, please.'],
            answers: ['showChart']
        }
    ]
}