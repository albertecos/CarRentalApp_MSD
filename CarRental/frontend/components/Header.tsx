import {Text, View} from "react-native";
import {styles} from "../styling/HeaderStyling";
import { LinearGradient } from "expo-linear-gradient";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type HeaderProps = {
    title?:string;
};

const Header: React.FC<HeaderProps> = ({ title = "CarRental" }) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.shadowWrapper}>
            <LinearGradient
                colors={["#E5383B", "#660708"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.container,
                    { paddingTop: insets.top + 8, paddingBottom: 16 },
                ]}
            >
                <Text style={styles.logoText}>{title}</Text>
            </LinearGradient>
        </View>
    );
};


export default Header;