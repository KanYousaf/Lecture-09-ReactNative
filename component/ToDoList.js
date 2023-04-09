import React, { useContext, useState } from "react";
import { TodosContext } from "../App";
import { SwipeListView } from "react-native-swipe-list-view";
import { Text, Container, HStack, Input, Button } from "native-base";
import { Pressable, View, Alert, StatusBar, Platform } from "react-native";
import { toDoListStyles } from "./ToDoListStyle";
import uuid from "uuid-random";

export default function ToDoList() {
  // receive state and dispatch from App.js
  const { state, dispatch } = useContext(TodosContext);
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode ? "Edit" : "Add";

  //color changing SwipeListView
  const [colorIndex, setColorIndex] = useState(0);
  const colors = [
    "#ff6961", // pastel red
    "#98dbc6", // pastel teal
    "#e6e6fa", // pastel lavender
    "#ffdab9", // pastel peach
    "#fdfd96", // pastel yellow
    "#aec6cf", // pastel blue
    "#77dd77", // pastel green
  ];

  const handleSubmit = () => {
    if (todoText.trim() === "") {
      Alert.alert("Action Required", "Todo must not be empty", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
      return;
    }
    if (editMode) {
      dispatch({ type: "edit", payload: { ...editTodo, text: todoText } });
      setEditMode(false);
      setEditTodo(null);
    } else {
      const newToDo = {
        id: uuid(),
        text: todoText,
        colorIndex,
        inputText: todoText,
      };
      setColorIndex((colorIndex + 1) % colors.length);
      dispatch({ type: "add", payload: newToDo });
    }
    setTodoText(""); // to clear field after adding
  };

  const renderItem = (data) => (
    <View
      style={[
        toDoListStyles.rowFront,
        { backgroundColor: colors[data.item.colorIndex] },
      ]}
    >
      <Text>{data.item.text}</Text>
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={toDoListStyles.rowBack}>
      <Pressable onPress={() => editRow(data.item, rowMap)}>
        <Text>Edit</Text>
      </Pressable>
      <Pressable
        style={[toDoListStyles.backRightBtn]}
        onPress={() => deleteRow(data.item)}
      >
        <Text style={{ color: "#FFF" }}>Delete</Text>
      </Pressable>
    </View>
  );

  const deleteRow = (todo) => {
    dispatch({ type: "delete", payload: todo });
  };

  const editRow = (todo, rowMap) => {
    setTodoText(todo.text);
    setEditMode(true);
    setEditTodo(todo);
    if (rowMap[todo.id]) {
      rowMap[todo.id].closeRow();
    }
  };

  return (
    <View style={toDoListStyles.mainView}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Text style={toDoListStyles.appNameText}>What To-Do...!!!</Text>
      <Container style={toDoListStyles.container}>
        <HStack style={{ flexDirection: "row", alignItems: "center" }}>
          <Input
            placeholder="Enter Todo..."
            onChangeText={(text) => setTodoText(text)}
            value={todoText}
            style={toDoListStyles.textInput}
          />
          <Button color="dodgerblue" onPress={handleSubmit}>
            <Text>{buttonTitle}</Text>
          </Button>
        </HStack>
        {Platform.OS === "android" ? (
          <HStack style={{ width: "100%" }}>
            <View style={{ width: "100%" }}>
              <SwipeListView
                data={state.todos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-75}
                disableRightSwipe={editMode}
                style={toDoListStyles.swipeList}
              />
            </View>
          </HStack>
        ) : (
          <SwipeListView
            data={state.todos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
            disableRightSwipe={editMode}
            style={toDoListStyles.swipeList}
          />
        )}
      </Container>
    </View>
  );
}
