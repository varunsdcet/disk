import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Alert,

    ImageBackground, Image, Dimensions, ActivityIndicator,
} from 'react-native';
var randomString = require('random-string');
var EmailValidator = require("email-validator");
import AsyncStorage from '@react-native-community/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Swipers from 'react-native-swiper';
const GLOBAL = require('./Global');
const styles = StyleSheet.create({
    wrapper: {
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    loading: {
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {

        borderColor: "#000000",
        margin: 5,
        padding: 5,
        width: "70%",
        backgroundColor: "#DDDDDD",
        borderRadius: 5,
    },
    textField: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        margin: 5,
        padding: 5,
        width: "70%"
    },
    spacer: {
        height: 10,
    },
    scene: {
        flex: 1,
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 76,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,

        fontWeight: 'bold',
        fontSize:22,
    },

    underlineStyleHighLighted: {
        borderColor: "#eaecef",
    },
})

export default class Forgot extends Component {
    state = {
        code:'',
        loading:false,
        email:'',


    };
    fieldRef = React.createRef();

    checkValid = () =>{
      if (isNaN(this.state.email)) {
         if (EmailValidator.validate(this.state.email) == false){
            alert('Please enter valid email')
            return false
        }else{
          return true
        }
    //if input is not a number then here

  } else {
    if (this.state.email.length > 13 || this.state.email.length <6){
    //if input is number then here
    alert('Please enter valid phone number')
      return false
  }else{
    return true
  }
    }
  }
  _YesLogout =()=>{
    this.props.navigation.navigate("Signup")
  }
    _handlePress = ()=>{

        if (this.state.email.length == 0){
            alert('Please enter Email/Mobile number')
        }
        else if (this.checkValid() == false){

       }
        else {
          var x = randomString({
              length: 4,
              numeric: true,
              letters: false,
              special: false,

          });
            const url = GLOBAL.BASE_URL +  'Forget_password'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    email: this.state.email,
                    otp:x


                }),
            }).then((response) => response.json())
                .then((responseJson) => {

                    this.hideLoading()
                    if (responseJson.status == true) {
                      GLOBAL.myemail = this.state.email
                      GLOBAL.otps = x

                        if (isNaN(this.state.email)) {
                          this.props.navigation.navigate('ForgotOtp',"1")
                        } else{
                          this.props.navigation.navigate('ForgotOtp',"0")
                        }

                    }else{
                      Alert.alert('CREATE ACCOUNT','Sorry, There is no account with these credentials, Please Create Account to proceed.',
                          [{text:"Cancel"},
                              {text:"Yes", onPress:()=>this._YesLogout()
                              },
                          ],
                          {cancelable:false}
                      )
                    //  alert(responseJson['msg'])
                    }

                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
        }


        //  this.props.navigation.navigate('Home')
    }

    otp = ()=>{


        const url = GLOBAL.BASE_URL +  'otp'
        this.showLoading()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:GLOBAL.myemail,
                mobile:GLOBAL.mymobile,
                otp:GLOBAL.otps

            }),
        }).then((response) => response.json())
            .then((responseJson) => {



                this.hideLoading()
                if (responseJson.status == true) {


                    alert('OTP Sent To Your Registered Email address.')

                }else {
                    alert('Your Mobile Number Is Already Registered.')
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    onSubmit = () => {
        let { current: field } = this.fieldRef;

        alert(field.value())

        console.log(field.value());
    };
    showLoading() {
        this.setState({loading: true})
    }
    hideLoading() {
        this.setState({loading: false})
    }
    render(){
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}
                                       size="large" color='#7BAAED' />
                </View>
            )
        }
        return (
            <SafeAreaView style={styles.AndroidSafeArea}>
                <KeyboardAwareScrollView>
                    <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                        <Image
                            source={require('./back.png')}
                            style={{width: 18, height: 20,marginLeft:20,marginTop:10,resizeMode:'contain'}}


                        />
                    </TouchableOpacity>


                    <Text style = {{marginLeft:28,marginTop:30,fontSize:30,width:200,lineHeight:32,fontFamily:GLOBAL.heavy,}}>
                        Forgot Your Password
                    </Text>
                    <Text style={{color: '#8E9198',fontFamily:GLOBAL.roman,fontSize: 18,marginLeft:28,marginTop:20,width:window.width - 90,lineHeight:22}}>
                        Please enter your mobile number or email id

                    </Text>



                    <View style={{margin:20,marginLeft:30,width:window.width - 60}}>

                        <TextField
                            label='Email id /Mobile no'
                            baseColor = '#acb1c0'
                            tintColor = '#acb1c0'
                            value = {this.state.email}
                            onChangeText={(text) => this.setState({email:text})}

                        />

                    </View>


                    <Button
                        style={{marginLeft:28,paddingTop: 18 ,fontSize: 14,backgroundColor:'#7BAAED', color: 'white',fontFamily:GLOBAL.medium,marginTop:30,height:50,marginRight:28,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePress()}>
                        SUBMIT
                    </Button>



                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}
