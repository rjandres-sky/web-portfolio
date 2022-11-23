//import ReactPDF from '@react-pdf/renderer';
import { useState } from 'react';
import { Page, Text, View, Document, Font } from '@react-pdf/renderer';
import { styles } from './PDFDocumentStyles';

// Create styles

// Create Document Component
export const PDFDocument = ({ current }) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Document file="somefile.pdf"
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page size='A4' style={styles.page} width='60%' pageNumber={pageNumber}>

                <View style={styles.header} fixed>
                <Text style={styles.headerTop.text}>REPUBLIC OF THE PHILIPPINES</Text>
                <Text style={styles.headerTop.text}>DEPARTMENT OF AGRICULTURE</Text>
                <Text style={styles.headerTop.text}>BUREAU OF FISHERIES AND AQUATIC RESOURCES</Text>
                <Text style={styles.headerTop.text}>Regional Office No. 2</Text>
                <Text style={styles.headerTop.text}>Tuguegarao City</Text>

                <Text style={styles.headerTable1.text}></Text>
                    <Text style={styles.docTitle}>TRAVEL ORDER</Text>
                    
                    <View style={styles.headerTable1}>

                    <Text style={styles.headerTable1.text}>Name :{current.name}</Text>
                    <Text style={styles.headerTable1.text}>TO Date :{current.travelorderdate}</Text>
                    <Text style={styles.headerTable1.text}>TO No. :{current.travelorderno}</Text>
                    <Text style={styles.headerTable1.text}>Objectives : {current.objectives}</Text>
                    <Text style={styles.headerTable1.text}>Departure :{current.traveldateDeparture}</Text>
                    <Text style={styles.headerTable1.text}>Arrival :{current.traveldateArrival}</Text>
                    <Text style={styles.headerTable1.text}>Mean of Transfortation :{current.transpo}</Text>

                    </View>

                </View>

                <View style={styles.footer} fixed>
        
                    <View style={styles.footerFields}>
                        <View style={styles.footerField1}>
                            <Text style={styles.footerField1.textTop}>Signature :</Text>
                            <Text style={styles.footerField1.text}>Printed Name :</Text>
                            <Text style={styles.footerField1.text}>Designation :</Text>
                        </View>
                        <View style={styles.footerField2}>
                            <Text style={styles.footerField2.textBold}>Requested by:</Text>
                            <Text style={styles.footerField2.text}>__________________________________</Text>
                            <Text style={styles.footerField2.textName}>RJ S. ANDRES</Text>
                            <Text style={styles.footerField2.textDesignation}>MIS Staff</Text>
                        </View>
                        <View style={styles.footerField3}>
                            <Text style={styles.footerField3.textBold}>Approved by:</Text>
                            <Text style={styles.footerField3.text}>__________________________________</Text>
                            <Text style={styles.footerField3.textName}>ANGEL B. ENCARNACION</Text>
                            <Text style={styles.footerField3.textDesignation}>Regional Director</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.appendix} render={({ pageNumber, totalPages }) => (
                            `page ${pageNumber} of ${totalPages}`
                        )} />
                    </View>
                </View>
            </Page>
        </Document>
    )
};
