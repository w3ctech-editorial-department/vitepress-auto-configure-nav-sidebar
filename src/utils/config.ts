/// <reference path="../typings/index.ts" />

import { DEFAULT_OPTION_CONFIG } from '../constants'

const options = { ...DEFAULT_OPTION_CONFIG }

export function getOptions() {
  return options
}

export function setOptions(newOptions: Options | undefined) {
  Object.assign(options, newOptions)
}
