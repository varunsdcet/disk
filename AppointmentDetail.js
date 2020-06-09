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
    FlatList,

    ImageBackground, Image, Dimensions,
} from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Swipers from 'react-native-swiper';
const GLOBAL = require('./Global');
const styles = StyleSheet.create({
    wrapper: {
    },
    AndroidSafeArea: {
        flex: 0,
        backgroundColor: "#639ced",
        paddingTop: Platform.OS === "android" ? 0 : 0
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
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default class AppointmentDetail extends Component {
    state = {
        selectedIndex: 0,
        speciality : ["1","2","3"],
        appointment:[],

    };
    renderRowItem2 = (itemData) => {


        return (

            <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 30, shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 5 }}>

                <View style = {{flexDirection:'row'}}>
                <Image   source= {{uri :this.state.appointment.doctor_image}}
                         style  = {{width:100, height:100,resizeMode:'stretch',margin:10
                         }}

                />
                <View style = {{marginTop:4}}>
                    <Text style={{fontFamily:GLOBAL.heavy,fontSize:18,marginLeft:6,marginTop:8}}>
                    {this.state.appointment.doctor_name}

                    </Text>

                    <View style = {{flexDirection:'row',justifyContent:'space-between',width:'65%'}}>



                    <Text style={{fontFamily:GLOBAL.roman,fontSize:16,marginLeft:6,marginTop:7,color:'#8E9198',width:window.width - 200}}>
                        {this.state.appointment.speciality_detail_array}

                    </Text>

                        <Image   source={require('./video.png')}
                                 style  = {{width:40, height:40,resizeMode:'cover',
                                 }}

                        />

                    </View>
                    <View style = {{flexDirection:'row',marginRight:6,marginTop:-8}}>
                        <Image   source={require('./star.png')}
                                 style  = {{width:12, height:12,resizeMode:'cover',
                                 }}

                        />
                        <Text style={{fontFamily:GLOBAL.heavy,fontSize:14,marginLeft:6,marginTop:1,color:'#1E2432'}}>
                            4

                        </Text>

                    </View>
                </View>


</View>





                <View style = {{width:window.width - 30,height:1,backgroundColor:'#f1f2f6',marginTop:4}}>

                </View>


                <View style = {{flexDirection:'row',marginTop:8,justifyContent:'space-between'}}>
                    <Text style={{fontFamily:GLOBAL.heavy,fontSize:14,marginLeft:14,marginTop:4,color:'#1E2432'}}>
                        {this.state.appointment.appointment_date}

                    </Text>

                    <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginRight:14,marginTop:15,color:'#4ce5b1'}}>
                       CONFIRMED

                    </Text>
                </View>


                <Text style={{fontFamily:GLOBAL.heavy,fontSize:14,marginLeft:14,marginTop:-12,marginBottom:12,color:'#1E2432'}}>
                   {this.state.appointment.appointment_time}

                </Text>

            </View>

        )
    }

    _handlePressRating = () =>{
      this.props.navigation.navigate('Rating',this.state.appointment)
    }

    _handleStateChange = (state) =>{
      const url = GLOBAL.BASE_URL +  'list_apointment'

                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                user_id:GLOBAL.user_id,


                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {






                                if (responseJson.status == true) {
                                  this.setState({appointment:responseJson.list_appointment})

                                }else {
                                    alert('Unable to get Connect You. Please try again after Sometime.')
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
    }

    componentDidMount(){
   this.setState({appointment:this.props.navigation.state.params})

    }


    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };
_handlePress = () =>{

  this.props.navigation.navigate('Reschedule',this.state.appointment)
}
_handlePressCancel = () =>{
  const url = GLOBAL.BASE_URL +  'cancel_appointment'

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            booking_id:this.state.appointment.booking_id,


                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {


                            if (responseJson.status == true) {
                              alert('Your Appointment is Cancelled')
  this.props.navigation.goBack()

                            }else {
                                alert('Unable to get Connect You. Please try again after Sometime.')
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
}


    render(){
        return (
            <SafeAreaView style={styles.AndroidSafeArea}>
                <StatusBar backgroundColor="#639ced" barStyle="light-content" />

                <View style = {{height:70,backgroundColor:'#639ced',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                    <View>
                    <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                        <Image
                            source={require('./white-back.png')}
                            style={{width: 18, height: 20,marginLeft:20,marginTop:22,resizeMode:'contain'}}


                        />
                    </TouchableOpacity>
                    </View>


                    <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight:30}}>
                        Appointment  Details
                    </Text>


                    <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight: 10}}>

                    </Text>

                </View>



                <KeyboardAwareScrollView style={{ backgroundColor: '#fcfcfe',marginTop:0 }} >



                <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 30, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 5 }}>

                    <View style = {{flexDirection:'row'}}>
                    <Image   source= {{uri :this.state.appointment.doctor_image}}
                             style  = {{width:100, height:100,resizeMode:'stretch',margin:10
                             }}

                    />
                    <View style = {{marginTop:4}}>
                        <Text style={{fontFamily:GLOBAL.heavy,fontSize:18,marginLeft:6,marginTop:8}}>
                        {this.state.appointment.doctor_name}

                        </Text>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',width:'65%'}}>



                        <Text style={{fontFamily:GLOBAL.roman,fontSize:16,marginLeft:6,marginTop:7,color:'#8E9198',width:window.width - 200}}>
                            {this.state.appointment.speciality_detail_array}

                        </Text>

                        {this.state.appointment.online_type == "audio" && (
                          <Image   source={require('./call.png')}
                                   style  = {{width:40, height:40,resizeMode:'cover',
                                   }}

                          />
                        )}
                        {this.state.appointment.online_type == "video" && (
                          <Image   source={require('./video.png')}
                                   style  = {{width:40, height:40,resizeMode:'cover',
                                   }}

                          />
                        )}
                        {this.state.appointment.online_type == "chat" && (
                          <Image   source={require('./askquestion.png')}
                                   style  = {{width:40, height:40,resizeMode:'cover',
                                   }}

                          />
                        )}

                        </View>
                        <View style = {{flexDirection:'row',marginRight:6,marginTop:2}}>
                            <Image   source={require('./star.png')}
                                     style  = {{width:12, height:12,resizeMode:'cover',
                                     }}

                            />
                            <Text style={{fontFamily:GLOBAL.heavy,fontSize:14,marginLeft:6,marginTop:1,color:'#1E2432'}}>
                                {this.state.appointment.rattings}

                            </Text>

                        </View>
                    </View>


              </View>





                    <View style = {{width:window.width - 30,height:1,backgroundColor:'#f1f2f6',marginTop:4}}>

                    </View>


                    <View style = {{marginTop:2}}>

                    <Text style={{fontFamily:GLOBAL.medium,fontSize:14,marginLeft:14,marginTop:1,marginBottom:1,color:'#acb1c0'}}>
                      APPOINTMENT SCHEDULE FOR

                    </Text>
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:12,marginBottom:6,marginLeft:14,marginTop:1,color:'#1e2432'}}>
                            {this.state.appointment.appointment_date} {this.state.appointment.appointment_time}

                        </Text>


                    </View>




                </View>




                <View style = {{height:70,marginTop:window.height - 350,flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
   {this.state.appointment.reshedule_power == 1 && (
     <Button
         style={{marginLeft:18,paddingTop: 18 ,fontSize: 14,backgroundColor:'#7BAAED', color: 'white',fontFamily:GLOBAL.medium,marginTop:6,height:50,width:window.width - 206,borderRadius:4}}
         styleDisabled={{color: 'red'}}
         onPress={() => this._handlePress()}>
       RESCHEDULE
     </Button>
   )}
   {this.state.appointment.cancel_power == 1 && (
     <Button
         style={{marginLeft:28,paddingTop: 18 ,fontSize: 14,backgroundColor:'#ced4e2',marginRight:40 ,color: 'white',fontFamily:GLOBAL.medium,marginTop:6,height:50,width:120,borderRadius:4}}
         styleDisabled={{color: 'red'}}
         onPress={() => this._handlePressCancel()}>
       CANCEL
     </Button>
   )}

   {this.state.appointment.cancel_power == 0 && this.state.appointment.reshedule_power == 0 && (
     <Button
         style={{marginLeft:28,paddingTop: 18 ,fontSize: 14,backgroundColor:'#ced4e2',marginRight:40 ,color: 'white',fontFamily:GLOBAL.medium,marginTop:6,height:50,width:120,borderRadius:4}}
         styleDisabled={{color: 'red'}}
         onPress={() => this._handlePressRating()}>
       RATING
     </Button>
   )}

                </View>

                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
