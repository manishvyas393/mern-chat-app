export const getUser = (users) => {
      const loggedUser = JSON.parse(localStorage.getItem("user"))
      return users?.filter(user => user?._id !== loggedUser)
}