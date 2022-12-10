declare type PathType = 'dir' | 'file'

declare type TargetType = 'nav' | 'sidebar'

declare type Options = Partial<
  Record<
    | 'collapsed'
    | 'isCollapsible'
    | 'singleLayerNav'
    | 'showTopLevelIndexUnderNav'
    | `show${Capitalize<TargetType>}Icon`,
    boolean
  > &
    Record<
      | 'entry'
      | 'customIndexFileName'
      | 'customParentFolderName'
      | `${PathType}Prefix`,
      string
    > &
    Record<'ignoreFiles' | 'ignoreFolders', string[]>
>
