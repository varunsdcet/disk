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

export default class BookingDetail extends Component {
    state = {
        selectedIndex: 0,
        specialty : ["1","2","3"],
        value:'',
        text:'',
        myimages:[],
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
                        {itemData.item}

                    </Text>



                </View>













            </View>

        )
    }
      _handleStateChange = state => {

        this.setState({specialty:GLOBAL.issue})
      }
    componentDidMount(){
          this.props.navigation.addListener('willFocus',this._handleStateChange);
      const url = GLOBAL.BASE_URL + 'list_upload_images'

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },


          body: JSON.stringify({


              "user_id": GLOBAL.user_id,



          }),
      }).then((response) => response.json())
          .then((responseJson) => {




              //  this.rajorPay()
              if (responseJson.status == true) {

                  this.setState({myimages:responseJson.list})
                //  alert(JSON.stringify(responseJson.list))
                  this.setState({path:responseJson.path})

              } else {


              }
          })
          .catch((error) => {
              console.error(error);
              this.hideLoading()
          });

    }


    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

    selectedFirstd  = (item) => {

           const url = GLOBAL.BASE_URL + 'delete_images'

           fetch(url, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },


               body: JSON.stringify({


                   "user_id": GLOBAL.user_id,
                   "id":item.id


               }),
           }).then((response) => response.json())
               .then((responseJson) => {


   //                alert(JSON.stringify(responseJson))

                   //  this.rajorPay()
                   if (responseJson.status == true) {

                       this.setState({myimages:responseJson.list_of_images})

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
            if (this.state.myimages.length >= 3){
                alert('You can upload 3 Image/ file only')
                return
            }
            ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };


                    const url = GLOBAL.BASE_URL +  'image_attchment_upload'
                    const data = new FormData();
                    data.append('user_id', GLOBAL.user_id);
                    data.append('flag',1);


                    // you can append anyone.
                    data.append('image', {
                        uri: response.uri,
                        type: 'image/jpeg', // or photo.type
                        name: 'image.png'
                    });
                    fetch(url, {
                        method: 'post',
                        body: data,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }

                    }).then((response) => response.json())
                        .then((responseJson) => {
                            //       this.hideLoading()
                            this.setState({myimages:responseJson.images})

                            this.setState({path:responseJson.path})




                        });
                }




                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };


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


                            <Text style={{fontFamily:GLOBAL.medium,fontSize:18,marginLeft:6,marginTop:10,color:'white'}}>
                                Describe your issue in detail

                            </Text>





                        </View>



                        <TextInput
                            style={{width:window.width - 70 ,height:70,fontSize: 16,fontFamily:GLOBAL.medium,color:'#8E9198',marginLeft:10,marginTop:15}}
                            value={this.state.value}
                            onChangeText={text=>this.setState({value:text})}
                            placeholder = {'Hi Diskuss, I Need Your Help !!!'}
                            placeholderTextColor = {'#8E9198'}
                            multiline={true}

                        />
                        <View style = {{width:window.width - 40,height:1,backgroundColor:'#f1f2f6',marginTop:10,marginLeft:10}}>

                        </View>

                        {this.state.myimages.length != 0 && (

                           <FlatList style= {{flexGrow:0,backgroundColor:'transparent'}}
                                     horizontal = {true}
                                     data={this.state.myimages}
                                     numColumns={1}
                                     horizontal={true}
                                     keyExtractor = { (item, index) => index.toString() }
                                     renderItem={this._renderItemsd}
                           />

                       )}


                        <Button
                            style={{marginLeft:10,paddingTop: 12,marginTop:10 ,borderWidth:1,borderColor:'#F2C1D7',fontSize: 14, color: '#F2C1D7',fontFamily:GLOBAL.medium,height:38,width:190,borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePressd()}>
                            Attach Images/Reports
                        </Button>

                        <Text style={{fontFamily:GLOBAL.roman,fontSize:9,marginLeft:12,marginTop:6,color:'#8E9198',width:window.width - 70,marginBottom:10 }}>
                            *Attach up to 3 images/document here

                        </Text>



                    </View>

                    <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 20 ,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 5 }}>

                        <Button
                            style={{marginLeft:10,paddingTop: 12,marginTop:10 ,borderWidth:1,borderColor:'#F2C1D7',fontSize: 14, color: '#F2C1D7',fontFamily:GLOBAL.medium,height:38,width:190,borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.props.navigation.navigate('Category')}>
                           + Issue from the list
                        </Button>

                        <FlatList style = {{marginTop:6,marginLeft:5,width:window.width - 10,marginBottom:6}}
                                  data={this.state.specialty}
                                  keyExtractor={this._keyExtractor}
                                  renderItem={this.renderRowItem2}
                                  extraData={this.state}
                        />


                    </View>


                    <Button
                        style={{marginLeft:28,paddingTop: 12,marginBottom:20 ,fontSize: 14,backgroundColor:'#7BAAED', color: 'white',fontFamily:GLOBAL.medium,marginTop:30,height:40,width:window.width - 56,borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.ds()}>
                        PROCEED
                    </Button>


                    <Text style = {{height:200}}>

                    </Text>


                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
