export const CREATE_SOCKET_REQUEST = 'CREATE_SOCKET_REQUEST'
export const createSocketRequest = (socket) => {
  return {
    type: CREATE_SOCKET_REQUEST,
    socket,
  }
}
