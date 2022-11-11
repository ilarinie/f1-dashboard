export type AsyncArrayElement<ArrayType extends Promise<unknown[]>> = 
  ArrayType extends Promise<(infer ElementType)[]> ? ElementType : never;