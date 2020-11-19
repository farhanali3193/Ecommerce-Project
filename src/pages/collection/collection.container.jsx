import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import WithSpinner from '../../components/with-spinner/with-spinner';
import { selectIsCollectionsLoaded, } from '../../redux/shop/shop.selectors';
import CollectionPage from './collection';

//My implementation:
const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsLoaded
})

//Yihua's implementation
// const mapStateToProps = createStructuredSelector({
//     isLoading: (state) => !selectIsCollectionsLoaded(state)
// })

// The above code can be written as:
// const mapStateToProps = (state) => ({
//     isLoading: !selectIsCollectionsLoaded(state)
// })

const CollectionPageContainer = compose(connect(mapStateToProps),WithSpinner)(CollectionPage);
//The above line is equivalent to:
// const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(CollectionPage))

export default CollectionPageContainer;