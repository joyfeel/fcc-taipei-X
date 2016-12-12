export const getOldestPostID = state => state.posts[state.posts.length - 1].id
export const getNewestPostID = state => state.posts[0].id
export const getPostTimeSocket = state => state.socket.postTimeSocket
