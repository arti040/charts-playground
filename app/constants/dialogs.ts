export interface pageDialog {
  samanta: sentence
  user?: sentence
}

export interface sentence {
  text: Array<string>,
  action?: string,
}

export const firstPageDialog: pageDialog = {
  samanta:  { 
    text: ['Hi, this is: ', 'on which I see following events worth exploring:'], 
    action: 'SHOW_CHART'
  },
  user: {
    text: ['I choose traditional period:'],
    action: 'FILTER_PERIODS'
  }
}