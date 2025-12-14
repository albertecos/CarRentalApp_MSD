import React from "react";
import {Text, View, StyleSheet} from "react-native";

type Step = "booking" | "payment" | "confirmation";

type bookingProgressProps = {
    currentStep: Step;
};

const steps: { key: Step; label: string }[] = [
    {key: "booking", label: "Booking details"},
    {key: "payment", label: "Payment methods"},
    {key: "confirmation", label: "Confirmation"},
]

const DOT = 28;
const INNER = 14;

const BookingProgress: React.FC<bookingProgressProps> = ({currentStep}) => {
    const currentIndex = steps.findIndex(s => s.key === currentStep);

    return (
        <View style={styles.container}>
            <View style={styles.progressWrap}>
            <View style={styles.track}/>

                <View style={styles.stepsRow}>
                    {steps.map((step, index) => {
                        const isActive = index === currentIndex;

                        return (
                            <View key={index} style={styles.step}>
                                <View style={styles.dot}>
                                    {isActive && <View style={styles.innerDot}/>}
                                </View>

                                <Text style={[styles.label, isActive && styles.activeLabel]}>
                                    {step.label}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default BookingProgress;

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 24,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    progressWrap:{
        width: "90%",
        position: "relative",
    },
    track: {
        position: "absolute",
        left: 19 + DOT /2,
        right: 19 + DOT /2,
        top: DOT / 2,
        height: 3,
        backgroundColor: "#000"
    },
    stepsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    step: {
        alignItems: "center",
    },
    dot: {
        width: DOT,
        height: DOT,
        borderRadius: DOT / 2,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    innerDot: {
        width: INNER,
        height: INNER,
        borderRadius: INNER / 2,
        backgroundColor: "#E5383B",
    },
    label: {
        marginTop: 8,
        fontSize: 12,
        color: "#000",
        textAlign: "center",
        maxWidth: 90
    },
    activeLabel: {
        fontWeight: "700",
    }
})