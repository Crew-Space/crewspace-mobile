/**
 * PickRenameMulti<User, { _id: "id"; name: "firstName" }> -> {id: string, name: string}
 */
export type PickRenameMulti<
  T,
  R extends { [K in keyof R]: K extends keyof T ? PropertyKey : 'Error: key not in T' },
> = Omit<T, keyof R> &
  UnionToIntersection<{ [P in keyof R & keyof T]: { [PP in R[P]]: T[P] } }[keyof R & keyof T]>;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
