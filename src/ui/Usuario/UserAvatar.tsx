import { clerkClient } from "@clerk/nextjs/server";

import Image from "next/image";

export default async function UserAvatar({
  clerkUserId,
}: {
  clerkUserId: string;
}) {
  const client = await clerkClient();
  const user = await client.users.getUser(clerkUserId);

  const name = `${user.firstName} ${user.lastName}`.trim() || user.username;
  const avatar = user.imageUrl;

  return (
    <Image src={avatar} alt={name as string} className="w-8 h-8 rounded-full" />
  );
}
