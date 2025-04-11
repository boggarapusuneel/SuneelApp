import { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { fetchCommentById, updateComment } from "../api/api"

type CommentsScreenProps = {
  navigation: any
  route: any
}

export default function CommentsScreen({ navigation, route }: CommentsScreenProps) {
  const { postId, post } = route.params
  const [name, setName] = useState(post?.title)
  const [email, setEmail] = useState(post?.id+"")
  const [comment, setComment] = useState({})

  useEffect(()=>{
    fetchCommentById(postId)
      .then(res => {

        setComment(res)
      }
      )
      .catch(err => {
        console.error(err)
        // Handle error
      }
      )
  },[postId]);

  const handleSubmit = () => {
    // Here you would typically send the comment to your API
    console.log("Submitting comment:", { name, email, comment, postId })

    // Clear the form
    setName("")
    setEmail("")
    setComment("")

    // Optionally navigate back or show a success message
  }

  const handleEditComment = () => {
    // For demo purposes, we'll navigate to the edit screen with the current comment
    navigation.navigate("EditComment", {
      originalComment:comment,
      // onSave: (updatedComment: string) => setComment(updatedComment),
      onSave: (updatedComment: string) => updateAComment(updatedComment),
    })
  }

  const updateAComment = (updatedComment: string) => {
    setComment({...comment, body: updatedComment })
    updateComment(postId, updatedComment)
      .then(res => {
        //console.log("updateComment",res?.data)
        setComment({...comment, body: updatedComment })
        
      }
      )
      .catch(err => {
        console.error(err)
        // Handle error
      }
      ) 
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={comment?.email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Comment</Text>
            <TextInput
              style={[styles.input, styles.commentInput]}
              value={comment?.body}
              onChangeText={setComment}
              placeholder="Write your comment here"
              multiline
              numberOfLines={4}
            />

            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Comment</Text>
              </TouchableOpacity> */}

              {/* {comment.length > 0 && (
                <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditComment}>
                  <Text style={styles.buttonText}>Edit Comment</Text>
                </TouchableOpacity>
              )} */}
    
                <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditComment}>
                  <Text style={styles.buttonText}>Edit Comment</Text>
                </TouchableOpacity>
              
            </View>
          </View>
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  commentInput: {
    height: 120,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
