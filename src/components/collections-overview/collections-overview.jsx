import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import CollectionPreview from '../collection-preview/collection-preview';

import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => {
    console.log(collections)
    return (
        <div className = "collections-overview">
            {collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})
//Above code can be written without using selectors or Reselect lib:
// const mapStateToProps = (state) => ({
//   collections: state.shop.collections
// })
/*Above code can be written without using createStructuredSelector:
const mapStateToProps = (state)=> ({
    collections: selectCollections(state)
})
*/

export default connect(mapStateToProps)(CollectionsOverview);