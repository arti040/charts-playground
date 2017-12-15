
export interface onTypeEnded {
  answers?: Array<string>,
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