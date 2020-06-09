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
 import { BackHandler } from 'react-native';
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
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Swipers from 'react-native-swiper';
const GLOBAL = require('./Global');
const options = {
    title: 'Select Image',
    maxWidth:300,
    maxHeight:500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
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

export default class CancelHistory extends Component {
    state = {
        selectedIndex: 0,
        specialty : ["1","2","3"],
        value:'',
        text:'',
        myimages:'',
        path:'',

    };
    renderRowItem2 = (itemData) => {

        return (

            <View >

                <View style = {{flexDirection:'row',}}>
                    <Image   source={require('./check.png')}
                             style  = {{width:14, height:14,resizeMode:'contain',margin:10,marginTop:12
                             }}

                    />


                    <Text style={{fontFamily:GLOBAL.roman,fontSize:16,marginLeft:4,marginTop:10}}>
                        {itemData.item.title}

                    </Text>



                </View>













            </View>

        )
    }
      _handleStateChange = state => {

        this.setState({specialty:GLOBAL.issue})
      }

      handleBackButtonClick() {

               this.props
                   .navigation
                   .dispatch(StackActions.reset({
                       index: 0,
                       actions: [
                           NavigationActions.navigate({
                               routeName: 'TabNavigator',
                               params: { someParams: 'parameters goes here...' },
                           }),
                          // this.props.navigation.replace('TabNavigator')
                       ],
                   }))

                   return true;
              }

      componentWillUnmount(){
   BackHandler.removeEventListener('hardwareBackPress', this._handlePressd);
   }
    componentDidMount(){
  BackHandler.addEventListener('hardwareBackPress', this._handlePressd);
this.selectedFirstd()
    }


    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

    selectedFirstd  = () => {

           const url = GLOBAL.BASE_URL + 'live_broadcast_time'

           fetch(url, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },


               body: JSON.stringify({


                   "broadcast_id": GLOBAL.myid,



               }),
           }).then((response) => response.json())
               .then((responseJson) => {


   //                alert(JSON.stringify(responseJson))

                   //  this.rajorPay()
                   if (responseJson.status == true) {

                      this.setState({myimages:responseJson.time})

                   } else {


                   }
               })
               .catch((error) => {
                   console.error(error);
                   this.hideLoading()
               });

       }
       ds = ()=>{
         var imgid = ""

       for (var i = 0; i< this.state.myimages.length ; i ++){
           imgid = imgid + this.state.myimages[i].image + '|'
       }
       if (imgid == ""){

       } else{
           imgid = imgid.slice(0,-1)

       }
       GLOBAL.imgid = imgid
       this.props.navigation.navigate('BookingFinal')
       }
    _renderItemsd  = ({item,index}) => {
            var uri = `${this.state.path}${item.image}`;

            return (



                <View style = {{backgroundColor:'transparent',margin:1}}>
                    <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                           source={{uri:uri}}/>
                    <TouchableOpacity style = {{width :20 ,height :20,position:'absolute',right:2}} onPress={() => this.selectedFirstd(item)
                    }>

                        <Image style = {{width :20 ,height :20,resizeMode:'contain'}}
                               source={require('./remove.png')}/>
                    </TouchableOpacity>

                </View>



            )

        }

        _handlePressd = () => {
          this.props
              .navigation
              .dispatch(StackActions.reset({
                  index: 0,
                  actions: [
                      NavigationActions.navigate({
                          routeName: 'TabNavigator',
                          params: { someParams: 'parameters goes here...' },
                      }),
                  ],
              }))
        }
    render(){
        return (
            <SafeAreaView style={styles.AndroidSafeArea}>
                <StatusBar backgroundColor="#639ced" barStyle="light-content" />



                <KeyboardAwareScrollView style={{ backgroundColor: 'grey',marginTop:0,height:window.height }} >


                <Image   source={{uri:GLOBAL.doctor_image}}
                           style  = {{width:70, height:70,margin:10,alignSelf:'center',borderRadius:50,marginTop:60,borderWidth:3,borderColor:'white'
                           }}

                  />


                  <Text style={{fontFamily:GLOBAL.heavy,fontSize:22,marginLeft:6,marginTop:12,color:'white',alignSelf:'center'}}>
                      {GLOBAL.bookingName}

                  </Text>

                  <Text style={{fontFamily:GLOBAL.heavy,fontSize:16,marginLeft:6,marginTop:6,color:'white',alignSelf:'center'}}>
                  Id : {GLOBAL.doctor_id}

                  </Text>


<View style = {{width:200,alignSelf:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'white',height:70,marginTop:30}}>
<Text style={{fontFamily:GLOBAL.heavy,fontSize:22,textAlign:'center',marginTop:18,color:'white',alignSelf:'center'}}>
    End of Live

</Text>

</View>

<View style = {{flexDirection:'row',justifyContent:'space-between',width:window.width - 100,alignSelf:'center',marginTop:60}}>
<View>
<Text style={{fontFamily:GLOBAL.heavy,fontSize:17,marginTop:18,color:'white',alignSelf:'center'}}>
  {this.state.myimages}

</Text>

<Text style={{fontFamily:GLOBAL.heavy,fontSize:12,marginTop:3,color:'white',alignSelf:'center'}}>
    Live Duration

</Text>

</View>

<View>

<Text style={{fontFamily:GLOBAL.heavy,fontSize:17,marginTop:18,color:'white',alignSelf:'center'}}>
{this.props.navigation.state.params}

</Text>

<Text style={{fontFamily:GLOBAL.heavy,fontSize:12,marginTop:3,color:'white',alignSelf:'center'}}>
Broadcast End Duration

</Text>
</View>
</View>

<Button
    style={{marginLeft:10,paddingTop: 12,marginTop:10 ,borderWidth:1,borderColor:'white',fontSize: 14, color: 'white',alignSelf:'center',marginTop:50,fontFamily:GLOBAL.medium,height:38,width:190,borderRadius:4}}
    styleDisabled={{color: 'red'}}
    onPress={() => this._handlePressd()}>
    EXIT
</Button>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
