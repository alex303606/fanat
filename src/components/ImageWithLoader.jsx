import React from 'react';
import Image from 'react-native-image-progress';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

const ImageWithLoader = (props) => {
	const renderLoader = () => <ActivityIndicator size="large" color={'white'}/>;
	return (
		<Image
			resizeMode={props.resizeMode}
			source={{uri: props.source}}
			indicator={renderLoader}
			style={props.style}/>
	);
};

const mapStateToProps = state => ({
	location: state.profile.location,
});

export default connect(mapStateToProps, null)(ImageWithLoader);
