import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';
import PickerImage from '../components/PickerImage';
import Button from '../components/Button';
import { bindActionCreators } from 'redux';
import { createTeam, getCommand } from '../store/actions/team';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '20rem',
		paddingVertical: '30rem',
		flexDirection: 'column',
	},
	fields: {
		flexGrow: 1,
		flexDirection: 'column',
	},
	row: {
		marginVertical: '25rem',
	},
	input: {
		height: '42rem',
		fontSize: '14rem',
		color: 'white',
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 5,
		paddingHorizontal: '13rem',
	},
	error: {
		color: '#D51E49',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginTop: '10rem',
		fontWeight: 'bold',
	},
});
const CreateTeamScreen = (props) => {
	const navigation = useNavigation();
	const [teamName, changeTeamName] = useState('');
	const [photo, setPhoto] = useState('');
	const [loading, setLoading] = useState(false);
	const [teamNameIsValid, setTeamNameIsValid] = useState(true);
	const [error, setError] = useState('');
	const create = () => {
		if (!teamName) {
			return setTeamNameIsValid(false);
		}
		if (!teamNameIsValid) {
			setTeamNameIsValid(true);
		}
		setLoading(true);
		props.createTeam({teamName, photo}).then(res => {
			if (!res.result && !!res.message) {
				setLoading(false);
				return setError(res.message);
			}
			const {data: {ID}} = res;
			props.getCommand(ID).then(res => {
				setLoading(false);
				if (res && res.data && res.data.ID) {
					return navigation.navigate('CreateTeamSuccessfully');
				}
				
				return setError('Ошибка получения данных команды');
			});
		});
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
					<PickerImage
						avatar={photo}
						savePhoto={setPhoto}
					/>
					<View style={styles.fields}>
						<View style={styles.row}>
							<TextInput
								style={styles.input}
								value={teamName}
								onChangeText={changeTeamName}
								underlineColorAndroid='transparent'
								placeholder={'Название команды'}
								placeholderTextColor={'white'}
								autoCapitalize={'none'}
								autoCompleteType={'off'}
							/>
							{!teamNameIsValid && <Text style={styles.error}>Заполните название команды</Text>}
							{!!error && <Text style={styles.error}>{error}</Text>}
						</View>
					</View>
					<Button
						loading={loading}
						onPress={create}
						title={'Создать команду'}
					/>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			createTeam,
			getCommand,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(CreateTeamScreen);
