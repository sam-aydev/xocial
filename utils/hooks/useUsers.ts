import { useQuery } from "@tanstack/react-query";

async function getAllUsers() {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Unable to get users");
  return await res.json();
}

export function useUsers() {
  const { data: users, status: usersStatus } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  return {
    users,
    usersStatus,
  };
}
