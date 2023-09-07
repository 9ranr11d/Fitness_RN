import React, { useRef } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

const NumPicker = (props) => {
  const oneScrollHeight = props.styles.oneScrollHeight;

  const scrollRef = useRef(null);

  const handleOnScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / oneScrollHeight);

    if (index < 0) return;

    props.currentNum(index);
    
    scrollRef.current.scrollTo({y: index * oneScrollHeight, animated: true});
  };

  return(
    <View
      style={{
        ...styles.restTimeScroll,
        height: oneScrollHeight * 3,
      }}
    >
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={(e) => handleOnScroll(e)}
        scrollEventThrottle={0}
        decelerationRate={"fast"}
        scrollEnabled={props.isScrollEnabled}
      >
        {props.numArr.map((num, index) => (
          <Text
            key={index}
            style={{
              ...styles.restTime,
              height: oneScrollHeight,
              fontSize: props.styles.fontSize,
            }}
          >
            {num}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  restTimeScroll: {
    width: 100,
  },
  restTime: {
    flex: 1,
    textAlign: "center",
  },
});

export default NumPicker;