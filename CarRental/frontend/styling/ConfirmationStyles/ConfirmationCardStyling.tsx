import { StyleSheet } from 'react-native';

export const confStyles = StyleSheet.create({
    confContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 16
    },
    banner: {
        height: 72,
        backgroundColor: '#E5383B',
        borderRadius: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
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
        padding: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 3,
    },
    cardHeader: {
        backgroundColor: '#f5f3f4',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e7e7e7",
    },
    cardHeaderText: {
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        color: '#6a1b1f',
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
})