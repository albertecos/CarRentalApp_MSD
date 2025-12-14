import React from "react";
import {Text, View} from "react-native";

type Step = "booking" | "payment" | "confirmation";

type bookingProgressProps ={
    currentStep: Step;
};

const steps: {key: Step; label: string }[] = [
    {key: "booking", label: "Booking details"},
    {key: "payment", label: "Payment methods" },
    {key: "confirmation", label: "Confirmation"},
]

const DOT = 28;
const INNER = 14;

const BookingProgress: React.FC<bookingProgressProps> = ({currentStep}) => {
    const currentIndex = steps.findIndex(s => s.key === currentStep);

    return (
        <View style={styles.container}>
            <View style={styles.lineContainer}>
                {steps.map((step, index) => {
                    const isActive = index === currentIndex;
                    const isCompleted = index === currentIndex;

                    return (
                        <React.Fragment key={step.key}>
                            <View style={[
                                styles.dot,
                                isActive && styles.activeDot,
                            ]}>
                                {isActive && <View style={styles.innerDot} />}
                            </View>
                            {index < steps.length - 1 && (
                                <View style={[
                                    styles.line,
                                    isCompleted && styles.activeLine,
                                ]}/>
                            )}
                        </React.Fragment>
                    );
                })}
            </View>

            <View style={styles.labelContainer}>
                {steps.map((step, index) => (
                    <Text
                        key={step.key}
                        style={[
                            styles.label,
                            index === currentIndex && styles.activeLabel,
                        ]}
                    >
                        {step.label}
                    </Text>
                ))}
            </View>
        </View>
    );
};

export default BookingProgress;

const styles = {
    container: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
        backgroundColor: "#fff",
    },
    lineContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dot:{
        width: 32,
        height: 32,
        borderRadius: 32/2,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    activeDot:{
        backgroundColor: "#000",
    },
    innerDot:{
        width: 17,
        height: 17,
        borderRadius: 17/2,
        backgroundColor: "#E5383B",
    },
    line:{
        flex: 1,
        height: 3,
        backgroundColor: "#000",
    },
    activeLine:{
        backgroundColor: "#000",
    },
    labelContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },
    label:{
        fontSize: 12,
        fontWeight: "400",
        color: "#000",
        textAlign: "center",
    },
    activeLabel:{
        color: "#000",
        fontWeight: "700",
    }
}