import React, { useState } from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../components/Button';
import { bindActionCreators } from 'redux';
import { removePlayerFromCommand } from '../store/actions/team';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '10rem',
		flexDirection: 'column',
		paddingVertical: '20rem',
	},
	title: {
		fontSize: '20rem',
		lineHeight: '25rem',
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
	},
	footer: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	error: {
		color: '#D51E49',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginTop: '10rem',
		fontWeight: 'bold',
	},
});

const LeaveTheTeamConfirmationScreen = (props) => {
	const navigation = useNavigation();
	const {params: {team}} = props.route;
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	
	const removePlayerFromCommand = () => {
		setLoading(true);
		props.removePlayerFromCommand(team.ID).then(res => {
			setLoading(false);
			if (!res.result && !!res.message) {
				return setError(res.message);
			}
			navigation.goBack();
		});
	};
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<View style={styles.content}>
					<Text style={styles.title}>Вы точно хотите</Text>
					<Text style={styles.title}>покинуть команду</Text>
					<Text style={styles.title}>{team.NAME}?</Text>
					{!!error && <Text style={styles.error}>{error}</Text>}
				</View>
				<View style={styles.footer}>
					<Button
						loading={loading}
						onPress={removePlayerFromCommand}
						title={'Покинуть'}
					/>
				</View>
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			removePlayerFromCommand,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(LeaveTheTeamConfirmationScreen);
