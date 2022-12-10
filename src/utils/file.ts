import { join } from 'path'
import { statSync, readdirSync } from 'fs'

import {
  INDEX_PATH,
  PLACEHOLDER,
  EMPTY_STRING,
  FILE_SUFFIXES,
  FILENAME_SEPARATOR,
} from '../constants'
import { isWindows } from './env'
import { getOptions } from './config'

const options = getOptions()

/**
 * 获取特定目录下的所有文件
 *
 * @param dir 目录路径
 * @param suffixes 需要处理的文件后缀
 * @param excludes 需要排除的文件名
 */
const getFiles = (dir: string, suffixes: string[], excludes: string[]) => {
  if (!dir) return []

  // readdirSync 仅返回当前这层的数据
  return readdirSync(dir)
    .sort()
    .filter((filename) => {
      const [
        suffix = getFileSuffix(filename),
        // statSync() 用来获取文件信息 stat => status
        stat = statSync(join(dir, filename)),
      ] = []

      return (
        stat.isFile() &&
        (!suffixes.length || suffixes.includes(suffix)) &&
        !excludes.includes(filename)
      )
    })
}

/**
 * 获取文件后缀
 *
 * @param filename 文件名
 */
const getFileSuffix = (filename: string) =>
  filename.slice(filename.lastIndexOf(FILENAME_SEPARATOR) + 1)

/**
 * 获取特定目录下的子目录
 *
 * @param dir 目录路径
 */
const getDirs = (dir = FILENAME_SEPARATOR) => {
  if (!dir) return []

  const dirs: string[] = []

  readdirSync(dir).forEach((item) => {
    const dirName = join(dir, item)
    if (
      !statSync(dirName).isDirectory() ||
      options.ignoreFolders.includes(item)
    ) {
      return
    }

    dirs.push(dirName)
  })

  return dirs
}

/**
 * 判断是否存在子目录
 *
 * @param path 目录路径
 */
const hasSubDirs = (path: string) => getDirs(path).length > 0

const getNameByPath = (dir: string, end?: number) => {
  if (!dir) return EMPTY_STRING

  return dir.substring(dir.lastIndexOf(isWindows ? '\\' : '/') + 1, end)
}

/**
 * 根据特定的目录路径来获取文件夹名称
 *
 * @param dir 目录路径
 */
const getDirNameByPath = (dir: string) => getNameByPath(dir)

/**
 * 根据特定的目录路径来获取文件名称
 * 如果是 md 文件，则移除后缀；否则保留后缀
 *
 * @param dir 目录路径
 */
const getFileNameByPath = (dir: string) => {
  if (!dir) return EMPTY_STRING

  return getNameByPath(
    dir,
    /.md$/i.test(dir) ? dir.lastIndexOf(FILENAME_SEPARATOR) : PLACEHOLDER
  )
}

/**
 * 是否有 index.md 文件
 *
 * @param path 目录路径
 */
const hasIndexMd = (path: string) => {
  if (!path) return false

  return getSortedFileByPath(path, FILE_SUFFIXES)
    .map((item) => getFileNameByPath(item))
    .includes(INDEX_PATH)
}

/**
 * 根据特定的目录路径来获取排序后的目录
 *
 * @param path 目录路径
 */
const getSortedFolderByPath = (path: string) => getDirs(path).sort()

/**
 * 根据特定的目录路径来获取排序后的文件
 *
 * @param path 目录路径
 * @param suffixes 需要处理的文件后缀
 */
const getSortedFileByPath = (path: string, suffixes: string[] = []) =>
  getFiles(path, suffixes, options.ignoreFiles)

export {
  getDirs,
  hasIndexMd,
  hasSubDirs,
  getDirNameByPath,
  getFileNameByPath,
  getSortedFileByPath,
  getSortedFolderByPath,
}
