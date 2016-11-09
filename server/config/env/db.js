export default {
  user: {
    nicknameChangeTime: `45 days`,
    nicknameChangeLimit: () => {
      return Date.now() + (1000 * 30)
    },
    createdPostTime: `3 minutes`,
    createdPostLimit: () => {
      return Date.now() + (1000 * 1)
    },
    loadPostCount() {
      return 10
    },
  },
}
