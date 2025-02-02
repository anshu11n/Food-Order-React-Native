import { defaultPizzaImage } from '@/components/ProductListItem'
import products from '@assets/data/products'
import { PizzaSize, Product } from '@assets/types'
import { Stack, useLocalSearchParams } from 'expo-router'
import {View, Text, Image, StyleSheet, Pressable} from 'react-native'
import { useState } from 'react'
import Button from '@components/Button'
import { useCart } from '@/providers/CartProvider'
import { useRouter } from 'expo-router'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const sizes: PizzaSize[] = ['S','M','L','XL'];

const ProductDetailsScreen = () => {
    const {id} = useLocalSearchParams()

    const { addItem } = useCart()
    const router = useRouter()

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M') 

    const product = products.find((item) => item.id.toString() === id)

    if(!product){
        return (
            <Text>Product not found</Text>
        )
    }

    const addToCart = () =>{
        if(!product) return;

        // console.warn("Adding to cart, size: ",selectedSize);

        addItem(product, selectedSize)
        router.push('/cart')
    } 

    return (
        <View style= {styles. container} >
            <Stack.Screen options={{title: "Menu", headerRight: () => (
                <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                <Pressable>
                    {({ pressed }) => (
                    <FontAwesome
                        name="pencil"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                    )}
                </Pressable>
                </Link>
                ),} } />


            <Stack.Screen options={{title: product.name}} />
            
            <Image style = {styles.image} source= {{uri: product.image || defaultPizzaImage}} />

            <Text style = {styles.title}>{product.name}</Text>
            <Text style = {styles.price}>${product.price}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
         width: '100%',
        aspectRatio: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default ProductDetailsScreen