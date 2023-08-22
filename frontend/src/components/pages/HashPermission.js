export const hasPermission = (a, b) => {
  const role = localStorage.getItem("role");
  const list = JSON.parse(localStorage.getItem("rolelist"));
  const userPermission = list.filter((i) => i.role === role);
  if (userPermission.length > 0) {
    const isAllow = userPermission[0]?.permissions[a]?.includes(b);
    return isAllow;
  } else {
    return false;
  }
};