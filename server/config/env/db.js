export default {
  user: {
    nicknameChangeTime: `45 days`,
    nicknameChangeLimit: () => {
      return Date.now() + (1000 * 45)
    },
    createdPostTime: `2 minutes`,
    createdPostLimit: () => {
      return Date.now() + (1000 * 1.5 * 60)
    },
    loadPostCount() {
      return 10
    },
  },
}
