import { getOptions } from './config'
import { TargetTypeEnum, type IconTypeEnum } from '../constants'

const options = getOptions()

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)

export const formatText = (
  text: string,
  target: TargetType,
  type: PathType,
  icon?: IconTypeEnum
) => {
  if (
    (target !== TargetTypeEnum.Nav && target !== TargetTypeEnum.Sidebar) ||
    !options[`show${capitalize(target) as Capitalize<TargetType>}Icon`]
  ) {
    return text
  }

  let iconPrefix = options[`${type}Prefix`]
  if (icon) iconPrefix = icon

  return `${iconPrefix}${text}`
}
