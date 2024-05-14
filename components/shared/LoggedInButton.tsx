import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import LoggedInDropDown from "./LoggedInDropDown";
import { currentUser } from "@/app/auth/current-user";
import { SignInButton } from "./SignInButton";

const LoggedInButton = async () => {
  const user = await currentUser();

  if (!user) {
    return <SignInButton />;
  }

  return (
    <LoggedInDropDown>
      <Button variant={"outline"} size={"sm"}>
        <Avatar>
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          {user.image ? (
            <AvatarImage src={user.image} alt="avatar image" />
          ) : null}
        </Avatar>
      </Button>
    </LoggedInDropDown>
  );
};

export default LoggedInButton;
