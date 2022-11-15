import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({ family: 'Times New Roman', fonts :[ 
    {src :'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times New Roman.ttf'},
{src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman-bold@1.0.4/Times New Roman Bold.ttf', fontWeight:'bold'},
{src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman-italic@1.0.4/Times New Roman Italic.ttf', fontStyle:'italic'}
]})

export const styles = StyleSheet.create({
    page: {
        fontFamily: 'Times New Roman',
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 1000,
        paddingLeft: 2,
        paddingRight: 22,
        paddingBottom: 190,
        backgroundColor: '#fff'
    },
    borderBack: {
        position: 'absolute',
        top: 0,
        left: 2,
        marginTop: 10
    },
    dataTableItemsBorder: {
        display:'flex',
        flexDirection:"row",
        fontSize:12,
        width:'100%',
        height: 780
    },
    header: {
        backgroundColor: '#fff',
        position: 'fixed',
        top: 0,
        marginTop: 10
    },
    headerText: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 2,
        fontWeight: 'bold'
    },

    headerTextLeft: {
        width: '60%',
        fontSize: 15
    },
    headerTextRight: {
        width: '40%',
        fontSize: 10
    },
    footer: {
        backgroundColor: '#fff',
        position:'absolute',
        width: '100%',
        bottom: 50,
        left: 2
    },
    appendix: {
        alignSelf: 'flex-end',
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 10,

    },
    docTitle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'extrabold'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    table: {
        border: 1,
        width: '100%'
    },
    headerTable:{
        display:'flex',
        flexDirection: 'row',
        width: '100%',
        fontSize: 12,
        fontWeight: 'bold'
    },
    headerTable1:{
        width: '22%',
        border: 1,
        margin: 0,
        padding: 2,
        fontWeight: 'bold',
        text : {
            marginTop: 5,
        }
    },
    headerTable2:{
        width: '50%',
        border: 1,
        margin: 0,
        padding: 2,
        fontWeight: 'bold',
        text : {
            marginTop: 5,
        }
    },
    headerTable3:{
        width: '28%',
        border: 1,
        margin: 0,
        padding: 2,
        text : {
            marginTop: 5,
        }
    },
    headerTableItems:{
        display:'flex',
        flexDirection: 'row',
        width: '100%',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    headerTable4:{
        width: '12%',
        border: 1,
        margin: 0,
        fontSize: 8,
        padding: 2
    },
    headerTable5:{
        width: '10%',
        border: 1,
        margin: 0,
        padding: 2
    },
    headerTable6:{
        width: '36%',
        border: 1,
        margin: 0,
        padding: 2
    },
    headerTable7:{
        width: '14%',
        border: 1,
        margin: 0,
        padding: 2
    },
    headerTable8:{
        width: '14%',
        border: 1,
        margin: 0,
        padding: 2
    },
    headerTable9:{
        width: '14%',
        border: 1,
        margin: 0,
        padding: 2
    },
    bodyItems:{
        display:'flex',
        flexDirection:"column",
        fontSize:12,
        width:'100%'

    },
    dataTableItems: {
        display:'flex',
        flexDirection:"row",
        fontSize:12,
        width:'100%'
    },
    dataTable1:{
        width: '12%',
        margin: 0,
        padding: 2,
        textAlign: 'center'
    },
    dataTable2:{
        width: '10%',
        margin: 0,
        padding: 2,
        textAlign: 'center'
    },
    dataTable3:{
        width: '36%',
        textAlign: 'justify',
        margin: 0,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        item:{
            fontWeight:'bold'
        },
        descriptions:{
            paddingLeft: 10
        }
    },
    dataTable4:{
        width: '14%',
        margin: 0,
        padding: 2,
        textAlign: 'center'
    },
    dataTable5:{
        width: '14%',
        margin: 0,
        padding: 2,
        textAlign: 'right',
        paddingRight: 5
    },
    dataTable6:{
        width: '14%',
        margin: 0,
        padding: 2,
        textAlign: 'right',
        paddingRight: 5,
        fontWeight: 'semibold'
    },
    dataTableTotal: {   
        display : 'flex',
        flexDirection:'row',
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor:'#fff',
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        marginBottom: 0,
        fontWeight: 'bold',
        total:{
            textAlign: 'right'
        }
    },
    footerFields:{
        display: 'flex',
        flexDirection: 'row',
        fontSize: 12,
        border: 1,
        height: 80,
    },
    footerPurpose:{
        paddingTop: 5,
        height: 40,
        fontSize: 12,
        border: 1
    },
    footerField1:{
        width: '20%',
        paddingLeft : 10,
        border: 1,
        text : {
            marginTop: 5
        },
        textTop : {
            marginTop: 20
        }
    },
    footerField2:{
        width: '40%',
        paddingLeft : 10,
        border: 1,
        text : {
            marginTop: 5,
            textAlign: 'center'
        },
        textBold : {
            marginTop: 5,
            fontWeight:'bold'
        },
        textDesignation : {
            textAlign: 'center'
        },
        textName : {
            marginTop: 5,
            fontWeight: 'bold',
            textAlign: 'center'
        }
    },
    footerField3:{
        width: '40%',
        paddingLeft : 10,
        border: 1,
        text : {
            marginTop: 5,
            textAlign: 'center'
        },
        textBold : {
            marginTop: 5,
            fontWeight:'bold'
        },
        textDesignation : {
            textAlign: 'center'
        },
        textName : {
            marginTop: 5,
            fontWeight: 'bold',
            textAlign: 'center'
        }
    },

});