import React from "react";
import { Session } from "next-auth";
import { Avatar, Button, DropdownMenu, Text } from "@radix-ui/themes";
import Link from "next/link";
import { signOut } from "next-auth/react";




const Dropdown = ({ session }: { session: Session }) => {
  

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session.user?.image!}
          fallback="?"
          size="2"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="2">{session.user?.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          {/* <Link href="/api/auth/signout">Log Out</Link> */}
          <Link
          href=""
            onClick={() => {
              signOut({ callbackUrl: "http://localhost:3000" });
            }}
          >
            Log out
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
