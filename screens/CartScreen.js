import React from "react";
import { ScrollView, StyleSheet, Image, View, Text } from "react-native";
import { setFont, setSize } from "../utils/resolution";
export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: "购物车",
        headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 0
        }
    };
    componentWillMount() {
        this.props.navigation.setParams({'headerTitle': '购物车'})
    }
    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    alignItems: "center",
                    paddingTop: setSize(318)
                }}
                style={styles.container}
            >
                <View>
                    <Image
                        style={{ width: setSize(230), height: setSize(230) }}
                        source={require("../assets/images/pages/购物车为空.png")}
                    />
                    <Text style={{color: "#999999", fontSize: 14,}}>您还未添加任何商品</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
