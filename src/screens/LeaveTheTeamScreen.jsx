import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '10rem',
		flexDirection: 'column',
		paddingVertical: '10rem',
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: '10rem',
	},
	name: {
		color: 'white',
		fontSize: '11rem',
		lineHeight: '13rem',
		textTransform: 'uppercase',
		flex: 1,
		flexWrap: 'wrap',
	},
	title: {
		fontSize: '18rem',
		color: 'white',
		fontWeight: 'bold',
		marginBottom: '10rem',
		textAlign: 'center',
	},
	$size: '35rem',
	menu: {
		paddingHorizontal: '10rem',
		paddingBottom: '20rem',
		flexGrow: 1,
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
	},
});

const LeaveTheTeamScreen = (props) => {
	const navigation = useNavigation();
	const renderItem = (team, index) => (
		<TouchableOpacity
			key={index}
			activeOpacity={0.6}
			style={styles.item}
			onPress={() => navigation.navigate('LeaveTheTeamConfirmation', {team})}
		>
			<View style={{flexGrow: 1, marginRight: 10}}>
				<View style={{flexDirection: 'row'}}>
					<Text style={styles.name}>{team.NAME}</Text>
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
				<Text style={styles.title}>Ваши команды</Text>
				{props.myCommands && !!props.myCommands.length ?
					<ScrollView
						keyboardShouldPersistTaps='handled'
						scrollEnabled={true}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.menu}
					>
						{props.myCommands.map(renderItem)}
					</ScrollView> :
					<View style={styles.content}>
						<Text style={styles.title}>Вы не состоите ни в одной команде!</Text>
					</View>
				}
			</View>
		</ScreenWrapper>
	);
};

const mapStateToProps = state => {
	let myCommands = [];
	const {profile: {user: {COMMANDS}}} = state;
	const allCommands = state.stats.command;
	if (COMMANDS && !!COMMANDS.length && allCommands && !!allCommands.length) {
		myCommands = COMMANDS.map(id => {
			return allCommands.find(team => team.ID === id);
		});
	}
	return {
		myCommands,
	};
};

export default connect(mapStateToProps, null)(LeaveTheTeamScreen);
