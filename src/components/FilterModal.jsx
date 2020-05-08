import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import TournamentsSwitcher from './TournamentsSwitcher';
import Button from './Button';
import CustomModal from './CustomModal';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sortMultiTournaments, sortSingleTournaments } from '../store/actions/tournaments';

const styles = EStyleSheet.create({
	title: {
		color: 'white',
		textTransform: 'uppercase',
		fontSize: '12rem',
		fontWeight: 'bold',
	},
	headerButton: {
		color: 'white',
		textTransform: 'uppercase',
		fontSize: '10rem',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: '10rem',
		marginBottom: '20rem',
		borderBottomWidth: 1,
		borderColor: 'white',
	},
});

const FilterModal = ({modalVisible, changeModalVisibleHandler, sortSingleTournaments, sortMultiTournaments}) => {
	const [selectedValue, setSelectedValue] = useState('single');
	const [singleFilterValue, setSingleFilterValue] = useState('');
	const [multiFilterValue, setMultiFilterValue] = useState('');
	
	const acceptFilter = () => {
		if (!!singleFilterValue) {
			sortSingleTournaments(singleFilterValue);
		}
		if (!!multiFilterValue) {
			sortMultiTournaments(multiFilterValue);
		}
		changeModalVisibleHandler();
	};
	
	return (
		<CustomModal
			modalVisible={modalVisible}
			setModalVisible={changeModalVisibleHandler}
		>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.7} onPress={acceptFilter}>
					<Text style={styles.headerButton}>Применить</Text>
				</TouchableOpacity>
				<Text style={styles.title}>Сортировка игр</Text>
				<TouchableOpacity activeOpacity={0.7} onPress={changeModalVisibleHandler}>
					<Text style={styles.headerButton}>Закрыть</Text>
				</TouchableOpacity>
			</View>
			<TournamentsSwitcher
				changeValue={setSelectedValue}
				selected={selectedValue}
			/>
			{selectedValue === 'single' ?
				<ScrollView contentContainerStyle={{flexGrow: 1, paddingVertical: 20}}>
					<Button
						onPress={() => setSingleFilterValue('fifa')}
						title='fifa'
						style={{
							marginVertical: 10,
							backgroundColor: singleFilterValue === 'fifa' ? 'blue' : 'red',
						}}
					/>
					<Button
						onPress={() => setSingleFilterValue('pes')}
						title='pes'
						style={{
							marginVertical: 10,
							backgroundColor: singleFilterValue === 'pes' ? 'blue' : 'red',
						}}
					/>
				</ScrollView> :
				<ScrollView contentContainerStyle={{flexGrow: 1, paddingVertical: 20}}>
					<Button
						onPress={() => setMultiFilterValue('fifa')}
						title='fifa'
						style={{
							marginVertical: 10,
							backgroundColor: multiFilterValue === 'fifa' ? 'blue' : 'red',
						}}
					/>
					<Button
						onPress={() => setMultiFilterValue('pes')}
						title='pes'
						style={{
							marginVertical: 10,
							backgroundColor: multiFilterValue === 'pes' ? 'blue' : 'red',
						}}
					/>
				</ScrollView>
			}
		
		</CustomModal>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			sortSingleTournaments,
			sortMultiTournaments,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(FilterModal);
