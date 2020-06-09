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
import Stars from 'react-native-stars';
import Information from "./Information";
import Review from "./Review";
const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
var params :[];
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
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
        flex: 1,
        backgroundColor: "#639ced",
        paddingTop: Platform.OS === "android" ? 0 : 0
    },
    scene: {
        flex: 1,
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

export default class DoctorDetail extends Component {
    state = {
        selectedIndex: 0,
        speciality : [],
        index:0,
        routes: [
            { key: 'first', title: 'Information' },
            { key: 'second', title: 'Patients Reviews' },

        ],

    };


    fav = (item) => {


      if (GLOBAL.user_id == "0"){

          Alert.alert('UN-REGISTERED USER','You seem to be an Un-Registered User. To Use DISKUSS kindly create an account and Log In.',
              [{text:"Cancel"},
                  {text:"Yes", onPress:()=>this._YesLogout()
                  },
              ],
              {cancelable:false}
            )
        //  alert('You seem to be an unregistered User. To Book  service with us,kindly Register First')
          return
        }else{


        if (this.state.speciality.is_bookmark == "0"){
            var a = this.state.speciality
            var b = this.state.speciality
            b.is_bookmark = "1"

            this.state.speciality = b
            this.setState({speciality:this.state.speciality})

            const url = GLOBAL.BASE_URL +  'add_patient_doc_bookmark'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: GLOBAL.user_id,
                    doctor_id:this.state.speciality.id


                }),
            }).then((response) => response.json())
                .then((responseJson) => {



                    if (responseJson.status == true) {


                    }
                    else{
                        alert('Unable to Get response. Please try again.')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });



        } else{
            var a = this.state.speciality
            var b = this.state.speciality
            b.is_bookmark = "0"

            this.state.speciality = b
            this.setState({speciality:this.state.speciality})


            const url = GLOBAL.BASE_URL +  'delete_bookmark_patient'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: GLOBAL.user_id,
                    doctor_id:this.state.speciality.id


                }),
            }).then((response) => response.json())
                .then((responseJson) => {



                    if (responseJson.status == true) {


                    }
                    else{
                        alert('Unable to Get response. Please try again.')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
      }


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
                        <Text style={{fontFamily:GLOBAL.heavy,fontSize:22,marginLeft:6,marginTop:18}}>
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
params = this.props.navigation.state.params

GLOBAL.booking = params
this.setState({speciality:params})

    }


    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };
    _handlePress =  () =>{
      if (GLOBAL.user_id == "0"){

        Alert.alert('UN-REGISTERED USER','You seem to be an Un-Registered User. To Use DISKUSS kindly create an account and Log In.',
            [{text:"Cancel"},
                {text:"Yes", onPress:()=>this._YesLogout()
                },
            ],
            {cancelable:false}
          )
      //  alert('You seem to be an unregistered User. To Book  service with us,kindly Register First')
        return
      }else{
        this.props.navigation.navigate('Booking')
    }
    }
    _renderScene = ({ route }) => {


        switch (route.key) {

            case 'first':
                return    <Information navigation={this.props.navigation}/>
            case 'second':
                return    <Review navigation={this.props.navigation}/>

            default:
                return null;
        }
    };

    renderTabBar(props) {

        return (<TabBar

                style={{backgroundColor: '#FFFFFF', elevation: 0, borderColor: 'white', borderBottomWidth: 2.5, height:50,activeColor:'#F2C1D7'}}
                labelStyle={{ fontSize: 14, fontFamily: GLOBAL.heavy,}}
                activeColor={'black'}
                inactiveColor={'#8E9198'}
                inactiveOpacity={0.5}
                activeOpacity={1.0}
                activeLabelStyle = {{color:'#black',fontWeight:'bold'}}
                inactiveLabelStyle = {{color:'#8E9198'}}
                {...props}
                indicatorStyle={{backgroundColor: '#F2C1D7', height: 2.5}}
            />
        );
    }

    render(){
      var r = this.state.speciality.ratting
      var rs = parseInt(r)
        return (


            <SafeAreaView style={styles.AndroidSafeArea}>
                <StatusBar backgroundColor="#639ced" barStyle="light-content" />



                <KeyboardAwareScrollView style={{ backgroundColor: '#fcfcfe',marginTop:0,flex:1 }} >

                    <ImageBackground style={{height:300,width:window.width}}
                                     resizeMode="cover"
                                     source={{uri:this.state.speciality.image}}>

                        <View style = {{height:70,flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                    <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./white-back.png')}
                                style={{width: 18, height: 20,marginLeft:20,marginTop:22,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                    </View>


                    {this.state.speciality.is_bookmark == "0" && (
                      <TouchableOpacity onPress= {()=>this.fav(this.state.specialty)}>
                                        <Image
                                            source={require('./unfav.png')}
                                            style={{width: 18, height: 20,marginRight:20,marginTop:22,resizeMode:'contain'}}


                                        />
                                        </TouchableOpacity>
                                      )}

                    {this.state.speciality.is_bookmark == "1" && (
<TouchableOpacity onPress= {()=>this.fav(this.state.specialty)}>
                                        <Image
                                            source={require('./favs.png')}
                                            style={{width: 18, height: 20,marginRight:20,marginTop:22,resizeMode:'contain'}}


                                        />
                                        </TouchableOpacity>
                                      )}
                        </View>
                    </ImageBackground>


                    <View style = {{marginTop:-40,borderTopLeftRadius:33,borderTopRightRadius:33,backgroundColor:'white',alignSelf:'center',width:window.width}}>

<View style = {{}}>
                        <Text style={{fontFamily:GLOBAL.heavy,fontSize:30,marginLeft:22,marginTop:20}}>

 {this.state.speciality.name}
                        </Text>
                        <Button
                            style={{marginLeft:28,paddingTop: 13,marginBottom:20 ,fontSize: 14,backgroundColor:'#7BAAED', color: 'white',fontFamily:GLOBAL.medium,marginTop:10,height:40,width:130,marginRight:12,borderRadius:4,alignSelf:'flex-end'}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            CONSULT NOW
                        </Button>
                        </View>
                        <View style = {{flexDirection:'row',marginLeft:18,marginTop:8}}>
  {this.state.speciality.doctor_avail_status == "1" && (
                            <View style = {{height:8,width:8,borderRadius:4,backgroundColor:'#42cd00'}}>
                            </View>
                          )}
                          {this.state.speciality.doctor_avail_status != "1" && (
                                                    <View style = {{height:8,width:8,borderRadius:4,backgroundColor:'red'}}>
                                                    </View>
                                                  )}

{this.state.speciality.doctor_avail_status == "0" && (
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:16,marginLeft:8,marginTop:-4,color:'red'}}>
                            Online Again in {this.state.speciality.check_next_time_slots} 

                        </Text>
                      )}
                      {this.state.speciality.doctor_avail_status == "1" && (
                                              <Text style={{fontFamily:GLOBAL.roman,fontSize:16,marginLeft:8,marginTop:-4,color:'#42cd00'}}>
                                                  Online Now For Consulation

                                              </Text>
                                            )}
                                            {this.state.speciality.doctor_avail_status == "2" && (
                                                                    <Text style={{fontFamily:GLOBAL.roman,fontSize:16,marginLeft:8,marginTop:-4,color:'orange'}}>
                                                                    Busy

                                                                    </Text>
                                                                  )}
                        </View>
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:22,marginTop:5,color:'#1E2432',textAlign:'justify',lineHeight:20}}>
                            {this.state.speciality.speciality_detail_array}

                        </Text>



                        <View style = {{flexDirection:'row',height:20,marginLeft:20,marginTop:8,justifyContent:'space-between'}}>
<View style = {{flexDirection:'row'}}>
                            <Stars
                                display={rs}
                                spacing={2}
                                count={5}
                                starSize={12}
                                backingColor='cornsilk'
                                fullStar= {require('./star.png')}
                                emptyStar= {require('./star.png')}/>

                            <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:8,color:'#8E9198'}}>
                               ( {this.state.speciality.total_review} reviews)

                            </Text>
                        </View>

                               <View>

                                   {this.state.speciality.currency == "INR" && (

                                     <Text style={{fontFamily:GLOBAL.heavy,fontSize:24,height:30,marginRight:22,color:'#F2C1D7',marginTop:-10}}>
                                          ₹   {this.state.speciality.online_consult_video_price}

                                     </Text>
                                   )}
                                   {this.state.speciality.currency != "INR" && (

                                     <Text style={{fontFamily:GLOBAL.heavy,fontSize:24,height:30,marginRight:22,color:'#F2C1D7',marginTop:-10}}>
                                          $   {this.state.speciality.online_consult_video_price}

                                     </Text>
                                   )}


                               </View>


                        </View>




                    </View>






                    <TabView
                        navigationState={this.state}
                        indicatorStyle={{ backgroundColor:'white'}}
                        style={{ backgroundColor: 'white' }}

                        renderTabBar={this.renderTabBar}
                        renderScene={this._renderScene}

                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: Dimensions.get('window').width }}
                    />









                </KeyboardAwareScrollView>

</SafeAreaView>


        );
    }
}
