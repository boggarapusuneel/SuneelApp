import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"

type EditCommentScreenProps = {
  navigation: any
  route: any
}

export default function EditCommentScreen({ navigation, route }: EditCommentScreenProps) {
  const { originalComment, onSave } = route.params

  const [comment, setComment] = useState(originalComment?.body || "")

  const handleSubmit = () => {
    // Call the onSave callback passed from the previous screen
    if (onSave) {
      onSave(comment)
    }

    // Navigate back
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidView}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="Edit your comment here"
            multiline
            autoFocus
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    flex: 1,
    marginBottom: 16,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
