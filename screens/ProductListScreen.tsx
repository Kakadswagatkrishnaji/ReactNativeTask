import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {Card} from 'react-native-paper';

const ProductListScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error fetching products: {error}</Text>
      </View>
    );
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetails', {productId: item.id})
      }>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{uri: item.thumbnail}} style={styles.productImage} />
          <View style={styles.textContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>{`${item.price}`}</Text>
            <Text style={styles.productPrice}>{`${item.category}`}</Text>
            <Text style={styles.productPrice}>{`${item.brand}`}</Text>


          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  card: {
    margin: 10,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginRight: 15,
    borderRadius:100
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  productPrice: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    fontWeight:'500'
  },
});

export default ProductListScreen;
