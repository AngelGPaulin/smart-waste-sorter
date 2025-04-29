import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TOKEN_NAME } from "@/constants";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME);

  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return null;
}
