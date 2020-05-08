import React from 'react';
import { RefreshControl, SectionList, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
	},
});

const SingleTournaments = (props) => {
	return (
		<View style={styles.page}>
			<SectionList
				sections={props.tournaments}
				keyExtractor={props.sectionKeyExtractor}
				renderItem={props.renderItem}
				renderSectionHeader={props.renderSectionHeader}
				contentContainerStyle={{flexGrow: 1}}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={false}
				scrollEnabled
				scrollEventThrottle={16}
				refreshControl={
					<RefreshControl
						refreshing={props.refreshing}
						onRefresh={props.onRefresh}
						title="Загружаем турниры"
						tintColor='white'
						titleColor='white'
					/>
				}
			/>
		</View>
	);
};

export default SingleTournaments;
