import { CED } from "./utils/index.js"

export type auSwapType = 'none'|'innerHTML'|'outerHTML' |'delete'

export type auMetaType = {
  trigger:string
  targetSelector: string|null
  auGet: string|null
  auPost: string|null
  auSwap: string // auSwapType
  verb: string,
  searchParams: URLSearchParams,
  preserveFocus: boolean
  auInclude: string|null
  isThis: boolean,
  /** messages for decisions we make trying to be smart for the user */
  brains:Array<string>
  ced: CED<HTMLElement>
}

type booleanAttribute = true|false // really it exists or does not exist as an attribute

// more to come, just the ones currently supported
export type auAttributeTypes = {
  'au-post'?: string
  'au-get'?: string
  'au-trigger'?: string
  'au-include'?: string
  'au-swap'?: auSwapType
  'au-preserve-focus'?: booleanAttribute
}

export type auElementType = {
  auState:'processed'
  auAbortController: AbortController
  auMeta:auMetaType
  body?:FormData
  model?: any
  attributes:auAttributeTypes
} & HTMLElement
