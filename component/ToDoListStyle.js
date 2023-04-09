import { StyleSheet } from "react-native";

const toDoListStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F4F4F4", // changed background color to light gray
  },
  appNameText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 20, // added spacing between app name and input field
  },
  container: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: "center",
    flex: 1,
  },
  textInput: {
    width: "80%",
    padding: 10, // increased padding for input field
    backgroundColor: "#FFFFFF", // added white background for input field
    borderRadius: 10, // added rounded corners for input field
    fontSize: 18, // increased font size for input field
    margin: 10,
    textAlign: "center",
    alignItems: "center",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    height: 60,
    paddingHorizontal: 20,
    fontSize: 18,
    width: "100%",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    height: 60,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10, // added rounded corners for "Delete" button
    borderBottomLeftRadius: 10,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 10, // added rounded corners for "Delete" button
    borderBottomRightRadius: 10,
  },
  editBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    paddingHorizontal: 20,
  },
  editBtnText: {
    color: "#000000",
    fontSize: 18,
  },
  swipeList: {
    width: "100%",
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 10, // added rounded corners for input field
    fontSize: 18, // increased font size for input field
    margin: 10,
  },
});

export { toDoListStyles };
