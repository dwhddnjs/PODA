export interface ApiRes {
  ok: 0 | 1
}

export interface ApiResSuccess<T> extends ApiRes {
  ok: 1
  item: T
}

export interface ApiResError extends ApiRes {
  ok: 0
  message: string
}
