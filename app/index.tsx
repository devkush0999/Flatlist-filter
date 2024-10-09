import { useEffect, useState, useRef } from "react";
import { Text, View, Image, TouchableOpacity, TextInput, FlatList, Modal } from "react-native";

export default function Index() {

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const searchRef = useRef();
  const listRef = useRef();
  const [ind, setInd] = useState(0);



  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setData(response);
        setOldData(response);
      });
  }, []);
 
  // text props
  const onSearch = text => {
    if (text == '') {
      // let tempList = data;
      // setData(tempList);
    } else {
      const searchWords = text.toLowerCase().split(/\s+/); // Split the search text into words
      let tempList = data.filter(item => {
        return searchWords.every(word => item.title.toLowerCase().includes(word)); // Check if all words are present
      });
      setData(tempList);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          // flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          height: 70,
          marginTop: 20
        }}
      >
        <View style={{
          width: '80%',
          height: 50,
          borderRadius: 10,
          borderWidth: 0.2,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
        }}>
          <Image
            source={require('../assets/images/icon.png')}
            style={{ width: 24, height: 24, marginLeft: 15, opacity: 0.5, borderColor: 'black', borderWidth: 0.5 }}
          />
          <TextInput
            ref={searchRef}
            placeholder="search item here ..."
            style={{ width: '76%', height: 50 }}
            value={search}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }} />
          {search == '' ? null : (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                searchRef.current.clear();
                onSearch('');
                setSearch('');
              }}>
              <Image
                source={require('../assets/images/favicon.png')}
                style={{ width: 16, height: 16, opacity: 0.5, borderColor: 'black', borderWidth: 1 }}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => {
            setVisible(true);
          }}>

          <Image
            source={require('../assets/images/splash.png')}
            style={{ width: 24, height: 24, borderColor: 'black', borderWidth: 1 }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        ref={listRef}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={ind}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: '90%',
                borderRadius: 10,
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 60,
                  height: '90%',
                  marginLeft: 10,
                  borderRadius: 10,
                }}
              />
              <View style={{ width: '80%' }}>
                <Text
                  style={{ fontWeight: '600', marginLeft: 10, marginTop: 10 }}>
                  {item.title.substring(0, 30)}
                </Text>
                <Text
                  style={{ fontWeight: '600', marginLeft: 10, marginTop: 10 }}>
                  {item.description.substring(0, 50)}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={{
                    fontSize: 18,
                    marginLeft: 10,
                    fontWeight: '800',
                    color: 'green'
                  }}>
                    {'$' + item.price}
                  </Text>

                  <Text style={{
                    fontSize: 16,
                    marginLeft: 50,
                    fontWeight: '800',
                    color: 'orange',
                  }}>
                    {item.rating.rate}
                  </Text>
                  <Image
                    source={require('../assets/images/icon.png')}
                    style={{ width: 12, height: 12, marginLeft: 5 }}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',

        }}>
          <View style={{ width: '80%', height: 200, backgroundColor: 'white', borderRadius: 10, borderColor: 'red', borderWidth: 1.2 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                paddingLeft: 20,
              }}
              onPress={() => {
                let tempList = data.sort((a, b) => a.title > b.title ? 1 : -1);
                setData(tempList);
                listRef.current.scrollToIndex({ animated: true, index: 0 })
                setVisible(false);

              }}><Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>Sort By Name</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              paddingLeft: 20
            }} onPress={() => {
              setData(data.sort((a, b) => a.price - b.price));
              listRef.current.scrollToIndex({ animated: true, index: 0 })
              setVisible(false);
            }}>
              <Text style={{ fontSize: 18, color: 'black' }}> Low To High Price </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              paddingLeft: 20
            }} onPress={() => {
              setData(data.sort((a, b) => b.price - a.price));
              listRef.current.scrollToIndex({ animated: true, index: 0 })
              setVisible(false);
            }}>
              <Text style={{ fontSize: 18, color: 'black' }}> Hight to Low Price </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              paddingLeft: 20
            }} onPress={() => {
              setData(data.sort((a, b) => b.rating.rate - a.rating.rate));
              listRef.current.scrollToIndex({ animated: true, index: 0 })
              setVisible(false);
            }}>
              <Text style={{ fontSize: 18, color: 'black' }}> Sort by Rating </Text>
            </TouchableOpacity>
          </View>
        </View >
      </Modal >
    </View >
  );
}













