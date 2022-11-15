//import ReactPDF from '@react-pdf/renderer';
import { useState } from 'react';
import { Page, Text, View, Document, Font } from '@react-pdf/renderer';
import { styles } from './forms/PDFDocumentStyles';

// Create styles




// Create Document Component
export const PDFDocument = ({current}) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Document file="somefile.pdf"
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page size='A4' style={styles.page} width='60%' pageNumber={pageNumber}>
                <View style={styles.borderBack} fixed>
                    <View style={styles.bodyItems}>
                        <View style={styles.dataTableItemsBorder}>
                            <View style={styles.headerTable4}>
                                <Text></Text>
                            </View>
                            <View style={styles.headerTable5}>
                                <Text>pc</Text>
                            </View>
                            <View style={styles.headerTable6}>
                                <Text>Item Description</Text>
                            </View>
                            <View style={styles.headerTable7}>
                                <Text>1</Text>
                            </View>
                            <View style={styles.headerTable8}>
                                <Text>57.00</Text>
                            </View>
                            <View style={styles.headerTable9}>
                                <Text>100000.00</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.header} fixed>
                    <Text style={styles.appendix}>Appendix 60</Text>
                    <Text style={styles.docTitle}>PURCHASE REQUEST</Text>
                    <View style={styles.headerText}>
                        <Text style={styles.headerTextLeft}>Entity Name: DA-BFAR RO2</Text>
                        <Text style={styles.headerTextRight}>Fund Cluster: __________________</Text>
                    </View>

                    <View style={styles.headerTable}>
                        <View style={styles.headerTable1}>
                            <Text style={styles.headerTable1.text}>Office/Section :</Text>
                        </View>
                        <View style={styles.headerTable2}>
                            <Text style={styles.headerTable2.text}>PR No.: ______________</Text>
                            <Text style={styles.headerTable2.text}>Responsibility Center Code : ___________</Text>
                        </View>
                        <View style={styles.headerTable3}>
                            <Text style={styles.headerTable3.text}>Date: ____________</Text>
                        </View>
                    </View>
                    <View style={styles.headerTableItems}>
                        <View style={styles.headerTable4}>
                            <Text>Stock/ Property No.</Text>
                        </View>
                        <View style={styles.headerTable5}>
                            <Text>Unit</Text>
                        </View>
                        <View style={styles.headerTable6}>
                            <Text>Item Description</Text>
                        </View>
                        <View style={styles.headerTable7}>
                            <Text>Quantity</Text>
                        </View>
                        <View style={styles.headerTable8}>
                            <Text>Unit Cost</Text>
                        </View>
                        <View style={styles.headerTable9}>
                            <Text>Total Cost</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.bodyItems}>
                    {current.items.map(item => 
                    <View style={styles.dataTableItems}>
                        <View style={styles.dataTable1}>
                            <Text>{item.stock}</Text>
                        </View>
                        <View style={styles.dataTable2}>
                            <Text>{item.unit}</Text>
                        </View>
                        <View style={styles.dataTable3}>
                            <Text style={styles.dataTable3.item}> {item.description.name} </Text>
                            <Text style={styles.dataTable3.descriptions}> {item.description.itemdesc} </Text>
                        </View>
                        <View style={styles.dataTable4}>
                            <Text>{item.qty}</Text>
                        </View>
                        <View style={styles.dataTable5}>
                            <Text>{item.unitcost}</Text>
                        </View>
                        <View style={styles.dataTable6}>
                            <Text>{item.totalcost}</Text>
                        </View>
                    </View>
                    )}
                    <View style={styles.dataTableTotal}>
                        <View style={styles.dataTable5}>
                            <Text style={styles.dataTableTotal.total}>TOTAL :</Text>
                        </View>
                        <View style={styles.dataTable6}>
                            <Text >{current.total}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer} fixed>
                    <View style={styles.footerPurpose}>
                        <Text>Purpose:  {current.purpose} </Text>
                    </View>
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

