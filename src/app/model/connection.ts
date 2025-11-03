export interface Connection<T> {
  edges: {node : T , cursor: string} []
  pageInfo: PageInfo
}

export interface PageInfo{
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor: string,
  endCursor: string
}
