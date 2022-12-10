import { DefaultTheme } from 'vitepress/types/default-theme'

import {
  INDEX_PATH,
  EMPTY_STRING,
  PathTypeEnum,
  FILE_SUFFIXES,
  PATH_SEPARATOR,
  TargetTypeEnum,
  INDEX_PATH_REGEXP,
} from './constants'
import {
  hasIndexMd,
  getDirNameByPath,
  getFileNameByPath,
  getSortedFileByPath,
  getSortedFolderByPath,
} from './utils/file'
import { formatText } from './utils/text'
import { getOptions } from './utils/config'

import NavItem = DefaultTheme.NavItem
type Folder = Record<'link' | 'text', string>

const options = getOptions()

const doHandleMultipleLayerNav = (
  dir: string,
  folders: Folder[],
  prefix: string
) => {
  getSortedFolderByPath(dir).forEach((subFolderPath) => {
    const [
      firstFileName = getFileNameByPath(
        getSortedFileByPath(subFolderPath, FILE_SUFFIXES)[0]
      ),
      subFolderText = getDirNameByPath(subFolderPath),
      nextPrefix = `${prefix}${PATH_SEPARATOR}${subFolderText}`,
    ] = [] as string[]

    const partialLink = handleDefaultLink(firstFileName)
    if (partialLink) {
      folders.push({
        text: doHandleNavDirName(subFolderText),
        link: `${PATH_SEPARATOR}${nextPrefix}${PATH_SEPARATOR}${partialLink}`,
      })
    }

    // 获取子目录下的 nav 内容
    doHandleMultipleLayerNav(subFolderPath, folders, nextPrefix)
  })
}

const doHandleNavDirName = (text: string) =>
  formatText(text, TargetTypeEnum.Nav, PathTypeEnum.Dir)

const doHandleNavFileName = (text: string) => {
  let { customIndexFileName: finalText } = options
  if (!finalText || !INDEX_PATH_REGEXP.test(text)) finalText = text

  return formatText(finalText, TargetTypeEnum.Nav, PathTypeEnum.File)
}

const handleDefaultLink = (first: string, ...siblings: string[]) =>
  siblings.reduce((current, sibling) => current || sibling, first) ??
  EMPTY_STRING

/**
 * 获取导航配置项
 *
 * @param path 目录路径
 */
export const getNav = (path: string) => {
  const { singleLayerNav } = options

  const navbars: NavItem[] = []

  getSortedFolderByPath(path).forEach((dir) => {
    const [text = getDirNameByPath(dir), hasIndexMdFile = hasIndexMd(dir)] = []

    let currentItem: NavItem | undefined

    if (singleLayerNav && hasIndexMdFile) {
      currentItem = {
        text: doHandleNavDirName(text),
        link: `${PATH_SEPARATOR}${text}${PATH_SEPARATOR}`,
      }
    } else if (singleLayerNav && !hasIndexMdFile) {
      const [firstFile, firstFolder] = [
        getSortedFileByPath,
        getSortedFolderByPath,
      ].map((cb) => cb(dir, FILE_SUFFIXES)[0])

      const [
        [firstFileName, firstFileOfFirstFolderName] = [
          firstFile,
          getSortedFileByPath(firstFolder, FILE_SUFFIXES)[0],
        ].map((path) => getFileNameByPath(path)),
        firstFolderName = getDirNameByPath(firstFolder),
      ] = []
      if (
        !firstFileName &&
        (firstFileName || !firstFolderName || !firstFileOfFirstFolderName)
      ) {
        return
      }

      currentItem = {
        text: doHandleNavDirName(text),
        link: `${PATH_SEPARATOR}${text}${PATH_SEPARATOR}${handleDefaultLink(
          firstFileName,
          `${firstFolderName}${PATH_SEPARATOR}${firstFileOfFirstFolderName}`
        )}`,
      }
    } else {
      const files = getSortedFileByPath(dir)
        .map((item) => getFileNameByPath(item))
        .map((subFileText) => ({
          text: doHandleNavFileName(subFileText),
          link: `${PATH_SEPARATOR}${text}${PATH_SEPARATOR}${subFileText}`,
        }))

      const folders: Folder[] = []

      doHandleMultipleLayerNav(dir, folders, text)

      currentItem = {
        items: files.concat(folders),
        text: doHandleNavDirName(text),
      }
    }

    if (currentItem) navbars.push(currentItem)
  })

  // 获取当前目录的文件
  let files = []
  if (
    (files = getSortedFileByPath(path).map((item) => getFileNameByPath(item)))
      .length > 0
  ) {
    files.forEach((item) => {
      navbars.push({
        text: doHandleNavFileName(item),
        link: `${PATH_SEPARATOR}${item}`,
      })
    })
  }

  return navbars.filter(
    // @ts-ignore
    ({ link }) => {
      if (!link) return true

      const hasTopLevelIndex = !(link as string).indexOf(
        `${PATH_SEPARATOR}${INDEX_PATH}`
      )
      if (!hasTopLevelIndex) return true

      return options.showTopLevelIndexUnderNav
    }
  )
}
