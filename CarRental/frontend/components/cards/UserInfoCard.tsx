import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface UserInfoCardProps{
    name: string;
    birth: string;
    phone: string;
    location: string;
    email: string;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
    name,
    birth,
    phone,
    location,
    email
    }) => {
        return (
            <View style={styles.card}>
                <View style={styles.topRow}>
                    <Text style={styles.name}>{name}</Text>
                    <Feather name="user" size={22} style={styles.icon}/>
                </View>

                <Text style={styles.infoText}>{birth}</Text>
                <Text style={styles.infoText}>{phone}</Text>
                <Text style={styles.infoText}>{location}</Text>
                <Text style={styles.infoText}>{email}</Text>
            </View>
            );
        };

    const styles = StyleSheet.create({
        card:{
            width: "90%",
            alignSelf: "center",
            backgroundColor: "#ffffff",
            borderRadius: 12,
            paddingVertical: 14,
            paddingHorizontal: 16,
            marginTop: 16,

            shadowColor: "#000",
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 4,
            },

        topRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
        },

        name: {
            fontSize: 18,
            fontWeight: "700",
            color: "#E3342F",
        },

        icon: {},

        infoText: {
            fontSize: 13,
            color: "#7A7A7A",
            marginTop: 2,
        },

    });

export default UserInfoCard;