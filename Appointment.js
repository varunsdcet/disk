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

export default class Appointment extends Component {
    state = {
        selectedIndex: 0,
        speciality : ["1","2","3"],
        appointment:[],

    };

chat = (item) =>{
  GLOBAL.mybookingid = item.booking_id
  GLOBAL.bookingid = item.t4_hours_chat_id
  this.props.navigation.navigate('CompletedChat')
}

    renderRowItem2 = (itemData) => {


        return (
    <TouchableOpacity onPress= {()=>this.props.navigation.navigate('AppointmentDetail',itemData.item)}>
            <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 30, shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 5 }}>

                <View style = {{flexDirection:'row'}}>
                <Image   source= {{uri :itemData.item.doctor_image}}
                         style  = {{width:100, height:100,resizeMode:'stretch',margin:10
                         }}

                />
                <View style = {{marginTop:4}}>
                    <Text style={{fontFamily:GLOBAL.heavy,fontSize:18,marginLeft:6,marginTop:8}}>
                    {itemData.item.doctor_name}

                    </Text>

                    <View style = {{flexDirection:'row',justifyContent:'space-between',width:'65%'}}>



                    <Text style={{fontFamily:GLOBAL.roman,fontSize:16,marginLeft:6,marginTop:7,color:'#8E9198',width:window.width - 200}}>
                        {itemData.item.speciality_detail_array}

                    </Text>

{itemData.item.online_type == "audio" && (
  <Image   source={require('./call.png')}
           style  = {{width:40, height:40,resizeMode:'cover',
           }}

  />
)}
{itemData.item.online_type == "video" && (
  <Image   source={require('./video.png')}
           style  = {{width:40, height:40,resizeMode:'cover',
           }}

  />
)}
{itemData.item.online_type == "chat" && (
  <Image   source={require('./askquestion.png')}
           style  = {{width:40, height:40,resizeMode:'cover',
           }}

  />
)}


                    </View>
                    <View style = {{flexDirection:'row',marginRight:6,marginTop:2,justifyContent:'space-between'}}>
                    <View style = {{flexDirection:'row'}}>
                        <Image   source={require('./star.png')}
                                 style  = {{width:12, height:12,resizeMode:'cover',
                                 }}

                        />
                        <Text style={{fontFamily:GLOBAL.heavy,fontSize:14,marginLeft:6,marginTop:1,color:'#1E2432'}}>
                              {itemData.item.rattings}

                        </Text>

                        </View>
                        {itemData.item.t24_hours_signla == 1 && (
                              <TouchableOpacity onPress= {()=>this.chat(itemData.item)}>
                          <Image   source={require('./askquestion.png')}
                                   style  = {{width:32, height:32,marginRight:20,resizeMode:'cover',
                                   }}

                          />
                          </TouchableOpacity>
                        )}
                    </View>


                </View>


</View>





                <View style = {{width:window.width - 30,height:1,backgroundColor:'#f1f2f6',marginTop:4}}>

                </View>


                <View style = {{flexDirection:'row',marginTop:8,justifyContent:'space-between'}}>
                    <Text style={{fontFamily:GLOBAL.heavy,fontSize:14,marginLeft:14,marginTop:4,color:'#1E2432'}}>
                        {itemData.item.appointment_date}

                    </Text>
{itemData.item.status == "2" && (
  <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginRight:14,marginTop:15,color:'red'}}>
       {itemData.item.booking_status}

  </Text>
)}
{itemData.item.status == "1" && (
  <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginRight:14,marginTop:15,color:'#7BAAED'}}>
       {itemData.item.booking_status}

  </Text>
)}
{itemData.item.status != "2" && itemData.item.status != "1" && (
  <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginRight:14,marginTop:15,color:'#4ce5b1'}}>
       {itemData.item.booking_status}

  </Text>
)}

                </View>


                <Text style={{fontFamily:GLOBAL.heavy,fontSize:14,marginLeft:14,marginTop:-12,marginBottom:12,color:'#1E2432'}}>
                   {itemData.item.appointment_time}

                </Text>

            </View>
            </TouchableOpacity>

        )
    }



    lists = ()=>{
        this.setState({appointment:[]})
      const url = GLOBAL.BASE_URL +  'list_apointment_past'

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
          this.setState({appointment:[]})
                                   // alert('Unable to get Connect You. Please try again after Sometime.')
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
    }

    list = ()=>{
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
                                  this.setState({appointment:[]})

                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
    }

    _handleStateChange = (state) =>{
    this.list()
    }
    _YesLogout=()=>{



          GLOBAL.user_id = "0"

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

    componentDidMount(){
      if (GLOBAL.user_id != "0"){
this.props.navigation.addListener('willFocus', this._handleStateChange);
}
    }


    handleIndexChange = index => {

        this.setState({
            ...this.state,
            selectedIndex: index
        });
        if (index == 1){
  this.lists()
        }else{
              this.list()
        }
    };




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
                        Appointments
                    </Text>


                    <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight: 10}}>

                    </Text>

                </View>

                <KeyboardAwareScrollView style={{ backgroundColor: '#fcfcfe',marginTop:0 }} >


                {GLOBAL.user_id == "0" && (

                  <View style = {{height:window.height,backgroundColor:'white'}}>

                                  <Text style = {{marginTop:150,color:'grey',textAlign:'center',marginLeft:30,width:window.width - 60}}>
                  You seem to be an unregistered User. To Book  service with us,kindly Register First.
                  </Text>
                  <Button
                      style={{alignSelf:'center',paddingTop: 10 ,fontSize: 15,backgroundColor:'white',borderWidth:1,borderRadius:20,borderColor:'#7BAAED', color: '#7BAAED',fontFamily:GLOBAL.medium,marginTop:30,height:40,width:130,borderRadius:30}}
                      styleDisabled={{color: 'red'}}
                      onPress={() => this._YesLogout()}>
                      LOGIN
                  </Button>
                  </View>

                )}



                    <View style = {{width:360,alignSelf:'center',backgroundColor:'#f7f7f7',borderRadius:33,marginTop:20}}>
                    <SegmentedControlTab

                        activeTabStyle= {{borderWidth:0,borderTopLeftRadius:33,borderBottomLeftRadius:33,backgroundColor:'#fcebbf',borderTopRightRadius:22,borderBottomRightRadius:22,borderRadius:22,borderColor:'#f7f7f7'}}
                        tabStyle = {{height:33,borderRadius:33,borderWidth:0,backgroundColor:'#f7f7f7',borderColor:'#f7f7f7'}}
                        tabTextStyle = {{color:'#acb1c0',fontFamily:GLOBAL.medium,fontSize:15,paddingTop:4}}
                        activeTabTextStyle = {{color:'#43454a',fontFamily:GLOBAL.medium,fontSize:15}}
                        firstTabStyle = {{borderBottomLeftRadius:33,borderTopLeftRadius:33}}
                        lastTabStyle={{borderTopRightRadius:33,borderBottomRightRadius:33}}
                        values={["Upcoming", "Past",]}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleIndexChange}
                    />
                    </View>
                    {this.state.appointment.length == 0 && (
                                      <View>
                                      <Image
                                          source={require('./noappointment.png')}
                                          style={{width: 80, height: 80,marginLeft:10,marginTop:window.height/2 - 120,resizeMode:'contain',alignSelf:'center'}}


                                      />

                                      <Text style = {{color:'#cccccc',alignSelf:'center',fontSize:22,marginTop:10,fontFamily:GLOBAL.medium}}>
                                       No Appointment right now !
                                      </Text>
                                      </View>

                                    )}

{this.state.appointment.length != 0 && (
                    <FlatList style = {{marginTop:6,marginLeft:5,width:window.width - 10}}
                              data={this.state.appointment}
                              keyExtractor={this._keyExtractor}
                              renderItem={this.renderRowItem2}
                              extraData={this.state}
                    />
                  )}
                    <Text style = {{height:100}}>
                    </Text>

                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
