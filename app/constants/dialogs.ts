export interface pageDialog {
  samanta: dialogGroup
  user?: dialogGroup
}

export interface dialogGroup {
   sentences: Array<sentence>,
}

export interface sentence {
  action?: string,     
  autostart: boolean, 
  text: Array<string>
}

export const firstPageDialog: pageDialog = {
  samanta:  { 
    sentences: [ 
        { text: ['Hi, this is: '], autostart: true, action: 'SHOW_CHART'}, 
        { text: ['on which I see following events worth exploring:'], autostart: false }
    ]  
  },
  user: {
    sentences: [ 
        { text: ['I choose traditional period:'], autostart: false, action: 'FILTER_PERIODS' }
    ]
  }
}