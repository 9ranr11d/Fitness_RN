import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

/**
 * 숫자 스크롤로 선택
 * @param {Array} props.numArr 고를 숫자 목록
 * @param {JSON} props.styles oneScrollHeight: 스크롤 한칸 높이, fontSize: 글자 크기
 * @param {Function} props.currentNum 선택된 숫자
 * @param {}
 */
const NumPicker = (props) => {
  const oneScrollHeight = props.styles.oneScrollHeight;

  const scrollRef = useRef(null);
  
  //한칸씩 내려가게
  const handleOnScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / oneScrollHeight);

    if (index < 0) return;

    props.currentNum(index);
    
    scrollRef.current.scrollTo({y: index * oneScrollHeight, animated: true});
  };

  useEffect(() => {
    if(props.initPosition)
      scrollRef.current.scrollTo({y: props.initPosition * oneScrollHeight, animated: true});
  }, [scrollRef.current]);

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