import { Button, Input, Text } from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";
import { RegisterForm } from "./registerForm";

export const Register = () => {
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
        Create an Admin Account
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
        <RegisterForm />
      </Flex>
    </Flex>
  );
};
