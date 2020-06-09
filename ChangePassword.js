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
    ActivityIndicator,
    Alert,


    ImageBackground, Image, Dimensions,
} from 'react-native';
import {NavigationActions,StackActions, DrawerActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

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
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default class ChangePassword extends Component {
    state = {
        text: '',
        passwordtext :'',
        isSecure : true,
        username: '',
        status :'',
        ipAdd : '',
        loading:false,
        states:'',
        results: [],
        pushData: [],
        loggedIn: false,
        email:'',
        password:'',

    };

    componentDidMount(){

    }






_YesLogout = ()=>{
  this.props
      .navigation
      .dispatch(StackActions.reset({
          index: 0,
          actions: [
              NavigationActions.navigate({
                  routeName: 'Login',
                  params: { someParams: 'parameters goes here...' },
              }),
          ],
      }))
}



    showLoading() {
        this.setState({loading: true})
    }
    hideLoading() {
        this.setState({loading: false})
    }
    _handlePress = () =>{
        if (this.state.email.length == 0){
            alert('Please Enter Password')
        }else if (this.state.password.length == 0){
            alert('Please Enter Confirm Password Password ')
        }else if (this.state.password != this.state.email){

          Alert.alert('OOPS PLEASE TRY AGAIN','The Passwords entered do not match, Please retry again',
              [{text:"Cancel"},
                  {text:"Yes"},
              ],
              {cancelable:false}
          )



        }else if (this.state.password.length < 6){
          Alert.alert('CREATE PASSWORD','Password must be 6 chracter long',
              [{text:"Cancel"},
                  {text:"Yes"},
              ],
              {cancelable:false}
          )


        }
        else{
            const url = GLOBAL.BASE_URL +  'change_password_patient'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone:GLOBAL.myemail,
                    password: this.state.password,



                }),
            }).then((response) => response.json())
                .then((responseJson) => {

                    this.hideLoading()
                    if (responseJson.status == true) {
                      var s = `Your DISKUSS Account Password has  Changed Successfully. Your New Password is ${this.state.password}`
                    //  alert(s)


                      Alert.alert('PASSWORD CHANGED',s,
                          [{text:"Cancel"},
                              {text:"Yes", onPress:()=>this._YesLogout()
                              },
                          ],
                          {cancelable:false}
                      )



                    }
                    else{
                        alert(response['msg'])
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }





      ///  this.props.navigation.navigate('Otp')
    }

    fieldRef = React.createRef();

    onSubmit = () => {
        let { current: field } = this.fieldRef;



        console.log(field.value());
    };
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
                <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                    <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                        <Image
                            source={require('./back.png')}
                            style={{width: 18, height: 20,marginLeft:20,marginTop:10,resizeMode:'contain'}}


                        />
                    </TouchableOpacity>


                    <Text style = {{marginLeft:28,marginTop:30,fontSize:30,fontFamily:GLOBAL.heavy,}}>
                       Create Password
                    </Text>
                    <Text style={{color: '#8E9198',fontFamily:GLOBAL.roman,fontSize: 18,marginLeft:28,marginTop:20,width:window.width - 90,lineHeight:23}}>
                       Please enter your new password

                    </Text>

                    <View style = {{marginLeft:28,width:window.width -56,marginTop:29}}>
                        <TextField
                            label='New Password'
                            baseColor = '#acb1c0'
                            tintColor = '#acb1c0'
                            value = {this.state.email}
                            onChangeText={(text) => this.setState({email:text})}
                            onSubmitEditing={this.onSubmit}
                            ref={this.fieldRef}
                        />





                        <TextField
                            label='Confirm Password'
                            baseColor = '#acb1c0'
                            tintColor = '#acb1c0'

                            value = {this.state.password}
                            onChangeText={(text) => this.setState({password:text})}
                            onSubmitEditing={this.onSubmit}
                            ref={this.fieldRef}
                        />








                    </View>








                    <Button
                        style={{marginLeft:28,paddingTop: 12 ,fontSize: 14,backgroundColor:'#7BAAED', color: 'white',fontFamily:GLOBAL.medium,marginTop:30,height:40,width:window.width - 56,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePress()}>
                        SAVE
                    </Button>






                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}
