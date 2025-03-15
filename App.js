import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { CheckBox } from "@rneui/themed";

export default function App() {
  // task list starts list with two tasks already inputed
  const [tasks, setTasks] = useState([
    { key: "1", description: "Lab01: React Installation", completed: true },
    { key: "2", description: "Lab02: React Crash Course", completed: false },
  ]);
  // Input field
  const [newTask, setNewTask] = useState("");

  // checkbox status
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.key === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //adds new Tasks to List
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { key: Date.now().toString(), description: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  // renders List Items
  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleCompletion(item.key)}
        iconType="material"
        checkedIcon="check-box"
        uncheckedIcon="check-box-outline-blank"
        checkedColor="black"
        uncheckedColor="grey"
        containerStyle={styles.checkbox}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button
          title="   Add   "
          buttonStyle={{ backgroundColor: "black" }}
          titleStyle={{ color: "white", fontWeight: "bold" }}
          onPress={addTask}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#F5ece4",
    alignItems: "center",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "left",
    padding: 10,
  },
  taskText: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 100,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    width: 300,
    borderRadius: 5,
  },
  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
});
