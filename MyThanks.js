import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
import {NavigationActions,StackActions} from 'react-navigation';
const window = Dimensions.get('window');
import Button from 'react-native-button';

import moment from 'moment';



export default class MyThanks extends Component {
    state = {
        name :'',
    };

  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };



    componentDidMount(){
    //  alert(this.props.navigation.state.params)

    }
    _handlePress() {


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


    render() {
  var s = moment(GLOBAL.date).format('DD MMMM')
        return (

                <View style={styles.container}>



                    <Image style = {{width :300 ,height: 140,alignSelf:'center',marginTop:'30%',resizeMode: 'contain'}}
                           source={require('./thanks.png')}/>


                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 40,color :'#7BAAED', height:'auto',fontFamily:GLOBAL.medium,alignSelf:'center'}}>

                        THANK YOU
                    </Text>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'black', height:'auto',fontFamily:GLOBAL.medium,alignSelf:'center'}}>

                       FOR YOUR Wallet Recharge
                    </Text>




                  






                    <Button
                        style={{padding:4,marginTop:100,fontSize: 20, color: 'white',backgroundColor:'#7BAAED',marginLeft:'5%',width:'90%',height:40,fontFamily:'Nunito-SemiBold',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePress()}>
                        GO TO HOME
                    </Button>





                </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',
        height: window.height,
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

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:'Poppins-Regular',


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',
        textDecorationLine: 'underline',



    } ,
})
