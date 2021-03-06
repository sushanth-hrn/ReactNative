import React,{ Component } from "react";
import { Text, View, ScrollView, StyleSheet, Picker,
     Switch, Button, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Permissions, Notifications, Calander } from 'expo';
class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title : 'Reservation Table'
    }

    handleResrvation() {
        console.log(JSON.stringify(this.state));
        //this.toggleModal();
        Alert.alert(
            'Your Reservation . . .',
            `Number of Guests : ${this.state.guests}
            Smoking : ${this.state.smoking ? 'Yes' : 'No'}
            Reserved Date: ${this.state.date}
            `,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {this.resetForm()}
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.resetForm();
                        this.addReservationToCalendar(this.state.date);
                    }
                }
            ],
            { cancelable : false }
        )
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        })
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if(permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status !== 'granted') {
                Alert.alert('Permission is denied for showing notifications');
            }
        }
        return permission;
    }

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALANDER);
        if(permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALANDER);
            if(permission.status !== 'granted') {
                Alert.alert('Permission is denied for accessing calander');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        })
    }

    async addReservationToCalendar(date) {
        await obtainCalendarPermission();
        Calander.createEventAsync(Calander.DEFAULT, {
            title : 'Con Fusion Table Reservation',
            startDate : new Date(Date.parse(date)),
            endDate : new Date(Date.parse(date) + (2*60*60*1000)),
            timeZone : 'Asia/Hong_Kong',
            location : '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        })
    }

    render() {
        return (
            <Animatable.View animation='zoomInUp' duration={2000} delay={1000}>
                <ScrollView>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Number of Guests
                        </Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(value,index) => this.setState({guests : value})}
                        >
                            <Picker.Item label="1" value="1"/>
                            <Picker.Item label="2" value="2"/>
                            <Picker.Item label="3" value="3"/>
                            <Picker.Item label="4" value="4"/>
                            <Picker.Item label="5" value="5"/>
                            <Picker.Item label="6" value="6"/>
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Smoking/Non-Smoking?
                        </Text>
                        <Switch 
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#512DA8'
                            onValueChange={(val) => this.setState({smoking : val})}
                        >
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Date and Time
                        </Text>
                        <DatePicker 
                            style={{flex: 2 , marginRight: 20}}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='Enter Date and Time'
                            minDate='2021-05-05'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => this.setState({date : date})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button 
                                title='Reserve'
                                color='#512DA8'
                                onPress={() => {
                                    this.handleReservation();
                                }}
                                accessibilityLabel='Learn more about this purple button'
                        />
                    </View>

                    {/* <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showModal}
                        onDismiss={() => {this.toggleModal();this.resetForm()}}
                        onRequestClose={() => {this.toggleModal();this.resetForm()}}
                    >
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>Confirmation</Text>
                            <Text style={styles.modalText}>Number of Guests : {this.state.guests}</Text>
                            <Text style={styles.modalText}>Smoking : {this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style={styles.modalText}>Reserved Date: {this.state.date}</Text>
                            <View style={{width:50,justifyContent:'center'}}>
                                <Button 
                                    onPress={() => {this.toggleModal();this.resetForm()}}
                                    title="Close"
                                    color="#841584"
                                />
                            </View>
                        </View>
                    </Modal> */}
                    
                </ScrollView>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        color: 'white',
        backgroundColor: '#512DA8',
        fontweight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;

// async getDefaultCalendarSource() {
    //     const calendars = await Calendar.getCalendarsAsync();
    //     const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    //     return defaultCalendars[0].source;
    // }

    // async addReservationToCalendar() {
        
    //     await this.obtainCalendarPermission();
        
    //     let dateCurr = Date.parse(this.state.date);
    //     let endDate = new Date(dateCurr + 3600 * 2 * 1000);
        
    //     const defaultCalendarSource=Platform.OS==='ios'?await this.getDefaultCalendarSource()
    //     : { isLocalAccount: true, name: 'Expo Calendar' };
        
    //     const defaultCalendarId=await Calendar.createCalendarAsync({
    //         title: 'Your Reservation at Con Fusion',
    //         color: 'blue',
    //         entityType: Calendar.EntityTypes.EVENT,
    //         sourceId: defaultCalendarSource.id,
    //         source : defaultCalendarSource,
    //         name: 'internalCalendarName',
    //         ownerAccount: 'personal',
    //         accessLevel: Calendar.CalendarAccessLevel.OWNER,
    //     });

    //     await Calendar.createEventAsync(defaultCalendarId, {
    //         title: 'Con Fusion Table Reservation',
    //         startDate: this.state.date,
    //         endDate: endDate,
    //         timeZone: 'Asia/Hong_Kong',
    //         location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
    //     });
    // }