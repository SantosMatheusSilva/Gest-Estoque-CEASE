import { clerkClient } from "@clerk/nextjs/server";
import { Organization } from "@clerk/nextjs/server";
import Image from "next/image";
import { Avatar } from "@heroui/react";
import { PersonFill } from "@gravity-ui/icons";
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
    <div className="flex flex-row gap-2 justify-start items-center">
      <Avatar size="sm" color="accent">
        <Avatar.Image alt={name as string} src={avatar} />
        <Avatar.Fallback>
          <PersonFill />
        </Avatar.Fallback>
      </Avatar>
      <h2>{name}</h2>
    </div>
  );
}
