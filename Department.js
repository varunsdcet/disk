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
import Dialog, { DialogContent } from 'react-native-popup-dialog';
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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
var radio_props = [
  {label: 'Online', value: 0 },
  {label: 'Offline', value: 1 },
 ];
import RangeSlider from 'rn-range-slider';
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

export default class Department extends Component {
    state = {
        selectedIndex: 0,
        speciality : ["1","2","3"],
        loading:false,
        high:'0',
        low :'0',
        value:'',
        term:false,
        depart:false,
        department:[],
        price : [
          {
            data:'1',
            selected:'',
          },
          {
            data:'2',
            selected:'',
          },
          {
            data:'3',
            selected:'',
          },
          {
            data:'4',
            selected:'',
          },
          {
            data:'5',
            selected:'',
          },
        ],

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
    goBack = (item) =>{
      GLOBAL.depart = item
      this.props.navigation.goBack()

    }

    renderRowItem2 = (itemData) => {

        return (
            <TouchableOpacity onPress= {()=>this.goBack(itemData.item)}>
            <View style = {{height:40}}>


                <Text style={{fontFamily:GLOBAL.medium,fontSize:16,marginLeft:6,color:'#8E9198'}}>
                    {itemData.item.name}

                </Text>

                <View style = {{width:window.width - 120,height:1,backgroundColor:'#f1f2f6',marginTop:10,marginLeft:10}}>

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
    //  this.department()



        const url = GLOBAL.BASE_URL +  'departments'
        this.showLoading()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: GLOBAL.user_id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                this.hideLoading()
                if (responseJson.status == true) {
         this.setState({speciality:responseJson.depart})




                }
                else{
                    alert('Unable to Get response. Please try again.')
                }
            })
            .catch((error) => {
                console.error(error);
            });


    }

    department = () =>{
      const url = GLOBAL.BASE_URL +  'departments'

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              user_id: GLOBAL.user_id,


          }),
      }).then((response) => response.json())
          .then((responseJson) => {

              if (responseJson.status == true) {
       this.setState({department:responseJson.depart})

              }
              else{
                  alert('Unable to Get response. Please try again.')
              }
          })
          .catch((error) => {
              console.error(error);
          });
    }

setPrice = (low,high) =>{

  this.setState({low :low})
    this.setState({high :high})
}
    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

depart = () =>{
  this.setState({depart:!this.state.depart})
}

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

heigh = (item,index) =>{
  for (var i = 0; i < this.state.price.length; i++ ){
    var a = this.state.price[i]
    if (a.selected == 'Y'){
      a.selected  = ''
      this.state.price[i] = a
      this.setState({price:this.state.price})
    }
  }

 var a  = this.state.price[index]



 if (item.selected == ''){
    a.selected = 'Y'
    this.state.price[index] = a


//  this.setState({password:a.data})
 }else {
    a.selected = ''
       this.state.price[index] = a
 }
 this.setState({price:  this.state.price})
}

        renderRowItem2d = (itemData) => {

            return (
                  <TouchableOpacity onPress= {()=>this.heigh(itemData.item,itemData.index)}>

                <View style = {{margin:5,marginTop:7}}>

    {itemData.item.selected == '' && (

      <View style = {{width:50,height:30,borderColor:'#8E9198',backgroundColor:'white',borderRadius:3,borderWidth:2,flexDirection:'row'}}>
        <Text style = {{color:'#8E9198',fontFamily:GLOBAL.medium,fontSize:14,marginTop:4,marginLeft:9}}>
  {itemData.item.data}
        </Text>
        <Image
            source={require('./emptystar.png')}
            style={{width: 16, height: 16,marginLeft:2,marginTop:4,resizeMode:'contain'}}


        />
      </View>
    )}
    {itemData.item.selected != '' && (
      <View style = {{width:50,height:30,borderColor:'#8E9198',backgroundColor:'#fcebbf',borderRadius:3,borderWidth:2,flexDirection:'row'}}>
        <Text style = {{color:'#8E9198',fontFamily:GLOBAL.medium,fontSize:14,marginTop:4,marginLeft:9}}>
  {itemData.item.data}
        </Text>
        <Image
            source={require('./fillstar.png')}
            style={{width: 16, height: 16,marginLeft:2,marginTop:4,resizeMode:'contain'}}


        />
      </View>

    )}


                </View>
                </TouchableOpacity>

            )
        }

        renderRowItem3 = (itemData) =>{
            <View style = {{margin:5,marginTop:1,height:30}}>
            <Text style = {{color:'#8E9198',fontFamily:GLOBAL.medium,fontSize:14,marginTop:4,marginLeft:9}}>
      {itemData.item.name}
            </Text>
            </View>
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


                    <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 15,marginTop:-5}}>
                        Select Department
                    </Text>


                    <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 15,marginTop:-5}}>

                    </Text>

                </View>

                <KeyboardAwareScrollView style={{ backgroundColor: '#fcfcfe',marginTop:0 }} >






                    <FlatList style = {{marginTop:6,marginLeft:5,width:window.width - 10}}
                              data={this.state.speciality}
                              keyExtractor={this._keyExtractor}
                              renderItem={this.renderRowItem2}
                              extraData={this.state}
                    />
                    <Text style = {{height:130}}>
                    </Text>



                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
