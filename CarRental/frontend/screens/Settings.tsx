import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from "react-native-safe-area-context";
import UserInfoCard from "../components/cards/UserInfoCard"
import {UseUserContext} from "../../UserContext";

const Settings: React.FC = () => {
    const navigation = useNavigation<any>();
    const {setUser} = UseUserContext();
    const {user} = UseUserContext();

    const onLogout = () => {
        setUser(null)
        navigation.replace('Login')
    };



    return (
        <SafeAreaView edges={["top", "left", "right", "bottom"]} style={styles.container}>

            <Text style={styles.title}>Settings</Text>

            <UserInfoCard
                name={user?.name ?? "Unknown"}
                birth={user?.birthday ?? ""}
                phone={user?.phone ?? ""}
                location={user?.location ?? "Unknown location"}
                email={user?.email ?? ""}
            />

            <View style={styles.buttonWrapper}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text style={styles.smallButtonText}>Change name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text style={styles.smallButtonText}>Change email</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text style={styles.smallButtonText}>Change number</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text style={styles.smallButtonText}>Change location</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logOutBtn} onPress={onLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

            </View>
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
});

export default Settings;