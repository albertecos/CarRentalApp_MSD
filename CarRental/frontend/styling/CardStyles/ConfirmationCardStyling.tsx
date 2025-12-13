import { StyleSheet } from 'react-native';

export const confStyles = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 24,

    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 3,
    },
    cardInner:{
        borderRadius: 12,
        overflow: "hidden",
    },
    cardHeader: {
        backgroundColor: '#BA181B',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e7e7e7",
        width: '100%',
    },
    cardHeaderText: {
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
    },
    cardBody: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    h1: {
        fontSize: 24,
        fontWeight: '800',
        color: '#000',
        textAlign: 'center'
    },
    carImage: {
        alignSelf: 'center',
        width: 180,
        height: 180,
        marginTop: 8,
        marginBottom: 8,
    },
    infoBox:{
        marginTop: 10,
        borderRadius: 12,
        backgroundColor: '#e1dfe0',
        padding: 14,
    },
    infoRowHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    iconCol:{
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoHeaderText: {
        fontWeight: '700',
        color: '#000',
        lineHeight: 16,
        marginLeft: 8,
    },
    dateRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4
    },
    dateCol:{
        flexShrink: 1,
    },
    infoMain:{
        fontWeight: '600',
        color: "#6b7280"
    },
    dividerLight: {
        height: 1,
        backgroundColor: '#6b7280',
        marginVertical: 8,
    },
    carRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    bold:{
        fontWeight: '600',
        color: '#000',
    },

    paymentSection:{
        marginTop: 18,
    },
    paymentTitle:{
        fontWeight:'700',
        marginBottom: 8,
        color: '#000',
    },
    paymentRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    paymentTotalLabel:{
        fontWeight: '800',
        fontSize: 18,
    },
    paymentTotalValue:{
        fontWeight: '800',
        fontSize: 18,
        color: '#BA181B',
    },
})