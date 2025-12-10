import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import React, {useEffect, useState} from "react";
import {Modal, View, StyleSheet, Text, TouchableOpacity} from "react-native";

type CalendarCardProps = {
    visible: boolean;
    initialDate?: Date;
    title?: string;
    onConfirm: (date: Date) => void;
    onClose: () => void;
}

const CalendarCard: React.FC<CalendarCardProps> = ({
    visible,
    initialDate,
    title,
    onConfirm,
    onClose,
}) => {
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate || new Date());

    useEffect(() => {
        if (initialDate) {
            setSelectedDate(initialDate);
        }
    }, [initialDate]);

    const handleChange = (_event: DateTimePickerEvent, date?: Date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleOk = () => {
        onConfirm(selectedDate);
        onClose();
    }

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
                            display={"inline"}
                            onChange={handleChange}
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

export default CalendarCard;

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