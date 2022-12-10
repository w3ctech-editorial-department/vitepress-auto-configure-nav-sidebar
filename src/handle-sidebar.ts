import { DefaultTheme } from 'vitepress/types/default-theme'

import {
  EMPTY_STRING,
  IconTypeEnum,
  PathTypeEnum,
  KEY_SEPARATOR,
  PATH_SEPARATOR,
  TargetTypeEnum,
  INDEX_PATH_REGEXP,
} from './constants'
import {
  getDirNameByPath,
  getFileNameByPath,
  getSortedFileByPath,
  getSortedFolderByPath,
} from './utils/file'
import { formatText } from './utils/text'
import { getOptions } from './utils/config'

import SidebarItem = DefaultTheme.SidebarItem
import SidebarGroup = DefaultTheme.SidebarGroup
import SidebarMulti = DefaultTheme.SidebarMulti

const options = getOptions()

const doHandleSidebarFileName = (text: string) => {
  let { customIndexFileName: finalText } = options
  if (!finalText || !INDEX_PATH_REGEXP.test(text)) finalText = text

  return formatText(finalText, TargetTypeEnum.Sidebar, PathTypeEnum.File)
}

const doHandleSidebarDirName = (text: string, ...rest: unknown[]) =>
  // @ts-ignore
  formatText(text, TargetTypeEnum.Sidebar, PathTypeEnum.Dir, ...rest)

const handleSidebar = (
  path: string,
  sidebar: SidebarMulti,
  outerKey?: string
) => {
  const dirs = getSortedFolderByPath(path)
  if (!dirs.length) return

  const {
    collapsed,
    customParentFolderName,
    isCollapsible: collapsible,
  } = options

  dirs.forEach((dir) => {
    const [
      dirName = getDirNameByPath(dir),
      key = `${PATH_SEPARATOR}${dirName}${PATH_SEPARATOR}`,
    ]: string[] = []

    let [current, finalKey = key] = [] as unknown as [SidebarGroup[], string]
    if (outerKey) {
      // @ts-ignore
      const [keys = outerKey.split(KEY_SEPARATOR), [top] = keys] = []
      // 获取顶层目录
      ;({ [top]: current } = sidebar)

      const items = Array.from<SidebarItem[]>({
        length: keys.length,
        // @ts-ignore
      }).reduce((acc, _: unknown, i: number) => {
        const pos = acc.findIndex(({ text }) =>
          text?.includes(
            keys[i].replace(new RegExp(PATH_SEPARATOR, 'g'), EMPTY_STRING)
          )
        )

        return acc[Math.max(0, pos)].items
      }, current)
      if (!items) return

      items.push({ items: [], text: doHandleSidebarDirName(dirName) })
      // @ts-ignore
      current = items
      finalKey = `${keys.join(EMPTY_STRING)}${finalKey}`.replace(
        new RegExp(`${PATH_SEPARATOR.repeat(2)}`, 'g'),
        PATH_SEPARATOR
      )
    } else {
      sidebar[finalKey] = current = [
        {
          collapsed,
          items: [],
          collapsible,
          text: doHandleSidebarDirName(dirName),
        },
      ]
    }

    // 递归处理子目录
    handleSidebar(
      dir,
      sidebar,
      outerKey ? `${outerKey}${KEY_SEPARATOR}${key}` : key
    )

    const subFiles = getSortedFileByPath(dir).map((item) =>
      getFileNameByPath(item)
    )
    if (!subFiles.length) return

    let parentFolderName = customParentFolderName
    if (!parentFolderName) parentFolderName = dirName

    // 如果目录的子目录为空，则移除空目录
    const { length } = current
    if (!current[length - 1].items.length) current.splice(length - 1, 1)

    current.unshift({
      collapsed,
      collapsible,
      text: doHandleSidebarDirName(
        parentFolderName,
        IconTypeEnum.PureFileFolder
      ),
      items: subFiles.map((item) => ({
        link: `${finalKey}${item}`,
        text: doHandleSidebarFileName(item),
      })),
    })
  })
}

/**
 * 获取边栏配置项
 *
 * @param path 目录路径
 */
export const getSidebar = (path: string) => {
  const sidebar: SidebarMulti = {}

  handleSidebar(path, sidebar)

  return sidebar
}
