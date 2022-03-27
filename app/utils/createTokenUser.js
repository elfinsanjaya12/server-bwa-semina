const createTokenUser = (user) => {
  return {
    name: user.name ? user.name : `${user.firstName} ${user.lastName}`,
    userId: user._id,
    role: user.role,
    email: user.email,
  };
};

module.exports = createTokenUser;
