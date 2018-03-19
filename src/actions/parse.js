export const parse = (data, dispatch, onErr) => {
  try {
    return JSON.parse(data)
  } catch (err) {
    dispatch(onErr)
  }
}