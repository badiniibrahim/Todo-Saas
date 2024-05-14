import React from "react";
import { ModeToggle } from "./ModeToggle";
import LoggedInButton from "./LoggedInButton";
import Image from "next/image";
import { Layout } from "./Layout";

const NavBar = async () => {
  return (
    <header className="w-full border-b border-border py-1">
      <Layout className="flex items-center gap-4">
        <div className="flex-1">
          <Image src={"/logo.png"} width={30} height={30} alt="logo-app" />
        </div>
        <div className="flex flex-row gap-4">
          <ModeToggle />
          <LoggedInButton />
        </div>
      </Layout>
    </header>
  );
};

export default NavBar;
