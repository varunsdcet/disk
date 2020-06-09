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
    TextInput,

    ImageBackground, Image, Dimensions,
} from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import moment from 'moment';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Swipers from 'react-native-swiper';
import CalendarPicker from 'react-native-calendar-picker';
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

export default class BookingFinal extends Component {
    constructor(props) {
        super(props);
    this.state = {
        selectedIndex: 0,
        speciality: ["1", "2", "3","3","2","3","2","3"],
        value: '',
        text: '',
        time:[],
    };
        this.onDateChange = this.onDateChange.bind(this);

    }
    onDateChange(date) {
      GLOBAL.time  = ''
      var t = new Date( date );
             var s = moment(t).format('YYYY-MM-DD')
             GLOBAL.date = s
     //        alert(GLOBAL.date)
             this.calculateDay(s)

        this.setState({
            selectedStartDate: date,
        });
    }

calculateDay = (date) =>{

  const url = GLOBAL.BASE_URL +  'common_time_slots_comm'

                  fetch(url, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          user_id:GLOBAL.user_id,
                          for_time:GLOBAL.type,
                          id: GLOBAL.booking.id,
                          select_date:date,


                      }),
                  }).then((response) => response.json())
                      .then((responseJson) => {






                          if (responseJson.status == true) {
                            this.setState({time:responseJson.slot})

                          }else {
                              this.setState({time:[]})
                          }
                      })
                      .catch((error) => {
                          console.error(error);
                      });
}

myback = (item,index)=>{

  var a  = this.state.time[index]



  if (item.is_selected == ''){
     a.is_selected = 'Y'
     this.state.time[index] = a
     GLOBAL.time  = item.time

  }else {
     a.is_selected = ''
        this.state.time[index] = a
  }
  this.setState({time:  this.state.time})
}

    renderRowItem2 = (itemData) => {

        return (
            <TouchableOpacity  onPress= {()=>this.myback(itemData.item,itemData.index)}>
            <View style={{backgroundColor:'white',color :'white', flex: 1,height:30,margin: 10,borderRadius :9, shadowColor: '#000',borderWidth:1,borderColor:'#8E9198',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 5 ,padding:5 }}>

                {itemData.item.is_selected == '' && (
                  <Text style = {{fontFamily:GLOBAL.roman,color:'#8E9198',textAlign:'center'}}>

                      {itemData.item.time}
                  </Text>
                )}

                {itemData.item.is_selected != '' && (
                  <Text style = {{fontFamily:GLOBAL.roman,backgroundColor:'#fcebbf',textAlign:'center'}}>

                      {itemData.item.time}
                  </Text>
                )}


            </View>
            </TouchableOpacity>


        )
    }

buttonClickListenerPay = () =>{
  if (GLOBAL.time == ""){
    alert('Please select time slot')
  }else {
  this.props.navigation.navigate('BookingPayment')
}
}

    componentDidMount(){
      var date = new Date()
             var s = moment(date).format('YYYY-MM-DD')
             GLOBAL.date = s
             this.calculateDay(s)
    }


    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };




    render(){
      const minDate = new Date();
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
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
                                <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginLeft:6,marginTop:18}}>
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




                                <View style = {{flexDirection:'row',marginLeft:6,marginTop:5}}>
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


                    <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 20 ,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 5 }}>


                        <View style = {{width:window.width - 20 ,height:40,backgroundColor:'#ced4e2'}}>


                            <Text style={{fontFamily:GLOBAL.medium,fontSize:18,marginLeft:6,marginTop:12,color:'white'}}>
                               Select Date

                            </Text>







                        </View>









                        <CalendarPicker
                            onDateChange={this.onDateChange}
                            selectedDayColor = {'#fcebbf'}
                            enableSwipe={ true}
                            minDate = {minDate}
                        />



                    </View>

                    {this.state.time.length == 0 && (
                      <View style = {{width:window.width - 20 ,height:40,backgroundColor:'#ced4e2',alignSelf:'center',borderRadius:10,marginBottom:15,marginTop:8}}>


                          <Text style={{fontFamily:GLOBAL.medium,fontSize:18,marginLeft:6,marginTop:10,color:'white'}}>
                              No Timeslot Available

                          </Text>







                      </View>


                    )}


{this.state.time.length != 0 && (


                    <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 20 ,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 5 }}>


                        <View style = {{width:window.width - 20 ,height:40,backgroundColor:'#ced4e2'}}>


                            <Text style={{fontFamily:GLOBAL.medium,fontSize:18,marginLeft:6,marginTop:12,color:'white'}}>
                                Select Time

                            </Text>







                        </View>









                        <FlatList style = {{marginTop:6,marginLeft:5,width:window.width - 20,marginBottom:10}}
                                  data={this.state.time}
                                  numColumns={4}
                                  keyExtractor={this._keyExtractor}
                                  renderItem={this.renderRowItem2}
                                  extraData={this.state}
                        />



                    </View>

)}

                    <View style = {{backgroundColor:'#F2C1D7',width:window.width -20,height:50,alignSelf:'center',marginBottom:30,borderRadius:12,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:18,marginLeft:6,marginTop:12,color:'white'}}>
                            Amount Payable

                        </Text>
                        {GLOBAL.type == 'chat' && (
                          <View>
  {GLOBAL.booking.currency == 'INR' && (

                          <Text style={{fontFamily:GLOBAL.roman,fontSize:18,marginRight:6,marginTop:12,color:'white'}}>
                              ₹ {GLOBAL.booking.online_consult_chat_price}

                          </Text>
                        )}

                        {GLOBAL.booking.currency != 'INR' && (

                                                <Text style={{fontFamily:GLOBAL.roman,fontSize:18,marginRight:6,marginTop:12,color:'white'}}>
                                                    $ {GLOBAL.booking.online_consult_chat_price}

                                                </Text>
                                              )}

                          </View>
                        )}
                        {GLOBAL.type == 'video' && (


                          <View>
                      {GLOBAL.booking.currency == 'INR' && (

                          <Text style={{fontFamily:GLOBAL.roman,fontSize:18,marginRight:6,marginTop:12,color:'white'}}>
                              ₹ {GLOBAL.booking.online_consult_video_price}

                          </Text>
                        )}

                        {GLOBAL.booking.currency != 'INR' && (

                                                <Text style={{fontFamily:GLOBAL.roman,fontSize:18,marginRight:6,marginTop:12,color:'white'}}>
                                                    $ {GLOBAL.booking.online_consult_video_price}

                                                </Text>
                                              )}

                          </View>


                        )}
                        {GLOBAL.type == 'audio' && (


                          <View>
                      {GLOBAL.booking.currency == 'INR' && (

                          <Text style={{fontFamily:GLOBAL.roman,fontSize:18,marginRight:6,marginTop:12,color:'white'}}>
                              ₹ {GLOBAL.booking.online_consult_audio_price}

                          </Text>
                        )}

                        {GLOBAL.booking.currency != 'INR' && (

                                                <Text style={{fontFamily:GLOBAL.roman,fontSize:18,marginRight:6,marginTop:12,color:'white'}}>
                                                    $ {GLOBAL.booking.online_consult_audio_price}

                                                </Text>
                                              )}

                          </View>


                        )}


                    </View>


                    <Button
                        style={{marginLeft:15,paddingTop: 12 ,fontSize: 14,backgroundColor:'#7BAAED', color: 'white',fontFamily:GLOBAL.medium,marginTop:20,marginBottom:30,height:40,width:window.width - 30,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.buttonClickListenerPay()}>
                        PROCEED TO PAYMENT
                    </Button>

                    <View style = {{backgroundColor:'#F2C1D7',width:window.width -20,height:40,alignSelf:'center',marginBottom:30}}>


                    </View>


                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
