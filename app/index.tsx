import { MaterialIcons } from "@expo/vector-icons";
import { PreventRemoveContext } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SetStateAction, useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from "react-native";
import { GiftedChat, Bubble, Avatar} from "react-native-gifted-chat";

export default function Index() {
  
  const [messages,setMessages] = useState([])
  const [inputMessage,setInputMessage] = useState("")
  const [outputMessage,setOutputMessage] = useState("Results to be shown here")
  const styles = StyleSheet.create({
    textInputStyle: {
      color: 'rgb(175,175,175)',
    },
    textHeaderStyle: {
      color: 'rgb(255,255,255)',
      fontSize: 18,
      textAlign: "center"
    }
  });
  const handleButtonClick = () => {
    console.log(inputMessage)
    const message = {
      _id:Math.random().toString(36).substring(7),
      text:inputMessage,
      createdAt:new Date(),
      user:{_id:1}
    }
    
    setMessages((previousMessages)=>
      GiftedChat.append(previousMessages, [message])
    )
    fetch("http://legacyfarmsnorthhoa.life:3001/api/v1/workspace/lfgpt/chat", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer 5T4HXTE-YS946M3-HQQBW22-CRZ8FY3"
      },
      body:JSON.stringify({
        "message": inputMessage,
        "mode": "chat",
      })
    }).then((response)=>response.json()).then((data)=>{
      console.log(data.textResponse)
      setInputMessage("")
      setOutputMessage(data.textResponse.trim())

      const message = {
        _id:Math.random().toString(36).substring(7),
        text:data.textResponse.trim(),
        createdAt:new Date(),
        user:{_id:2, name: "LF", avatar: '../assets/images/react-logo.png'}
      }
      setMessages((previousMessages)=>
        GiftedChat.append(previousMessages, [message])
      )

      
    })
    .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
     // ADD THIS THROW error
      throw error;
    })
  }

  const handleTextInput = (text: SetStateAction<string>) => {
    setInputMessage(text)
  }

  const renderAvatar = () => {
    return (
      <Image
        source={require('../assets/images/icon.png')}
        style={{
          width: 40,  // Set the desired width
          height: 40, // Set the desired height
          borderRadius: 0, // Adjust border radius as needed
          marginRight: -5, // Add any additional styling here
          marginLeft: 3,
          marginBottom: 2
        }}
      />
    );
  return null;
};

  return (

    <ImageBackground source={require('../assets/images/gptbg.jpg')} resizeMode="cover"
    style={{flex:1, width: "100%", height: "100%"}}>
          <View style={{flex: 1}}>
      <View style={{ flexDirection: "row" }}>
        <View style = {{flex: 1,  backgroundColor: "rgb(30,30,30)", height: 30,
           justifyContent: "center", paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderBottomColor: "white"}}> 
            <Text style={styles.textHeaderStyle}>Legacy Farms North</Text>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: "center"}}>
      
        <GiftedChat messages={messages} renderInputToolbar={()=>{ }} user={{_id:1}} minInputToolbarHeight={5} 
          onSend={newMessage => onSend(newMessage)}
            messages={messages}
            renderAvatar={() => renderAvatar()}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
      
                textStyle={{
                  right: {
                    color: '#ececdf',
                  },
                  left: {
                    color: '#ececdf',
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: '#212121',
                  },
                  right: {
                    backgroundColor: "#2f2f2f",
                  },
                }}
                
              />
            );
          }}                
      />
      </View>


      <View style={{ flexDirection: "row" }}>
        <View style = {{flex: 1, marginLeft: 10, marginBottom: 20, backgroundColor: "rgb(100,100,100)",
          borderRadius: 10, height: 60,
           marginRight: 10, justifyContent: "center", paddingLeft: 10, paddingRight: 10, }}>
          <TextInput placeholder = "Message Legacy Farms AI" onChangeText={handleTextInput} value={inputMessage} 
          placeholderTextColor={"rgb(175,175,175)"} cursorColor={"white"} style={styles.textInputStyle}/>

        </View>



        <TouchableOpacity onPress={handleButtonClick}>
          <View style={{ backgroundColor: 'rgb(100,100,100)', 
            padding: 5, marginRight: 10, marginBottom: 20, borderRadius: 10, 
            width: 60, height: 60, justifyContent: "center"}}>
            <MaterialIcons name="send" size={40} style={{marginLeft: 5}} color={"rgb(175,175,175)"}/>
          </View>

        </TouchableOpacity>
      </View>
        
      <StatusBar style="auto" />
    </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});