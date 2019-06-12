/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
  Dimensions,
} from 'react-native';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TouchableOpacity from './TouchableOpacity';

export default class MessageImage extends React.Component {
  state = {
    isOpen: false,
    messageIndex: 0,
  };

  onClickImage = () => {
    this.setState({ isOpen: true });
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isOpen) {
      return {};
    }
    const { imageMessages, currentMessage } = props;
    const messagesIds = imageMessages.map(item => item.id);
    const messageIndex = messagesIds.indexOf(currentMessage.id);
    return { messageIndex };
  }

  render() {
    const { imageMessages, currentMessage, imageProps, containerStyle, imageStyle } = this.props;
    const { isOpen, messageIndex } = this.state;
    if (isOpen) { console.log('messageIndex', messageIndex); }

    let { thumb, origin } = currentMessage.media_url;

    return (
      <TouchableOpacity
        onPress={this.onClickImage}
        style={{ ...styles.container, ...containerStyle }}
      >
        <Image
          {...imageProps}
          style={[styles.image, this.props.imageStyle]}
          source={{ uri: thumb }}
        />
        {isOpen && (
          <Lightbox
            onCloseRequest={() => this.setState({ isOpen: false })}
            mainSrc={origin}
            nextSrc={null}
            prevSrc={null}
            onMovePrevRequest={() => null}
            onMoveNextRequest={() => null}

          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
