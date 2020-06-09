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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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

export default class Category extends Component {
    state = {
        selectedIndex: 0,
        refer : [],
        value:'',
        text:'',
      myindex:0,
      arry :[],

    };

    mySelect = (item,index) =>{
  const {arry} = this.state;

      if (arry.indexOf(item.title) === -1) {
//alert(JSON.stringify(item.title))
          this.setState({
              arry: [...arry, item.title]
          })
        }



      // var a  = this.state.refer[index]
      //
      //
      //
      // if (item.is_selected == ''){
      //    a.is_selected = 'Y'
      //    this.state.refer[index] = a
      //
      // }else {
      //    a.is_selected = ''
      //       this.state.refer[index] = a
      // }
      // this.setState({refer:  this.state.refer})

    }
remove = (item) =>{
  var array = [...this.state.arry]; // make a separate copy of the array
    var index = array.indexOf(item)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({arry: array});
    }
}
    renderRowItem2s = (itemData,index) => {
  return (
      <View style = {{borderRadius:12,elevation:1,backgroundColor:'rgba(0,0,0,0.4)',margin:3,flexDirection:'row'}}>

      <Text style = {{fontSize:12,padding:12,marginTop:0,fontFamily:GLOBAL.medium,textAlign:'center',marginLeft:4,fontWeight:'bold'}}>
{itemData.item}

</Text>

<TouchableOpacity
      onPress={() => this.remove(itemData.item)}
      activeOpacity={0.99}>
<Image   source={require('./criss-cross.png')}
         style  = {{width:16, height:16
         }}

/>
</TouchableOpacity>
      </View>
    )


    }
    renderRowItem2 = (itemData,index) => {

        return (

          <TouchableOpacity style={{width:'45%', marginLeft:10,marginRight:5,marginTop:1, height:hp('6.5%')}}
                onPress={() => this.mySelect(itemData.item,itemData.index)}
                activeOpacity={0.99}>


            <View >

            <View   style  = {{width:'100%', height:'100%',

               flexDirection:'row',alignItems:'center',
            }}
            >
<View style = {{width:25,height:25,elevation:5,borderRadius:6,backgroundColor:'white'}}>
            <Image source={{uri:itemData.item.image}}
                   style  = {{width:16, height:16,resizeMode:'contain',alignSelf:'center',marginTop:4}}/>
                   </View>


                              <Text style = {{fontSize:12,marginTop:0,fontFamily:GLOBAL.medium,textAlign:'justify',marginLeft:4,width:'80%',fontWeight:'bold'}}>
                        {itemData.item.title}

                    </Text>


                </View>



















            </View>
            </TouchableOpacity>

        )
    }

    save = ()=>{

      GLOBAL.issue = this.state.arry;
 // for (var i = 0;i<this.state.arry.length;i++){
 //   if(this.state.refer[i].is_selected == 'Y'){
 //     GLOBAL.issue.push(this.state.refer[i])
 //   }
   this.props.navigation.goBack()
 }

  //  }


    list = () => {
       return this.state.refer.map((element,index )=> {

         return (
           <View style={{ margin: 10 }}>
           <View style = {{flexDirection:'row'}}>
             <Text style = {{color:'black',fontSize:20,fontFamily:GLOBAL.bold}}>{element.title}</Text>
             <View style = {{height:1,backgroundColor:'#D3D3D3',width:window.width,marginTop:15,marginLeft:3}}>
             </View>
                </View>
             <FlatList style= {{flexGrow:0,marginTop:2}}
                         data={element.issues}
                           numColumns={2}
                         keyExtractor={this._keyExtractor}
                         renderItem={this.renderRowItem2}
                         extraData={this.state}
               />
           </View>
         );
       });
     };

    componentDidMount(){
      const url = GLOBAL.BASE_URL +  'view_all_issues'

                  fetch(url, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          view_all_issues:"view_all_issues",


                      }),
                  }).then((response) => response.json())
                      .then((responseJson) => {



console.log(JSON.stringify(responseJson))

                          if (responseJson.status == true) {
                            this.setState({refer:responseJson.category})

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
                        Category
                    </Text>

    <TouchableOpacity onPress= {()=>this.save()}>
                    <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight: 10,marginTop:20}}>
                     Done
                    </Text>
                    </TouchableOpacity>

                </View>

                <KeyboardAwareScrollView style={{ backgroundColor: '#fcfcfe',marginTop:0 }} >

                <FlatList style= {{flexGrow:0,marginTop:hp('1%')}}
                            data={this.state.arry}
                              horizontal = {true}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.renderRowItem2s}
                            extraData={this.state}
                  />
{this.list()}

<Text style = {{height:100}}>

</Text>

                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
