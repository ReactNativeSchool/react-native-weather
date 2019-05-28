import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  base: {
    color: "#fff"
  },
  h1: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "700"
  },
  h2: {
    fontSize: 20
  },
  p: {
    fontSize: 16
  }
});

export const H1 = ({ children, style = {} }) => (
  <Text style={[styles.base, styles.h1, style]}>{children}</Text>
);

export const H2 = ({ children, style = {} }) => (
  <Text style={[styles.base, styles.h2, style]}>{children}</Text>
);

export const P = ({ children, style = {} }) => (
  <Text style={[styles.base, styles.p, style]}>{children}</Text>
);
