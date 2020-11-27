import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items, match}) => {
    // console.log('MATCH', match.url)
    return (    
        <div className='collection-preview'>
            <Link className = 'link-title' to={`${match.url}/${title.toLowerCase()}`}>
                <h1 className='title'> {title.toUpperCase()}</h1>
            </Link>
           
            <div className='preview'>
                {items
                    .filter(( item, index) => index<4)
                    .map((item) => (
                        <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default withRouter(CollectionPreview);