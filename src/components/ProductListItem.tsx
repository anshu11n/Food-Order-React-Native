// import products from "@/assets/data/products";
// import { Product } from "@/assets/types";

import products from "@assets/data/products";
import { Product } from "@assets/types";
import { Text, View, Image, StyleSheet, Pressable} from "react-native";
import { Link, useSegments } from "expo-router";
import Colors from "@/constants/Colors";

export const defaultPizzaImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png"

type ProductType = {
    product: Product
}

const ProductListItem = ({product}: ProductType) => {
  const segments = useSegments();

    return (
        <Link href = {`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style = {styles.container}>
                <Image style={styles.image} source = {{uri: product.image || defaultPizzaImage}} />
                <Text style= {styles.title}>{product.name}</Text>
                <Text style= {styles.price}>{product.price}</Text>
            </Pressable>
        </Link>
    )
}

export default ProductListItem

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
      flex: 1,
      maxWidth: '50%',
    },
  
    image: {
      width: '100%',
      aspectRatio: 1,
    },
  
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginVertical: 10,
    },
    price: {
      color: Colors.light.tint,
      fontWeight: 'bold',
    },
  });