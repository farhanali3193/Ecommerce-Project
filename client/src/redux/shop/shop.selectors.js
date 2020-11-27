import { createSelector } from 'reselect'

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections 
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    (collections) => collections ? Object.keys(collections).map(key => collections[key]) : [] //["hats",'sneakers',"jackets","mens","womens"].map()
)

export const selectCollection = (collectionUrlParam) => createSelector(
    [selectCollections],
    (collections)=> collections ? collections[collectionUrlParam] : null
)

export const selectIsFetchingCollections = createSelector(
    [selectShop],
    (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectCollections],
    (collections) => !(!!collections)
)