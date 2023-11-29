import { View, Text, Image, Dimensions, ScrollView } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import styles from "./postListStyles";
import { Entypo } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AuthHoc from '../../hoc/authHoc';
import {API_BASE_URL} from '../../services/config'

const { width, height } = Dimensions.get('screen');

const PostList = (props) => {

    const isCarousel = React.useRef(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const fetchPosts = () => {
        setLoading(true);
        axios({
            method: 'GET',
            url: `https://lifeaholic-test1.onrender.com/api/v1/data/post/get-users/${props.user._id}`
        }).then(res => {
            console.log(JSON.stringify(res));
            setPosts(res.data);
            setLoading(false);
        }).catch(err => {
            console.log(err)
        })

    }

    // const fetchUsers = async(userId) => {
    //     setLoading(true);
    //     axios({
    //         method: 'GET',
    //         url: `https://lifeaholic-test1.onrender.com/api/v1/data/details/get-users/${props.user._id}`
    //     }).then(res => {
    //         console.log(JSON.stringify(res));
    //         setUserName(res.data);
    //         setLoading(false);
    //     }).catch(err => {
    //         console.log(err)
    //     })

    // }

    useEffect(() => {
        fetchPosts();
        // fetchUsers(userId);
    }, [])


    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4);
    }, []);



    const data = [
        {
            imgUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190430-make-friends-app-1556655645.jpg?crop=0.502xw:1.00xh;0.235xw,0&resize=640:*",
        },
        {

            imgUrl: "https://m.economictimes.com/thumb/msid-84889480,width-1200,height-900,resizemode-4,imgsize-143058/friends.jpg",
        },
        {

            imgUrl: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/03/19/18/idoh-socialise.jpg?quality=75&width=982&height=726&auto=webp",
        },
    ];


    const renderImage = ({ item, index }) => {

        return (
            <View style={styles.container} key={index}>
                <Image
                    source={{ uri: item.imgUrl }}
                    style={styles.image}
                />
            </View>
        );
    }

    const likePost = (item) => {
        // console.log('Hi')
        // const payload = {
        //     post: postId,
        //     user: props.user._id
        // }
        // console.log(JSON.stringify(payload));
    }

    return (

        <>
            {
                loading ? <Text>Loading....</Text> :
                    <ScrollView>

                        {
                            posts.usersPosts && posts.usersPosts.length > 0 ? posts.usersPosts.map((post) => {
                                return (
                                    <View key={post._id}>
                                        <View style={styles.input}>
                                            <Image
                                                style={styles.tinyLogo}
                                                source={{
                                                    uri: 'https://i.pinimg.com/736x/be/04/2b/be042b0f63e612e8c283f7f24cd43808.jpg',
                                                }}
                                            />

                                            <Text style={[styles.comment, { color: 'black', fontWeight: 'bold', fontSize: 15 }]}>
                                                {post.userId}
                                            </Text>
                                            <Text>
                                                <Entypo name="dots-three-horizontal" size={24} color="black" />
                                            </Text>
                                        </View>

                                        <View >
                                            <Image
                                                source={{ uri: post.uploadImage }}
                                                style={styles.image}
                                            />
                                            {/* <Carousel
                                                ref={isCarousel}
                                                data={data}
                                                renderItem={renderImage}
                                                sliderWidth={width}
                                                itemWidth={width}
                                                inactiveSlideShift={0}
                                                useScrollView={true}
                                            /> */}
                                        </View>

                                        <View style={styles.mainContainer}>

                                            <Text
                                                onTextLayout={onTextLayout}
                                                numberOfLines={textShown ? undefined : 2}
                                                style={{ lineHeight: 21 }}>
                                                {post.content}
                                            </Text>

                                            {
                                                lengthMore ? <Text
                                                    onPress={toggleNumberOfLines}
                                                    style={{ lineHeight: 21, marginTop: 10 }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                                                    : null
                                            }
                                        </View>

                                        <View style={styles.postSymbols}>
                                            <View style={styles.postLike} onPress={likePost(post)} ><AntDesign name="like2" size={24} color="black" /><Text>{post.likes.length}</Text></View>
                                            <View style={styles.postComment}><Ionicons name="chatbox-ellipses" size={24} color="black" /><Text>{post.likes.length}</Text></View>
                                        </View>
                                    </View>
                                )
                            }) : <View style={{
                                display: 'flex', justifyContent: 'center',
                                alignItems: 'center', height: Dimensions.get('screen').height / 2
                            }}>
                                <Text style={{ fontSize: 20 }}>No Posts Found</Text>
                            </View>
                        }


                    </ScrollView>
            }
        </>

    )
}

export default AuthHoc(PostList);