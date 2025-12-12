import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Modal, TextInput, Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from "react-native-safe-area-context";
import UserInfoCard from "../components/cards/UserInfoCard"
import {UseUserContext} from "../../UserContext";
import axios from "axios";
import {API_BASE_URL} from "@env";
import Ionicons from "@expo/vector-icons/Ionicons";

const Settings: React.FC = () => {
    const navigation = useNavigation<any>();
    const {user, setUser} = UseUserContext();

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [fieldValue, setFieldValue] = React.useState("");
    const [fieldKey, setFieldKey] = React.useState<'name' | 'email' | 'phone' | 'password'>('email');
    const [fieldLabel, setFieldLabel] = React.useState('Email');
    const [showPassword, setShowPassword] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const onLogout = () => {
        setUser(null)
        navigation.replace('Login')
    };

    const openEditField = (key: 'name' | 'email' | 'phone' | 'password', label: string) => {
        if (!user) {
            Alert.alert("Error", "No user is logged in");
            return;
        }
        setFieldKey(key);
        setFieldLabel(label);

        setFieldValue(key === "password" ? "" : (user as any)[key] ?? "");
        setConfirmPassword("");
        setShowPassword(false);

        setIsModalVisible(true);
    }

    const handleConfirm = async () => {
        if (!user) {
            Alert.alert("Error", "No user is logged in");
            return;
        }
        if (fieldKey === "password") {
            if (fieldValue !== confirmPassword) {
                Alert.alert("Error", "Passwords do not match");
                return;
            }
        }
        try {
            const response = await axios.put(`${API_BASE_URL}/user/${user.id}`, {
                [fieldKey]: fieldValue,
            });
            const updatedUser = response.data;

            setUser(old =>
                old ? {
                    ...old,
                    ...updatedUser,
                } : updatedUser
            );

            setIsModalVisible(false);

        } catch (error: any) {
            console.log("Update error", error.response.data)
            console.log(error.message);
            Alert.alert("Error", "Something went wrong when updating user information");
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setFieldValue("");
        setConfirmPassword("");
        setShowPassword(false);
    }


    return (
        <SafeAreaView edges={["top", "left", "right", "bottom"]} style={styles.container}>

            <Text style={styles.title}>Settings</Text>

            <UserInfoCard
                name={user?.name ?? "Unknown"}
                birthday={user?.birthday ?? "No birthday"}
                phone={user?.phone ?? "No phone number"}
                location={user?.location ?? "Unknown location"}
                email={user?.email ?? "No email"}
            />

            <View style={styles.buttonWrapper}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.smallButton}
                        onPress={() => openEditField('name', 'Name')}
                    >
                        <Text style={styles.smallButtonText}>Change name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.smallButton}
                        onPress={() => openEditField('email', 'Email')}>
                        <Text style={styles.smallButtonText}>Change email</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.smallButton}
                        onPress={() => openEditField('phone', 'Phone')}>
                        <Text style={styles.smallButtonText}>Change number</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.smallButton}
                        onPress={() => openEditField('password', 'Password')}>
                        <Text style={styles.smallButtonText}>Change password</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logOutBtn} onPress={onLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

            </View>

            <Modal
                visible={isModalVisible}
                transparent
                animationType="fade"
                onRequestClose={handleCancel}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change {fieldLabel}</Text>
                        {fieldKey === "password" ? (
                            <>
                                <View style={styles.inputRow}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        value={fieldValue}
                                        onChangeText={setFieldValue}
                                        placeholder="New password"
                                        autoCapitalize="none"
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(s => !s)}
                                        style={styles.eyeButton}
                                        accessibilityLabel={showPassword ? "Hide" : "Show"}>
                                        <Ionicons name={showPassword ? "eye-off" : "eye"} size={20}
                                                  color="#7A7A7A"/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputRow}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        placeholder="Confirm password"
                                        autoCapitalize="none"
                                        secureTextEntry={!showPassword}
                                    />
                                </View>
                            </>
                        ) : (
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.modalInput}
                                    value={fieldValue}
                                    onChangeText={setFieldValue}
                                    placeholder={fieldLabel}
                                    autoCapitalize="none"
                                />
                            </View>
                        )}

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.modalButtonCancel} onPress={handleCancel}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonConfirm} onPress={handleConfirm}>
                                <Text style={[styles.modalButtonText, {color: '#fff'}]}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingTop: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
        marginVertical: 16,
    },
    buttonWrapper: {
        width: "90%",
        marginTop: 18,
        alignSelf: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    smallButton: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 20,
        paddingVertical: 10,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 3,
    },
    smallButtonText: {
        fontSize: 13,
        color: "#7A7A7A",
        fontWeight: "700",
    },
    logOutBtn: {
        width: "100%",
        marginTop: 18,
        paddingVertical: 12,
        borderRadius: 22,
        backgroundColor: "#E3342F",
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 4,
    },
    logoutText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: "85%",
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
        textAlign: "center",
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 16,
    },
    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    modalButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    modalButtonCancel: {
        fontSize: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginRight: 8,
        backgroundColor: "#eee",
    },
    modalButtonConfirm: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: "#E3342F",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    eyeButton: {
        paddingLeft: 12,
        paddingVertical: 8,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 10,
    }


});

export default Settings;