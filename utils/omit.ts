interface OmitFunction {
  <T extends object, K extends [...(keyof T)[]]>
  (obj: T, ...keys: K): {
      [K2 in Exclude<keyof T, K[number]>]: T[K2]
  }
}


export const omit: OmitFunction = (obj, ...keys) => {
  const result = { ...obj }
  keys.forEach(function(prop) {
    delete result[prop]
  })
  return result
}