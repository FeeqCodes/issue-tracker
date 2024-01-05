"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import Dropdown from "./components/Dropdown";
import { Skeleton } from "@/app/components";

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();
  // console.log(currentPath)
  const { status, data: session } = useSession();

  return (
    <nav className=" border-b mb-5 px-5  py-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="">
              <AiFillBug />
            </Link>

            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${
                      link.href === currentPath
                        ? "text-gray-900"
                        : "text-gray-500"
                    } hover:text-gray-700 transition-all`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Box>
            {status === "authenticated" && (
              // <Link href="/api/auth/signout">Log Out</Link>
              <Dropdown session={session} />
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Log in</Link>
            )}
            {status === "loading" && <Skeleton width="3rem" />}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
