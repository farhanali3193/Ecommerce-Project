import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux';

import { selectIsFetchingCollections } from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/with-spinner';
import CollectionsOverview from './collections-overview'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsFetchingCollections
})
//The above code is equivalent to:
//const mapStateToProps = createStructuredSelector({
//     isLoading: (state) => selectIsFetchingCollections(state)
// })


const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionsOverview) 
//It basically means: const composer = compose(connect(mapStateToProps), WithSpinner)
//export default composer(CollectionsOverview)
//It can be written without using 'compose' like so: 
// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview)) 

export default CollectionsOverviewContainer;