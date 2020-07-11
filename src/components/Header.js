import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 320});

const styles = EStyleSheet.create({
	$fontSize: '18rem',
	$height: '80rem',
});

const Header = {
	headerStyle: {
		backgroundColor: '#19112C',
		elevation: 0,
		shadowColor: 'transparent',
		borderBottomWidth: 0,
		shadowOpacity: 0,
		shadowOffset: {
			height: 0,
		},
		shadowRadius: 0,
		height: styles.$height
	},
	headerTintColor: '#fff',
	headerTitleStyle: {
		backgroundColor: '#19112C',
		fontWeight: 'bold',
		fontSize: styles.$fontSize,
	},
	headerTitleAlign: 'center',
	headerBackTitleVisible: false,
	gestureEnabled: false,
	headerMode: 'float',
};

export default Header;
