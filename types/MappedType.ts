export type MappedType<T> = {
  map: {
    [key: number]: T
  },
  ids: Extract<keyof MappedType<T>['map'], number>[]
}