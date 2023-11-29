import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OTPInput = () => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const otpInputsRefs = useRef([]);

  const handleOTPChange = (text, index) => {
    // Remove non-digit characters from input
    const formattedOTP = text.replace(/[^0-9]/g, "");

    // Update the OTP state array
    const newOTP = [...otp];
    console.log(newOTP);
    newOTP[index] = formattedOTP;
    console.log(newOTP);
    setOTP(newOTP);

    // Shift focus to the next input box
    if (formattedOTP.length === 1 && index < otp.length - 1) {
      otpInputsRefs.current[index + 1].focus();
    }
  };

  const handleOTPFocus = (index) => {
    // Clear the input box when it receives focus
    const newOTP = [...otp];
    newOTP[index] = "";
    setOTP(newOTP);
  };

  const handleOTPBlur = () => {
    // Add a space character to the OTP array if the input box loses focus and is empty
    const lastInputIndex = otp.length - 1;
    if (otp[lastInputIndex] === "") {
      const newOTP = [...otp];
      newOTP[lastInputIndex] = " ";
      setOTP(newOTP);
    }
  };

  const renderOTPInputs = () => {
    const otpInputs = [];

    for (let i = 0; i < otp.length; i++) {
      const digit = otp[i];
      console.log(digit);

      otpInputs.push(
        <View key={i} style={styles.otpInput}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOTPChange(text, i)}
            onFocus={() => handleOTPFocus(i)}
            onBlur={handleOTPBlur}
            ref={(ref) => (otpInputsRefs.current[i] = ref)}
            selectionColor={'#000'}
          />
        </View>
      );
    }

    return otpInputs;
  };

  return <View style={styles.container}>{renderOTPInputs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default OTPInput;
