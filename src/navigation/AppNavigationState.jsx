import React from 'react';
import AuthNavigator from './AuthNavigator';
import { StatusBar, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import AppNavigator from './AppNavigator';

const AppNavigationState = (props) => {
	const insets = useSafeArea();
	if (props.profile && props.profile.userIsLoggedIn) {
		return (
			<View style={{flex: 1, backgroundColor: 'white', paddingBottom: insets.bottom}}>
				<StatusBar translucent barStyle="light-content" backgroundColor="#19112C"/>
				<AppNavigator/>
			</View>
		);
	}
	return (
		<View style={{flex: 1, backgroundColor: '#19112C', paddingBottom: insets.bottom}}>
			<StatusBar translucent barStyle="light-content" backgroundColor="#19112C"/>
			<AuthNavigator/>
		</View>
	);
};

const mapStateToProps = state => ({
	profile: state.profile,
});

export default connect(mapStateToProps, null)(AppNavigationState);
