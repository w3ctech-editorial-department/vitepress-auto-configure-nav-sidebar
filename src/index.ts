/// <reference path="./typings/index.ts" />

import { resolve } from 'path'

import { getNav } from './handle-nav'
import { getSidebar } from './handle-sidebar'
import { getOptions, setOptions } from './utils/config'

export default function AutoNavSidebarPlugin(options?: Options) {
  setOptions(options)

  const { entry } = getOptions()

  const path = resolve(process.cwd(), entry)

  return { nav: getNav(path), sidebar: getSidebar(path) }
}
