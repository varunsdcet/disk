import React, { Component } from 'react';
import * as BlinkIDReactNative from 'blinkid-react-native';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Button
} from 'react-native';

const licenseKey = Platform.select({
    ios: "sRwAAAELY29tLmRpc2t1c3NO7t0hXXWqLiyOShSkg4tO7rOVneJ9BKcSopHzvp5/n1QnjEjKbsG7H0FVo8+JeQVNGTMK9sLjf7ttRyPvPr1iQeSM3CaUkA/Ts15AJOnz76N4iwdZ9DtqcPaIL6lYJ33NqEnEUqKxOMtzTpdqyHMUBsnUD9NZj+xztoRJvmMifRy9zIUWYdD7FJW7j25WaZjfK7KmqDk6nsaKcLNhqzsddZnUEef6BK25hb4ABp+u3A974HngsUi83ftp88J27/1ZnVUmFIH+GcjQVw4=" ,
    android: "sRwAAAALY29tLmRpc2t1c3ONm9mJMcvYQ2q+BPWxGypzKYpO0dCReApyvJbJTgVzeCH9SlGwWHC4Sh217NGHvmfBqSSf0axG32BAWpNBiU6p+KjFJUPy03RVW4kN4RD3TG9i6f+cPzs6XsSVO64rxmoAQ4/3yWqzC2y0zbBVojYGNqqQ3Ghhr3xXUPj+18a1nxEdsP6OM8V3BnWOjWeJe/T3dS1z/r707qcTmu2AyJ8X8czThpwvMhFK2NlvDosXLaPpJqJ8ovU4uP/ZU4B56O+qAdzF2zHgK7LjaAI="
})

var renderIf = function(condition, content) {
    if (condition) {
        return content;
    }
    return null;
}

export default class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showFrontImageDocument: false,
            resultFrontImageDocument: '',
            showBackImageDocument: false,
            resultBackImageDocument: '',
            showImageFace: false,
            resultImageFace: '',
            showSuccessFrame: false,
            successFrame: '',
            results: '',
            licenseKeyErrorMessage: ''
        };
    }

    async scan() {
        try {

            // to scan any machine readable travel document (passports, visa's and IDs with
            // machine readable zone), use MrtdRecognizer
            // var mrtdRecognizer = new BlinkIDReactNative.MrtdRecognizer();
            // mrtdRecognizer.returnFullDocumentImage = true;

            // var mrtdSuccessFrameGrabber = new BlinkIDReactNative.SuccessFrameGrabberRecognizer(mrtdRecognizer);

            // BlinkIDCombinedRecognizer automatically classifies different document types and scans the data from
            // the supported document
            var blinkIdCombinedRecognizer = new BlinkIDReactNative.BlinkIdCombinedRecognizer();
            blinkIdCombinedRecognizer.returnFullDocumentImage = true;
            blinkIdCombinedRecognizer.returnFaceImage = true;

            const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
                new BlinkIDReactNative.BlinkIdOverlaySettings(),
                new BlinkIDReactNative.RecognizerCollection([blinkIdCombinedRecognizer/*, mrtdSuccessFrameGrabber*/]),
                licenseKey
            );

            if (scanningResults) {
                let newState = {
                    showFrontImageDocument: false,
                    resultFrontImageDocument: '',
                    showBackImageDocument: false,
                    resultBackImageDocument: '',
                    showImageFace: false,
                    resultImageFace: '',
                    results: '',
                    showSuccessFrame: false,
                    successFrame: ''
                };

                for (let i = 0; i < scanningResults.length; ++i) {
                    let localState = this.handleResult(scanningResults[i]);
                    newState.showFrontImageDocument = newState.showFrontImageDocument || localState.showFrontImageDocument;
                    if (localState.showFrontImageDocument) {
                        newState.resultFrontImageDocument = localState.resultFrontImageDocument;
                    }
                    newState.showBackImageDocument = newState.showBackImageDocument || localState.showBackImageDocument;
                    if (localState.showBackImageDocument) {
                        newState.resultBackImageDocument = localState.resultBackImageDocument;
                    }
                    newState.showImageFace = newState.showImageFace || localState.showImageFace;
                    if (localState.resultImageFace) {
                        newState.resultImageFace = localState.resultImageFace;
                    }
                    newState.results += localState.results;
                    newState.showSuccessFrame = newState.showSuccessFrame || localState.showSuccessFrame;
                    if (localState.successFrame) {
                        newState.successFrame = localState.successFrame;
                    }

                }
                newState.results += '\n';
                this.setState(newState);
            }
        } catch (error) {
            console.log(error);
            this.setState({ showFrontImageDocument: false, resultFrontImageDocument: '', showBackImageDocument: false, resultBackImageDocument: '', showImageFace: false, resultImageFace: '', results: 'Scanning has been cancelled', showSuccessFrame: false,
            successFrame: ''});
        }
    }

    handleResult(result) {
        let fieldDelim = ";\n";

        var localState = {
            showFrontImageDocument: false,
            resultFrontImageDocument: '',
            showBackImageDocument: false,
            resultBackImageDocument: '',
            resultImageFace: '',
            results: '',
            showSuccessFrame: false,
            successFrame: ''
        };

        if (result instanceof BlinkIDReactNative.BlinkIdCombinedRecognizerResult) {
            let blinkIdResult = result;
            let resultString =
                "First name: " + blinkIdResult.firstName + fieldDelim +
                "Last name: " + blinkIdResult.lastName + fieldDelim +
                "Address: " + blinkIdResult.address + fieldDelim +
                "Document number: " + blinkIdResult.documentNumber + fieldDelim +
                "Sex: " + blinkIdResult.sex + fieldDelim;
            if (blinkIdResult.dateOfBirth) {
                resultString +=
                    "Date of birth: " +
                        blinkIdResult.dateOfBirth.day + "." +
                        blinkIdResult.dateOfBirth.month + "." +
                        blinkIdResult.dateOfBirth.year + "." + fieldDelim;
            }
            if (blinkIdResult.dateOfIssue) {
                resultString +=
                    "Date of issue: " +
                        blinkIdResult.dateOfIssue.day + "." +
                        blinkIdResult.dateOfIssue.month + "." +
                        blinkIdResult.dateOfIssue.year + "." + fieldDelim;
            }
            if (blinkIdResult.dateOfExpiry) {
                resultString +=
                    "Date of expiry: " +
                        blinkIdResult.dateOfExpiry.day + "." +
                        blinkIdResult.dateOfExpiry.month + "." +
                        blinkIdResult.dateOfExpiry.year + "." + fieldDelim;
            }
            // there are other fields to extract
            localState.results += resultString;

            // Document image is returned as Base64 encoded JPEG
            if (blinkIdResult.fullDocumentFrontImage) {
                localState.showFrontImageDocument = true;
                localState.resultFrontImageDocument = 'data:image/jpg;base64,' + blinkIdResult.fullDocumentFrontImage;
            }
            if (blinkIdResult.fullDocumentBackImage) {
                localState.showBackImageDocument = true;
                localState.resultBackImageDocument = 'data:image/jpg;base64,' + blinkIdResult.fullDocumentBackImage;
            }
            // Face image is returned as Base64 encoded JPEG
            if (blinkIdResult.faceImage) {
                localState.showImageFace = true;
                localState.resultImageFace = 'data:image/jpg;base64,' + blinkIdResult.faceImage;
            }
        }
        return localState;
    }

    render() {
        let displayFrontImageDocument = this.state.resultFrontImageDocument;
        let displayBackImageDocument = this.state.resultBackImageDocument;
        let displayImageFace = this.state.resultImageFace;
        let displaySuccessFrame = this.state.successFrame;
        let displayFields = this.state.results;
        return (
        <View style={styles.container}>
            <Text style={styles.label}>MicroBlink Ltd</Text>
            <View style={styles.buttonContainer}>
            <Button
                onPress={this.scan.bind(this)}
                title="Scan"
                color="#87c540"
            />
            </View>
            <ScrollView
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}y>
            {renderIf(this.state.showFrontImageDocument,
                <View style={styles.imageContainer}>
                <Image
                    resizeMode='contain'
                    source={{uri: displayFrontImageDocument, scale: 3}} style={styles.imageResult}/>
                </View>
            )}
            {renderIf(this.state.showBackImageDocument,
                <View style={styles.imageContainer}>
                <Image
                    resizeMode='contain'
                    source={{uri: displayBackImageDocument, scale: 3}} style={styles.imageResult}/>
                </View>
            )}
            {renderIf(this.state.showImageFace,
                <View style={styles.imageContainer}>
                <Image
                    resizeMode='contain'
                    source={{uri: displayImageFace, scale: 3}} style={styles.imageResult}/>
                </View>
            )}
            {renderIf(this.state.showSuccessFrame,
                <View style={styles.imageContainer}>
                    <Image
                    resizeMode='contain'
                    source={{uri: displaySuccessFrame, scale: 3}} style={styles.imageResult}/>
                </View>
            )}
            <Text style={styles.results}>{displayFields}</Text>
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50
  },
  buttonContainer: {
    margin: 20
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  results: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  imageResult: {
    flex: 1,
    flexShrink: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
});
