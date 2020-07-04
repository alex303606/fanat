import React, { useEffect } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import Stars from 'react-native-stars';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import header from '../assets/img/header.png';
import Icon from 'react-native-vector-icons/Ionicons';
import TabBar from '../components/TabBar';
import ImageWithLoader from '../components/ImageWithLoader';
import userAvatar from '../assets/img/userAvatar.jpg';
import { getPlayer } from '../store/actions/profile';

const styles = EStyleSheet.create({
	$width: Dimensions.get('window').width,
	page: {
		flex: 1,
	},
	image: {
		width: '$width',
		height: '$width * 0.426',
	},
	userAvatar: {
		borderRadius: '50rem',
		borderWidth: '2rem',
		borderColor: 'white',
		position: 'absolute',
		left: '50%',
		marginLeft: '-50rem',
		bottom: '-50rem',
		overflow: 'hidden',
	},
	avatar: {
		width: '100rem',
		height: '100rem',
	},
	head: {
		position: 'relative',
		marginBottom: '70rem',
	},
	login: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: '20rem',
		textAlign: 'center',
		marginBottom: '10rem',
	},
	rating: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: '16rem',
		textAlign: 'center',
		marginTop: '10rem',
	},
	$starSize: '30rem',
});

const ProfileScreen = (props) => {
	useEffect(() => {
		props.getPlayer();
	}, []);
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<ScrollView
					keyboardShouldPersistTaps='handled'
					scrollEnabled={true}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{flexGrow: 1}}
				>
					<View style={styles.head}>
						<Image
							source={header}
							resizeMode='cover'
							style={styles.image}/>
						<View style={styles.userAvatar}>
							{!!props.PHOTO ?
								<ImageWithLoader resizeMode='cover' style={styles.avatar} source={props.PHOTO}/> :
								<Image resizeMode='cover' source={userAvatar} style={styles.avatar}/>
							}
						</View>
					</View>
					<View>
						<Text style={styles.login}>{props.LOGIN}</Text>
						<Stars
							disabled
							default={4}
							count={5}
							starSize={styles.$starSize}
							spacing={10}
							fullStar={<Icon size={styles.$starSize} color={'#D51E49'} name={'ios-star'}/>}
							emptyStar={<Icon size={styles.$starSize} color={'#D51E49'} name={'ios-star-outline'}/>}
						/>
						<Text style={styles.rating}>#12/100</Text>
					</View>
					<TabBar/>
				</ScrollView>
			</View>
		</ScreenWrapper>
	);
};

const mapStateToProps = state => ({
	EMAIL: state.profile.user.EMAIL,
	ID: state.profile.user.ID,
	LOGIN: state.profile.user.LOGIN,
	PHONE: state.profile.user.PHONE,
	PHOTO: state.profile.user.PHOTO,
	profileType: state.profile.profileType,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			getPlayer,
		},
		dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
