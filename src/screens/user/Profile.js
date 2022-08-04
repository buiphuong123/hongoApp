import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Animated, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput as TextInputPaper } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { loginUserSuccess } from '../../redux/actions';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation, route }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const { user } = route.params;
    // const [pass, setPass] = useState("");
    // const [newPass, setNewPass] = useState("");
    // const [confirmPass, setConfirmPass] = useState("");
    const [chooseTab, setChooseTab] = useState(1);
    const [type, setType] = useState(false);
    const users = useSelector(state => state.userReducer.user);
    const [editRequire, setEditRequire] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [hobby, setHobby] = useState(user.hobby !== undefined ? user.hobby : "");
    const [level, setLevel] = useState(user.level !== undefined ? user.level : "N5");
    // const [value, setValue] = useState(users.level !== undefined? users.level : "N5");
    const wordoptions = ["N5", "N4", "N3", "N2"];
    const [check, setCheck] = useState(false);
    useEffect(() => {
        console.log('user vao profile ne ', user);
        setUsername(user.username);
        setEmail(user.email);
        setHobby(user.hobby !== undefined ? user.hobby : "");
        setLevel(user.level !== undefined ? user.level : "N5...");
        if (user._id === users._id) {
            console.log(user._id, users._id);
            setType(true);
        }
        else {
            setType(false);
        }
    }, [user]);
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          console.log('setlaij value moi', jsonValue);
          await AsyncStorage.setItem('@user', jsonValue);
        } catch (e) {
          // saving error
          console.log('save error');
        }
      }
    const [data, setData] = useState({
        pass: "",
        newPass: "",
        confirmPass: "",
        isValidPassword: true,
        isValidNewPassword: true,
        isMatch: true,
    })
    const [image, setImages] = useState(users.avatar);
    const editInfo = () => {
        users.username = username;
        users.level = level;
        users.hobby = hobby;
        dispatch(loginUserSuccess(users));
        axios.post('https://nameless-spire-67072.herokuapp.com/language/editUser', {
            "id": users._id,
            "username": username,
            "level": level,
            "hobby": hobby,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                setEditRequire(false);
            })
            .catch(function (error) {
                throw error;
            })
    }

    const addImage = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
        }).then((image) => {
            var photo = {
                uri: image.path,
                type: image.mime,
                name: image.path.split('/').pop(),
            };
            const formData = new FormData();
            formData.append("file", photo);
            formData.append("upload_preset", "kbihuaf8");
            axios.post("https://api.cloudinary.com/v1_1/languageword/image/upload", formData).then((response) => {

                setImages(response.data.url);
                axios.post('https://nameless-spire-67072.herokuapp.com/language/uploadAvatar', {
                    "id": users._id,
                    "avatar": response.data.url,
                }, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then((response1) => {
                        console.log(response1.data);
                        users.avatar = response.data.url;
                        storeData(users);
                        dispatch(loginUserSuccess(users));

                    })
                    .catch(function (error) {
                        throw error;
                    })

            });
        }).catch((error) => {
            console.log(`loi ${error}`);
        });
    }
    const handlePasswordChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                pass: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                pass: val,
                isValidPassword: false
            });
        }
    }
    const handleNewPasswordChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                newPass: val,
                isValidNewPassword: true
            });
        } else {
            setData({
                ...data,
                newpass: val,
                isValidNewPassword: false
            });
        }
    }
    const handleNewPasswordMatch = (val) => {

        if (val === data.newPass) {
            setData({
                ...data,
                confirmPass: val,
                isMatch: true
            });
        } else {
            setData({
                ...data,
                confirmPass: val,
                isMatch: false
            });
        }
    }
    const changePass = () => {
        if ((data.pass === "" && data.pass.length === 0) || (data.newPass === "" && data.newPass.length === 0) || (data.confirmPass === "" && data.confirmPass.length === 0) || data.isValidPassword === false || data.isValidNewPassword === false || data.isMatch === false) {
            return;
        }
        else {
            axios.post('https://nameless-spire-67072.herokuapp.com/language/ChangPasswordUser', {
                "id": users._id,
                "pass": data.pass,
                "newPass": data.newPass,
            }, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.code === 1) {
                        users.password = response.data.user.password;
                        dispatch(loginUserSuccess(users));

                    }
                })
                .catch(function (error) {
                    throw error;
                })
        }
    }
    return (
        <View>
            <View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                    <Icon name={'arrow-back'} size={29} style={{ marginLeft: 5, color: colors.text }} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 50 }}
                        source={{
                            uri: image,
                        }}
                    />
                    {type === true ?
                        <EvilIcons
                        onPress={() => addImage()}
                            name="camera"
                            style={{ zIndex: 1, position: 'absolute', bottom: 20, justifyContent: 'center', right: 130, top: 90, color: colors.text }}
                            // color={'white'}
                            size={23}
                        />
                        : null
                    }
                    <Text style={{ marginTop: 10, fontSize: 18, color: colors.text }}>{user.username}</Text>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => setChooseTab(1)} style={{ borderBottomWidth: chooseTab === 1 ? 1 : 0, borderBottomColor: chooseTab === 1 ? colors.header : '#fff' }}>
                        <Text style={{ marginBottom: 5, color: colors.text }}>Thông tin</Text>
                    </TouchableOpacity>
                    {
                        type === true ?
                            <TouchableOpacity onPress={() => setChooseTab(2)} style={{ borderBottomWidth: chooseTab === 2 ? 1 : 0, borderBottomColor: chooseTab === 2 ? colors.header : '#fff' }}>
                                <Text style={{ marginBottom: 5, color: colors.text }}>Bảo mật</Text>
                            </TouchableOpacity>
                            : null
                    }
                </View>
                {chooseTab === 1 ?
                    <View style={{ backgroundColor: colors.background }}>
                        {
                            type === true ?
                                editRequire === true ?
                                    <TouchableOpacity
                                        onPress={() => setEditRequire(false)}
                                        style={{ justifyContent: 'flex-end', flexDirection: 'row', margin: 10 }}>
                                        <Text style={{ color: colors.text }}>Hủy</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={() => setEditRequire(true)}
                                        style={{ justifyContent: 'flex-end', flexDirection: 'row', margin: 10 }}>
                                        <Text style={{ color: colors.text }}>Chỉnh sửa</Text>
                                    </TouchableOpacity>
                                :
                                null
                        }

                        <View style={{ backgroundColor: colors.background, padding: 10, borderTopWidth: 1, borderTopColor: '#e6e6e6' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: '#e6e6e6' }}>
                                <Text style={{ alignSelf: 'center', color: colors.header }}>Đăng nhập</Text>
                                {/* <Text style={{ fontWeight: 'bold' }}>buithiphuong0703</Text> */}
                                <TextInput
                                    style={{ height: 30, padding: 3, fontWeight: 'bold', color: colors.text }}
                                    value={email}
                                    editable={false}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: '#e6e6e6' }}>
                                <Text style={{ alignSelf: 'center', color: colors.header }}>Họ và tên</Text>
                                <TextInput
                                    style={{ height: 30, padding: 3, fontWeight: 'bold', color: colors.text }}
                                    value={username}
                                    editable={editRequire ? true : false}
                                    onChangeText={(text) => setUsername(text)}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5 }}>
                                <Text style={{ alignSelf: 'center', color: colors.header }}>Trình độ tiếng Nhật</Text>
                                {
                                    editRequire === true ?
                                        <SelectDropdown
                                            data={wordoptions}
                                            onSelect={(selectedItem, index) => {
                                                setLevel(selectedItem);
                                            }}
                                            dropdownStyle={{ backgroundColor: colors.dropdown }}
                                            defaultValue={level}
                                            buttonStyle={{ width: '30%', height: 30, backgroundColor: colors.background, fontWeight: 'bold' }}
                                            buttonTextStyle={{ backgroundColor: colors.background, color: colors.text, fontWeight: 'bold', marginRight: '-60%', marginTop: 0, fontSize: 15 }}
                                        />
                                        :
                                        <TextInput
                                            style={{ color: colors.text, height: 30, padding: 5, fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center' }}
                                            // value={username}
                                            editable={editRequire ? true : false}
                                            value={level}
                                            onChangeText={(text) => setLevel(text)}
                                        />
                                }

                            </View>
                            <View style={{ paddingTop: 5, borderTopWidth: 1, borderTopColor: '#e6e6e6' }}>
                                <Text style={{ color: colors.header }}>Giới thiệu bản thân</Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    style={{ fontWeight: 'bold', color: colors.text, textAlignVertical: 'top' }}
                                    placeholder="Tính cách, sở thích..."
                                    placeholderTextColor={colors.text_of_input}

                                    editable={editRequire ? true : false}
                                    value={hobby}
                                    onChangeText={(text) => setHobby(text)}
                                />
                            </View>
                            {editRequire ?
                                <TouchableOpacity
                                    onPress={() => editInfo()}
                                    style={{ justifyContent: 'center', backgroundColor: '#6666ff', padding: 10, marginTop: 20, maxWidth: 60, alignSelf: 'center' }}>
                                    <Text style={{ alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Lưu</Text>
                                </TouchableOpacity>
                                : null}

                        </View>
                    </View>
                    :
                    <View style={{ margin: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, color: colors.text }}>Đổi mật khẩu </Text>
                        </View>
                        <TextInputPaper label="Mật khẩu" mode="outlined"
                            style={{ marginTop: 10, margin: 10 }}
                            // onChangeText={(text) => setPass(text)}
                            // value={data.pass}

                            secureTextEntry={true}
                            onChangeText={(val) => handlePasswordChange(val)}
                            theme={{
                                colors: {
                                    primary: colors.header,
                                    underlineColor: 'transparent',

                                }
                            }}

                        />
                        {data.isValidPassword ? null :
                            <Animated.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg} >Password must be 4 characters long</Text>
                            </Animated.View>
                        }
                        <TextInputPaper label="Mật khẩu mới" mode="outlined"
                            style={{ marginTop: 10, margin: 10 }}
                            // onChangeText={(text) => setNewPass(text)}
                            // value={newPass}
                            secureTextEntry={true}
                            onChangeText={(val) => handleNewPasswordChange(val)}
                            theme={{
                                colors: {
                                    primary: colors.header,
                                    underlineColor: 'transparent',

                                }
                            }}
                        />
                        {data.isValidNewPassword ? null :
                            <Animated.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg} >Password must be 4 characters long</Text>
                            </Animated.View>
                        }
                        <TextInputPaper label="Nhập lại mật khẩu mới" mode="outlined"
                            style={{ marginTop: 10, margin: 10 }}
                            // onChangeText={(text) => setConfirmPass(text)}
                            // value={confirmPass}
                            secureTextEntry={true}
                            onChangeText={(val) => handleNewPasswordMatch(val)}
                            theme={{
                                colors: {
                                    primary: colors.header,
                                    underlineColor: 'transparent',

                                }
                            }}

                        />
                        {data.isMatch ? null :
                            <Animated.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg} >Password not match</Text>
                            </Animated.View>
                        }

                        <TouchableOpacity
                            onPress={() => changePass()}
                            style={{ padding: 10, backgroundColor: colors.header, margin: 10, marginTop: 20, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: '#fff' }}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}
export default Profile;
const styles = StyleSheet.create({
    inputText: {
        height: 20, fontWeight: 'bold',
        borderBottomWidth: 0,

    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        marginLeft: 10
    },
})