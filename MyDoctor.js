import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    FlatList,

    ImageBackground, Image, Dimensions, ActivityIndicator,
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
var arrayholder = [];
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Swipers from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
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
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
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

export default class MyDoctor extends Component {
    state = {
        selectedIndex: 0,
        speciality : ["1","2","3"],
        loading:false,

    };
    fav = (item,index) => {
        if (item.is_bookmark == "0"){
            var a = this.state.speciality
            var b = this.state.speciality[index]
            b.is_bookmark = "1"

            this.state.speciality[index] = b
            this.setState({speciality:this.state.speciality})

            const url = GLOBAL.BASE_URL +  'add_patient_doc_bookmark'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: GLOBAL.user_id,
                    doctor_id:item.id


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
            var b = this.state.speciality[index]
            b.is_bookmark = "0"

            this.state.speciality[index] = b
            this.setState({speciality:this.state.speciality})


            const url = GLOBAL.BASE_URL +  'delete_bookmark_patient'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: GLOBAL.user_id,
                    doctor_id:item.id


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

    _handlePress = (item) =>{
        GLOBAL.booking = item
        this.props.navigation.navigate('Booking')
    }

    renderRowItem2 = (itemData) => {

        return (
            <TouchableOpacity onPress= {()=>this.props.navigation.navigate('DoctorDetail',itemData.item)}>
            <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 30, shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 5 }}>

                <View style = {{flexDirection:'row'}}>
                    <Image   source={{uri :itemData.item.image}}
                             style  = {{width:70, height:70,resizeMode:'stretch',margin:10
                             }}

                    />
                    <View style = {{marginTop:4}}>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:4}}>
                        <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginLeft:6}}>
                            {itemData.item.name}

                        </Text>
                            <TouchableOpacity onPress= {()=>this.fav(itemData.item,itemData.index)}>
                            <View style = {{marginTop:2}}>
                            {itemData.item.is_bookmark == "0" && (
                            <Image   source={require('./unfav.png')}
                                     style  = {{width:18, height:18,resizeMode:'stretch',marginRight:0
                                     }}

                            />
                        )}

                            {itemData.item.is_bookmark == "1" && (
                                <Image   source={require('./favs.png')}
                                         style  = {{width:18, height:18,resizeMode:'stretch',marginRight:0
                                         }}

                                />
                            )}
                            </View>
                            </TouchableOpacity>


                        </View>




                            <Text style={{fontFamily:GLOBAL.roman,fontSize:13,marginLeft:6,marginTop:4,color:'#8E9198',width:window.width - 150}}>
                                {itemData.item.speciality_detail_array}

                            </Text>




                        <View style = {{flexDirection:'row',marginRight:8,marginTop:14,justifyContent:'space-between',width:window.width - 140}}>

                            <Text style={{fontFamily:GLOBAL.heavy,fontSize:13,marginLeft:4,color:'#1E2432'}}>
                                {itemData.item.experience} yrs of exp

                            </Text>
                            <View style = {{flexDirection:'row'}}>
                            <Image   source={require('./star.png')}
                                     style  = {{width:12, height:12,resizeMode:'cover',
                                     }}

                            />
                            <Text style={{fontFamily:GLOBAL.heavy,fontSize:12,marginLeft:6,marginTop:1,color:'#1E2432'}}>
                                {itemData.item.ratting}

                            </Text>
                            </View>
<View>
{itemData.item.currency == "INR" && (
                            <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginLeft:4,color:'#F2C1D7',marginTop:-2}}>
                                ₹  {itemData.item.online_consult_video_price}

                            </Text>
                          )}

                          {itemData.item.currency != "INR" && (
                                                      <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginLeft:4,color:'#F2C1D7',marginTop:-2}}>
                                                          $  {itemData.item.online_consult_video_price}

                                                      </Text>
                                                    )}

                            </View>

                        </View>



                    </View>


                </View>





                <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                    {itemData.item.doctor_avail_status == "0" && (
                        <View style = {{flexDirection:'row',marginTop:7}}>
                            <View style = {{backgroundColor:'#f10000',height:8,width:8,borderRadius:4,marginTop:5,marginLeft:10}}>
                            </View>
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,color:'#f10000'}}>
                            Offline

                        </Text>

                        </View>

                    )}
                    {itemData.item.doctor_avail_status == "1" && (
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,marginTop:5,color:'#42cd00'}}>
                            Online Now For Consultation

                        </Text>

                    )}


                    <Button
                        style={{paddingTop: 5 ,fontSize: 14,backgroundColor:'#cdd3e1', color: 'white',marginRight:10,fontFamily:GLOBAL.medium,height:30,width:90,borderRadius:4,marginBottom:15}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePress(itemData.item)}>
                        Consult
                    </Button>

                </View>







            </View>
            </TouchableOpacity>

        )
    }

    showLoading() {
        this.setState({loading: true})
    }
    hideLoading() {
        this.setState({loading: false})
    }
    componentDidMount(){

      this.setState({speciality:GLOBAL.all})
      this.arrayholder = GLOBAL.all


    }


    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };


    SearchFilterFunction(text){

            const newData = this.arrayholder.filter(function(item){

                const itemData = item.name.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            this.setState({
                speciality: newData,
                text: text,
                nodata:'No found'
            })

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




                </View>

                <KeyboardAwareScrollView style={{ backgroundColor: '#fcfcfe',marginTop:0 }} >

                    <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 20, shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 5 ,flexDirection:'row',height:50}}>



                        <Image
                            source={require('./Search.png')}
                            style={{width: 18, height: 20,marginLeft:20,marginTop:15,resizeMode:'contain'}}


                        />

                        <TextInput
                            style={{ height: 40,marginLeft:20,marginTop:5}}
                                onChangeText={(text) => this.SearchFilterFunction(text)}
                            placeholder = {'Search Experts,Counsellors...'}

                        />









                    </View>




                    <FlatList style = {{marginTop:6,marginLeft:5,width:window.width - 10}}
                              data={this.state.speciality}
                              keyExtractor={this._keyExtractor}
                              renderItem={this.renderRowItem2}
                              extraData={this.state}
                    />
                    <Text style = {{height:80}}>
                    </Text>

                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
