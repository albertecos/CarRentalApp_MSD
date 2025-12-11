import { StyleSheet } from 'react-native';

export const confStyles = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 24,

    },
    brand: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        letterSpacing: 0.5,
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
        color: '#0f172a',
        textAlign: 'center'
    },
    carImage: {
        alignSelf: 'center',
        width: 180,
        height: 180,
        marginTop: 8,
        marginBottom: 8,
    },
    section: {
        marginTop: 8,
    },
    sectionTitle: {
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 10,
        color: '#1f2937',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    rowTextWrap: {
        flexShrink: 1
    },
    rowTitle: {
        fontSize: 16,
        color: '#334155',
    },
    rowSub:{
        fontSize: 14,
        color: '#6b7280',
        marginTop: 2,
    },
    bold: {

    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    priceLabel: {
        fontSize: 15,
        color: '#374151',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '900',
        color: '#111827',
    },
    totalLabel:{
        fontWeight: '800',
    },
    included: {
        fontSize: 15,
        color: '#15803d',
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: '#e8eaee',
        marginVertical: 16,
    },
    dividerLight: {
        height: 1,
        backgroundColor: '#f0f1f4',
        marginTop: 12,
        marginBottom: 8,
    },
    topRow:{
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    backButton: {
        width: 70,
        height: 70,
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
    infoHeaderText: {
        marginLeft: 8,
        fontWeight: '700',
        color: '#000',
    },

})