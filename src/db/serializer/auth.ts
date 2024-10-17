export const serializeUser = (data:any):User|null => {
  let user:User | null = null;

  user = {
    id: data.user.id,
    email: data.user.email,
		username:data.user.username,
    token:data.token
  };

  return user;

}
