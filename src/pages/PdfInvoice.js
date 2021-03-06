import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { getCall } from "../helper/ApiHelper";

Font.register({
  family: "Nunito",
  fonts: [
    { src: "https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf" },
    {
      src: "https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf",
      fontWeight: 600,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Nunito",
    fontSize: "13px",
    color: "#555",
    padding: "40px 35px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const colorDark = "#222";
const colorDark2 = "#666";
const colorGray = "#e3e3e3";
const colorWhite = "#fff";

// Create Document Component
const PdfInvoice = (props) => {
  const [formFields, setFormFields] = useState({});

  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {

    let orderId = props.match.params.orderId;
    setIsLoading(true)
    getCall('orders',{params:{'orderId':orderId}}, true).then((response) => {
      setFormFields(response[0])
      setIsLoading(false)
      
    }).catch((reason) => {
      setIsLoading(false)
    });
  }, []);

  const calculateAmount = (quantity, rate) => {
    const quantityNumber = parseFloat(quantity);
    const rateNumber = parseFloat(rate);
    const amount =
      quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;

    return amount.toFixed(2);
  };

  const calculateTotal = () => {
    let totalAmount = formFields.orderItem.reduce((accumulator, currentValue) => { return (parseFloat(currentValue.sellingPrice) * parseFloat(currentValue.quantity) + accumulator)}, 0)
    return totalAmount.toFixed(2)
  }

  const calculateSubtotal = () => {
    let totalAmount = calculateTotal()
    if (formFields.isGST) {
      return (totalAmount/1.18).toFixed(2)
    } else {
      return totalAmount
    }
  }

  const calculateGST = () => {
    let totalAmount = calculateTotal()
    if (formFields.isGST) {
      return (totalAmount * 0.18).toFixed(2)
    } else {
      return 0.0
    }
    
  }

  const convertDateToDisplayFormat = (date) => {
    let givenDate = new Date(date)
    return givenDate.toLocaleDateString("en-US")
  }

  return (
    <>
    {!isLoading ? <PDFViewer width="1000px" height="600px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
            }}
          >
            <View style={{ width: "50%" }}>
              <Text style={{ fontSize: "20px" }}>{"Royal Furniture"}</Text>
              <Text>{"Thatipur Chauraha"}</Text>
              <Text>{"Gwalior, 474011"}</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: "45px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {"INVOICE"}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              marginTop: "40px",
            }}
          >
            <View style={{ width: "55%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: colorDark,
                  marginBottom: "5px",
                }}
              >
                {"Bill To"}
              </Text>
              <Text>{"Rahul Jain"}</Text>
              <Text>{formFields.customer.phone}</Text>
              <Text>{"Client Address"}</Text>
              <Text>{"Gwalior, 474011"}</Text>
            </View>
            <View style={{ width: "45%" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  marginBottom: "5px",
                }}
              >
                <View style={{ width: "40%" }}>
                  <Text>{"INVOICE#"}</Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text>{"INV-12"}</Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  marginBottom: "5px",
                }}
              >
                <View style={{ width: "40%" }}>
                  <Text>{"Invoice Date"}</Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text>{convertDateToDisplayFormat(formFields.bookingDate)}</Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  marginBottom: "5px",
                }}
              >
                <View style={{ width: "40%" }}>
                  <Text>{"Delivery Date"}</Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text>{convertDateToDisplayFormat(formFields.deliveryDate)}</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              marginTop: "30px",
              backgroundColor: colorDark2,
            }}
          >
            <View style={{ width: "48%", padding: "4px 8px" }}>
              <Text style={{ color: colorWhite, fontWeight: "bold" }}>
                {"Item Name"}
              </Text>
            </View>
            <View style={{ width: "17%", padding: "4px 8px" }}>
              <Text
                style={{
                  color: colorWhite,
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {"Qty"}
              </Text>
            </View>
            <View style={{ width: "17%", padding: "4px 8px" }}>
              <Text
                style={{
                  color: colorWhite,
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {"Rate"}
              </Text>
            </View>
            <View style={{ width: "18%", padding: "4px 8px" }}>
              <Text
                style={{
                  color: colorWhite,
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {"Amount"}
              </Text>
            </View>
          </View>

          {formFields.orderItem.map((productLine, i) => {
            return (
              <View
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  borderBottom: "1px solid",
                  borderColor: colorGray,
                }}
              >
                <View
                  style={{
                    width: "48%",
                    padding: "4px 8px",
                    paddingBottom: "10px",
                  }}
                >
                  <Text style={{ color: colorDark }}>{productLine.itemName}</Text>
                </View>
                <View
                  style={{
                    width: "17%",
                    padding: "4px 8px",
                    paddingBottom: "10px",
                  }}
                >
                  <Text style={{ color: colorDark, textAlign: "right" }}>
                    {productLine.quantity}
                  </Text>
                </View>
                <View
                  style={{
                    width: "17%",
                    padding: "4px 8px",
                    paddingBottom: "10px",
                  }}
                >
                  <Text style={{ color: colorDark, textAlign: "right" }}>
                    {productLine.sellingPrice}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: "4px 8px",
                    paddingBottom: "10px",
                  }}
                >
                  <Text style={{ color: colorDark, textAlign: "right" }}>
                    {calculateAmount(
                      productLine.quantity,
                      productLine.sellingPrice
                    )}
                  </Text>
                </View>
              </View>
            );
          })}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
            }}
          >
            <View style={{ width: "50%", marginTop: "10px" }}></View>
            <View style={{ width: "50%", marginTop: "5px" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                }}
              >
                <View style={{ width: "50%", padding: "5px" }}>
                  <Text>{"Sub Total"}</Text>
                </View>
                <View style={{ width: "50%", padding: "5px" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: colorDark,
                      textAlign: "right",
                    }}
                  >
                    {calculateSubtotal()}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                }}
              >
                <View style={{ width: "50%", padding: "5px" }}>
                  <Text>{"GST 18%"}</Text>
                </View>
                <View style={{ width: "50%", padding: "5px" }}>
                  {formFields.isGST && <Text
                    style={{
                      fontWeight: "bold",
                      color: colorDark,
                      textAlign: "right",
                    }}
                  >
                    {calculateGST()}
                  </Text>}
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  backgroundColor: colorGray,
                  padding: "5px",
                }}
              >
                <View style={{ width: "50%", padding: "5px" }}>
                  <Text>{"Grand Total"}</Text>
                </View>
                <View style={{ width: "50%", padding: "5px" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: colorDark,
                      textAlign: "right",
                    }}
                  >
                    {calculateTotal()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginTop: "20px" }}>
            <Text style={{ width: "100%", fontWeight: "bold" }}>
              {"Remarks"}
            </Text>
            <Text style={{ width: "100%" }}>{formFields.remarks}</Text>
          </View>
          <View style={{ marginTop: "20px" }}>
            <Text style={{ width: "100%", fontWeight: "bold" }}>{"Terms"}</Text>
            <Text style={{ width: "100%" }}>{"We define it"}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>:<div>loading....</div>
    }
    </>
  );
};

export default PdfInvoice;
