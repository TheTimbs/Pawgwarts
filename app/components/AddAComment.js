import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const AddAComment = () => {
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Add a Comment"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddAComment;