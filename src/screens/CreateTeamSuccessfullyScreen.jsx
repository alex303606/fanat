import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import { Image, ScrollView, Text, View } from 'react-native';
import Button from '../components/Button';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import ImageWithLoader from '../components/ImageWithLoader';
import userAvatar from '../assets/img/userAvatar.jpg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '20rem',
		paddingVertical: '30rem',
		flexDirection: 'column',
	},
	title: {
		color: 'white',
		fontSize: '16rem',
		lineHeight: '18rem',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	footer: {
		paddingTop: '30rem',
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	teamAvatar: {
		marginBottom: '30rem',
		overflow: 'hidden',
		width: '100rem',
		height: '100rem',
		borderRadius: '50rem',
		borderWidth: '2rem',
		borderColor: 'white',
	},
	avatar: {
		width: '100rem',
		height: '100rem',
	},
	teamAvatarContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		paddingVertical: '50rem',
	},
	teamName: {
		color: 'white',
		fontSize: '20rem',
		lineHeight: '24rem',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

const CreateTeamSuccessfullyScreen = (props) => {
	const navigation = useNavigation();
	const navigateToScannerScreen = () => {
		navigation.navigate('Scanner');
	};
	
	return (
		<ScreenWrapper>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{flexGrow: 1}}
			>
				<View style={styles.page}>
					<Text style={styles.title}>Команда успешно создана.</Text>
					<Text style={styles.title}>Теперь вы можете зарегестрироваться в турнире.</Text>
					<View style={styles.teamAvatarContainer}>
						<View style={styles.teamAvatar}>
							{!!props.teamImage ?
								<ImageWithLoader resizeMode='cover' style={styles.avatar} source={props.teamImage}/> :
								<Image resizeMode='cover' source={userAvatar} style={styles.avatar}/>
							}
						</View>
						<Text style={styles.teamName}>Команда</Text>
						<Text style={styles.teamName}>{props.teamName}</Text>
					</View>
					<View style={styles.footer}>
						<Button
							onPress={navigateToScannerScreen}
							title={'Зарегестрироваться в турнире'}
						/>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
};

const mapStateToProps = state => ({
	id: state.profile.team.ID,
	teamImage: state.profile.team.PICTURE,
	teamName: state.profile.team.NAME,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({},
		dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamSuccessfullyScreen);
