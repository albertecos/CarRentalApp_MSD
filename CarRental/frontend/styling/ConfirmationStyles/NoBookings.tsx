import { StyleSheet } from 'react-native';

export const noConfStyles = StyleSheet.create({
    noBookingContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    }
})