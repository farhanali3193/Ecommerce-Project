import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector } from 'reselect';

import {selectDirectorySections } from '../../redux/directory/directory.selectors' 

import MenuItem from '../menu-item/menu-item'

import './directory.styles.scss';

const Directory = ({ sections }) => {
  return(
    <div className="directory-menu">
      {
        sections.map(({ id, ...otherSectionProps}) => (
            <MenuItem key = {id} {...otherSectionProps}/>
          )
        )
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})
//Above code can be written without using selectors or Reselect lib:
// const mapStateToProps = (state) => ({
//   sections: state.directory.sections
// })
/*Above code can be written without using createStructuredSelector:
const mapStateToProps = (state)=> ({
    sections: selectDirectorySections(state)
})
*/

export default connect(mapStateToProps)(Directory);