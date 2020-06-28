import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { changeProfileType, signOut } from '../store/actions/profile';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const menu = [
	{
		title: 'Редактировать профиль',
		targetScreen: 'EditProfile',
	},
	{
		title: 'Сменить пароль',
		targetScreen: 'ChangePass',
	},
	{
		title: 'Правила',
		targetScreen: 'Rules',
	},
	{
		title: 'О приложении',
		targetScreen: 'AboutApp',
	},
	{
		title: 'Присоединиться к команде',
		targetScreen: '',
	},
];

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '10rem',
		paddingVertical: '20rem',
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: '10rem',
	},
	title: {
		color: 'white',
		fontSize: '11rem',
		lineHeight: '13rem',
		textTransform: 'uppercase',
		flex: 1,
		flexWrap: 'wrap',
	},
	$size: '35rem',
	menu: {
		paddingHorizontal: '10rem',
		paddingBottom: '20rem',
		flexGrow: 1,
	},
});

const ProfileSettingsScreen = (props) => {
	const navigation = useNavigation();
	const renderItem = (item, index) => (
		<TouchableOpacity
			key={index}
			activeOpacity={0.6}
			style={styles.item}
			onPress={() => !!item.targetScreen ? navigation.navigate(item.targetScreen) : null}
		>
			<View style={{flexGrow: 1, marginRight: 10}}>
				<View style={{flexDirection: 'row'}}>
					<Text style={styles.title}>{item.title}</Text>
				</View>
			</View>
			<Icon
				name="angle-right"
				size={styles.$size}
				color={'white'}
			/>
		</TouchableOpacity>
	);
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<ScrollView
					contentContainerStyle={styles.menu}>
					{menu.map(renderItem)}
					<TouchableOpacity
						activeOpacity={0.6}
						style={styles.item}
						onPress={props.changeProfileType}
					>
						<View style={{flexGrow: 1, marginRight: 10}}>
							<View style={{flexDirection: 'row'}}>
								<Text style={styles.title}>
									{props.profileType === 'ONE' ?
										'Переключиться на профиль команды'
										: 'Переключиться на профиль игрока'
									}
								</Text>
							</View>
						</View>
						<Icon
							name="angle-right"
							size={styles.$size}
							color={'white'}
						/>
					</TouchableOpacity>
				</ScrollView>
				<Button
					onPress={() => props.signOut()}
					title={'Выйти из приложения'}
				/>
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			signOut,
			changeProfileType,
		},
		dispatch);
};

const mapStateToProps = state => ({
	profileType: state.profile.profileType,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsScreen);
