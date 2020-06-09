import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,FlatList,Image, Modal, Dimensions ,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';

import CheckBox from 'react-native-check-box'

export default class MyIssue extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
      elevations:0,
      name:'',
      modalVisible:false,
      isChecked:false,
          speciality:[
      {
        id: '1',
        title: 'Gynaecologist',
        artwork: require('./uterus.png'),
      },
      {
        id: '1',
        title: 'General Physician',
        artwork: require('./uterus.png'),
      },
      {
        id: '1',
        title: 'Orthopedician',
        artwork: require('./uterus.png'),
      },
      {
        id: '1',
        title: 'Mental Wellness',
        artwork: require('./uterus.png'),
      },
      {
        id: '1',
        title: 'Skin Specialist',
        artwork: require('./uterus.png'),
      },
      {
        id: '1',
        title: 'Men’s Sexual \nHealth',
        artwork: require('./uterus.png'),
      },
    ],
          moviesList:[
      {
        id: '1',
        title: 'Fever',
        artwork: require('./sone.png'),
      },
      {
        id: '1',
        title: 'Anxiety',
        artwork: require('./sone.png'),
      },
      {
        id: '1',
        title: 'Stomach',
        artwork: require('./sone.png'),
      },
      {
        id: '1',
        title: 'Hairfall',
        artwork: require('./sone.png'),
      },
      {
        id: '1',
        title: 'Back Pain',
        artwork: require('./sone.png'),
      },
      {
        id: '1',
        title: 'Cough',
        artwork: require('./sone.png'),
      },
      {
        id: '1',
        title: 'Diabetes',
        artwork: require('./sone.png'),
      },
      {
        id: '1',
        title: 'Acidity',
        artwork: require('./sone.png'),
      },
    ],
    status :'',
    hospitals:[
      {
        id: '1',
        title: '',
        artwork: require('./facebook.png'),
      },
      {
        id: '1',
        title: 'M',
        artwork: require('./facebook.png'),
      },
      {
        id: '1',
        title: '',
        artwork: require('./facebook.png'),
      },
      {
        id: '1',
        title: '',
        artwork: require('./facebook.png'),
      },
    ],
      membersList:[
      {
        id: 1,
        name: 'Myself',
        image: require('./facebook.png'),
        is_sel: '1'
      },
      {
        id: 2,
        name: 'Rahul',
        image: require('./facebook.png'),
        is_sel: '0'
      },
      ]
    }
  }

   setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
    }


  componentDidMount(){
    console.log(this.props.navigation)
  // this.props.navigation.addListener('focus',this._handleStateChange);

  }

    _handleStateChange = (state) => {
      this.setModalVisible(true)
    }

  addMoreAddress=()=>{
      this.setModalVisible(false)
      this.props.navigation.navigate('AddMember')
  }

  handlePress=()=>{
    this.setModalVisible(false)
  }

  renderMembers=({item, index})=>{

     if (item.plusImage) {
          return (
            <>
            <TouchableOpacity onPress={()=> this.addMoreAddress()}>
            <View style={{width:wp(70),  flex:1, height:hp(8),
              backgroundColor:'white', flexDirection:'row', alignItems:'flex-start'            }}>

                    <Text style = {{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'black',alignSelf:'center',marginLeft:wp(4),}}>
                    Add Member
                    </Text>
            </View>
            </TouchableOpacity>

      <View style={{width: wp(70), flexDirection: 'row', alignItems: 'center' , marginTop: 15}}>

        <CheckBox
            style={{padding: 10, marginTop:-20,}}
            onClick={()=>{
                 this.setState({
                     isChecked:!this.state.isChecked
                 })
               }}
            isChecked={this.state.isChecked}
            checkedImage={<Image source={require('./check.png')} style={{width:22, height:22, resizeMode:'contain'}}/>}
            unCheckedImage={<Image source={require('./check.png')} style={{width:22, height:22, resizeMode:'contain'}}/>}
        />

       <Text style={{fontSize: 12, color:'#757575', fontFamily: GLOBAL.bold,width:'85%', backgroundColor:'transparent'}}>
       I hereby declare that I am lawfully authorised to provide the above information on behalf of the owner
        of the information.
        </Text>
      </View>

          <TouchableOpacity style={{width:wp('40%'),borderRadius:5, marginTop:hp('3.5%'),
           backgroundColor:'#1976D2',height:hp('5%'),alignSelf:'center', marginRight:wp('2%')}}
           onPress={this.handlePress}>
          <View style={{width:'100%', height:hp('5%'), justifyContent:'center',alignItems:'center'}}>
          <Text style = {{color:'white',fontSize: 18,fontFamily:GLOBAL.medium,
          alignSelf:'center'}}>
          Next
          </Text>
          </View>

          </TouchableOpacity>

            </>
          );
        }

    return(
      <TouchableOpacity onPress={()=> this.setModalVisible(false)}>
      <View style={{width:wp(70), height:hp(8),flexDirection:'row',marginTop:hp(2), }}>
      <Image style={{width:60, height:60, borderRadius:30,}} source={item.image}/>
      <Text style={{fontFamily:'AvenirLTStd-Medium', marginLeft:wp(4), fontSize:17, alignSelf:'center'}}>{item.name}</Text>
      {item.is_sel== '1' && (
      <Image style={{width:25, height:25, resizeMode:'contain', alignSelf:'center', position:'absolute', right:10}} source={require('./check.png')}/>
      )}
      </View>
       <View style={{width:wp(70), height:0.5,backgroundColor:'#D8D8D8', marginTop:hp(2), marginBottom:hp(1) }}/>
       </TouchableOpacity>
      )

  }


  _renderSpeciality=({item, index})=>{
    return(
      <TouchableOpacity style={{width:'93%', margin:10,marginRight:5,marginTop:10,marginBottom:10, height:hp('10%')}}
      onPress={() => this.selectedFirst(item.id)}
      activeOpacity={0.99}>
          <View   style  = {{width:'100%', height:'100%',backgroundColor:'white',shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,borderRadius:15,
              shadowRadius: 3.84,elevation:4, flexDirection:'row', justifyContent:'center'
          }}
          >
        <Image source={item.artwork}
               style  = {{width:30, height:30,resizeMode:'contain', marginLeft:5,alignSelf:'center'}}/>

              <Text style = {{fontSize:15,marginLeft:10,marginRight:5,fontFamily:GLOBAL.medium,color:'#293440',alignSelf:'center'}}>
                  {item.title}
              </Text>
          </View>
      </TouchableOpacity>
    )
  }

    _renderItemproducts = ({item, index}) => {
        return (
      <TouchableOpacity style={{width:'45%', margin:10,marginRight:5,marginTop:10,marginBottom:10, height:hp('10%')}}
            onPress={() => this.selectedFirst(item.id)}
            activeOpacity={0.99}>
                <View   style  = {{width:'100%', height:'100%',backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,borderRadius:15,
                    shadowRadius: 3.84,elevation:4, flexDirection:'row',alignItems:'center',
                }}
                >

              <Image source={item.artwork}
                     style  = {{width:30, height:30,resizeMode:'contain', marginLeft:wp(4)}}/>
              <Text style = {{fontSize:15,marginTop:0,fontFamily:GLOBAL.medium,color:'#293440',marginLeft:10}}>
                  {item.title}
              </Text>
      <Image style={{width:25, height:25, resizeMode:'contain', alignSelf:'center', position:'absolute', right:10}} source={require('./check.png')}/>

                </View>
            </TouchableOpacity>
        )
    }

    clickNext=()=>{
      this.props.navigation.navigate('ChooseDoctor')
    }

  render() {
    return (
      <View style={styles.container}>

    <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>

         <View style={{flexDirection:'column',flex:1, alignItems:'center',}}>



         <View style={{width:wp('100%'), marginTop:hp('2%'),}}>


          <Text style = {{width:wp('91%'),color:'#262626',fontSize: 18,fontFamily:GLOBAL.medium,textAlign:'left', lineHeight:35,marginTop:hp(0), marginLeft:wp(5)}}>
          Search Health Problem/ Symptoms/ Doctor</Text>

          <View style={{flexDirection:'row',borderRadius:10, alignSelf:'center',width:wp(90),backgroundColor:'#F0F0F0',padding:5, marginTop:hp(1.5) }}>
          <Image style={{width:20, height:20, resizeMode:'contain', alignSelf:'center', marginLeft:10}}
          source={require('./ic_search.png')}/>
          <TextInput style={{fontFamily:GLOBAL.medium, paddingLeft:15, width:'90%', backgroundColor:'transparent'}}
          placeholder={'Eg. Cold, fever, cough'}
          />
          </View>

          <View style={{width:wp(20), height:hp(5), backgroundColor:'#FDA0B4', borderRadius:5,
           flexDirection:'row', justifyContent:'center',marginLeft:wp(5), marginTop:hp(2.3)}}>
          <Text style = {{color:'white',fontSize: 14,fontFamily:GLOBAL.medium,alignSelf:'center'}}>
          Fever</Text>
          <Image style={{width:10, height:10, resizeMode:'contain', alignSelf:'center', marginLeft:10}}
          source={require('./cross.png')}/>
          </View>

          <View style={{width:'100%', flexDirection:'row',marginTop:hp(4.5)}}>




          <View style={{flexDirection:'column'}}>
          <Text style = {{color:'#1E1F20',fontSize: 17,fontFamily:GLOBAL.medium,textAlign:'left', marginLeft:wp(5)}}>
          Symptoms</Text>
          <Text style = {{color:'gray',fontSize: 14,fontFamily:GLOBAL.medium,textAlign:'left',marginLeft:wp(5)}}>
          Select from Symptoms</Text>
          <FlatList style= {{flexGrow:0,marginTop:hp('1%'),}}
                    data={this.state.moviesList}
                    numColumns={2}
                    keyExtractor = { (item, index) => index.toString() }
                    renderItem={this._renderItemproducts}
          />

          </View>

          </View>

          <TouchableOpacity style={{width:wp('90%'),borderRadius:5, marginVertical:hp('4%'),
           backgroundColor:'#1976D2',height:hp('7%'),alignSelf:'center',}}
           onPress={()=> this.clickNext()}>
          <View style={{width:'100%', height:hp('7%'), justifyContent:'center',alignItems:'center'}}>
          <Text style = {{color:'white',fontSize: 18,fontFamily:GLOBAL.medium,
          alignSelf:'center'}}>
          Next
          </Text>
          </View>

          </TouchableOpacity>

         </View>
         </View>
         </KeyboardAwareScrollView>

        <Modal
           animationType="slide"
           transparent={true}
           visible={this.state.modalVisible}
           onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
             this.setModalVisible(!this.state.modalVisible)
           }}>
               <TouchableOpacity style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  alignItems: 'center', borderRadius:0}}
                  activeOpacity={1}
                  onPressOut={() => {this.setModalVisible(true)}}
                  >
                  <View style={{width: wp(80),backgroundColor: 'white',height: hp(60), borderRadius:18}}>
                    <View style={{width: '100%',  backgroundColor:'white', borderRadius:18}}>
                    <View style={{flexDirection:'row', width:'100%', backgroundColor:'white', height:60,
                     borderTopLeftRadius:18, borderTopRightRadius:18, borderTopLeftWidth:1,justifyContent:'center',alignItems:'center',
                     borderTopRightWidth:1, borderTopRightColor:'transparent', borderTopLeftColor:'transparent'}}>
                    <Text style={{fontSize: 18, color:'#1E1F20', fontFamily: GLOBAL.medium,marginTop:hp(2), alignSelf:'center', textAlign:'center'}}>Who is the Patient?</Text>
                     </View>

          <FlatList style= {{flexGrow:0,marginBottom:10, alignSelf:'center'}}
                    data={[...this.state.membersList, {plusImage : true}]}
                    numColumns={1}
                    extraData={this.state}
                    keyExtractor = { (item, index) => index.toString() }
                    renderItem={this.renderMembers}/>

                      </View>
                  </View>
              </TouchableOpacity>
         </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fafafa'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
