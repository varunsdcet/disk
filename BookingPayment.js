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
    NativeModules,
    NativeEventEmitter, DeviceEventEmitter,
    ActivityIndicator,

    ImageBackground, Image, Dimensions,
} from 'react-native';
var randomString = require('random-string');
import paytm from '@philly25/react-native-paytm';
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
const paytmConfig = {
    MID: 'TXvOFA01468432899358',
    WEBSITE: 'APPSTAGING',
    CHANNEL_ID: 'WAP',
    INDUSTRY_TYPE_ID: 'Retail',
    CALLBACK_URL: 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID='
};
const styles = StyleSheet.create({
    wrapper: {
    },
    AndroidSafeArea: {
        flex: 0,
        backgroundColor: "#639ced",
        paddingTop: Platform.OS === "android" ? 0 : 0
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
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

export default class BookingPayment extends Component {
    state = {
        selectedIndex: 0,
        speciality : ["1","2","3"],
        wallet:'',
        amount:'',
        issue:'',
        consult:'',
        walletCheck:false,
        consultCheck:false,
        wd:'',
        cd:'',
        payable:'',
        pay:'',
            loading:false,

    };

    cat = () => {
        GLOBAL.matchid = "live13"
        this.props.navigation.navigate('MyChat')
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
    showLoading() {
        this.setState({loading: true})
    }
    hideLoading() {
        this.setState({loading: false})
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





      var imgid = ""

    for (var i = 0; i< GLOBAL.issue.length ; i ++){
        imgid = imgid + GLOBAL.issue[i] + ','
    }
    if (imgid == ""){

    } else{
        imgid = imgid.slice(0,-1)

    }
    this.setState({issue:imgid})

      if (Platform.OS === 'ios') {
          const { RNPayTm } = NativeModules;

          this.emitter = new NativeEventEmitter(RNPayTm);
          this.emitter.addListener('PayTMResponse', this.onPayTmResponse);
      } else {

          DeviceEventEmitter.addListener('PayTMResponse', this.onPayTmResponse);
      }
      const url = GLOBAL.BASE_URL +  'get_profile'

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
        var k = ""

        if (GLOBAL.currency == "OTHER"){
          k = parseFloat(responseJson.wallet) * parseFloat(GLOBAL.dollar)

        }else{
          k = responseJson.wallet
        }


                                  this.setState({wallet:k})
        this.setState({consult:responseJson.user_details.total_c_points})

var a = 0;
  if (GLOBAL.type == 'chat'){
    a = parseInt(GLOBAL.booking.online_consult_chat_price)
  }else if (GLOBAL.type == 'video'){
      a = parseInt(GLOBAL.booking.online_consult_video_price)
  }else{
      a = parseInt(GLOBAL.booking.online_consult_audio_price)
  }
  var b = a
  this.setState({amount:b.toString()})
this._calculations()



                                }else {
                                    alert('Unable to get Connect You. Please try again after Sometime.')
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
    }


    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

    myPaymentsd = () => {
      console.log(this.state.payable)
        console.log(this.state.wd)
        var dd = ""
if (this.state.wd >= this.state.payable){
  dd = "0"
}else{
  dd = ""
}


        var ddd =  JSON.stringify({
                                    BANKNAME:'',
                                    BANKTXNID:'',
                                      CHECKSUMHASH:'',
                                        CURRENCY:'',
                                          GATEWAYNAME:'',
                                            MID:'',
                                              ORDERID:'',
                                                PAYMENTMODE:'',
                                                  RESPCODE:'01',
                                                    RESPMSG:'',
                                                      STATUS:'',
                                                        TXNAMOUNT:dd,
                                                          TXNDATE:'',
                                                            TXNID:'',
                                                              status:"Success",
                                                              user_id:GLOBAL.user_id,
                                                              payment_type:'online',
                                                              module:GLOBAL.type,
                                                              doctor_id:GLOBAL.booking.id,
                                                              booking_for:'self',
                                                              online_mode:GLOBAL.type,
                                                              booking_time:GLOBAL.time,
                                                              booking_date:GLOBAL.date,
                                                              total_amount:this.state.payable,
                                                              discount_amount:'0',
                                                              wallet_amount:this.state.wd,
                                                              referral_amount:'0',
                                                              trxn_mode:'0',
                                                              images: GLOBAL.imgid,
                                                              issues:this.state.issue,
                                                              consultation_points:this.state.cd,





                                })
          console.log(ddd)


//alert(this.state.wd)
      this.showLoading()

      const url = GLOBAL.BASE_URL +  'paytm_payment_gateway_url'

                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                BANKNAME:'',
                                BANKTXNID:'',
                                  CHECKSUMHASH:'',
                                    CURRENCY:'',
                                      GATEWAYNAME:'',
                                        MID:'',
                                          ORDERID:'',
                                            PAYMENTMODE:'',
                                              RESPCODE:'01',
                                                RESPMSG:'',
                                                  STATUS:'',
                                                    TXNAMOUNT:'',
                                                      TXNDATE:'',
                                                        TXNID:'',
                                                          status:"Success",
                                                          user_id:GLOBAL.user_id,
                                                          payment_type:'online',
                                                          module:GLOBAL.type,
                                                          doctor_id:GLOBAL.booking.id,
                                                          booking_for:'self',
                                                          online_mode:GLOBAL.type,
                                                          booking_time:GLOBAL.time,
                                                          booking_date:GLOBAL.date,
                                                          total_amount:this.state.payable,
                                                          discount_amount:'0',
                                                          wallet_amount:this.state.wd,
                                                          referral_amount:'0',
                                                          trxn_mode:'0',
                                                          images: GLOBAL.imgid,
                                                          issues:this.state.issue,
                                                          consultation_points:this.state.cd,





                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {

        this.hideLoading()





                                if (responseJson.status == true) {
        //alert('Your Booking Success')
        this.props.navigation.navigate('Thankyou')
                                 // this.setState({wallet:responseJson.wallet})

                                }else {
                                    alert('Unable to get Connect You. Please try again after Sometime.')
                                }
                            })
                            .catch((error) => {
            this.hideLoading()
                                console.error(error);
                            });
    }

myPayments = (res) => {

this.showLoading()
  const url = GLOBAL.BASE_URL +  'paytm_payment_gateway_url'

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            BANKNAME:res["BANKNAME"],
                            BANKTXNID:res["BANKTXNID"],
                              CHECKSUMHASH:res["CHECKSUMHASH"],
                                CURRENCY:res["CURRENCY"],
                                  GATEWAYNAME:res["GATEWAYNAME"],
                                    MID:res["MID"],
                                      ORDERID:res["ORDERID"],
                                        PAYMENTMODE:res["PAYMENTMODE"],
                                          RESPCODE:res["RESPCODE"],
                                            RESPMSG:res["RESPMSG"],
                                              STATUS:res["STATUS"],
                                                TXNAMOUNT:res["TXNAMOUNT"],
                                                  TXNDATE:res["TXNDATE"],
                                                    TXNID:res["TXNID"],
                                                      status:"Success",
                                                      user_id:GLOBAL.user_id,
                                                      payment_type:'online',
                                                      module:GLOBAL.type,
                                                      doctor_id:GLOBAL.booking.id,
                                                      booking_for:'self',
                                                      online_mode:GLOBAL.type,
                                                      booking_time:GLOBAL.time,
                                                      booking_date:GLOBAL.date,
                                                      total_amount:this.state.payable,
                                                      discount_amount:'0',
                                                      wallet_amount:this.state.wd,
                                                      referral_amount:'0',
                                                      trxn_mode:'0',
                                                      images: GLOBAL.imgid,
                                                      issues:this.state.issue,
                                                      consultation_points:this.state.cd,





                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {

  //  alert(JSON.stringify(responseJson))


this.hideLoading()


                            if (responseJson.status == true) {
  //  alert('Your Booking Success')
    this.props.navigation.navigate('Thankyou')
                             // this.setState({wallet:responseJson.wallet})

                            }else {
                                alert('Unable to get Connect You. Please try again after Sometime.')
                            }
                        })
                        .catch((error) => {
                            console.error(error);
  this.hideLoading()
                        });
}

    onPayTmResponse = (resp) => {
        const {STATUS, status, response} = resp;
  //alert(JSON.stringify(resp))
        if (Platform.OS === 'android') {
            this.setState({out:resp})

            const jsonResponse =resp;
            const {STATUS} = jsonResponse;
            if (jsonResponse.STATUS == 'TXN_SUCCESS') {
                console.log(jsonResponse)
                this.myPayments(jsonResponse)
             //   this.myPayments(jsonResponse.TXNAMOUNT,'SUCCESS',jsonResponse.TXNID)
            } else if (jsonResponse.STATUS  == 'PENDING'){
                alert(JSON.stringify(jsonResponse))
               // this.myPayments(jsonResponse.TXNAMOUNT,'PENDING',jsonResponse.TXNID)
            }
            else if (jsonResponse.STATUS  == 'TXN_FAILURE'){
              //  alert(JSON.stringify(jsonResponse))
              //  this.myPayments(jsonResponse)
            }



        } else {
            if (STATUS && STATUS === 'TXN_SUCCESS') {
                // Payment succeed!
            }
        }
    };

        runTransaction(amount, customerId, orderId, mobile, email, checkSum) {
            const callbackUrl = `${paytmConfig.CALLBACK_URL}${orderId}`;
            const details = {
                mode: 'Staging', // 'Staging' or 'Production'
                MID: paytmConfig.MID,
                INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
                EMAIL: '',
                MOBILE_NO: '',
                WEBSITE: paytmConfig.WEBSITE,
                CHANNEL_ID: paytmConfig.CHANNEL_ID,
                TXN_AMOUNT: this.state.pay.toString(), // String
                ORDER_ID: orderId, // String
                CUST_ID: GLOBAL.user_id, // String
                CHECKSUMHASH: checkSum, //From your server using PayTM Checksum Utility
                CALLBACK_URL: callbackUrl,
            };

            paytm.startPayment(details);
        }



call = (type) =>{
  GLOBAL.type = type
  this.props.navigation.navigate('BookingDetail')
}



_calculations = () =>{
  var wallet = parseInt(this.state.wallet)
  var consult = parseInt(this.state.consult)
  var amount = parseInt(this.state.amount)

var fullDed = amount - (wallet + consult)


if (fullDed <= 0){
    this.setState({payable:'0'})
var wa = amount  - wallet
if (wa <= 0){
  this.setState({wd:amount})
  this.setState({cd:'0'})

}else {
  var wc = amount  - wallet
    this.setState({wd:this.state.wallet})
      this.setState({cd:wc})
}

setTimeout(() => {
         // write your functions
    //    this.myPaymentsd()
     },1000)

}else{
    this.setState({payable:fullDed})
  this.setState({wd:this.state.wallet})
    this.setState({cd:this.state.consult})
    setTimeout(() => {
             // write your functions
      //      this._handlePress()
         },1000)
}




}




_calculation = () =>{

  var wallet = parseInt(this.state.wallet)
  var consult = parseInt(this.state.consult)
  var amount = parseInt(this.state.amount)

var fullDed = amount - (wallet + consult)



if (fullDed <= 0){
    this.setState({payable:amount})
var wa = amount  - wallet

if (wa <= 0){
  this.setState({wd:amount})
  this.setState({cd:'0'})

}else {
  var wc = amount  - wallet
    this.setState({wd:this.state.wallet})
      this.setState({cd:wc})
}

setTimeout(() => {
//  alert(this.state.wd)
         // write your functions
        this.myPaymentsd()
     },1000)

}else{
    this.setState({payable:amount})
    this.setState({pay:fullDed})
  this.setState({wd:this.state.wallet})
    this.setState({cd:this.state.consult})
    setTimeout(() => {
             // write your functions
            this._handlePress()
         },1000)
}




}

_handlePress = () =>{
  var x = randomString({
            length: 10,
            numeric: true,
            letters: false,
            special: false,

        });
        var commonHtml = `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${x}`;


        const url = 'http://139.59.76.223/diskuss/api/paytm_check_sum_pIlJmKnHgTcvRd_lopi'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MID: "TXvOFA01468432899358",
                ORDER_ID: x,
                INDUSTRY_TYPE_ID: "Retail",
                EMAIL: '',
                MOBILE_NO: '',
                CHANNEL_ID: "WAP",
                TXN_AMOUNT:  this.state.pay.toString(),
                WEBSITE: "APPSTAGING",
                CUST_ID: GLOBAL.user_id,
                CALLBACK_URL: commonHtml,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                const callbackUrl = commonHtml;

                this.runTransaction('199', '1', x, '9896904632', "varun.singhal78@gmail.com", responseJson.CHECKSUMHASH)


            })
            .catch((error) => {
       alert(error);

                alert('Unable to process your request Please try again after some time')

            });
}

    render(){
      var sign = ""


      if (GLOBAL.currency == "OTHER"){
        sign = "$"

      }else{
        sign = "₹"
      }
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
                                Consultation Summary

                            </Text>





                        </View>

                        <TouchableOpacity onPress={()=>this.call('chat')}>
                        <View>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',margin:10}}>

                        <Text style = {{color:'black',fontSize:15,fontFamily:GLOBAL.roman,marginLeft:10,marginTop:2}}>
                            Online Consulations Fees


                        </Text>


                        {GLOBAL.type == 'chat' && (


                            <Text style = {{color:'#F2C1D7',fontSize:18,fontFamily:GLOBAL.roman,marginRight:10}}>
                              {sign} {GLOBAL.booking.online_consult_chat_price}

                          </Text>
                        )}
                        {GLOBAL.type == 'video' && (
                                  <Text style = {{color:'#F2C1D7',fontSize:18,fontFamily:GLOBAL.roman,marginRight:10}}>
                          {sign} {GLOBAL.booking.online_consult_video_price}

                          </Text>
                        )}
                        {GLOBAL.type == 'audio' && (
                                <Text style = {{color:'#F2C1D7',fontSize:18,fontFamily:GLOBAL.roman,marginRight:10}}>
                              {sign} {GLOBAL.booking.online_consult_audio_price}

                          </Text>
                        )}




                        </View>



                        <View style = {{width:window.width - 40,height:1,backgroundColor:'#f1f2f6',marginTop:10,marginLeft:10}}>

                        </View>


</View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.cats()}>



                        <View style = {{flexDirection:'row',justifyContent:'space-between',margin:10}}>

                        <Text style = {{color:'black',fontSize:15,fontFamily:GLOBAL.roman,marginLeft:10,marginTop:2}}>
                            Amount Payable


                        </Text>


                        {GLOBAL.type == 'chat' && (
                            <Text style = {{color:'#F2C1D7',fontSize:18,fontFamily:GLOBAL.roman,marginRight:10}}>
                              {sign} {GLOBAL.booking.online_consult_chat_price}

                          </Text>
                        )}
                        {GLOBAL.type == 'video' && (
                                  <Text style = {{color:'#F2C1D7',fontSize:18,fontFamily:GLOBAL.roman,marginRight:10}}>
                              {sign} {GLOBAL.booking.online_consult_video_price}

                          </Text>
                        )}
                        {GLOBAL.type == 'audio' && (
                                <Text style = {{color:'#F2C1D7',fontSize:18,fontFamily:GLOBAL.roman,marginRight:10}}>
                              {sign} {GLOBAL.booking.online_consult_audio_price}

                          </Text>
                        )}




                        </View>



                        <View style = {{width:window.width - 40,height:1,backgroundColor:'#f1f2f6',marginTop:10,marginLeft:10}}>

                        </View>
                        </TouchableOpacity>




                    </View>




                    <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 20,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 5 }}>


                        <View style = {{width:window.width - 20 ,height:50,backgroundColor:'#ced4e2'}}>


                            <Text style={{fontFamily:GLOBAL.medium,fontSize:18,marginLeft:16,marginTop:14,color:'white'}}>
                                Payment

                            </Text>





                        </View>

                        <TouchableOpacity onPress={()=>this.call('chat')}>
                        <View>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',margin:10}}>

                        <Text style = {{color:'black',fontSize:15,fontFamily:GLOBAL.roman,marginLeft:10,marginTop:2}}>
                            Wallet


                        </Text>


                            <Text style = {{color:'#F2C1D7',fontSize:18,fontFamily:GLOBAL.roman,marginRight:10}}>
                              {sign} {this.state.wallet}

                          </Text>







                        </View>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',margin:10}}>

                        <Text style = {{color:'black',fontSize:15,fontFamily:GLOBAL.roman,marginLeft:10,marginTop:2}}>
                            Consultation Point


                        </Text>


                            <Text style = {{color:'#F2C1D7',fontSize:18,fontFamily:GLOBAL.roman,marginRight:10}}>
                              {sign} {this.state.consult}

                          </Text>







                        </View>






                  </View>
                        </TouchableOpacity>






                    </View>
                    <Button
                        style={{marginLeft:28,paddingTop: 18 ,fontSize: 14,backgroundColor:'#7BAAED', color: 'white',fontFamily:GLOBAL.medium,marginTop:30,height:50,width:window.width - 56,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._calculation()}>
                        PAY NOW
                    </Button>

                    <Text style = {{height:100}}>

                    </Text>

                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
