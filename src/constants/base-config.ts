const [placeholder] = [] as undefined[]

export enum IconTypeEnum {
  MarkdownFile = '✏️',
  PureFileFolder = '📜',
  ImPureFileFolder = '📂',
}

export const EMPTY_STRING = ''

export const KEY_SEPARATOR = ','

export const enum PathTypeEnum {
  Dir = 'dir',
  File = 'file',
}

export const INDEX_PATH = 'index'

export const PATH_SEPARATOR = '/'

export const enum TargetTypeEnum {
  Nav = 'nav',
  Sidebar = 'sidebar',
}

export const FILENAME_SEPARATOR = '.'

export const FILE_SUFFIXES = ['md']

export const PLACEHOLDER = placeholder

export const INDEX_PATH_REGEXP = new RegExp(`^${INDEX_PATH}$`, 'i')
