import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { getListScheduleSuccess } from '../../../redux/actions/schedule.action';
import { RemoteWord } from '../../../redux/actions/word.action';
import axios from 'axios';
import { getListScheduleRequest } from '../../../redux/actions/schedule.action';
import { showToastSuccess, showToastError } from '../../../helpers/toastHelper';
import { useTheme } from 'react-native-paper';
export default Calendar = ({ navigation }) => {
  const { colors } = useTheme();

  const scheduleList = useSelector(state => state.scheduleReducer.scheduleList);
  const [items, setItems] = useState(scheduleList);
  const [dot, setDot] = useState({});
  const users = useSelector(state => state.userReducer.user);
  const currentDate = new Date();
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    console.log('BEN CALENDAR DAY NHE ', scheduleList);
    setItems(scheduleList);
  });
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setItems(scheduleList);
  //     //Put your Data loading function here instead of my loadData()
  //   });

  //   return unsubscribe;
  // }, [navigation]);


  
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time); // ngay ma chung ta chon
        if (!items[strTime]) {
          items[strTime] = [];
          // const numItems = Math.floor(Math.random() * 3 + 1);
          // for (let j = 0; j < numItems; j++) {
          items[strTime].push({
            nameSchedule: '',
          });
          // }
        }
      }

      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });

      Object.keys(items).forEach((key) => {
        // console.log(newItems[key]);
        if (items[key].nameSchedule !== '') {
          dot[key] = items[key];
          // dot[key] = { marked: true };
        }
      });
      Object.keys(items).forEach((key) => {
        if (items[key][0].nameSchedule !== '') {
          dot[key] = { marked: true };
        }
      });
      setDot(dot)
      setItems(newItems);
    }, 1000);
  };
  
  const fixDigit = (val) => {
    return (val < 10 ? '0' : '') + val;
  }
  const editCalen = (item) => {
    console.log('CAI CAN EDIT LA', item);
    const now = fixDigit(currentDate.getFullYear()) + '-' + fixDigit(currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    var d1 = now.split("-");
    var d = item["date"].split("-");
    var nowdate = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
    var checkdate = new Date(d[0], parseInt(d[1]) - 1, d[2]);
    if (checkdate >= nowdate) {
      navigation.navigate("EditCalendar", { calen: item })
    }
    else {
      showToastError("Đã quá ngày rồi, vui lòng tạo lịch trình mới!!");
    }
  }

  const deleteCalen = (item) => {
    console.log(item["date"]);
    console.log(items[item["date"]]);
    const data = items[item["date"]]
    const idx = data.findIndex(e => e._id === item._id);
    console.log('index day ne', idx);
    data.splice(idx, 1);
    setItems([...data]);
    console.log('SAU LA ', data);
    axios.post('https://nameless-spire-67072.herokuapp.com/language/deleteschedule', {
      "id": item._id,
    }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === 1) {
          showToastSuccess("Xóa thành công");
        }
      })
      .catch(function (error) {
        throw error;
      })
  }
  const addCalen = () => {
    navigation.navigate("AddCalendar", { navigation: navigation, type: 1 });
  }
  const renderShedule = (item) => {
    return (
      <View style={{}}>
        <TouchableOpacity style={{ marginRight: 10, marginTop: 17, }} onPress={() => navigation.navigate("ViewCalendar", { calen: item })}>
          {
            item.nameSchedule !== '' ?
              <Card style={{ backgroundColor: '#fff' }}>
                <Card.Content style={{
                  borderLeftWidth: 2,
                  borderLeftColor: 'red',
                }}>
                  <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.nameSchedule}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <AntDesign name={'clockcircleo'} size={20} />
                        <Text style={{ marginLeft: 10 }}>{item.time}</Text>
                      </View>
                      {
                        item.method === 1 ?
                          <Icon name={'notifications-outline'} size={20} style={{ color: 'black' }} />
                          :
                         null

                      }

                    </View>
                  </View>
                  {/* <View>
              <Text>jhjhj</Text>
            </View> */}
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'flex-end' }}>
                  <TouchableOpacity onPress={() => editCalen(item)}>
                    <AntDesign name={'edit'} size={20} style={{ color: 'gray' }} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => deleteCalen(item)}>
                    <Icons name={'delete-outline'} size={20} style={{ color: 'red' }} />
                  </TouchableOpacity>
                </Card.Actions>
              </Card>
              :
              <View style={{}} />
            //   <Text style={{}}>Not event</Text>
            // </View>
          }
        </TouchableOpacity>

        {/* <TouchableOpacity style={{ height: 50, marginRight: 10, marginTop: 17, borderWidth: 1, borderStyle: 'dashed', borderRadius: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>+ Add schedule</Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>dajfk</Text> */}
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        markedDates={dot}
        renderItem={renderShedule}
      />
      <TouchableOpacity
        style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: 50, borderRadius: 30, backgroundColor: colors.header, borderColor: '#009387', bottom: 60, right: 20, position: 'absolute', zIndex: 1 }}
        onPress={() => addCalen()}
      >
        <Icon name={'add-outline'} size={40} style={{ color: 'white' }} />
      </TouchableOpacity>
    </View>
  )
}

