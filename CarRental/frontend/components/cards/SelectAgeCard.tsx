import React, {useEffect, useState} from "react";
import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";

type SelectAgeCardProps = {
    visible: boolean;
    initialDate?: Date;
    title?: string;
    minAge?: number;
    onConfirm: (date: Date) => void;
    onClose: () => void;
}

const getAge = (birthdate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();

    const month = today.getMonth() - birthdate.getMonth();
    const day = today.getDate() - birthdate.getDate();

    if (month < 0 || (month === 0 && day < 0)) {
        age--;
    }
    return age;
}

const SelectAgeCard: React.FC<SelectAgeCardProps> = ({
    visible,
    initialDate,
    title = "Select date of birth",
    minAge = 18,
    onConfirm,
    onClose,
}) => {
    const maxAllowedDate = (() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - minAge);
        d.setHours(0, 0, 0, 0);
        return d;
    })();

    const getInitialSelectedDate = () => {
        if(initialDate) {
            return initialDate > maxAllowedDate ? maxAllowedDate : initialDate;
        }
        return maxAllowedDate;
    };

    const [selectedDate, setSelectedDate] = useState<Date>(getInitialSelectedDate());

    useEffect(() => {
        setSelectedDate(getInitialSelectedDate());
    }, [initialDate, minAge]);

    const handleChange = (_event: DateTimePickerEvent, date?: Date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleOk = () => {
        const age = getAge(selectedDate);
        if (age < minAge ) {
            Alert.alert(
                "Age restriction",
                `You must be at least ${minAge} years old.`
            )
            return;
        }

        onConfirm(selectedDate);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.background}>
                <View style={styles.card}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.calendarWrapper}>
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display={"spinner"}
                            onChange={handleChange}
                            maximumDate={maxAllowedDate}
                            style={styles.calendar}
                        />
                    </View>

                    <View style={styles.action}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.okButton]} onPress={handleOk}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

export default SelectAgeCard;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "85%",
        borderRadius: 20,
        backgroundColor: "white",
        padding: 16,
        gap: 12,
        overflow: "hidden"
    },
    calendarWrapper: {
        overflow: "hidden"
    },
    calendar: {
        alignSelf: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 2,
        textAlign: "center",
        color: "#BA181B"
    },
    action: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 12
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    buttonText: {
        fontWeight: "bold",
        color: "#fff"
    },
    cancelButton: {
        backgroundColor: "rgba(94,93,94,0.5)",
    },
    okButton: {
        backgroundColor: "#BA181B"
    }
})