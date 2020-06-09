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
    Alert,

    ImageBackground, Image, Dimensions, ActivityIndicator,
} from 'react-native';
import {NavigationActions,StackActions, DrawerActions} from 'react-navigation';
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

export default class DoctorList extends Component {
    state = {
        selectedIndex: 0,
        speciality : ["1","2","3"],
        loading:false,
        high:'',
        low :'',
        value:'',
        term:false,
        depart:false,
        visible:false,
        depa :'',
        depaid:'',
        currency:'',
        rating:'',
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


    }

    _handlePress = (item) =>{

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

        GLOBAL.booking = item
        this.props.navigation.navigate('Booking')
      }
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


    renderRowItem2 = (itemData) => {

        return (
            <TouchableOpacity activeOpacity = {0.9} onPress= {()=>this.props.navigation.navigate('DoctorDetail',itemData.item)}>
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




                            <Text style={{fontFamily:GLOBAL.roman,fontSize:13,marginLeft:6,marginTop:4,color:'#8E9198',width:window.width - 150,lineHeight:18,textAlign:'justify'}}>
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
                            Online Again in {itemData.item.check_next_time_slots} 

                        </Text>

                        </View>

                    )}
                    {itemData.item.doctor_avail_status == "1" && (
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,marginTop:5,color:'#42cd00'}}>
                            Online Now For Consultation

                        </Text>

                    )}
                    {itemData.item.doctor_avail_status == "2" && (
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:14,marginLeft:10,marginTop:5,color:'orange'}}>
                          Busy

                        </Text>

                    )}


                    <Button
                        style={{paddingTop: 6.6 ,fontSize: 14,backgroundColor:'#cdd3e1', color: 'white',marginRight:10,fontFamily:GLOBAL.medium,height:30,width:90,borderRadius:4,marginBottom:15}}
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
    _handleStateChange = (state) =>{
      //depa
      if (GLOBAL.depart.length != 0){
        this.setState({depa:GLOBAL.depart.name})
        this.setState({visible:true})
      }else{
          this.setState({depa:''})
      }


    }



getDoctor = ()=>{
  var a = ''

if (this.state.term == true){
  a = 'a to z'
}else{
  a = ''
}


  const url = GLOBAL.BASE_URL +  'fetch_nearest_doctor'
  this.showLoading()
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user_id: GLOBAL.user_id,
          doctor_condition: 'online',
          type: a,
          departments_filter:this.state.depaid,
          specialty:  '',
          hospital_filter: '',
          price_range_min: this.state.low,
          price_range_max:this.state.high,
          is_favrouite: '',
          country_code:GLOBAL.mycountry

      }),
  }).then((response) => response.json())
      .then((responseJson) => {

console.log(responseJson)
          this.hideLoading()
          if (responseJson.status == true) {
   this.setState({speciality:responseJson.doctor_list_s})
   this.arrayholder = responseJson.doctor_list_s
   this.setState({currency:responseJson.currency})



          }
          else{
              alert('No Doctor Found')
              this.setState({speciality:[]})
              this.arrayholder = []
          }
      })
      .catch((error) => {
          console.error(error);
      });
}

    componentDidMount(){
        this.setState({depa:''})
      this.setState({high:''})
        this.setState({low:''})
        this.setState({depaid:''})
        GLOBAL.depart = []
        this.setState({value:''})
        this.setState({term :false})
      this.getDoctor()
      this.props.navigation.addListener('willFocus',this._handleStateChange);



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
  this.setState({visible:false})
  this.props.navigation.navigate('Department')
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
GLOBAL.rating = this.state.price[index].data

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

      <View style = {{width:43,height:30,borderColor:'#8E9198',backgroundColor:'white',borderRadius:3,borderWidth:2,flexDirection:'row'}}>
        <Text style = {{color:'#8E9198',fontFamily:GLOBAL.medium,fontSize:14,marginTop:4,marginLeft:3}}>
  {itemData.item.data}
        </Text>
        <Image
            source={require('./emptystar.png')}
            style={{width: 16, height: 16,marginLeft:2,marginTop:4,resizeMode:'contain'}}


        />
      </View>
    )}
    {itemData.item.selected != '' && (
      <View style = {{width:43,height:30,borderColor:'#8E9198',backgroundColor:'#fcebbf',borderRadius:3,borderWidth:2,flexDirection:'row'}}>
        <Text style = {{color:'#8E9198',fontFamily:GLOBAL.medium,fontSize:14,marginTop:4,marginLeft:3}}>
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

_handlePressCancel = () =>{
      this.setState({visible:false})
  this.setState({high:''})
    this.setState({low:''})
    this.setState({depaid:''})
    this.setState({depa:''})
    GLOBAL.depart = []
    this.setState({value:''})
    this.setState({term :false})


    setTimeout(() => {
             // write your functions
            this.getDoctor()
         },100)

}

_handlePress1 =() =>{
  if(GLOBAL.depart.length != 0){
    this.setState({depaid :GLOBAL.depart.id})
  }

  this.setState({visible:false})

  setTimeout(() => {
           // write your functions
          this.getDoctor()
       },100)


}

        renderRowItem3 = (itemData) =>{
            <View style = {{margin:5,marginTop:1,height:30}}>
            <Text style = {{color:'#8E9198',fontFamily:GLOBAL.medium,fontSize:14,marginTop:4,marginLeft:9}}>
      {itemData.item.name}
            </Text>
            </View>
        }

        show = () =>{
          this.setState({visible:true})
          GLOBAL.depart = []
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
                        Find Experts - Counsellors and Experts
                    </Text>

  <TouchableOpacity onPress= {()=>this.show()}>
                    <Image
                        source={require('./filter.png')}
                        style={{width: 18, height: 20,marginRight:5,marginTop:22,resizeMode:'contain'}}


                    />
                    </TouchableOpacity>

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

                    <Dialog
                     visible={this.state.visible}
                     onTouchOutside={() => {
                       this.setState({ visible: false });
                     }}
                   >
                     <DialogContent>
                    <View style = {{width :window.width - 100 ,height :450,borderRadius:12}}>



                           <Text style={{fontFamily:GLOBAL.medium,fontSize:22,marginTop:3,color:'#8E9198',textAlign:'center'}}>
                             Filter

                           </Text>
                           <View style = {{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
                           <Text style={{fontFamily:GLOBAL.medium,fontSize:18,marginTop:3}}>
                             PRICE RANGE

                           </Text>

                           {this.state.currency == "INR" && (
                             <Text style={{fontFamily:GLOBAL.medium,fontSize:16,marginTop:3}}>
                            ₹ {this.state.low} - ₹ {this.state.high}

                             </Text>
                           )}
                           {this.state.currency != "INR" && (
                             <Text style={{fontFamily:GLOBAL.medium,fontSize:16,marginTop:3}}>
                            $ {this.state.low} - $ {this.state.high}

                             </Text>
                           )}


                           </View>

                           <RangeSlider
                               style={{width: window.width - 100, height: 80}}
                               gravity={'center'}
                               min={0}
                               max={1000}
                               step={20}
                               selectionColor="#F2C1D7"
                               blankColor="#8E9198"
                               onValueChanged={(low, high, fromUser) => {
                                 this.setPrice(low,high)

    }}

                           />


                           <View style = {{width:window.width - 120,height:1,backgroundColor:'#f1f2f6',marginTop:10,marginLeft:10}}>

                           </View>


                           <Text style={{fontFamily:GLOBAL.medium,fontSize:18,marginTop:12}}>
                             RATINGS

                           </Text>

                           <FlatList style = {{marginTop:6,marginLeft:0,width:window.width - 40}}
                                     data={this.state.price}
                                     numColumns={5}
                                     keyExtractor={this._keyExtractor}
                                     renderItem={this.renderRowItem2d}
                                     extraData={this.state}
                           />

                           <Text style={{fontFamily:GLOBAL.medium,fontSize:18,marginTop:2}}>
                             SELECT DEPARTMENT

                           </Text>

                             <TouchableOpacity onPress= {()=>this.depart()}>
                            <View style = {{width:window.width - 105 ,borderRadius:4,borderWidth:1,borderColor:'#8E9198',height:40,flexDirection:'row'}}>
                            <TextInput
                                 style={{ height: 40,width:'85%',marginLeft:5,fontFamily:GLOBAL.medium,fontSize:18}}
                                 placeholder = 'Select Department'
                                 editable = {false}
                                 value = {this.state.depa}

                               />
                               <Image   source={require('./aa.png')}
                                        style  = {{width:22, height:22,resizeMode:'contain',marginRight:0,marginTop:8,
                                        }}

                               />

                            </View>
                            </TouchableOpacity>







                            <View style = {{width:window.width - 120,height:1,backgroundColor:'#f1f2f6',marginTop:10,marginLeft:10}}>

                            </View>


                            <RadioForm style={{marginTop:10}}
                                radio_props={radio_props}
                                initial={this.state.value}
                                buttonSize={10}
                                buttonColor={'#F2C1D7'}
                                formHorizontal={true}
                                buttonOuterColor = {'#F2C1D7'}
                                selectedButtonColor = {'#F2C1D7'}
                                animation={false}
                                labelColor={'#f0f1f3'}
                                buttonStyle={{marginTop:20}}
                                buttonWrapStyle={{marginTop:20}}
                                labelStyle = {{fontSize:16,fontFamily:GLOBAL.medium,paddingLeft:10, paddingRight:10,color:'black'}}
                                onPress={(value) => {this.setState({value:value})}}
                            />
                            <View style = {{width:window.width - 120,height:1,backgroundColor:'#f1f2f6',marginTop:10,marginLeft:10}}>

                            </View>
   <TouchableOpacity onPress= {()=>this.setState({term :!this.state.term})}>
                            <View style = {{flexDirection:'row'}}>

                            <Text style={{fontFamily:GLOBAL.medium,fontSize:18,marginTop:8,width:'80%'}}>
                              VIEW ALPHABETICALLY

                            </Text>
                            {this.state.term == false && (
                              <Image
                                  source={require('./box.png')}
                                  style={{width: 15, height: 15,marginLeft:28,marginTop:12,resizeMode:'contain'}}


                              />
                            )}

                            {this.state.term == true && (
                              <Image
                                  source={require('./boxa.png')}
                                  style={{width: 15, height: 15,marginLeft:28,marginTop:12,resizeMode:'contain'}}


                              />
                            )}

                            </View>
                            </TouchableOpacity>


                            <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:3,width:'70%'}}>
                            <Button
                                style={{marginLeft:8,paddingTop: 10 ,fontSize: 14,backgroundColor:'#ced4e2',marginRight:10 ,color: 'white',fontFamily:GLOBAL.medium,marginTop:6,height:40,width:120,borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this._handlePressCancel()}>
                              RESET
                            </Button>
                            <Button
                                style={{marginLeft:1,paddingTop: 10 ,fontSize: 14,backgroundColor:'#7BAAED', color: 'white',fontFamily:GLOBAL.medium,marginTop:6,height:40,width:120,borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this._handlePress1()}>
                              APPLY
                            </Button>



                            </View>
                    </View>



                     </DialogContent>
                   </Dialog>


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
