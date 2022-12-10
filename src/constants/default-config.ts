/// <reference path="../typings/index.ts" />

import { EMPTY_STRING, IconTypeEnum } from './base-config'

/** 默认配置 */
export default {
  entry: 'docs',
  ignoreFiles: [],
  collapsed: false,
  ignoreFolders: [],
  showNavIcon: true,
  isCollapsible: true,
  singleLayerNav: false,
  showSidebarIcon: false,
  customIndexFileName: '',
  showTopLevelIndexUnderNav: false,
  customParentFolderName: EMPTY_STRING,
  filePrefix: IconTypeEnum.MarkdownFile,
  dirPrefix: IconTypeEnum.ImPureFileFolder,
} as Required<Options>
