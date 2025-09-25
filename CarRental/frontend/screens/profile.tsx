import React from 'react';
import { View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile: React.FC = () => {
    const navigation = useNavigation();

    const data = () => {

    }
    return (
        <View>
            <Text>Profile page</Text>
        </View>
    )
};

export default Profile;
