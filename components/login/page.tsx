import { Button, Input, Text } from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";
import { LoginForm } from "./loginForm";

export const Login = () => {
  return (
    <Flex
      css={{
        height: "100vh", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "20px",
      }}
      direction="column"
    >
      <Text h1 css={{ marginBottom: "20px", fontSize: "3rem", color: "#333", textAlign: "center" }}>
        Admin Panel Access
      </Text>

      <Flex
        direction="column"
        css={{
          gap: "$6",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%", 
          maxWidth: "600px", 
          boxSizing: "border-box", 
        }}
        justify="center"
        align="center"
      >
        <LoginForm />
      </Flex>
    </Flex>
  );
};
