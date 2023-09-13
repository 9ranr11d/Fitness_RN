import React, { useRef } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

/**
 * 숫자 스크롤로 선택
 * @param {JSON} props.styles oneScrollHeight: 스크롤 한칸 높이, fontSize: 글자 크기
 */
const NumPicker = (props) => {
  //한칸 높이
  const oneScrollHeight = props.styles.oneScrollHeight;

  const scrollRef = useRef(null);
  
  //한칸씩 내려가게
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