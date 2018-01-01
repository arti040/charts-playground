// === Dialogs
// @desc Dialogs' definitions and interfaces for typed.js related components/events.


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


// @desc First page dialog
export const firstPageDialog: pageDialog = {
  samanta:  { 
    sentences: [ 
        { text: ['Hi, this is '], autostart: true, action: 'SHOW_FILTERS'}, 
        { text: ['on which I see following events worth exploring:'], autostart: false }
    ]  
  },
  user: {
    sentences: []
  }
}

export interface onTypeEnded {
  action?: string
}

export interface typedOpts {
  strings: Array<string>,
  typeSpeed?: number,
  backSpeed?: number,
  fadeOut?: boolean,
  showCursor?: boolean,
  onComplete?(any): void
  onStringTyped?(arrayPos: number, self: any): void
}