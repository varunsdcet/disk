import {  createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from './Splash.js';
import Swiper from './Swiper.js';
import Chat from './Chat.js';
import MyChat from './MyChat.js';
import AudioCall from './AudioCall.js';
import CompletedChat from './CompletedChat.js';
import ForgotOtp from './ForgotOtp.js';
import CancelHistory from './CancelHistory.js';
import VideoView from './VideoView.js';
import Publisher from './Publisher.js';
import ChangePassword from './ChangePassword.js';
import Signup from './Signup.js';
import Otp from './Otp.js';
import Terms from './Terms.js';
import Refer from './Refer.js';
import LiveDoctor from './LiveDoctor.js';
import Payment from './Payment.js';
import Login from './Login.js';
import Viewer from './Viewer.js';
import Settings from './Settings.js';
import Home from './Home.js';
import WalletRecharge from './WalletRecharge.js';
import Appointment from './Appointment.js';
import DoctorDetail from './DoctorDetail.js';
import Information from './Information.js';
import Review from './Review.js';
import BookingFinal from './BookingFinal.js';
import Booking from './Booking.js';
import BookingDetail from './BookingDetail.js';
import Category from './Category.js';
import Forgot from './Forgot.js';
import DoctorList from './DoctorList.js';
import Publish from './Publish.js';
import Thankyou from './Thankyou.js';
import VideoCall from './VideoCall.js';
import Wallet from './Wallet';
import ContactUs from './ContactUs';
import Rating from './Rating';
import Subscription from './Subscription';
import EditProfile from './EditProfile';
import BookingPayment from './BookingPayment';
import AppointmentDetail from './AppointmentDetail';
import Reschedule from './Reschedule';
import MyDoctor from './MyDoctor';
import Demo from './Demo';
import Department from './Department';
import Notification from './Notification';
import LiveBroadcast from './LiveBroadcast';
import MyThanks from './MyThanks';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Platform, StyleSheet, Text, View, Button, Image, Alert, Dimensions} from 'react-native';



const TabNavigator = createBottomTabNavigator({
        Home: { screen: Home,
            navigationOptions : {
                title:'Home',

                tabBarLabel: 'Home',

                swipeEnabled: false,
                gesturesEnabled: false,
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ focused }) => {

                    const image = focused
                        ? require('./homes.png')
                        : require('./home.png')

                    return (
                        <Image
                            source={image}
                            style={{height: 20, width: 20}}
                        />
                    )
                }
            }
        },
        Appointment: { screen: Appointment ,
            navigationOptions : {
                title:'Appointment',
                tabBarLabel: 'Appointment',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ focused }) => {

                    const image = focused
                        ? require('./appointments.png')
                        : require('./appointment.png')

                    return (
                        <Image
                            source={image}
                            style={{height: 20, width: 20}}
                        />
                    )
                }
            }
        },

        LiveDoctor: { screen: LiveDoctor ,
            navigationOptions : {
                title:'',
                tabBarLabel: '',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ tintColor }) =>

                    <View style={{height:70, width:70, borderRadius:35,backgroundColor: 'transparent',
                    }}>

                        <Image
                            source={require('./broadcast.png')}
                            style={{width:70, height:70,alignSelf:'center',resizeMode:'contain'}}
                        />
                    </View>

            }},


        Notification: { screen: Notification ,
            navigationOptions : {
                title:'Notification',
                tabBarLabel: 'Notification',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ focused }) => {

                    const image = focused
                        ? require('./notifications.png')
                        : require('./notification.png')

                    return (
                        <Image
                            source={image}
                            style={{height: 20, width: 20}}
                        />
                    )
                }
            }
        },
        Settings: { screen: Settings ,
            navigationOptions : {
                title:'Setting',
                tabBarLabel: 'Setting',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ tintColor }) =>
                    <Image
                        source={require('./settings.png')}
                        style={{width:20, height:20}}
                    />
            }
        },

    },


    {
        defaultNavigationOptions: ({ navigation }) => ({

            swipeEnabled: false,
            gesturesEnabled: false,

            tabBarIcon: () => (
                <Image
                    source={require('./home.png')}
                    style={{width:20, height:20}}
                />
            )
        }),
        tabBarOptions: {

            swipeEnabled: false,
            gesturesEnabled: false,
            activeTintColor: '#7BAAED',
            inactiveTintColor: '#8E9198',
            inactiveBackgroundColor:'white',
            activeBackgroundColor:'white',
            showIcon:'true'
        },

    }
);




const StackNavigator = createStackNavigator({



    Splash: {screen: Splash},
    Swiper:{screen:Swiper},
    Signup:{screen:Signup},
    TabNavigator:{screen:TabNavigator},
    Otp:{screen:Otp},
    Login:{screen:Login},
    Home:{screen:Home},
    Information:{screen:Information},
    Review:{screen:Review},
    Appointment:{screen:Appointment},
    Booking:{screen:Booking},
    LiveBroadcast:{screen:LiveBroadcast},
    BookingDetail:{screen:BookingDetail},
    Category:{screen:Category},
    DoctorDetail:{screen:DoctorDetail},
    Forgot:{screen:Forgot},
    DoctorList:{screen:DoctorList},
    Publish:{screen:Publish},
    Viewer:{screen:Viewer},
    MyChat:{screen:MyChat},
    VideoCall:{screen:VideoCall},
    Wallet:{screen:Wallet},
    WalletRecharge:{screen:WalletRecharge},
    Payment:{screen:Payment},
    BookingFinal:{screen:BookingFinal},
    Settings:{screen:Settings},
    ContactUs:{screen:ContactUs},
    Refer:{screen:Refer},
    VideoView:{screen:VideoView},
    Rating:{screen:Rating},
    Publisher:{screen:Publisher},
    Subscription :{screen:Subscription},
    EditProfile:{screen:EditProfile},
    BookingPayment:{screen:BookingPayment},
    CancelHistory:{screen:CancelHistory},
    AppointmentDetail:{screen:AppointmentDetail},
    Reschedule:{screen:Reschedule},
    MyDoctor:{screen:MyDoctor},
Demo:{screen:Demo},
Department:{screen:Department},
Notification:{screen:Notification},
LiveDoctor:{screen:LiveDoctor},
Terms:{screen:Terms},
AudioCall:{screen:AudioCall},
CompletedChat:{screen:CompletedChat},
ForgotOtp:{screen:ForgotOtp},
ChangePassword:{screen:ChangePassword},
Thankyou:{screen:Thankyou},
MyThanks:{screen:MyThanks},




},{
    headerMode :'none',
    mode: 'card',
    navigationOptions: params => ({
        gesturesEnabled: false,


        gesturesDirection: 'inverted',
    }),



});

export default createAppContainer(StackNavigator);
