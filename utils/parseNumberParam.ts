type ParamType = string | string[] | number

const isStringArray = (param: ParamType): param is string[] => {
  if ((param as string[]).find !== undefined) {
    return true
  }
  return false
}

const isString = (param: ParamType): param is string => {
  if ((param as string).includes !== undefined) {
    return true
  }
  return false
}

const isNumber = (param: ParamType): param is number => {
  if (param instanceof Number) {
    return true
  }
  return false
}

export const parseNumberParam = (param: string | string[] | number): number => {
  if (isStringArray(param)) {
    return parseInt(param[0])
  }
  if (isString(param)) {
    return parseInt(param)
  }
  if (isNumber(param)) {
    return param
  }

  throw Error('foo')
}
