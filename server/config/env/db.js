export default {
  user: {
    nicknameChangeTime: `45 days`,
    nicknameChangeLimit: () => {
      return Date.now() + (1000 * 45)
    },
    createdPostTime: `3 minutes`,
    createdPostLimit: () => {
      return Date.now() + (1000 * 60 * 3)
    },
    loadPostCount() {
      return 10
    },
  },
}
