import React, {useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import {Card} from 'react-native-paper';

const ProductDetailsScreen = ({route}) => {
  const {productId} = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${productId}`,
        );
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

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
        <Text style={styles.errorText}>Error fetching product details: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Card for Product Image and Title */}
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image
            source={{uri: product.thumbnail}}
            style={styles.productImage}
          />
          <Text style={styles.productTitle}>{product.title}</Text>
        </Card.Content>
      </Card>

      {/* Card for Product Price */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.priceText}>{`Price: $${product.price}`}</Text>
        </Card.Content>
      </Card>

      {/* Card for Product Discount */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.priceText}>{`Discount: ${product.discountPercentage}%`}</Text>
        </Card.Content>
      </Card>

      {/* Card for Product Rating */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.priceText}>{`Rating: ${product.rating}`}</Text>
        </Card.Content>
      </Card>

      {/* Card for Product Description */}
      <Card style={styles.card}>
        <Card.Content>
        <Text style={[styles.text,{color:'black',fontSize:22,fontWeight:'500'}]}>{`Description: `}</Text>

          <Text style={styles.text}>{`${product.description}`}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
    marginVertical: 10,
  },
  cardContent: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginRight: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  text: {
    fontSize: 18,
    color: 'gray',
  },
});

export default ProductDetailsScreen;
