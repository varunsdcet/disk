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
    Alert,

    ImageBackground, Image, Dimensions,
} from 'react-native';
import {NavigationActions,StackActions, DrawerActions} from 'react-navigation';
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

export default class Booking extends Component {
    state = {
        selectedIndex: 0,
        speciality : ["1","2","3"]

    };

    cat = () => {
        GLOBAL.matchid = "live13"
        this.props.navigation.navigate('MyChat')
    }

    _YesLogout=()=>{




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
    cats = () => {
        this.props.navigation.navigate("VideoCall", {
            channelName: GLOBAL.bookingid,
            onCancel: (message) => {
                this.setState({
                    visible: true,
                    mesxsage
                });
            }
        })
    }

    renderRowItem2 = (itemData) => {

        return (

            <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 30, shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 5 }}>

                <View style = {{flexDirection:'row'}}>
                    <Image   source={require('./picb.png')}
                             style  = {{width:100, height:100,resizeMode:'stretch',margin:10
                             }}

                    />
                    <View style = {{marginTop:4}}>
                        <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginLeft:6,marginTop:18}}>
                            Jean Brooks

                        </Text>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',width:'65%'}}>



                            <Text style={{fontFamily:GLOBAL.roman,fontSize:16,marginLeft:6,marginTop:4,color:'#8E9198'}}>
                                Cardiology

                            </Text>

                            <Image   source={require('./video.png')}
                                     style  = {{width:40, height:40,resizeMode:'cover',
                                     }}

                            />

                        </View>
                        <View style = {{flexDirection:'row',marginRight:8,marginTop:-12}}>
                            <Image   source={require('./star.png')}
                                     style  = {{width:12, height:12,resizeMode:'cover',
                                     }}

                            />
                            <Text style={{fontFamily:GLOBAL.roman,fontSize:12,marginLeft:6,marginTop:1,color:'#1E2432'}}>
                                4.8

                            </Text>

                        </View>
                    </View>


                </View>





                <View style = {{width:window.width - 30,height:1,backgroundColor:'#f1f2f6',marginTop:10}}>

                </View>


                <View style = {{flexDirection:'row',marginTop:8,justifyContent:'space-between'}}>
                    <Text style={{fontFamily:GLOBAL.medium,fontSize:14,marginLeft:14,marginTop:4,color:'#1E2432'}}>
                        08.00 - 08.15 on thrusday

                    </Text>

                    <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginRight:14,marginTop:15,color:'#4ce5b1'}}>
                        CONFIRMED

                    </Text>
                </View>


                <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:14,marginTop:-12,marginBottom:12,color:'#1E2432'}}>
                    June 27 2019

                </Text>

            </View>

        )
    }
    componentDidMount(){


    }


    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };


call = (type) =>{
  if (GLOBAL.user_id == "0"){

    Alert.alert('UN-REGISTERED USER','You seem to be an Un-Registered User. To Use DISKUSS kindly create an account and Log In.',
        [{text:"Cancel"},
            {text:"Yes", onPress:()=>this._YesLogout()
            },
        ],
        {cancelable:false}
      )
}else{
  GLOBAL.type = type
  this.props.navigation.navigate('BookingDetail')
}

}

    render(){
  var audio = "";
  var video = "";
  var ask = "";
      if ( GLOBAL.booking.currency == "INR"){
        audio = `CONSULTATION FEE:  ₹ ${GLOBAL.booking.online_consult_audio_price} for 15 Minutes Duration `;
          video = `CONSULTATION FEE:  ₹ ${GLOBAL.booking.online_consult_video_price} for 15 Minutes Duration`;
            ask = `CONSULTATION FEE:  ₹ ${GLOBAL.booking.online_consult_chat_price} for 15 Minutes Duration`;
      }else {
        audio = `CONSULTATION FEE:   $ ${GLOBAL.booking.online_consult_audio_price} for 15 Minutes Duration`;
          video = `CONSULTATION FEE:  $ ${GLOBAL.booking.online_consult_video_price} for 15 Minutes Duration `;
            ask = `CONSULTATION FEE:  $ ${GLOBAL.booking.online_consult_chat_price} for 15 Minutes Duration`;
      }

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
                        Booking
                    </Text>


                    <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight: 10}}>

                    </Text>

                </View>

                <KeyboardAwareScrollView style={{ backgroundColor: '#fcfcfe',marginTop:0 }} >

                    <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 20, shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 5 }}>




                        <View style = {{flexDirection:'row'}}>
                            <Image   source={{uri:GLOBAL.booking.image}}
                                     style  = {{width:100, height:100,resizeMode:'stretch',margin:10
                                     }}

                            />
                            <View style = {{marginTop:4}}>
                                <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginLeft:6,marginTop:5}}>
                                    {GLOBAL.booking.name}

                                </Text>


                                <View style = {{flexDirection:'row',marginTop:6}}>


                                    {GLOBAL.booking.doctor_avail_status == "0" && (
                                        <View style = {{flexDirection:'row',marginTop:7}}>
                                            <View style = {{backgroundColor:'#f10000',height:8,width:8,borderRadius:4,marginTop:5,marginLeft:10}}>
                                            </View>
                                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,color:'#f10000'}}>
                                                  Online Again in {GLOBAL.booking.check_next_time_slots} 

                                        </Text>

                                        </View>

                                    )}
                                    {GLOBAL.booking.doctor_avail_status == "1" && (
                                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,marginTop:5,color:'#42cd00'}}>
                                            Online Now For Consultation

                                        </Text>

                                    )}
                                    {GLOBAL.booking.doctor_avail_status == "2" && (
                                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,marginTop:5,color:'orange'}}>
                                          Busy

                                        </Text>

                                    )}
                                </View>


                                    <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:6,marginTop:7,color:'#8E9198',width:window.width - 130,textAlign:'justify',lineHeight:20}}>
                                        {GLOBAL.booking.speciality_detail_array}

                                    </Text>




                                <View style = {{flexDirection:'row',marginLeft:6,marginTop:8}}>
                                    <Image   source={require('./star.png')}
                                             style  = {{width:12, height:12,resizeMode:'cover',
                                             }}

                                    />
                                    <Text style={{fontFamily:GLOBAL.roman,fontSize:12,marginLeft:6,marginTop:1,color:'#1E2432'}}>
                                        {GLOBAL.booking.ratting}

                                    </Text>

                                </View>
                            </View>


                        </View>









                    </View>


                    <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 20,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 5 }}>


                        <View style = {{width:window.width - 20 ,height:50,backgroundColor:'#ced4e2'}}>


                            <Text style={{fontFamily:GLOBAL.medium,fontSize:18,marginLeft:16,marginTop:14,color:'white'}}>
                                Consult Online

                            </Text>





                        </View>

                        <TouchableOpacity onPress={()=>this.call('audio')}>
                        <View>
                        <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>

                            <Text style={{fontFamily:GLOBAL.medium,fontSize:17,marginLeft:10,color:'#1E2432'}}>
                                    Audio Call

                            </Text>

                            <Image   source={require('./backs.png')}
                                     style  = {{width:20, height:20,resizeMode:'contain',marginRight:8
                                     }}

                            />

                        </View>


                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,marginTop:4,color:'#8E9198',width:window.width - 70,lineHeight:20 }}>
                           Schedule an Appointment

                        </Text>

                        <Text style={{fontFamily:GLOBAL.medium,fontSize:16,marginLeft:10,marginTop:4,color:'#F2C1D7',width:window.width - 70,lineHeight:20 }}>
                           {audio}

                        </Text>
                        <View style = {{width:window.width - 40,height:1,backgroundColor:'#f1f2f6',marginTop:10,marginLeft:10}}>

                        </View>


</View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.call('video')}>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>

                            <Text style={{fontFamily:GLOBAL.medium,fontSize:17,marginLeft:10,color:'#1E2432'}}>
                                Video Call

                            </Text>

                            <Image   source={require('./backs.png')}
                                     style  = {{width:20, height:20,resizeMode:'contain',marginRight:8
                                     }}

                            />

                        </View>


                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,marginTop:4,color:'#8E9198',width:window.width - 70,lineHeight:20  }}>
                            Schedule an Appointment

                        </Text>

                        <Text style={{fontFamily:GLOBAL.medium,fontSize:16,marginLeft:10,marginTop:4,color:'#F2C1D7',width:window.width - 70 ,lineHeight:20}}>
                            {video}

                        </Text>
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,marginTop:4,color:'#8E9198',width:window.width - 70,lineHeight:20 ,textAlign:'justify' }}>
                               After the Video Call you can contact the Expert via Free Messaging for 24 Hours for any queries that you may have

                        </Text>
                        <View style = {{width:window.width - 40,height:1,backgroundColor:'#f1f2f6',marginTop:10,marginLeft:10}}>

                        </View>
                        </TouchableOpacity>

                          <TouchableOpacity onPress={()=>this.call('chat')}>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>

                            <Text style={{fontFamily:GLOBAL.medium,fontSize:17,marginLeft:10,color:'#1E2432'}}>
                                Chat Support

                            </Text>

                            <Image   source={require('./backs.png')}
                                     style  = {{width:20, height:20,resizeMode:'contain',marginRight:8
                                     }}

                            />

                        </View>


                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,marginTop:4,color:'#8E9198',width:window.width - 70,lineHeight:20  }}>
                         Get Help via Messages

                        </Text>

                        <Text style={{fontFamily:GLOBAL.medium,marginBottom:10,fontSize:16,marginLeft:10,marginTop:4,color:'#F2C1D7',width:window.width - 70,lineHeight:20 }}>
                            {ask}

                        </Text>


                        </TouchableOpacity>


                    </View>

<Text style = {{height:140}}>
</Text>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
