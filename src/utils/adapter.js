/**
 * 列表查询适配器
 * @param {function} query
 */
export const listQueryAdapter = query => {
  return async parameter => {
    const { page } = parameter
    const {
      data: { content, size, number, totalElements, totalPages }
    } = await query({ ...parameter, ...{ page: page - 1 } })
    return {
      data: content,
      pageNo: number + 1,
      totalCount: totalElements,
      pageSize: size,
      totalPage: totalPages
    }
  }
}

/**
 * 列表查询适配器 operate--echo
 * @param {function} query
 */
export const listQueryEchoAdapter = query => {
  return async parameter => {
    const { page } = parameter
    const {
      data: { content, size, number, totalElements, totalPages }
    } = await query({ ...parameter, ...{ page: page - 1 } })
    const data = content.map(({ operate, echo }) => ({ ...operate, echo: echo.data }))
    return {
      data: data,
      pageNo: number + 1,
      totalCount: totalElements,
      pageSize: size,
      totalPage: totalPages
    }
  }
}
