"use client";
import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

interface TransitionalLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  className: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function TransitionalLink({
  children,
  href,
  className,
  ...props
}: TransitionalLinkProps) {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const body = document.querySelector("body");
    // TODO: Run some animation exit animation
    // sleep for some time
    // TODO: Run some entrance animation
    // sleep for some time

    body?.classList.add("page-transition");

    await sleep(300);
    router.push(href);
    await sleep(300);

    body?.classList.remove("page-transition");
  };

  return (
    <Link
      href={href}
      className={className}
      {...props}
      onClick={handleTransition}
    >
      {children}
    </Link>
  );
}

export default TransitionalLink;
