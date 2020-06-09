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

    ImageBackground, Image, Dimensions, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
var randomString = require('random-string');
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

export default class ForgotOtp extends Component {
    state = {
        code:'',
        loading:false,


    };
    fieldRef = React.createRef();

    _handlePress = ()=>{

        if (this.state.code.length == 0){
            alert('Please enter otp')
        }
       else if (this.state.code == GLOBAL.otps){

        this.props.navigation.replace('ChangePassword')
        }
   else{
            alert('Otp not match')
        }

      //  this.props.navigation.navigate('Home')
    }

    otp = ()=>{


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
                email:GLOBAL.myemail,
                otp:x,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {



                this.hideLoading()
                if (responseJson.status == true) {


                  GLOBAL.otps =  x;


 alert('OTP Sent Successfully')


                }else {
                    alert(responseJson['msg'])
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

  {this.props.navigation.state.params == '1' && (
                    <Text style = {{marginLeft:28,marginTop:30,fontSize:30,fontFamily:GLOBAL.heavy,}}>
                        Email Verification
                    </Text>
                  )}
                  {this.props.navigation.state.params == '0' && (
                                    <Text style = {{marginLeft:28,marginTop:30,fontSize:30,fontFamily:GLOBAL.heavy,}}>
                                        Phone Verification
                                    </Text>
                                  )}
                    <Text style={{color: '#8E9198',fontFamily:GLOBAL.roman,fontSize: 18,marginLeft:28,marginTop:20,width:window.width - 90,lineHeight:17}}>
                       Enter your OTP code here

                    </Text>


  {this.props.navigation.state.params == '0' && (
                      <Text style={{color: '#8E9198',fontFamily:GLOBAL.roman,fontSize: 18,marginLeft:28,marginTop:80,width:window.width - 56,lineHeight:20}}>
                          We have sent you an SMS with a verification code to   {GLOBAL.myemail}

                      </Text>
)}

{this.props.navigation.state.params == '1' && (
                    <Text style={{color: '#8E9198',fontFamily:GLOBAL.roman,fontSize: 18,marginLeft:28,marginTop:80,width:window.width - 56,lineHeight:20}}>
                        We have sent you an email with a verification code to   {GLOBAL.myemail}

                    </Text>
)}

                    <View style={{marginTop:0}}>

                        <OTPInputView
                            style={{width: '80%', height: 100,alignSelf:'center'}}
                            pinCount={4}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            // onCodeChanged = {code => { this.setState({code})}}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled = {(code => {
                                this.setState({code:code})
                                console.log(`Code is ${code}, you are good to go!`)
                            })}
                        />

                    </View>


                    <View style = {{flexDirection:'row',justifyContent:'space-between',width:window.width}}>

                   <Text>

                   </Text>

                        <TouchableOpacity onPress= {()=>this.otp()}>
                    <Text style={{color: '#F2C1D7',fontFamily:GLOBAL.medium,fontSize: 17,textAlign:'right',marginTop:2 ,lineHeight:20,marginRight:28}}>
                        Send a new code

                    </Text>

                        </TouchableOpacity>
                    </View>
                    <Button
                        style={{marginLeft:28,paddingTop: 14 ,fontSize: 14,backgroundColor:'#7BAAED', color: 'white',fontFamily:GLOBAL.medium,marginTop:20,height:40,marginRight:28,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePress()}>
                       VERIFY
                    </Button>



                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}
