import React from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import Button from '../components/Button';
import { bindActionCreators } from 'redux';
import { signOut } from '../store/actions/profile';
import { connect } from 'react-redux';
import header from '../assets/img/header.png';

const styles = EStyleSheet.create({
	$width: Dimensions.get('window').width,
	page: {
		flex: 1,
	},
	image: {
		width: '$width',
		height: '$width * 0.426',
	},
});

const ProfileScreen = (props) => {
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<ScrollView
					keyboardShouldPersistTaps='handled'
					scrollEnabled={true}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{flexGrow: 1}}
				>
					<Image
						source={header}
						resizeMode='cover'
						style={styles.image}/>
					<Button
						onPress={() => {
							props.signOut();
						}}
						title={'EXIT'}
					/>
				</ScrollView>
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			signOut,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(ProfileScreen);
