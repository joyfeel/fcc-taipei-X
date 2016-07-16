export default {
  user: {
    nicknameChangeLimit: () => {
        return Date.now() + (1000 * 30)
    }
  }
}
