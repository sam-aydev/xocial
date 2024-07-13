export async function getComment(id: string) {
  try {
    const res = await fetch(`/api/comment/${id}`);
    if (!res.ok) return;
    return res.json();
  } catch (error) {
    throw new Error("Unable to get tweet");
  }
}
