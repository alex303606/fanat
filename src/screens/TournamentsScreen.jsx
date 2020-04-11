import React from 'react';
import { Text, View } from 'react-native';
import Button from '../components/Button';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { signOut } from '../store/actions/profile';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '20rem',
		paddingVertical: '30rem',
		flexDirection: 'column',
	},
	footer: {
		flexGrow: 1,
		justifyContent: 'flex-end',
		paddingTop: '25rem',
	},
});

const TournamentsScreen = (props) => {
	return (
		<View style={styles.page}>
			<Text>TournamentsScreen</Text>
			<View style={styles.footer}>
				<Button
					onPress={props.signOut}
					title={'Выйти'}
				/>
			</View>
		</View>
	);
};
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			signOut,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(TournamentsScreen);
